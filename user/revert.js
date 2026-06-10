const fs = require('fs');
let c = fs.readFileSync('src/app/builder/page.tsx', 'utf8');

c = c.replace(/\{experienceLevel !== 'student' && \(\n<>\n/g, '');
c = c.replace(/\n<\/>\n\)\}/g, '');

fs.writeFileSync('src/app/builder/page.tsx', c);
