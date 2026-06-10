const fs = require('fs');
let code = fs.readFileSync('src/app/builder/page.tsx', 'utf8');

const pairs = ['c', 's', 'd', 'a', 'l'];

for (const p of pairs) {
  code = code.split('.map((' + p + ', i)').join('.map((' + p + ': any, i: number)');
  code = code.split('.map((' + p + ',i)').join('.map((' + p + ': any, i: number)');
}

fs.writeFileSync('src/app/builder/page.tsx', code);
console.log('Fixed typings');
