const fs = require('fs');

let code = fs.readFileSync('src/app/builder/page.tsx', 'utf8');

code = code.replace(/\.map\(\(c, i\)/g, ".map((c: string, i: number)");
code = code.replace(/\.map\(\(s, i\)/g, ".map((s: string, i: number)");
code = code.replace(/\.map\(\(d, i\)/g, ".map((d: string, i: number)");
code = code.replace(/\.map\(\(a, i\)/g, ".map((a: string, i: number)");
code = code.replace(/\.map\(\(l, i\)/g, ".map((l: string, i: number)");

fs.writeFileSync('src/app/builder/page.tsx', code);
console.log('Fixed typescript map function typings!');
