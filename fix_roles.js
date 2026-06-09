const fs = require('fs');
let code = fs.readFileSync('src/app/builder/page.tsx', 'utf8');

// 1. Add profession to useState
code = code.replace(
  /const \[resumeData, setResumeData\] = useState\(\{\n\s*name: '',/g,
  "const [resumeData, setResumeData] = useState({\n    name: '',\n    profession: '',"
);

// 2. Add profession to dummyData
code = code.replace(
  /const dummyData = \{\n\s*name: 'Alex Johnson',/g,
  "const dummyData = {\n    name: 'Alex Johnson',\n    profession: 'Senior Product Manager',"
);

// 3. Add input field to the form
const inputHtml = `                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1">Profession / Title</label>
                      <input type="text" name="profession" value={resumeData.profession} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition" placeholder="e.g. Full Stack Developer" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1">Email Address</label>`;

code = code.replace(
  /                    <div>\n\s*<label className="block text-xs font-medium text-gray-400 mb-1">Email Address<\/label>/g,
  inputHtml
);

// 4. Update the FIRST occurrence of data.role in each template to data.profession || data.role
// We need to carefully split by "const render" and process each part.

let parts = code.split('const render');
for (let i = 1; i < parts.length; i++) {
  // If this is a template renderer
  if (parts[i].includes('(data: any) =>')) {
    // find the first occurrence of data.role
    parts[i] = parts[i].replace(/data\.role/, 'data.profession || data.role');
  }
}
code = parts.join('const render');

fs.writeFileSync('src/app/builder/page.tsx', code);
console.log('Fixed roles successfully!');
