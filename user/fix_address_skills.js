const fs = require('fs');
let code = fs.readFileSync('src/app/builder/page.tsx', 'utf8');

// 1. Update useState
code = code.replace(
  /linkedin: '',/g,
  "linkedin: '',\n    address: '',\n    portfolio: '',\n    technicalSkills: '',"
);

// 2. Update dummyData
code = code.replace(
  /linkedin: 'linkedin\.com\/in\/alexj',/g,
  "linkedin: 'linkedin.com/in/alexj',\n    address: 'New York, USA',\n    portfolio: 'alexj.dev',\n    technicalSkills: 'React, Node.js, TypeScript',"
);

// 3. Update Inputs
const inputsToReplace = `                 <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">LinkedIn URL</label>
                    <input type="text" name="linkedin" value={resumeData.linkedin} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition" placeholder="linkedin.com/in/pawan" />
                 </div>
                 <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">Skills (comma separated)</label>`;

const newInputs = `                 <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">Address</label>
                    <input type="text" name="address" value={resumeData.address} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition" placeholder="e.g. New York, USA" />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">LinkedIn URL</label>
                        <input type="text" name="linkedin" value={resumeData.linkedin} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition" placeholder="linkedin.com/in/pawan" />
                     </div>
                     <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">Portfolio / Website</label>
                        <input type="text" name="portfolio" value={resumeData.portfolio} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition" placeholder="e.g. github.com/pawan" />
                     </div>
                 </div>
                 <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">Soft / Personal Skills</label>`;

code = code.replace(inputsToReplace, newInputs);

const technicalSkillInput = `                 <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">Technical Skills</label>
                    <input type="text" name="technicalSkills" value={resumeData.technicalSkills} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition" placeholder="React, Node.js, MongoDB" />
                 </div>
                 <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">Hobbies</label>`;

code = code.replace(
  /                 <div>\n\s*<label className="block text-xs font-medium text-gray-400 mb-1">Hobbies<\/label>/g,
  technicalSkillInput
);


// 4. Fix renderFresherBlue Contact
const fresherBlueContactOld = `<p className="flex flex-col"><span className="font-bold text-[10px] uppercase">Address</span>{data.linkedin || "New Delhi, India"}</p>`;
const fresherBlueContactNew = `<p className="flex flex-col"><span className="font-bold text-[10px] uppercase">Address</span>{data.address || "New Delhi, India"}</p>
               <p className="flex flex-col"><span className="font-bold text-[10px] uppercase">LinkedIn</span><span className="break-all">{data.linkedin || "linkedin.com/in/sahib"}</span></p>
               <p className="flex flex-col"><span className="font-bold text-[10px] uppercase">Portfolio</span><span className="break-all">{data.portfolio || "sahib.design"}</span></p>`;
code = code.replace(fresherBlueContactOld, fresherBlueContactNew);

// 5. Fix renderFresherBlue Skills
code = code.replace(
  /data\.skills\s*\?\s*data\.skills\.split\(\',\'\)\.slice\(0,\s*6\)/g,
  "data.skills ? data.skills.split(',')"
);
code = code.replace(
  /data\.skills\s*\?\s*data\.skills\.split\(\',\'\)\.slice\(6\)/g,
  "data.technicalSkills ? data.technicalSkills.split(',')"
);

// 6. Fix renderPMIntern
const pmInternOld = `<p className="flex items-center gap-2"><span>🏠</span> {data.linkedin || "456 Oak Street, San Francisco, United States"}</p>
            <p className="flex items-center gap-2"><span>✉</span> {data.email || "alexandraben145@gmail.com"}</p>`;
const pmInternNew = `<p className="flex items-center gap-2"><span>🏠</span> {data.address || "456 Oak Street, San Francisco"}</p>
            <p className="flex items-center gap-2"><span>✉</span> {data.email || "alexandraben145@gmail.com"}</p>
            <p className="flex items-center gap-2"><span>🔗</span> {data.linkedin || "linkedin.com/in/alex"}</p>
            <p className="flex items-center gap-2"><span>🌐</span> {data.portfolio || "alex.dev"}</p>`;
code = code.replace(pmInternOld, pmInternNew);

// 7. Fix renderStudentJob
const studentJobOld = `<p className="flex items-center gap-2">✉ {data.email || "example@mail.com"}</p>
               <p className="flex items-center gap-2">📍 {data.linkedin || "NY, USA"}</p>`;
const studentJobNew = `<p className="flex items-center gap-2">✉ {data.email || "example@mail.com"}</p>
               <p className="flex items-center gap-2">📍 {data.address || "NY, USA"}</p>
               <p className="flex items-center gap-2">🔗 {data.linkedin || "linkedin.com/in/student"}</p>
               <p className="flex items-center gap-2">🌐 {data.portfolio || "student.dev"}</p>`;
code = code.replace(studentJobOld, studentJobNew);


fs.writeFileSync('src/app/builder/page.tsx', code);
console.log("Updated fields successfully!");
