const fs = require('fs');
let c = fs.readFileSync('src/app/builder/page.tsx', 'utf8');

c = c.replace(/import \{ useEffect \} from 'react';\r?\n\s*useEffect/, 'useEffect');
c = c.replace(/import \{ useState \} from 'react';/, "import { useState, useEffect } from 'react';");

fs.writeFileSync('src/app/builder/page.tsx', c);
