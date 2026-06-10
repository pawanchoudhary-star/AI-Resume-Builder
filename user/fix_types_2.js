const fs = require('fs');

let code = fs.readFileSync('src/app/builder/page.tsx', 'utf8');

// Replace all instances of .map((<char>, i) or .map((<word>, i) with .map((<char>: any, i: number)
code = code.replace(/\.map\(\s*([a-zA-Z0-9_]+)\s*,\s*([a-zA-Z0-9_]+)\s*\)/g, ".map(($1: any, $2: number)");

fs.writeFileSync('src/app/builder/page.tsx', code);
console.log('Fixed ALL typescript map function typings with regex!');
