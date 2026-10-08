const fs = require('fs');
const path = require('path');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (!fullPath.includes('node_modules') && !fullPath.includes('.next')) {
                processDir(fullPath);
            }
        } else if (fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            
            let newContent = content.replace(/className=(['"])(.*?)\1/g, (match, quote, classes) => {
                if (classes.match(/blur-(?:\[\d+px\]|2xl|3xl)/)) {
                     let newClasses = classes
                         .replace(/blur-(?:\[\d+px\]|2xl|3xl)/g, '')
                         .replace(/bg-[a-zA-Z0-9-]+\/[0-9]+/g, ''); // Removes bg-brand-pink/20 etc
                     return `className=${quote}${newClasses}${quote}`;
                }
                return match;
            });

            if (content !== newContent) {
                fs.writeFileSync(fullPath, newContent);
            }
        }
    }
}

processDir('src');
console.log('Removed blur blob classes safely.');
