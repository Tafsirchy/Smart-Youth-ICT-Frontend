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
            
            // Remove self-closing div or motion.div with blur- classes
            content = content.replace(/<(div|motion\.div)\s+[^>]*?className=(['"])[^>]*?blur-(?:\[\d+px\]|2xl|3xl).*?\2[^>]*?\/>/gs, '');
            
            // Remove full div or motion.div with blur- classes ONLY if it contains no children (i.e. just space or empty)
            content = content.replace(/<(div|motion\.div)\s+[^>]*?className=(['"])[^>]*?blur-(?:\[\d+px\]|2xl|3xl).*?\2[^>]*?>\s*<\/\1>/gs, '');

            fs.writeFileSync(fullPath, content);
        }
    }
}

processDir('src');
console.log('Removed blur blobs safely.');
