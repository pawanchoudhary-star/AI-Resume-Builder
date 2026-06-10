const fs = require('fs');

const code = `
  const renderGreyElegant = (data: any) => (
    <div className="bg-[#e4e4e4] w-[210mm] min-h-[297mm] shadow-2xl shrink-0 font-sans text-gray-800 p-8 flex justify-center items-center">
       <div className="bg-[#fcfcfc] w-full h-full shadow-md flex p-8 relative">
          
          {/* Left Sidebar */}
          <div className="w-[35%] pr-6 border-r border-gray-300 flex flex-col">
             <div className="w-full bg-[#dfdfdf] rounded-t-3xl rounded-b-[40px] p-2 mb-8 mt-2 h-56 flex items-center justify-center overflow-hidden">
                {data.photo ? <img src={data.photo} className="w-full h-full object-cover rounded-t-2xl rounded-b-[30px]" alt="Profile" /> : <div className="w-full h-full bg-gray-400 rounded-t-2xl rounded-b-[30px]"></div>}
             </div>

             <h2 className="text-sm font-bold tracking-widest uppercase mb-4 text-[#2b2b2b] flex items-center justify-between">CONTACT <span className="flex-1 border-b border-[#2b2b2b] ml-4"></span></h2>
             <div className="space-y-4 text-[9px] font-medium text-gray-500 mb-10">
                <div className="flex items-start gap-3"><span className="text-[#2b2b2b] text-xs">✉</span> <span className="break-all">{data.email || "hello@yourwebsite.com"}</span></div>
                <div className="flex items-start gap-3"><span className="text-[#2b2b2b] text-xs">📞</span> <span>{data.phone || "07985 657 435"}</span></div>
                <div className="flex items-start gap-3"><span className="text-[#2b2b2b] text-xs">📍</span> <span>{data.address || "88 Westview, Meadows, NY"}</span></div>
             </div>

             <h2 className="text-sm font-bold tracking-widest uppercase mb-4 text-[#2b2b2b] flex items-center justify-between mt-2">EDUCATION <span className="flex-1 border-b border-[#2b2b2b] ml-4"></span></h2>
             
             <div className="mb-6 relative pl-3 border-l border-gray-300">
                <div className="absolute top-1 -left-1 w-2 h-2 bg-[#2b2b2b] rounded-full"></div>
                <p className="font-bold text-[10px] text-[#2b2b2b] uppercase">{data.school || "Place of Education"}</p>
                <p className="text-[9px] text-gray-500 mb-1">{data.degree || "Qualification"}</p>
                <p className="text-[9px] text-gray-400 italic">{data.eduYear || "1999 - 2003"}</p>
             </div>

             {data.edu2Degree && (
                <div className="mb-6 relative pl-3 border-l border-gray-300">
                   <div className="absolute top-1 -left-1 w-2 h-2 bg-[#2b2b2b] rounded-full"></div>
                   <p className="font-bold text-[10px] text-[#2b2b2b] uppercase">{data.edu2School}</p>
                   <p className="text-[9px] text-gray-500 mb-1">{data.edu2Degree}</p>
                   <p className="text-[9px] text-gray-400 italic">{data.edu2Year}</p>
                </div>
             )}

             <h2 className="text-sm font-bold tracking-widest uppercase mb-4 text-[#2b2b2b] flex items-center justify-between mt-8">SKILLS <span className="flex-1 border-b border-[#2b2b2b] ml-4"></span></h2>
             <ul className="text-[9px] text-gray-500 space-y-2 pl-4 list-disc marker:text-[#2b2b2b]">
                {data.technicalSkills ? data.technicalSkills.split(',').map((s: any, i: number) => <li key={i}>{s.trim()}</li>) : (
                   <>
                      <li>Skill One Goes Here</li>
                      <li>Skill Two Goes Here</li>
                      <li>Skill Three Goes Here</li>
                      <li>Skill Four Goes Here</li>
                      <li>Skill Five Goes Here</li>
                      <li>Skill Six Goes Here</li>
                   </>
                )}
             </ul>
          </div>

          {/* Right Main Content */}
          <div className="w-[65%] pl-8 pt-6">
             <div className="mb-8">
                <h1 className="text-4xl font-light text-[#2b2b2b] tracking-wider mb-2">{data.name?.split(' ')[0] || "Megan"}<br/><span className="font-bold tracking-widest uppercase">{data.name?.split(' ').slice(1).join(' ') || "ANDERSON"}</span></h1>
                <p className="text-sm text-gray-400 tracking-[0.2em] uppercase">{data.profession || data.role || "Professional job title"}</p>
             </div>

             <h2 className="text-sm font-bold tracking-widest uppercase mb-4 text-[#2b2b2b] flex items-center">ABOUT <span className="text-2xl ml-2 -mt-2">❝</span> <span className="flex-1 border-b border-gray-300 ml-4"></span></h2>
             <p className="text-[9px] text-gray-500 leading-relaxed text-justify mb-8 pr-4">
                {data.summary || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacus enim, semper ut imperdiet et, congue at elit. Phasellus lacinia turpis sit amet lorem hendrerit, a gravida velit bibendum. In erat nisl, venenatis semper tortor et, finibus mattis velit. Integer egestas lacinia arcu. Nullam nec eros tincidunt neque condimentum dignissim. Nulla eget elementum quam."}
             </p>

             <h2 className="text-sm font-bold tracking-widest uppercase mb-6 text-[#2b2b2b] flex items-center">WORK EXPERIENCE <span className="flex-1 border-b border-gray-300 ml-4"></span></h2>
             
             <div className="relative border-l border-gray-200 pl-10 mb-6 ml-4">
                <div className="absolute top-0 -left-6 bg-[#dfdfdf] text-[#2b2b2b] text-[8px] tracking-wider py-4 px-1 rounded-full whitespace-nowrap transform -rotate-90 origin-center h-24 flex items-center justify-center font-bold">
                   <span className="transform rotate-90 w-full text-center leading-tight">{data.expDuration?.replace('-', '\\n') || "2020\\n-\\nPresent"}</span>
                </div>
                <div className="bg-white relative z-10 -mt-2">
                   <h3 className="font-bold text-xs text-[#2b2b2b] uppercase">{data.role || "Job Title"}</h3>
                   <p className="text-[9px] text-gray-400 italic mb-2">{data.company || "Company | Location"}</p>
                   <p className="text-[9px] text-gray-500 leading-relaxed text-justify pr-4">{data.expDescription || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pharetra in lorem at laoreet. Donec hendrerit libero eget est tempor, quis tempus arcu elementum. In elementum elit at dui tristique feugiat."}</p>
                </div>
             </div>

             {data.exp2Role && (
                <div className="relative border-l border-gray-200 pl-10 mb-6 ml-4">
                   <div className="absolute top-0 -left-6 bg-[#dfdfdf] text-[#2b2b2b] text-[8px] tracking-wider py-4 px-1 rounded-full whitespace-nowrap transform -rotate-90 origin-center h-24 flex items-center justify-center font-bold">
                      <span className="transform rotate-90 w-full text-center leading-tight">{data.exp2Duration?.replace('-', '\\n')}</span>
                   </div>
                   <div className="bg-white relative z-10 -mt-2">
                      <h3 className="font-bold text-xs text-[#2b2b2b] uppercase">{data.exp2Role}</h3>
                      <p className="text-[9px] text-gray-400 italic mb-2">{data.exp2Company}</p>
                      <p className="text-[9px] text-gray-500 leading-relaxed text-justify pr-4">{data.exp2Description}</p>
                   </div>
                </div>
             )}

             {data.exp3Role && (
                <div className="relative border-l border-gray-200 pl-10 mb-6 ml-4">
                   <div className="absolute top-0 -left-6 bg-[#dfdfdf] text-[#2b2b2b] text-[8px] tracking-wider py-4 px-1 rounded-full whitespace-nowrap transform -rotate-90 origin-center h-24 flex items-center justify-center font-bold">
                      <span className="transform rotate-90 w-full text-center leading-tight">{data.exp3Duration?.replace('-', '\\n')}</span>
                   </div>
                   <div className="bg-white relative z-10 -mt-2">
                      <h3 className="font-bold text-xs text-[#2b2b2b] uppercase">{data.exp3Role}</h3>
                      <p className="text-[9px] text-gray-400 italic mb-2">{data.exp3Company}</p>
                      <p className="text-[9px] text-gray-500 leading-relaxed text-justify pr-4">{data.exp3Description}</p>
                   </div>
                </div>
             )}

             {data.exp4Role && (
                <div className="relative border-l border-gray-200 pl-10 mb-6 ml-4">
                   <div className="absolute top-0 -left-6 bg-[#dfdfdf] text-[#2b2b2b] text-[8px] tracking-wider py-4 px-1 rounded-full whitespace-nowrap transform -rotate-90 origin-center h-24 flex items-center justify-center font-bold">
                      <span className="transform rotate-90 w-full text-center leading-tight">{data.exp4Duration?.replace('-', '\\n')}</span>
                   </div>
                   <div className="bg-white relative z-10 -mt-2">
                      <h3 className="font-bold text-xs text-[#2b2b2b] uppercase">{data.exp4Role}</h3>
                      <p className="text-[9px] text-gray-400 italic mb-2">{data.exp4Company}</p>
                      <p className="text-[9px] text-gray-500 leading-relaxed text-justify pr-4">{data.exp4Description}</p>
                   </div>
                </div>
             )}
          </div>
       </div>
    </div>
  );

  const renderBlueIntern = (data: any) => (
    <div className="bg-white w-[210mm] min-h-[297mm] shadow-2xl shrink-0 font-sans text-gray-800 flex">
       {/* Left Column (Light Blue) */}
       <div className="w-[35%] bg-[#e0ecf4] pt-12 pb-12 flex flex-col relative z-10">
          <div className="w-40 h-40 rounded-full border-[6px] border-white mx-auto overflow-hidden shadow-sm mb-10 bg-gray-200">
             {data.photo ? <img src={data.photo} className="w-full h-full object-cover rounded-full" alt="Profile" /> : <div className="w-full h-full bg-[#a9cce3]"></div>}
          </div>

          <div className="px-8">
             <h2 className="text-lg font-['Impact'] tracking-widest uppercase mb-4 text-[#333333]">CONTACT</h2>
             <div className="space-y-4 text-[10px] text-[#333333] mb-8 font-medium">
                <div className="flex items-center gap-3"><span className="text-[#a9cce3] text-sm font-bold bg-white rounded-full w-5 h-5 flex items-center justify-center">📞</span> <span>{data.phone || "+1 212 06 06 060"}</span></div>
                <div className="flex items-center gap-3"><span className="text-[#a9cce3] text-sm font-bold bg-white rounded-full w-5 h-5 flex items-center justify-center">✉</span> <span className="break-all">{data.email || "name@email.com"}</span></div>
                <div className="flex items-center gap-3"><span className="text-[#a9cce3] text-sm font-bold bg-white rounded-full w-5 h-5 flex items-center justify-center">📍</span> <span>{data.address || "LA, California"}</span></div>
             </div>

             <h2 className="text-lg font-['Impact'] tracking-widest uppercase mb-2 text-[#333333] mt-2">CAREER OBJECTIVE</h2>
             <p className="text-[10px] text-[#333333] leading-relaxed text-justify mb-8">
                {data.summary || "Passionate and enthusiastic 3rd year student with excellent interpersonal skills and a high interest in foreign languages. Looking for a student job as a hostess in a hotel or a catering company."}
             </p>

             <h2 className="text-lg font-['Impact'] tracking-widest uppercase mb-4 text-[#333333]">LANGUAGES</h2>
             <div className="space-y-3 mb-8 text-[10px] text-[#333333]">
                {data.languages ? data.languages.split(',').map((l: any, i: number) => (
                   <div key={i} className="flex justify-between items-center">
                      <span className="w-1/3">{l.split('(')[0].trim()}</span>
                      <div className="w-1/2 h-2.5 bg-white rounded-full"><div className="bg-[#a9cce3] h-full rounded-full" style={{width: Math.floor(Math.random() * 40 + 60) + '%'}}></div></div>
                   </div>
                )) : (
                   <>
                      <div className="flex justify-between items-center"><span className="w-1/3">English</span><div className="w-1/2 h-2.5 bg-white rounded-full"><div className="bg-[#a9cce3] h-full rounded-full w-[90%]"></div></div></div>
                      <div className="flex justify-between items-center"><span className="w-1/3">French</span><div className="w-1/2 h-2.5 bg-white rounded-full"><div className="bg-[#a9cce3] h-full rounded-full w-[70%]"></div></div></div>
                      <div className="flex justify-between items-center"><span className="w-1/3">Italian</span><div className="w-1/2 h-2.5 bg-white rounded-full"><div className="bg-[#a9cce3] h-full rounded-full w-[50%]"></div></div></div>
                   </>
                )}
             </div>

             <h2 className="text-lg font-['Impact'] tracking-widest uppercase mb-4 text-[#333333]">SKILLS</h2>
             <ul className="text-[10px] text-[#333333] space-y-1.5 list-disc pl-5 mb-8 marker:text-[#333333]">
                {data.technicalSkills ? data.technicalSkills.split(',').map((s: any, i: number) => <li key={i}>{s.trim()}</li>) : (
                   <>
                      <li>Team work</li>
                      <li>Creativity</li>
                      <li>Open-mindedness</li>
                      <li>Punctuality</li>
                      <li>Photoshop</li>
                      <li>Video</li>
                   </>
                )}
             </ul>

             <h2 className="text-lg font-['Impact'] tracking-widest uppercase mb-4 text-[#333333]">INTERESTS</h2>
             <div className="grid grid-cols-3 gap-y-4 text-2xl text-[#333333]">
                {data.interests ? data.interests.split(',').map((int: any, i: number) => (
                   <div key={i} className="flex justify-center flex-col items-center"><span className="text-[10px] font-bold">{int.trim().substring(0, 5)}</span></div>
                )) : (
                   <>
                      <div className="flex justify-center">🌍</div>
                      <div className="flex justify-center">📷</div>
                      <div className="flex justify-center">🎧</div>
                      <div className="flex justify-center">🎭</div>
                      <div className="flex justify-center">🚶</div>
                      <div className="flex justify-center">📖</div>
                   </>
                )}
             </div>
          </div>
       </div>

       {/* Right Column (White) */}
       <div className="w-[65%] p-10 pt-16 relative">
          <div className="mb-10">
             <h1 className="text-5xl font-['Impact'] tracking-widest uppercase text-[#333333] mb-2">{data.name?.split(' ')[0] || "NANCY"} <span className="font-sans">{data.name?.split(' ').slice(1).join(' ') || "MICHEALS"}</span></h1>
             <p className="text-sm text-[#333333] uppercase font-bold tracking-widest">{data.profession || data.role || "INTERNSHIP / STUDENT JOB"}</p>
          </div>

          <h2 className="text-xl font-['Impact'] tracking-widest uppercase mb-6 text-[#333333] bg-white border border-[#a9cce3] border-l-0 py-2 pr-4 shadow-[5px_5px_0px_0px_#e0ecf4] inline-block -ml-10 pl-10 relative">EDUCATION</h2>
          
          <div className="mb-6">
             <h3 className="font-bold text-[#333333] uppercase text-xs">{data.degree || "HOSPITALITY & TOURISM, B.S."}</h3>
             <p className="text-[10px] text-[#333333] font-bold mb-2">{data.school || "California State University"} <span className="text-gray-400 font-normal ml-1">| {data.eduYear || "20XX - 20XX"}</span></p>
             <ul className="text-[10px] text-[#333333] list-disc pl-4 space-y-1">
                <li>F&B management</li>
                <li>Travel and tourism</li>
                <li>Revenue management</li>
                <li>Law and ethics</li>
             </ul>
          </div>

          <div className="mb-10">
             <h3 className="font-bold text-[#333333] uppercase text-xs">{data.edu2Degree || "HIGH SCHOOL DIPLOMA"}</h3>
             <p className="text-[10px] text-[#333333] font-bold mb-2">{data.edu2School || "Los Angeles High School"} <span className="text-gray-400 font-normal ml-1">| {data.edu2Year || "20XX"}</span></p>
             <ul className="text-[10px] text-[#333333] list-disc pl-4 space-y-1">
                <li>Graduated with honors</li>
                <li>Class valedictorian</li>
                <li>National debate team</li>
                <li>Captain of basketball team</li>
             </ul>
          </div>

          <h2 className="text-xl font-['Impact'] tracking-widest uppercase mb-6 text-[#333333] bg-white border border-[#a9cce3] border-l-0 py-2 pr-4 shadow-[5px_5px_0px_0px_#e0ecf4] inline-block -ml-10 pl-10 relative mt-2">PROFESSIONAL EXPERIENCE</h2>

          <div className="mb-6">
             <h3 className="font-bold text-[#333333] uppercase text-xs">{data.role || "CATERING SERVICES"}</h3>
             <p className="text-[10px] text-[#333333] font-bold mb-2 uppercase">{data.company || "CATER2U, LA"} <span className="text-gray-400 font-normal normal-case ml-1">| {data.expDuration || "July 20XX"}</span></p>
             <ul className="text-[10px] text-[#333333] list-disc pl-4 space-y-1">
                {data.expDescription ? data.expDescription.split('\\n').map((d: any, i: number) => <li key={i}>{d}</li>) : (
                   <>
                      <li>Taking inventory</li>
                      <li>Assisting in kitchen duties</li>
                      <li>Serving event attendees</li>
                   </>
                )}
             </ul>
          </div>

          <div className="mb-10">
             <h3 className="font-bold text-[#333333] uppercase text-xs">{data.exp2Role || "FRY COOK"}</h3>
             <p className="text-[10px] text-[#333333] font-bold mb-1 uppercase">{data.exp2Company || "POPEYE'S"} <span className="text-gray-400 font-normal normal-case ml-1">| {data.exp2Duration || "July 20XX"}</span></p>
             <p className="text-[10px] text-[#333333] mb-2 text-gray-500 italic">High school summer job | Junior year</p>
             <ul className="text-[10px] text-[#333333] list-disc pl-4 space-y-1">
                {data.exp2Description ? data.exp2Description.split('\\n').map((d: any, i: number) => <li key={i}>{d}</li>) : (
                   <>
                      <li>Prepared and executed dishes</li>
                      <li>Kept an organized workstation</li>
                   </>
                )}
             </ul>
          </div>

          {(data.volunteerRole || !data.exp3Role) && (
             <>
                <h2 className="text-xl font-['Impact'] tracking-widest uppercase mb-6 text-[#333333] bg-white border border-[#a9cce3] border-l-0 py-2 pr-4 shadow-[5px_5px_0px_0px_#e0ecf4] inline-block -ml-10 pl-10 relative mt-2">VOLUNTEER</h2>
                <div className="mb-6">
                   <h3 className="font-bold text-[#333333] uppercase text-xs">{data.volunteerRole || "SOUP KITCHEN"}</h3>
                   <p className="text-[10px] text-[#333333] font-bold mb-2">{data.volunteerCompany || "Leeza's Care Connection"} <span className="text-gray-400 font-normal ml-1">| {data.volunteerDuration || "December 20XX"}</span></p>
                   <ul className="text-[10px] text-[#333333] list-disc pl-4 space-y-1">
                      {data.volunteerDescription ? data.volunteerDescription.split('\\n').map((d: any, i: number) => <li key={i}>{d}</li>) : (
                         <>
                            <li>Prepared food for Alzheimer patients</li>
                            <li>Food distribution</li>
                            <li>Provided emotional support when needed</li>
                         </>
                      )}
                   </ul>
                </div>
             </>
          )}
       </div>
    </div>
  );
`;

let content = fs.readFileSync('src/app/builder/page.tsx', 'utf8');
content = content.replace('const renderModernYellow =', code + '\n  const renderModernYellow =');

// update templates array
content = content.replace(
  /];\s*const experienceOptions/,
  `  { id: 'grey-elegant', name: 'Grey Elegant', desc: 'Sophisticated grey background with pill timeline' },
    { id: 'blue-intern', name: 'Blue Intern', desc: 'Light blue sidebar with volunteer section' },
  ];\n  const experienceOptions`
);

// update switch
content = content.replace(
  /\{selectedTemplate === 'modern-yellow' && renderModernYellow\(resumeData\)\}/,
  `{selectedTemplate === 'grey-elegant' && renderGreyElegant(resumeData)}
                    {selectedTemplate === 'blue-intern' && renderBlueIntern(resumeData)}
                    {selectedTemplate === 'modern-yellow' && renderModernYellow(resumeData)}`
);

fs.writeFileSync('src/app/builder/page.tsx', content);
console.log('Batch 6 added!');
