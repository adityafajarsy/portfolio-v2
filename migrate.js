const fs = require('fs');
const path = require('path');

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    let destName = entry.name;
    
    if (entry.isFile()) {
      if (destName.endsWith('.jsx')) {
        destName = destName.replace(/\.jsx$/, '.tsx');
      } else if (destName.endsWith('.js')) {
        destName = destName.replace(/\.js$/, '.ts');
      }
      
      const destPath = path.join(dest, destName);
      
      let content = fs.readFileSync(srcPath, 'utf8');
      
      // Add 'use client' if it's a TSX or TS file and doesn't have it
      if ((destName.endsWith('.tsx') || destName.endsWith('.ts')) && !content.includes('use client')) {
        content = `'use client';\n\n` + content;
      }
      
      // Simple TS fixes (optional, but let's just copy first and we'll fix types manually or leave them as any if implicit-any is off)
      fs.writeFileSync(destPath, content);
      
    } else if (entry.isDirectory()) {
      copyDir(srcPath, path.join(dest, destName));
    }
  }
}

copyDir(path.join(__dirname, '_legacy', 'src', 'components'), path.join(__dirname, 'components'));
console.log('Migration of components complete.');
