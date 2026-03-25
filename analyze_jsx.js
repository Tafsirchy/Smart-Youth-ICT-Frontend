const fs = require('fs');
const path = require('path');

const srcDir = 'd:/SYICT/syict-frontend/src';
const outputParams = [];

let totalJs = 0;
let shouldBeJsx = 0;
let correctJs = 0;
let badApi = 0;

function analyzeFile(filePath) {
  if (!filePath.endsWith('.js')) return;
  
  const content = fs.readFileSync(filePath, 'utf-8');
  let containsJSX = false;
  let isReactComponent = false;
  let hasHooks = false;
  let hasApiLogic = false;

  // Basic heuristics
  if (/<[a-zA-Z]+[>|\s]/.test(content) || /<\/>/.test(content)) containsJSX = true;
  if (/export default function [A-Z]/.test(content) || /export const [A-Z].+=.+=>/.test(content)) isReactComponent = true;
  if (/use[A-Z][a-zA-Z]+/.test(content)) hasHooks = true;
  if (/fetch\(|axios\.|api\./.test(content)) hasApiLogic = true;

  const isApiFolder = filePath.includes('/api/') || filePath.includes('\\api\\');
  const isUtilFolder = filePath.includes('/utils/') || filePath.includes('\\utils\\');
  const isComponentFolder = filePath.includes('/components/') || filePath.includes('\\components\\');
  const isAppFolder = filePath.includes('/app/') || filePath.includes('\\app\\');

  let fileType = 'Utility';
  if (isReactComponent || containsJSX) fileType = 'React Component';
  else if (hasHooks) fileType = 'Hook Provider';
  else if (isApiFolder) fileType = 'API Route/Helper';
  
  let recExtension = '.js';
  let action = 'Keep';
  
  if (containsJSX || isReactComponent) {
    recExtension = '.jsx';
    action = 'Rename';
  }

  // Bad practices
  let notes = [];
  if (containsJSX && isApiFolder) { badApi++; notes.push('❌ Component inside API'); }
  if (containsJSX && isUtilFolder) { notes.push('❌ UI Logic inside Utility'); }
  if (containsJSX && hasApiLogic) { notes.push('⚠️ Mixed Purpose (UI + API calling directly)'); }

  totalJs++;
  if (action === 'Rename') shouldBeJsx++;
  else correctJs++;

  const relPath = filePath.replace('d:/SYICT/syict-frontend/src', '');

  outputParams.push({
    path: relPath.replace(/\\/g, '/'),
    curr: '.js',
    jsx: containsJSX ? 'Yes' : 'No',
    type: fileType,
    rec: recExtension,
    action: action,
    notes: notes.join(', ') || 'Clean'
  });
}

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else {
      analyzeFile(fullPath);
    }
  }
}

walk(srcDir);

let markdown = `# Frontend File Extension & Structure Audit
## 1. Summary Report
- **Total \`.js\` files scanned:** ${totalJs}
- **Files that should be \`.jsx\`:** ${shouldBeJsx}
- **Files correctly using \`.js\`:** ${correctJs}
- **Problematic structure areas:** ${badApi} components wrongly located.

## 2. File Analysis Table

| File Path | Current Extension | Contains JSX | File Type | Recommended Extension | Action | Notes |
|----------|------------------|-------------|----------|----------------------|--------|-------|
`;

outputParams.sort((a,b) => a.action === 'Rename' ? -1 : 1).forEach(row => {
  markdown += `| ${row.path} | ${row.curr} | ${row.jsx} | ${row.type} | ${row.rec} | **${row.action}** | ${row.notes} |\n`;
});

markdown += `\n## 3. Safe Migration Plan
To safely convert all \`.js\` files containing JSX to \`.jsx\` without breaking imports:

1. **Next.js & Imports:** In Next.js, imports typically do not require the file extension (e.g., \`import Header from '@/components/Header'\`). Renaming the file will **not break** these imports.
2. **Execute Rename Command:**
   Run the following PowerShell script from the root to safely rename them globally:
   \`\`\`powershell
   Get-ChildItem -Path "./src" -Filter *.js -Recurse | Where-Object { Select-String -Path $_.FullName -Pattern "<[a-zA-Z]+[>|\\s]" -Quiet } | Rename-Item -NewName { [io.path]::ChangeExtension($_.name, "jsx") }
   \`\`\`
3. **Verify App Connectivity:** Clear the Next.js cache (\`rm -rf .next\`) and restart the dev server.
4. **Refactor Mixed-Purpose Files:** For components combining raw API fetches within the UI loop, extract the \`fetch\` calls into standard actions inside \`/src/lib\` or \`/src/services\`.
`;

fs.writeFileSync('C:/Users/Tafsir/.gemini/antigravity/brain/9a847583-640f-4ede-ab04-6949711650b8/jsx_audit_report.md', markdown);
console.log('Report generated.');
