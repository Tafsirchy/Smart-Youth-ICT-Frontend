const fs = require('fs');
const path = require('path');

const dirs = [
  'e:/SYICT/syict-frontend/src'
];

function processDir(dirPath) {
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // We want to replace things like rounded-2xl, rounded-[2rem], rounded-full, rounded-md, rounded-sm, rounded, rounded-t-xl, etc.
      // But maybe keep rounded-full for avatars? User said "puro website er sob jaiga theke border radius remove kore ekta square apprached version". 
      // Let's remove ALL rounded classes to give the raw neo-brutalist square look.
      
      // regex to match `rounded`, `rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-2xl`, `rounded-3xl`, `rounded-full`, `rounded-t-*`, `rounded-[*]` etc.
      // ensure we match whole words within class names
      const regex = /\brounded(?:-(?:sm|md|lg|xl|2xl|3xl|full|none|t|r|b|l|tl|tr|br|bl)(?:-(?:sm|md|lg|xl|2xl|3xl|full))?|(?:-\[.*?\]))?\b/g;
      
      const newContent = content.replace(regex, '');
      
      // Clean up multiple spaces that might have been left
      const cleanContent = newContent.replace(/ +/g, ' ');

      if (content !== cleanContent) {
        fs.writeFileSync(fullPath, cleanContent, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

dirs.forEach(processDir);
console.log('Done!');
