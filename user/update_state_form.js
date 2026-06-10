const fs = require('fs');
let code = fs.readFileSync('src/app/builder/page.tsx', 'utf8');

// 1. Update useState
code = code.replace(
  /technicalSkills: '',/g,
  "technicalSkills: '',\n    certifications: '',\n    references: '',\n    languages: '',\n    achievements: '',\n    exp2Role: '', exp2Company: '', exp2Duration: '', exp2Description: '',\n    exp3Role: '', exp3Company: '', exp3Duration: '', exp3Description: '',\n    edu2Degree: '', edu2School: '', edu2Year: '',"
);

// 2. Update dummyData
code = code.replace(
  /technicalSkills: 'React, Node.js, TypeScript',/g,
  "technicalSkills: 'React, Node.js, TypeScript',\n    certifications: 'AWS Certified Solutions Architect, Google Analytics Certification',\n    references: 'Sarah Smith, Director at Tech Inc. | +1 234 567 8900',\n    languages: 'English (Native), Spanish (Fluent), French (Basic)',\n    achievements: 'Employee of the Year 2022\\nLed a team that increased sales by 40%',\n    exp2Role: 'Product Manager',\n    exp2Company: 'Innovatech LLC',\n    exp2Duration: '2018 - 2021',\n    exp2Description: 'Managed product lifecycle from concept to launch.\\nCollaborated with cross-functional teams.',\n    exp3Role: 'Junior Analyst',\n    exp3Company: 'DataCorp',\n    exp3Duration: '2016 - 2018',\n    exp3Description: 'Analyzed user metrics and generated reports.',\n    edu2Degree: 'High School Diploma',\n    edu2School: 'Springfield High',\n    edu2Year: '2012 - 2016',"
);

// 3. Add to Form
const additionalFormSection = `              {/* Extra Sections */}
              <section className="space-y-4 pt-6 border-t border-white/10">
                 <h3 className="text-lg font-semibold text-pink-400 border-b border-white/10 pb-2">Certifications & Awards</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">Certifications</label>
                        <textarea name="certifications" value={resumeData.certifications} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition h-20" placeholder="AWS Certified, PMP, etc."></textarea>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">Achievements / Awards</label>
                        <textarea name="achievements" value={resumeData.achievements} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition h-20" placeholder="Employee of the Year 2023"></textarea>
                    </div>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">Languages</label>
                        <input type="text" name="languages" value={resumeData.languages} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition" placeholder="English, Hindi, Spanish" />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">References</label>
                        <textarea name="references" value={resumeData.references} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition h-20" placeholder="John Doe - Manager - +1 234 567 8900"></textarea>
                    </div>
                 </div>
              </section>

              <section className="space-y-4 pt-6 border-t border-white/10">
                 <h3 className="text-lg font-semibold text-orange-400 border-b border-white/10 pb-2">Additional Experience & Education</h3>
                 <div className="p-4 bg-white/5 rounded-lg space-y-4">
                    <h4 className="text-sm font-bold text-gray-300">Experience 2</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div><label className="block text-xs font-medium text-gray-400 mb-1">Job Title</label><input type="text" name="exp2Role" value={resumeData.exp2Role} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition" /></div>
                       <div><label className="block text-xs font-medium text-gray-400 mb-1">Company</label><input type="text" name="exp2Company" value={resumeData.exp2Company} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition" /></div>
                       <div className="md:col-span-2"><label className="block text-xs font-medium text-gray-400 mb-1">Duration</label><input type="text" name="exp2Duration" value={resumeData.exp2Duration} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition" /></div>
                       <div className="md:col-span-2"><label className="block text-xs font-medium text-gray-400 mb-1">Description</label><textarea name="exp2Description" value={resumeData.exp2Description} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition h-20"></textarea></div>
                    </div>
                 </div>
                 
                 <div className="p-4 bg-white/5 rounded-lg space-y-4">
                    <h4 className="text-sm font-bold text-gray-300">Experience 3</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div><label className="block text-xs font-medium text-gray-400 mb-1">Job Title</label><input type="text" name="exp3Role" value={resumeData.exp3Role} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition" /></div>
                       <div><label className="block text-xs font-medium text-gray-400 mb-1">Company</label><input type="text" name="exp3Company" value={resumeData.exp3Company} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition" /></div>
                       <div className="md:col-span-2"><label className="block text-xs font-medium text-gray-400 mb-1">Duration</label><input type="text" name="exp3Duration" value={resumeData.exp3Duration} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition" /></div>
                       <div className="md:col-span-2"><label className="block text-xs font-medium text-gray-400 mb-1">Description</label><textarea name="exp3Description" value={resumeData.exp3Description} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition h-20"></textarea></div>
                    </div>
                 </div>

                 <div className="p-4 bg-white/5 rounded-lg space-y-4">
                    <h4 className="text-sm font-bold text-gray-300">Education 2</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div><label className="block text-xs font-medium text-gray-400 mb-1">Degree</label><input type="text" name="edu2Degree" value={resumeData.edu2Degree} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition" /></div>
                       <div><label className="block text-xs font-medium text-gray-400 mb-1">School</label><input type="text" name="edu2School" value={resumeData.edu2School} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition" /></div>
                       <div className="md:col-span-2"><label className="block text-xs font-medium text-gray-400 mb-1">Year</label><input type="text" name="edu2Year" value={resumeData.edu2Year} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition" /></div>
                    </div>
                 </div>
              </section>

              {/* Action Buttons */}`;

code = code.replace(
  /              \{\/\* Action Buttons \*\/}/g,
  additionalFormSection
);

fs.writeFileSync('src/app/builder/page.tsx', code);
console.log("Updated state and form successfully!");
