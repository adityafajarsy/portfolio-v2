const fs = require('fs');
const path = require('path');

function fixTS(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (let entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isFile() && (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx'))) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // components/Projects/components/project/index.tsx
      content = content.replace(/\{index, title, manageModal\}/g, '{index, title, manageModal}: any');
      
      // components/Header/nav/Link/index.tsx
      content = content.replace(/\{data, isActive, setSelectedIndicator\}/g, '{data, isActive, setSelectedIndicator}: any');
      
      // components/Header/index.tsx
      content = content.replace(/manageMouseMove = \(e\)/g, 'manageMouseMove = (e: any)');
      
      fs.writeFileSync(fullPath, content);
      
    } else if (entry.isDirectory()) {
      fixTS(fullPath);
    }
  }
}

fixTS(path.join(__dirname, 'components'));
console.log('Second pass TS fixes applied to components.');
