const fs = require('fs');

const code = `
  const renderOrangeModern = (data: any) => (
    <div className="bg-white w-[210mm] min-h-[297mm] shadow-2xl shrink-0 font-sans text-gray-800 flex flex-col overflow-hidden relative">
       {/* Background */}
       <div className="absolute top-[-50px] left-[-50px] w-[60%] h-[30%] bg-[#2f3542] rounded-br-[200px] z-0"></div>

       <div className="relative z-10 flex flex-col h-full pt-16">
          {/* Header */}
          <div className="flex h-[30%] pl-8">
             <div className="w-[40%] flex justify-center relative">
                <div className="w-56 h-56 rounded-full border-[10px] border-white overflow-hidden shadow-2xl relative z-20 mt-4 bg-gray-200">
                   {data.photo ? <img src={data.photo} className="w-full h-full object-cover" alt="Profile" /> : <div className="w-full h-full bg-[#f39c12]"></div>}
                </div>
             </div>
             <div className="w-[60%] pl-12 pt-16 pr-12">
                <h1 className="text-5xl font-bold tracking-widest text-[#2f3542] leading-tight mb-2 uppercase">{data.name?.split(' ').join('\\n') || "NAME\\nSURNAME"}</h1>
                <p className="text-2xl text-[#f39c12] tracking-[0.15em] mb-4">{data.profession || data.role || "Job Position"}</p>
                <p className="text-[10px] text-gray-500 leading-relaxed text-justify">
                   {data.summary || "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna."}
                </p>
             </div>
          </div>

          <div className="flex flex-1 mt-12">
             {/* Left Column */}
             <div className="w-[45%]">
                <h2 className="text-3xl tracking-widest text-[#2f3542] mb-6 pl-12">Contact</h2>
                <div className="bg-[#f39c12] text-white py-6 px-12 space-y-5 text-xs font-bold w-full mb-12">
                   <div className="flex items-center gap-4">
                      <span className="text-[#2f3542] text-xl">📞</span>
                      <p>{data.phone || "123 456 789"}</p>
                   </div>
                   <div className="flex items-center gap-4">
                      <span className="text-[#2f3542] text-xl">✉</span>
                      <p className="break-all">{data.email || "emailaddress@gmail.com"}</p>
                   </div>
                   <div className="flex items-center gap-4">
                      <span className="text-[#2f3542] text-xl">📍</span>
                      <p>{data.address || "Your Address"}</p>
                   </div>
                </div>

                <h2 className="text-3xl tracking-widest text-[#2f3542] mb-8 pl-12">Skill</h2>
                <div className="space-y-6 px-12 pr-4 text-xs font-bold text-gray-600">
                   {data.technicalSkills ? data.technicalSkills.split(',').slice(0,6).map((s: any, i: number) => {
                      const pct = Math.floor(Math.random() * 30 + 70);
                      return (
                      <div key={i} className="flex justify-between items-center gap-4">
                         <span className="w-1/4">{s.trim()}</span>
                         <div className="flex-1 h-3 border border-[#f39c12] p-[1px]"><div className="h-full bg-[#f39c12]" style={{width: \`\${pct}%\`}}></div></div>
                      </div>
                   )}) : (
                      <>
                         <div className="flex justify-between items-center gap-4"><span className="w-1/4">Skill 1</span><div className="flex-1 h-3 border border-[#f39c12] p-[1px]"><div className="h-full bg-[#f39c12] w-[90%]"></div></div></div>
                         <div className="flex justify-between items-center gap-4"><span className="w-1/4">Skill 2</span><div className="flex-1 h-3 border border-[#f39c12] p-[1px]"><div className="h-full bg-[#f39c12] w-[80%]"></div></div></div>
                         <div className="flex justify-between items-center gap-4"><span className="w-1/4">Skill 3</span><div className="flex-1 h-3 border border-[#f39c12] p-[1px]"><div className="h-full bg-[#f39c12] w-[85%]"></div></div></div>
                         <div className="flex justify-between items-center gap-4"><span className="w-1/4">Skill 4</span><div className="flex-1 h-3 border border-[#f39c12] p-[1px]"><div className="h-full bg-[#f39c12] w-[70%]"></div></div></div>
                         <div className="flex justify-between items-center gap-4"><span className="w-1/4">Skill 5</span><div className="flex-1 h-3 border border-[#f39c12] p-[1px]"><div className="h-full bg-[#f39c12] w-[60%]"></div></div></div>
                         <div className="flex justify-between items-center gap-4"><span className="w-1/4">Skill 6</span><div className="flex-1 h-3 border border-[#f39c12] p-[1px]"><div className="h-full bg-[#f39c12] w-[75%]"></div></div></div>
                      </>
                   )}
                </div>

                <p className="text-[9px] text-gray-400 pl-12 pr-4 mt-12 leading-relaxed text-justify">
                   Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa.
                </p>
             </div>

             {/* Right Column */}
             <div className="w-[55%] pl-8 pr-12 relative border-l border-gray-200 ml-4 pb-12">
                <div className="absolute top-0 left-[-4px] w-2 h-20 bg-[#f39c12]"></div>
                
                <h2 className="text-3xl tracking-widest text-[#2f3542] mb-6">Education</h2>
                
                <div className="mb-6">
                   <p className="font-bold text-sm text-[#2f3542]">{data.degree || "Master's in Lorem Ipsum"} <span className="text-[#f39c12] text-[10px] font-normal ml-2">{data.eduYear || "20XX-20XX"}</span></p>
                   <p className="text-xs font-bold text-gray-500 mb-2">{data.school || "XYZ College, City"}</p>
                   <p className="text-[10px] text-gray-400 leading-relaxed text-justify">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa.</p>
                </div>

                <div className="mb-12">
                   <p className="font-bold text-sm text-[#2f3542]">{data.edu2Degree || "Bachelor's in Lorem Ipsum"} <span className="text-[#f39c12] text-[10px] font-normal ml-2">{data.edu2Year || "20XX-20XX"}</span></p>
                   <p className="text-xs font-bold text-gray-500 mb-2">{data.edu2School || "XYZ College, City"}</p>
                   <p className="text-[10px] text-gray-400 leading-relaxed text-justify">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa.</p>
                </div>

                <h2 className="text-3xl tracking-widest text-[#2f3542] mb-6 mt-8">Experience</h2>

                <div className="mb-6">
                   <p className="font-bold text-sm text-[#2f3542]">{data.role || "Job Title"} <span className="text-[#f39c12] text-[10px] font-normal ml-2">{data.expDuration || "20XX-Present"}</span></p>
                   <p className="text-xs font-bold text-gray-500 mb-2">{data.company || "XYZ Company, City"}</p>
                   <p className="text-[10px] text-gray-400 leading-relaxed text-justify">{data.expDescription || "Lorem ipsum dolor sit amet, consectetuer adipiscing elit."}</p>
                </div>

                <div className="mb-6">
                   <p className="font-bold text-sm text-[#2f3542]">{data.exp2Role || "Job Title"} <span className="text-[#f39c12] text-[10px] font-normal ml-2">{data.exp2Duration || "20XX-20XX"}</span></p>
                   <p className="text-xs font-bold text-gray-500 mb-2">{data.exp2Company || "XYZ College, City"}</p>
                   <p className="text-[10px] text-gray-400 leading-relaxed text-justify">{data.exp2Description || "Lorem ipsum dolor sit amet, consectetuer adipiscing elit."}</p>
                </div>
             </div>
          </div>
       </div>
    </div>
  );

  const renderPeachGeometric = (data: any) => (
    <div className="bg-white w-[210mm] min-h-[297mm] shadow-2xl shrink-0 font-sans text-[#5c4a4a] relative overflow-hidden">
       {/* Geometric Backgrounds */}
       <div className="absolute top-0 right-0 w-[60%] h-[20%] bg-[#d9c5b2] z-0" style={{clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 50%)"}}></div>
       <div className="absolute top-0 left-0 w-[40%] h-[100%] bg-[#e3cdbe] z-0"></div>
       <div className="absolute bottom-0 right-0 w-[60%] h-[15%] bg-[#d9c5b2] z-0" style={{clipPath: "polygon(0 100%, 100% 100%, 100% 50%, 0 100%)"}}></div>

       <div className="relative z-10 flex flex-col h-full">
          <div className="flex h-56 items-center">
             <div className="w-[40%] flex justify-center">
                <div className="w-48 h-48 rounded-full border-[6px] border-white overflow-hidden bg-gray-200 shadow-lg relative z-20">
                   {data.photo ? <img src={data.photo} className="w-full h-full object-cover" alt="Profile" /> : <div className="w-full h-full bg-[#d9c5b2]"></div>}
                </div>
             </div>
             <div className="w-[60%] pl-8">
                <h1 className="text-4xl font-bold tracking-widest text-[#5c4a4a] uppercase mb-2">{data.name || "NAME SURNAME"}</h1>
                <p className="text-lg text-gray-500 mb-4">{data.profession || data.role || "Graphic Designer"}</p>
             </div>
          </div>

          <div className="flex flex-1 mt-4">
             {/* Left Column (Peach) */}
             <div className="w-[40%] pt-8 pb-12 relative flex flex-col">
                <div className="px-12 mb-12 flex-1">
                   <h2 className="text-xl font-bold tracking-widest uppercase mb-6 text-center border-b-2 border-black pb-2 mx-4 text-black">PROFILE</h2>
                   <p className="text-[10px] leading-relaxed text-justify text-[#5c4a4a] mb-6">
                      {data.summary || "Lorem ipsum is simply dummy text of the printing & typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s."}
                   </p>
                   <p className="text-[10px] leading-relaxed text-justify text-[#5c4a4a]">
                      Lorem ipsum is simply dummy text of the printing & typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s.
                   </p>
                </div>

                <div className="mb-12">
                   <h2 className="text-xl font-bold tracking-widest uppercase mb-6 text-center border-b-2 border-black pb-2 mx-16 text-black">CONTACT</h2>
                   <div className="space-y-4 text-[10px] font-medium text-[#5c4a4a]">
                      <div className="flex items-center"><div className="w-10 h-6 bg-[#cca895] flex items-center justify-center mr-4 text-black shadow-sm">✉</div> <span className="break-all">{data.email || "email@gmail.com"}</span></div>
                      <div className="flex items-center"><div className="w-10 h-6 bg-[#cca895] flex items-center justify-center mr-4 text-black shadow-sm">📞</div> <span>{data.phone || "+123456789"}</span></div>
                      <div className="flex items-center"><div className="w-10 h-6 bg-[#cca895] flex items-center justify-center mr-4 text-black shadow-sm">📍</div> <span>{data.address || "Your address"}</span></div>
                      <div className="flex items-center"><div className="w-10 h-6 bg-[#cca895] flex items-center justify-center mr-4 text-black shadow-sm">🌐</div> <span className="break-all">{data.portfolio || "www.Address@gmail.com"}</span></div>
                   </div>
                </div>
             </div>

             {/* Right Column (White) */}
             <div className="w-[60%] pl-8 pr-12 pt-8 pb-20">
                <h2 className="text-xl font-bold tracking-widest uppercase mb-6 border-b-2 border-black pb-2 inline-block text-black">EDUCATION</h2>
                
                <div className="mb-6">
                   <p className="font-bold text-xs text-black mb-1">{data.degree || "Masters Degree, XYZ College"}</p>
                   <p className="text-[10px] text-gray-500 italic mb-2">({data.eduYear || "YYYY-YYYY, City"})</p>
                   <p className="text-[10px] text-gray-500 leading-relaxed text-justify">{data.school || "Lorem ipsum is simply dummy text of the printing & typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."}</p>
                </div>

                <div className="mb-12">
                   <p className="font-bold text-xs text-black mb-1">{data.edu2Degree || "Bachelor Degree, XYZ College"}</p>
                   <p className="text-[10px] text-gray-500 italic mb-2">({data.edu2Year || "YYYY-YYYY, City"})</p>
                   <p className="text-[10px] text-gray-500 leading-relaxed text-justify">{data.edu2School || "Lorem ipsum is simply dummy text of the printing & typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."}</p>
                </div>

                <h2 className="text-xl font-bold tracking-widest uppercase mb-6 border-b-2 border-black pb-2 inline-block text-black mt-4">WORK EXPERIENCE</h2>

                <div className="mb-6">
                   <p className="font-bold text-xs text-black mb-1 uppercase">{data.company || "COMPANY NAME"}</p>
                   <p className="text-[10px] text-gray-500 italic mb-2">{data.role} {data.expDuration ? \`(\${data.expDuration})\` : ''}</p>
                   <p className="text-[10px] text-gray-500 leading-relaxed text-justify">{data.expDescription || "Lorem ipsum is simply dummy text of the printing & typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."}</p>
                </div>

                <div className="mb-6">
                   <p className="font-bold text-xs text-black mb-1 uppercase">{data.exp2Company || "COMPANY NAME"}</p>
                   <p className="text-[10px] text-gray-500 italic mb-2">{data.exp2Role} {data.exp2Duration ? \`(\${data.exp2Duration})\` : ''}</p>
                   <p className="text-[10px] text-gray-500 leading-relaxed text-justify">{data.exp2Description || "Lorem ipsum is simply dummy text of the printing & typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."}</p>
                </div>
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
  `  { id: 'orange-modern', name: 'Orange Modern', desc: 'Navy blue and orange layout' },
    { id: 'peach-geometric', name: 'Peach Geometric', desc: 'Geometric peach background layout' },
  ];\n  const experienceOptions`
);

// update switch
content = content.replace(
  /\{selectedTemplate === 'modern-yellow' && renderModernYellow\(resumeData\)\}/,
  `{selectedTemplate === 'orange-modern' && renderOrangeModern(resumeData)}
                    {selectedTemplate === 'peach-geometric' && renderPeachGeometric(resumeData)}
                    {selectedTemplate === 'modern-yellow' && renderModernYellow(resumeData)}`
);

fs.writeFileSync('src/app/builder/page.tsx', content);
console.log('Batch 5 added!');
