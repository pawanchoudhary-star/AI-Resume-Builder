const fs = require('fs');

const filePath = 'd:\\AI Resume Builder\\resume-ai-pro\\src\\app\\builder\\page.tsx';
let content = fs.readFileSync(filePath, 'utf-8');

// The $2 is literally in the file
content = content.replace(/<\/h([23])\$2>/g, '</h$1>');

fs.writeFileSync(filePath, content);
console.log('Fixed syntax errors');
