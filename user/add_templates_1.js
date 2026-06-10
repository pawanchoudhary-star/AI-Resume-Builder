const fs = require('fs');

const code = `
  const renderTeacherBlue = (data: any) => (
    <div className="bg-white w-[210mm] min-h-[297mm] shadow-2xl flex shrink-0 font-sans text-gray-800">
      {/* Left Column */}
      <div className="w-[30%] bg-gradient-to-b from-[#e0f2fe] to-[#bae6fd] p-6 flex flex-col items-center border-r-4 border-white shadow-[2px_0_10px_rgba(0,0,0,0.05)]">
        <div className="w-full space-y-3 text-[10px] mb-8 font-medium text-[#0369a1]">
          <p className="flex items-center gap-2"><span className="text-sm">📞</span> {data.phone || "+91 1234 567890"}</p>
          <p className="flex items-center gap-2"><span className="text-sm">📍</span> {data.address || "New Delhi, Delhi"}</p>
          <p className="flex items-center gap-2 break-all"><span className="text-sm">✉</span> {data.email || "s.batta@email.com"}</p>
          <p className="flex items-center gap-2 break-all"><span className="text-sm">🔗</span> {data.linkedin || "linkedin.com/in/saanvi-batta"}</p>
        </div>

        {/* Hexagon Photo wrapper */}
        <div className="relative w-40 h-44 mb-10 overflow-hidden" style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}>
           {data.photo ? <img src={data.photo} className="w-full h-full object-cover" alt="Profile" /> : <div className="w-full h-full bg-[#0284c7]"></div>}
        </div>

        <div className="w-full">
           <h3 className="text-[#0369a1] font-bold border-b-2 border-[#0284c7] pb-1 mb-4">Education</h3>
           <div className="mb-4">
              <p className="text-[#0284c7] font-bold text-xs">{data.eduYear || "2021-2023"}</p>
              <p className="font-bold text-sm">{data.degree || "B. Ed."}</p>
              <p className="text-xs">{data.school || "Loreto College, Kolkata"}</p>
           </div>
           {data.edu2Degree && (
             <div className="mb-4">
                <p className="text-[#0284c7] font-bold text-xs">{data.edu2Year || "2018-2021"}</p>
                <p className="font-bold text-sm">{data.edu2Degree || "B.A. English"}</p>
                <p className="text-xs">{data.edu2School || "Delhi University"}</p>
             </div>
           )}

           <h3 className="text-[#0369a1] font-bold border-b-2 border-[#0284c7] pb-1 mb-4 mt-8">Certifications</h3>
           <ul className="list-disc pl-4 text-xs space-y-2">
              {data.certifications ? data.certifications.split(',').map((c, i) => <li key={i}>{c.trim()}</li>) : (
                <><li>UGC NET</li><li>TET</li><li>First aid (IRCS)</li></>
              )}
           </ul>
        </div>
      </div>

      {/* Right Column */}
      <div className="w-[70%] p-8">
         <h1 className="text-4xl font-light text-[#0284c7] mb-1">{data.name || "Saanvi Batta"}</h1>
         <h2 className="text-sm font-bold text-gray-800 mb-6">{data.profession || data.role || "Certified Teacher"}</h2>
         
         <p className="text-xs text-gray-700 leading-relaxed mb-8">{data.summary || "Recent graduate with a B. Ed. eager to apply knowledge, skills, and passion for teaching in a full-time role. Practical experience in classroom management, lesson planning, and assessment."}</p>

         <h3 className="text-[#0369a1] font-bold border-b border-[#0369a1] pb-1 mb-4">Teaching Experience</h3>
         
         <div className="mb-6">
            <p className="text-[#0284c7] font-bold text-[10px]">{data.expDuration || "December 2021 - Present"}</p>
            <p className="font-bold text-sm">{data.role || "Volunteer Teacher"}</p>
            <p className="text-xs text-gray-600 mb-2">{data.company || "Delhi Senior Care Center"}</p>
            <p className="text-xs text-gray-700 whitespace-pre-line leading-relaxed pl-3 border-l-2 border-[#bae6fd]">
              {data.expDescription || "• Teach adult learners how to read and write in one-on-one and group settings.\\n• Develop and implement lesson plans."}
            </p>
         </div>

         {data.exp2Role && (
           <div className="mb-6">
              <p className="text-[#0284c7] font-bold text-[10px]">{data.exp2Duration}</p>
              <p className="font-bold text-sm">{data.exp2Role}</p>
              <p className="text-xs text-gray-600 mb-2">{data.exp2Company}</p>
              <p className="text-xs text-gray-700 whitespace-pre-line leading-relaxed pl-3 border-l-2 border-[#bae6fd]">{data.exp2Description}</p>
           </div>
         )}
         {data.exp3Role && (
           <div className="mb-6">
              <p className="text-[#0284c7] font-bold text-[10px]">{data.exp3Duration}</p>
              <p className="font-bold text-sm">{data.exp3Role}</p>
              <p className="text-xs text-gray-600 mb-2">{data.exp3Company}</p>
              <p className="text-xs text-gray-700 whitespace-pre-line leading-relaxed pl-3 border-l-2 border-[#bae6fd]">{data.exp3Description}</p>
           </div>
         )}

         <h3 className="text-[#0369a1] font-bold border-b border-[#0369a1] pb-1 mb-4">Teaching Skills</h3>
         <ul className="text-xs text-gray-700 space-y-2 list-disc pl-4">
            {data.technicalSkills ? data.technicalSkills.split(',').map((s, i) => <li key={i}><strong>{s.split(':')[0]}</strong>{s.includes(':') ? ':' + s.split(':')[1] : ''}</li>) : (
               <>
                 <li><strong>Classroom management:</strong> Ability to create and enforce consistent rules and routines.</li>
                 <li><strong>Lesson planning:</strong> Develop well-organised, engaging, and effective lesson plans.</li>
                 <li><strong>Technology integration:</strong> Knowledge of and ability to use a variety of technology tools.</li>
               </>
            )}
         </ul>
      </div>
    </div>
  );

  const renderAdsExpert = (data: any) => (
    <div className="bg-white w-[210mm] min-h-[297mm] shadow-2xl flex shrink-0 font-sans text-gray-800">
       <div className="w-[35%] bg-[#1f1f1f] text-white p-8 flex flex-col relative">
          <div className="absolute top-0 right-0 w-2 h-full bg-gray-300"></div>
          
          <div className="w-40 h-48 bg-white rounded-2xl p-2 mb-6 mx-auto relative z-10 border-2 border-[#eab308]">
             {data.photo ? <img src={data.photo} className="w-full h-full object-cover rounded-xl" alt="Profile" /> : <div className="w-full h-full bg-gray-300 rounded-xl"></div>}
          </div>
          <div className="bg-[#eab308] text-black font-bold text-center py-2 mb-10 mx-[-2rem] uppercase tracking-widest relative z-10">
             {data.profession || data.role || "Google Ads"}
          </div>

          <h3 className="font-bold tracking-widest mb-4">EDUCATION</h3>
          <div className="mb-4">
             <p className="text-xs font-bold">{data.degree || "B.COM MARKETING"}</p>
             <p className="text-[10px] text-gray-400">{data.school || "Bharata mata college, kakkanad"}</p>
             <p className="text-[10px] text-gray-400">{data.eduYear || "MAR 2022"}</p>
          </div>
          {data.edu2Degree && (
             <div className="mb-4">
                <p className="text-xs font-bold">{data.edu2Degree}</p>
                <p className="text-[10px] text-gray-400">{data.edu2School}</p>
                <p className="text-[10px] text-gray-400">{data.edu2Year}</p>
             </div>
          )}

          <h3 className="font-bold tracking-widest mt-6 mb-4">PERSONAL SKILLS</h3>
          <ul className="text-[10px] space-y-1 mb-8 text-gray-300">
             {data.skills ? data.skills.split(',').map((s, i) => <li key={i}>{s.trim().toUpperCase()}</li>) : (
                <><li>GOOD COMMUNICATION SKILL</li><li>ORGANIZATION SKILL</li><li>TIME MANAGMENT</li><li>ANALYTICAL SKILLS</li></>
             )}
          </ul>

          <div className="bg-gray-200 text-black font-bold py-2 px-4 mb-4 mx-[-2rem] uppercase tracking-widest">
             EXPERTISE
          </div>
          <div className="space-y-4">
             {data.technicalSkills ? data.technicalSkills.split(',').map((s, i) => (
                <div key={i}>
                   <p className="text-[10px] mb-1">{s.trim()}</p>
                   <div className="w-full bg-gray-600 h-1"><div className="bg-[#eab308] h-1" style={{ width: Math.floor(Math.random() * 40 + 60) + '%' }}></div></div>
                </div>
             )) : (
                <>
                   <div><p className="text-[10px] mb-1">Google ads</p><div className="w-full bg-gray-600 h-1"><div className="bg-[#eab308] h-1 w-[90%]"></div></div></div>
                   <div><p className="text-[10px] mb-1">Content creation</p><div className="w-full bg-gray-600 h-1"><div className="bg-[#eab308] h-1 w-[80%]"></div></div></div>
                   <div><p className="text-[10px] mb-1">Premier pro</p><div className="w-full bg-gray-600 h-1"><div className="bg-[#eab308] h-1 w-[70%]"></div></div></div>
                </>
             )}
          </div>
       </div>

       <div className="w-[65%] p-8 pt-12 relative border-l-4 border-[#eab308]">
          <h1 className="text-5xl font-light tracking-widest uppercase mb-2">{data.name || "NIHAL K E"}</h1>
          <div className="bg-[#eab308] inline-block px-2 py-1 font-bold text-xs tracking-widest mb-6">
             {data.profession || data.role || "GOOGLE ADS EXPERT"}
          </div>

          <h3 className="font-bold tracking-widest text-gray-800 mb-2 mt-4">PROFILE</h3>
          <div className="bg-gray-100 p-4 text-[10px] text-gray-600 leading-relaxed mb-8 border-t border-gray-300">
             {data.summary || "With over 1.5 years of experience in digital marketing, content creation, and product photography. I am a highly capable freelance digital marketing agent..."}
          </div>

          <h3 className="font-bold tracking-widest text-gray-800 mb-4">WORK EXPERIENCE</h3>
          <div className="w-8 h-1 bg-[#eab308] mb-4"></div>
          
          <div className="mb-6">
             <p className="font-bold text-sm tracking-wide uppercase">{data.role || "GOOGLE ADS INTERN"}</p>
             <p className="text-[10px] text-gray-500 mb-2"><span className="bg-[#eab308] text-black px-1 mr-2">{data.expDuration || "Present"}</span> {data.company || "HARIS AND CO / CALICUT"}</p>
             <p className="text-xs text-gray-700 whitespace-pre-line">{data.expDescription || "Optimize Ads, Boost ROI"}</p>
          </div>
          
          {data.exp2Role && (
             <div className="mb-6">
                <p className="font-bold text-sm tracking-wide uppercase">{data.exp2Role}</p>
                <p className="text-[10px] text-gray-500 mb-2"><span className="bg-[#eab308] text-black px-1 mr-2">{data.exp2Duration}</span> {data.exp2Company}</p>
                <p className="text-xs text-gray-700 whitespace-pre-line">{data.exp2Description}</p>
             </div>
          )}

          <h3 className="font-bold tracking-widest text-gray-800 mb-4 mt-8">REFERENCE</h3>
          <div className="w-8 h-1 bg-[#eab308] mb-4"></div>
          <div className="text-[10px] text-gray-700 whitespace-pre-line mb-8">
             {data.references || "Maninath R\\nHOD Marketing Dept.\\n+91 9048347726"}
          </div>

          <div className="absolute bottom-8 left-0 w-full px-8">
             <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 text-xs"><div className="w-8 h-8 bg-[#eab308] flex items-center justify-center text-lg">📞</div> {data.phone || "+91 7907815281"}</div>
                <div className="flex items-center gap-4 text-xs"><div className="w-8 h-8 bg-[#eab308] flex items-center justify-center text-lg">✉</div> {data.email || "nihalke.media@gmail.com"}</div>
                <div className="flex items-center gap-4 text-xs"><div className="w-8 h-8 bg-[#eab308] flex items-center justify-center text-lg">📍</div> {data.address || "Malappuram"}</div>
             </div>
          </div>
       </div>
    </div>
  );
`;

let content = fs.readFileSync('src/app/builder/page.tsx', 'utf8');
content = content.replace('const renderModernYellow =', code + '\n  const renderModernYellow =');

// update templates array
content = content.replace(
  /];\s*const experienceOptions/,
  `  { id: 'teacher-blue', name: 'Certified Teacher', desc: 'Light blue hexagon design' },
    { id: 'ads-expert', name: 'Google Ads Expert', desc: 'Black and yellow contrast layout' },
  ];\n  const experienceOptions`
);

// update switch
content = content.replace(
  /\{selectedTemplate === 'modern-yellow' && renderModernYellow\(resumeData\)\}/,
  `{selectedTemplate === 'teacher-blue' && renderTeacherBlue(resumeData)}
                    {selectedTemplate === 'ads-expert' && renderAdsExpert(resumeData)}
                    {selectedTemplate === 'modern-yellow' && renderModernYellow(resumeData)}`
);

fs.writeFileSync('src/app/builder/page.tsx', content);
console.log('Batch 1 added!');
