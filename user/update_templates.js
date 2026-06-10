const fs = require('fs');

let content = fs.readFileSync('src/app/builder/page.tsx', 'utf8');

// Fix the templates array duplication
content = content.replace(
\`    { id: 'student-job', name: 'Student Job', desc: 'Tan diagonal elements, clear layout' },
    { id: 'student-job', name: 'Student Job', desc: 'Tan diagonal elements, clear layout' },
  ];\`,
\`    { id: 'student-job', name: 'Student Job', desc: 'Tan diagonal elements, clear layout' },
  ];\`
);

// Define the components
const renderFresherBlue = \`
  const renderFresherBlue = (data: any) => (
    <div className="bg-[#e2e8f0] text-[#1e293b] w-[210mm] min-h-[297mm] shadow-2xl flex shrink-0 font-sans relative">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
         <div className="absolute top-0 left-0 w-[110%] h-[35%] bg-[#8ba0b5] -skew-y-[10deg] origin-top-left -mt-10"></div>
         <div className="absolute bottom-0 left-0 w-[40%] h-[30%] bg-[#334b61] skew-y-[35deg] origin-bottom-left -ml-20"></div>
      </div>
      <div className="w-[35%] p-8 pt-64 relative z-10 flex flex-col border-r-2 border-[#1e293b] ml-4">
         <div className="mb-8">
            <h2 className="text-[#1e293b] font-bold text-lg border-b border-[#1e293b] pb-1 mb-4 flex items-center gap-2"><span className="text-xl">📱</span> Contact</h2>
            <div className="text-xs space-y-3 font-medium">
               <p className="flex flex-col"><span className="font-bold text-[10px] uppercase">Phone</span>{data.phone || "+91 8954400000"}</p>
               <p className="flex flex-col"><span className="font-bold text-[10px] uppercase">Email</span><span className="break-all">{data.email || "24billions@mail.com"}</span></p>
               <p className="flex flex-col"><span className="font-bold text-[10px] uppercase">Address</span>{data.linkedin || "New Delhi, India"}</p>
            </div>
         </div>
         <div className="mb-8">
            <h2 className="text-[#1e293b] font-bold text-lg border-b border-[#1e293b] pb-1 mb-4 flex items-center gap-2"><span className="text-xl">👥</span> Personal Skills</h2>
            <ul className="list-disc pl-4 text-xs font-medium space-y-1">
               {data.skills ? data.skills.split(',').slice(0, 6).map((s:string, i:number) => <li key={i}>{s.trim()}</li>) : (
                  <><li>Communication Skills</li><li>Teamwork</li><li>Adaptability</li><li>Problem Solving</li><li>Time Management</li></>
               )}
            </ul>
         </div>
         <div>
            <h2 className="text-[#1e293b] font-bold text-lg border-b border-[#1e293b] pb-1 mb-4 flex items-center gap-2"><span className="text-xl">🗣</span> Language</h2>
            <ul className="list-disc pl-4 text-xs font-medium space-y-1">
               <li>English</li><li>Hindi</li>
            </ul>
         </div>
      </div>
      <div className="w-[65%] p-8 pt-16 relative z-10">
         <div className="flex justify-between items-start mb-24">
            <div className="pt-8">
               <h1 className="text-4xl font-bold text-[#1e293b] tracking-wider uppercase">{data.name || "SAHIB KHAN"}</h1>
               <p className="text-sm font-medium text-[#1e293b] tracking-widest">{data.role || "Graphic Designer"}</p>
            </div>
            <div className="w-36 h-36 rounded-full border-[6px] border-[#1e293b] bg-gray-200 overflow-hidden shadow-xl -mt-4">
               {data.photo ? <img src={data.photo} className="w-full h-full object-cover" alt="Profile" /> : null}
            </div>
         </div>
         
         <div className="mb-8">
            <h2 className="text-[#1e293b] font-bold text-lg mb-3 flex items-center gap-2"><span className="text-xl">💼</span> Career Objective</h2>
            <p className="text-xs text-gray-800 leading-relaxed font-medium">{data.summary || "Enthusiastic individual eager to start a promising career. Looking for an entry-level position to contribute positively to a team and gain valuable experience."}</p>
         </div>

         <div className="mb-8">
            <h2 className="text-[#1e293b] font-bold text-lg mb-4 flex items-center gap-2"><span className="text-xl">📚</span> Education</h2>
            <div className="mb-4">
               <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-xs">{data.degree || "Bachelor of Technology in Computer Science"}</h3>
                  <span className="text-xs font-bold text-gray-700">{data.eduYear || "May 2022"}</span>
               </div>
               <p className="text-[10px] text-gray-600 font-medium">{data.school || "Sunshine Engineering College, Mumbai, Maharashtra"}</p>
            </div>
         </div>

         <div className="mb-8">
            <h2 className="text-[#1e293b] font-bold text-lg mb-4 flex items-center gap-2"><span className="text-xl">💻</span> Technical Skills</h2>
            <ul className="list-disc pl-4 text-xs font-medium space-y-1">
               {data.skills ? data.skills.split(',').slice(6).map((s:string, i:number) => <li key={i}>{s.trim()}</li>) : (
                  <><li>Computer Skills</li><li>Internet Browsing</li><li>Email Communication</li><li>File Management</li></>
               )}
            </ul>
         </div>

         <div>
            <h2 className="text-[#1e293b] font-bold text-lg mb-3 flex items-center gap-2"><span className="text-xl">🎯</span> HOBBIES</h2>
            <ul className="list-disc pl-4 text-xs font-medium space-y-1">
               {data.hobbies ? data.hobbies.split(',').map((s:string, i:number) => <li key={i}>{s.trim()}</li>) : (
                  <><li>Reading Books</li><li>Sports and Fitness</li><li>Music</li><li>Cooking</li></>
               )}
            </ul>
         </div>
      </div>
    </div>
  );
\`;

const renderPMIntern = \`
  const renderPMIntern = (data: any) => (
    <div className="bg-white text-[#1a202c] w-[210mm] min-h-[297mm] shadow-2xl flex flex-col shrink-0 font-sans">
      <div className="bg-[#1a2b38] text-white flex px-10 py-8 relative mt-4">
         <div className="w-40 h-40 rounded-full border-[8px] border-white bg-gray-200 overflow-hidden absolute -top-4 shadow-xl z-10">
            {data.photo ? <img src={data.photo} className="w-full h-full object-cover" alt="Profile" /> : null}
         </div>
         <div className="ml-48">
            <h1 className="text-4xl font-bold uppercase tracking-wider mb-2">{data.name || "ALEXANDRA BENNETT"}</h1>
            <p className="text-sm text-gray-300 uppercase tracking-widest">{data.role || "PROJECT MANAGER INTERN"}</p>
         </div>
      </div>
      
      <div className="flex bg-[#dce1e6] px-10 py-6 gap-8 text-xs font-medium">
         <div className="w-1/2 space-y-2">
            <p className="flex items-center gap-2"><span>📱</span> {data.phone || "(123)456-6523"}</p>
            <p className="flex items-center gap-2"><span>🏠</span> {data.linkedin || "456 Oak Street, San Francisco, United States"}</p>
            <p className="flex items-center gap-2"><span>✉</span> {data.email || "alexandraben145@gmail.com"}</p>
         </div>
         <div className="w-1/2">
            <h2 className="text-sm font-bold text-[#1a2b38] uppercase mb-2">PROFESSIONAL SUMMARY</h2>
            <p className="text-gray-700 leading-relaxed text-[11px]">{data.summary || "Goal-oriented college student with strong organizational and leadership skills seeking opportunities to gain hands-on experience in project management. Eager to apply academic knowledge and contribute to successful project outcomes."}</p>
         </div>
      </div>

      <div className="flex flex-1 gap-0">
         <div className="w-[40%] bg-[#9da8b3] p-8 text-gray-900">
            <h2 className="text-lg font-bold text-[#1a2b38] uppercase mb-6">SKILLS</h2>
            <div className="space-y-4 text-xs font-bold">
               {data.skills ? data.skills.split(',').map((s:string, i:number) => (
                  <div key={i}>
                     <p className="mb-1">{s.trim()}</p>
                     <div className="w-full h-1 bg-white/50"><div className="h-full bg-[#1a2b38]" style={{width: Math.floor(Math.random() * 40 + 60) + "%"}}></div></div>
                  </div>
               )) : (
                  <>
                     <div><p className="mb-1">Project Planning</p><div className="w-full h-1 bg-white/50"><div className="w-[100%] h-full bg-[#1a2b38]"></div></div></div>
                     <div><p className="mb-1">Communication Skills</p><div className="w-full h-1 bg-white/50"><div className="w-[90%] h-full bg-[#1a2b38]"></div></div></div>
                     <div><p className="mb-1">Research & Analysis</p><div className="w-full h-1 bg-white/50"><div className="w-[70%] h-full bg-[#1a2b38]"></div></div></div>
                  </>
               )}
            </div>

            <h2 className="text-lg font-bold text-[#1a2b38] uppercase mt-10 mb-4">LANGUAGES</h2>
            <div className="space-y-4 text-xs font-bold">
               <div><p className="mb-1">English</p><div className="w-full h-1 bg-white/50"><div className="w-[100%] h-full bg-[#1a2b38]"></div></div></div>
            </div>

            <h2 className="text-lg font-bold text-[#1a2b38] uppercase mt-10 mb-4">HOBBIES</h2>
            <div className="text-xs font-medium text-white grid grid-cols-2 gap-2">
               {data.hobbies ? data.hobbies.split(',').map((s:string, i:number) => <span key={i}>{i+1}. {s.trim()}</span>) : (
                  <><span>1. Running</span><span>2. Cooking</span><span>3. Reading</span></>
               )}
            </div>
         </div>
         
         <div className="w-[60%] bg-[#eaedf0] p-8">
            <h2 className="text-xl font-bold text-[#1a2b38] uppercase mb-6">PROJECTS</h2>
            <div className="mb-8">
               <h3 className="font-bold text-sm uppercase text-[#1a2b38] mb-1">{data.role || "PROJECT MANAGER INTERN"}</h3>
               <p className="text-xs font-bold text-gray-500 mb-4 uppercase">{data.company || "NEXTGEN TECH SOLUTIONS"} / {data.expDuration || "11/2022 - PRESENT"}</p>
               <div className="text-xs font-medium text-gray-700 leading-relaxed whitespace-pre-line">
                  {data.expDescription || "• Led a team of classmates in planning and organizing a charity fundraising event.\\n• Developed project timelines, allocated tasks, and monitored progress.\\n• Coordinated with vendors, sponsors, and volunteers."}
               </div>
            </div>

            <h2 className="text-xl font-bold text-[#1a2b38] uppercase mb-6">EDUCATIONAL HISTORY</h2>
            <div>
               <h3 className="font-bold text-sm uppercase text-[#1a2b38] mb-1">{data.school || "UNIVERSITY OF CALIFORNIA"}</h3>
               <p className="text-xs font-bold text-gray-600 mb-2 uppercase">{data.degree || "BACHELOR OF BUSINESS ADMINISTRATION"}, CLASS OF {data.eduYear || "PRESENT"}</p>
            </div>
         </div>
      </div>
    </div>
  );
\`;

const renderStudentJob = \`
  const renderStudentJob = (data: any) => (
    <div className="bg-white text-black w-[210mm] min-h-[297mm] shadow-2xl flex flex-col shrink-0 font-sans relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[80%] h-[35%] bg-[#eaddcf] origin-top-left -skew-y-12 translate-y-[-20%] z-0"></div>
      <div className="absolute bottom-0 left-0 w-[50%] h-[20%] bg-[#eaddcf] origin-bottom-right skew-y-12 translate-y-[50%] z-0"></div>

      <div className="relative z-10 pt-16 px-16 flex justify-between items-center mb-8">
         <div className="w-48 h-48 rounded-full border-8 border-white bg-gray-200 overflow-hidden shadow-xl mx-auto flex-shrink-0">
            {data.photo ? <img src={data.photo} className="w-full h-full object-cover" alt="Profile" /> : null}
         </div>
         <div className="flex-1 ml-10">
            <h1 className="text-5xl font-bold text-black mb-2">{data.name?.split(' ')[0] || "Name"} <span className="font-normal">{data.name?.split(' ').slice(1).join(' ') || "Surname"}</span></h1>
            <p className="text-xl tracking-[0.3em] uppercase text-gray-700">{data.role || "Student Job"}</p>
         </div>
      </div>

      <div className="relative z-10 px-16 flex gap-12 mt-4">
         <div className="w-[35%]">
            <p className="text-xs font-medium text-gray-800 leading-relaxed mb-10">{data.summary || "Cordial and fashion-forward saleswoman with 2 years of experience working in retail clothing stores. Experienced in accounting and inventory creation."}</p>
            
            <h2 className="text-sm font-bold uppercase mb-4">SKILLS</h2>
            <ul className="list-disc pl-4 text-xs font-bold text-gray-800 space-y-2 mb-10">
               {data.skills ? data.skills.split(',').map((s:string, i:number) => <li key={i}>{s.trim()}</li>) : (
                  <><li>Teamwork</li><li>Customer service</li><li>Communication</li><li>Organisation</li><li>Excel</li></>
               )}
            </ul>

            <h2 className="text-sm font-bold uppercase mb-4">LANGUAGES</h2>
            <div className="space-y-3 text-xs font-bold text-gray-800 mb-10">
               <div className="flex justify-between items-center"><span className="w-16">English</span><div className="h-2 w-24 bg-[#eaddcf] rounded-full"></div></div>
               <div className="flex justify-between items-center"><span className="w-16">Spanish</span><div className="h-2 w-20 bg-[#eaddcf] rounded-full"></div></div>
               <div className="flex justify-between items-center"><span className="w-16">French</span><div className="h-2 w-12 bg-[#eaddcf] rounded-full"></div></div>
            </div>

            <h2 className="text-sm font-bold uppercase mb-4">INTERESTS</h2>
            <ul className="list-disc pl-4 text-xs font-bold text-gray-800 space-y-2">
               {data.hobbies ? data.hobbies.split(',').map((s:string, i:number) => <li key={i}>{s.trim()}</li>) : (
                  <><li>Swimming</li><li>Climbing</li><li>Reading</li><li>Travel</li></>
               )}
            </ul>
         </div>

         <div className="w-[65%]">
            <div className="flex flex-col items-end text-xs font-bold text-gray-800 space-y-2 mb-10">
               <p className="flex items-center gap-2">📞 {data.phone || "+1 315 000 00 00"}</p>
               <p className="flex items-center gap-2">✉ {data.email || "example@mail.com"}</p>
               <p className="flex items-center gap-2">📍 {data.linkedin || "NY, USA"}</p>
            </div>

            <h2 className="text-sm font-bold uppercase mb-6">EDUCATION</h2>
            <div className="mb-8">
               <h3 className="font-bold text-sm uppercase mb-1">{data.degree || "CUSTOMER SERVICE TRAINING"} | {data.school || "BROOKLYN COLLEGE"}</h3>
               <p className="text-xs text-gray-500 mb-2">{data.eduYear || "20XX (Brooklyn, NY)"}</p>
               <p className="text-xs font-medium text-gray-800">Intensive course in cashiering, restocking and customer service for the retail sector.</p>
            </div>

            <h2 className="text-sm font-bold uppercase mb-6">EXPERIENCE</h2>
            <div className="mb-6">
               <h3 className="font-bold text-sm mb-1">{data.role || "Cashier part-time"} | {data.company || "Zara"}</h3>
               <p className="text-xs text-gray-500 mb-2">{data.expDuration || "20XX (Brooklyn, NY)"}</p>
               <p className="text-xs font-medium text-gray-800 whitespace-pre-line">{data.expDescription || "In charge of opening, counting, and closing the cash register alongside dealing with clients."}</p>
            </div>
         </div>
      </div>
    </div>
  );
\`;

// Insert the components
content = content.replace(
  \`  const renderModernYellow = (data: any) => (\`,
  renderFresherBlue + "\\n" + renderPMIntern + "\\n" + renderStudentJob + "\\n\\n  const renderModernYellow = (data: any) => ("
);

// Update switch cases
content = content.replace(
  \`                          {t.id === 'green-corporate' && renderGreenCorporate(dummyData)}\`,
  \`                          {t.id === 'green-corporate' && renderGreenCorporate(dummyData)}
                          {t.id === 'fresher-blue' && renderFresherBlue(dummyData)}
                          {t.id === 'pm-intern' && renderPMIntern(dummyData)}
                          {t.id === 'student-job' && renderStudentJob(dummyData)}\`
);

content = content.replace(
  \`                    {selectedTemplate === 'green-corporate' && renderGreenCorporate(resumeData)}\`,
  \`                    {selectedTemplate === 'green-corporate' && renderGreenCorporate(resumeData)}
                    {selectedTemplate === 'fresher-blue' && renderFresherBlue(resumeData)}
                    {selectedTemplate === 'pm-intern' && renderPMIntern(resumeData)}
                    {selectedTemplate === 'student-job' && renderStudentJob(resumeData)}\`
);

fs.writeFileSync('src/app/builder/page.tsx', content);
console.log('Templates added successfully.');
