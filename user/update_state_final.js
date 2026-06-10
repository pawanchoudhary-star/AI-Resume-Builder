const fs = require('fs');
let code = fs.readFileSync('src/app/builder/page.tsx', 'utf8');

// Update state and dummyData using regex targeting exp3
code = code.replace(
  /exp3Role: '', exp3Company: '', exp3Duration: '', exp3Description: '',/,
  "exp3Role: '', exp3Company: '', exp3Duration: '', exp3Description: '',\n    exp4Role: '', exp4Company: '', exp4Duration: '', exp4Description: '',\n    volunteerRole: '', volunteerCompany: '', volunteerDuration: '', volunteerDescription: '',\n    interests: '',"
);

code = code.replace(
  /exp3Role: 'Junior Analyst',([\s\S]*?)exp3Description: 'Analyzed user metrics and generated reports.',/,
  "exp3Role: 'Junior Analyst',$1exp3Description: 'Analyzed user metrics and generated reports.',\n    exp4Role: 'Intern',\n    exp4Company: 'Tech Start',\n    exp4Duration: '2015 - 2016',\n    exp4Description: 'Assisted in basic design and development.',\n    volunteerRole: 'Soup Kitchen Volunteer',\n    volunteerCompany: 'Care Connection',\n    volunteerDuration: 'Dec 2023 - Present',\n    volunteerDescription: 'Prepared food and provided emotional support.',\n    interests: 'Travel, Photography, Music, Reading, Outdoor',"
);

// Add to the form right after the exp3 block
const additionalFormElements = `
                 <div className="p-4 bg-white/5 rounded-lg space-y-4">
                    <h4 className="text-sm font-bold text-gray-300">Experience 4</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div><label className="block text-xs font-medium text-gray-400 mb-1">Job Title</label><input type="text" name="exp4Role" value={resumeData.exp4Role} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition" /></div>
                       <div><label className="block text-xs font-medium text-gray-400 mb-1">Company</label><input type="text" name="exp4Company" value={resumeData.exp4Company} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition" /></div>
                       <div className="md:col-span-2"><label className="block text-xs font-medium text-gray-400 mb-1">Duration</label><input type="text" name="exp4Duration" value={resumeData.exp4Duration} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition" /></div>
                       <div className="md:col-span-2"><label className="block text-xs font-medium text-gray-400 mb-1">Description</label><textarea name="exp4Description" value={resumeData.exp4Description} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition h-20"></textarea></div>
                    </div>
                 </div>

                 <div className="p-4 bg-white/5 rounded-lg space-y-4">
                    <h4 className="text-sm font-bold text-gray-300">Volunteer Experience</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div><label className="block text-xs font-medium text-gray-400 mb-1">Role</label><input type="text" name="volunteerRole" value={resumeData.volunteerRole} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition" /></div>
                       <div><label className="block text-xs font-medium text-gray-400 mb-1">Organization</label><input type="text" name="volunteerCompany" value={resumeData.volunteerCompany} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition" /></div>
                       <div className="md:col-span-2"><label className="block text-xs font-medium text-gray-400 mb-1">Duration</label><input type="text" name="volunteerDuration" value={resumeData.volunteerDuration} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition" /></div>
                       <div className="md:col-span-2"><label className="block text-xs font-medium text-gray-400 mb-1">Description</label><textarea name="volunteerDescription" value={resumeData.volunteerDescription} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition h-20"></textarea></div>
                    </div>
                 </div>

                 <div className="p-4 bg-white/5 rounded-lg space-y-4">
                    <h4 className="text-sm font-bold text-gray-300">Interests</h4>
                    <div><label className="block text-xs font-medium text-gray-400 mb-1">Interests (comma separated)</label><input type="text" name="interests" value={resumeData.interests} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition" placeholder="Reading, Coding, Traveling" /></div>
                 </div>
`;

code = code.replace(
  /<h4 className="text-sm font-bold text-gray-300">Education 2<\/h4>/,
  additionalFormElements + '\n                 <h4 className="text-sm font-bold text-gray-300">Education 2</h4>'
);

fs.writeFileSync('src/app/builder/page.tsx', code);
console.log('State and form updated successfully!');
