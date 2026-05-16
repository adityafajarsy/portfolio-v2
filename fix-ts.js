const fs = require('fs');
const path = require('path');

function fixTS(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (let entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isFile() && (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx'))) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Fix ease array TS error
      content = content.replace(/ease:\s*(\[[0-9.,\s]+\])(?! as)/g, 'ease: $1 as const');
      
      // Fix implicit any for `i =>` in variants
      content = content.replace(/\bi\s*=>/g, '(i: number) =>');
      content = content.replace(/\(i\)\s*=>/g, '(i: number) =>');
      
      // Fix implicit any for `e =>`
      content = content.replace(/\(e\)\s*=>/g, '(e: any) =>');
      content = content.replace(/\be\s*=>/g, '(e: any) =>');
      
      // Fix specific Next.js images if needed
      
      fs.writeFileSync(fullPath, content);
      
    } else if (entry.isDirectory()) {
      fixTS(fullPath);
    }
  }
}

fixTS(path.join(__dirname, 'components'));
console.log('TS fixes applied to components.');
