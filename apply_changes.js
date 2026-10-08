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
                let newClasses = classes;
                
                // 1. Hide background blur blobs
                if (newClasses.match(/blur-(?:\[\d+px\]|2xl|3xl)/) && newClasses.includes('pointer-events-none')) {
                    newClasses = newClasses + ' hidden';
                }
                
                // 2. Remove all rounded- classes
                newClasses = newClasses.replace(/\brounded-[a-zA-Z0-9-]+\b/g, '').replace(/\brounded\b/g, '');
                
                // Clean up extra spaces
                newClasses = newClasses.replace(/\s+/g, ' ').trim();
                
                return `className=${quote}${newClasses}${quote}`;
            });

            if (content !== newContent) {
                fs.writeFileSync(fullPath, newContent);
            }
        }
    }
}

processDir('src');
console.log('Applied changes safely.');
