const fs = require('fs');
const path = require('path');

const cssPath = 'e:/SYICT/syict-frontend/src/styles/globals.css';
let content = fs.readFileSync(cssPath, 'utf8');

// Remove border-radius CSS properties
content = content.replace(/border-radius:\s*[^;]+;/g, '');

// Remove tailwind rounded classes from @apply
const applyRegex = /(@apply\s+[^;]*?)\brounded(?:-(?:sm|md|lg|xl|2xl|3xl|full|none|t|r|b|l|tl|tr|br|bl)(?:-(?:sm|md|lg|xl|2xl|3xl|full))?|(?:-\[.*?\]))?\b/g;

// Since there could be multiple rounded classes in one @apply, we run it in a loop until no more matches
let newContent = content;
while(applyRegex.test(newContent)) {
  newContent = newContent.replace(applyRegex, '$1');
}

// Clean up multiple spaces in @apply and empty @apply statements
newContent = newContent.replace(/(@apply\s+)\s+/g, '$1');

if (content !== newContent) {
  fs.writeFileSync(cssPath, newContent, 'utf8');
  console.log('Updated globals.css');
} else {
  console.log('No changes in globals.css');
}
