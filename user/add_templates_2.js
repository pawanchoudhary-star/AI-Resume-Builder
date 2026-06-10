const fs = require('fs');

const code = `
  const renderMarketingOrange = (data: any) => (
    <div className="bg-white w-[210mm] min-h-[297mm] shadow-2xl shrink-0 font-sans text-gray-800 relative overflow-hidden p-12">
       {/* Background circles */}
       <div className="absolute top-[-50px] left-[-50px] w-40 h-40 rounded-full bg-[#d97706] opacity-80"></div>
       <div className="absolute top-[-20px] left-10 w-20 h-20 rounded-full bg-black"></div>
       <div className="absolute bottom-[-50px] right-[-50px] w-64 h-64 rounded-full bg-[#d97706] opacity-80"></div>
       <div className="absolute bottom-10 right-[-30px] w-24 h-24 rounded-full bg-black"></div>

       <div className="relative z-10 flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-start mb-12">
             <div className="w-[50%] pt-8">
                <h1 className="text-4xl font-bold text-[#b45309] uppercase leading-tight mb-2">{data.name?.split(' ').join('\\n') || "RICHARD\\nSANCHEZ"}</h1>
                <p className="text-sm font-bold text-gray-700">{data.profession || data.role || "Marketing Manager"}</p>
                
                <h2 className="text-[#b45309] font-bold tracking-widest uppercase mt-8 mb-2">ABOUT ME</h2>
                <p className="text-[10px] text-gray-500 leading-relaxed pr-8">{data.summary || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse laoreet tellus non dui volutpat, id tempor orci accumsan."}</p>
             </div>
             <div className="w-[45%] flex justify-end">
                <div className="w-56 h-56 rounded-full border-[6px] border-[#b45309] overflow-hidden shadow-lg p-1 bg-white">
                   {data.photo ? <img src={data.photo} className="w-full h-full object-cover rounded-full" alt="Profile" /> : <div className="w-full h-full bg-gray-200 rounded-full"></div>}
                </div>
             </div>
          </div>

          {/* Main Content */}
          <div className="flex justify-between flex-1">
             <div className="w-[45%] pr-4">
                <h2 className="text-[#b45309] font-bold tracking-widest uppercase mb-4">EDUCATION</h2>
                <div className="mb-6">
                   <h3 className="font-bold text-sm text-gray-800">{data.school || "Maria School Of Marketing"}</h3>
                   <ul className="list-disc pl-4 text-[10px] text-gray-600 mt-1"><li>{data.degree || "Bachelor Degree Of Marketing and Business"} ({data.eduYear || "2015"})</li></ul>
                </div>
                {data.edu2Degree && (
                   <div className="mb-8">
                      <h3 className="font-bold text-sm text-gray-800">{data.edu2School}</h3>
                      <ul className="list-disc pl-4 text-[10px] text-gray-600 mt-1"><li>{data.edu2Degree} ({data.edu2Year})</li></ul>
                   </div>
                )}

                <h2 className="text-[#b45309] font-bold tracking-widest uppercase mb-4 mt-8">SKILL</h2>
                <div className="space-y-3">
                   {data.skills ? data.skills.split(',').slice(0,5).map((s, i) => (
                      <div key={i} className="flex items-center justify-between text-[10px] font-bold text-gray-600">
                         <span className="w-1/3">{s.trim()}</span>
                         <div className="w-1/2 h-2 bg-gray-200 rounded-full"><div className="h-full bg-[#c2410c] rounded-full" style={{width: Math.floor(Math.random() * 40 + 60) + '%'}}></div></div>
                         <span className="w-[10%] text-right text-gray-400">{Math.floor(Math.random() * 40 + 60)}%</span>
                      </div>
                   )) : (
                      <>
                        <div className="flex items-center justify-between text-[10px] font-bold text-gray-600"><span className="w-1/3">Market Strategy</span><div className="w-1/2 h-2 bg-gray-200 rounded-full"><div className="h-full bg-[#c2410c] rounded-full w-[85%]"></div></div><span className="w-[10%] text-right text-gray-400">85%</span></div>
                        <div className="flex items-center justify-between text-[10px] font-bold text-gray-600"><span className="w-1/3">Accounting</span><div className="w-1/2 h-2 bg-gray-200 rounded-full"><div className="h-full bg-[#c2410c] rounded-full w-[70%]"></div></div><span className="w-[10%] text-right text-gray-400">70%</span></div>
                        <div className="flex items-center justify-between text-[10px] font-bold text-gray-600"><span className="w-1/3">Communication</span><div className="w-1/2 h-2 bg-gray-200 rounded-full"><div className="h-full bg-[#c2410c] rounded-full w-[95%]"></div></div><span className="w-[10%] text-right text-gray-400">95%</span></div>
                      </>
                   )}
                </div>
             </div>

             <div className="w-[50%] pl-4">
                <h2 className="text-[#b45309] font-bold tracking-widest uppercase mb-4">EXPERIENCE</h2>
                <div className="mb-6">
                   <h3 className="font-bold text-sm text-gray-800">{data.company || "Richard Design Studio"}</h3>
                   <p className="text-[10px] font-bold text-gray-500 mb-2">{data.role || "Junior Digital Marketing"} {data.expDuration || "2023"}</p>
                   <ul className="list-disc pl-4 text-[10px] text-gray-500 space-y-1">
                      {data.expDescription ? data.expDescription.split('\\n').map((d,i) => <li key={i}>{d}</li>) : <li>Lorem ipsum is simply dummy text of the printing and typesetting industry.</li>}
                   </ul>
                </div>
                {data.exp2Role && (
                   <div className="mb-6">
                      <h3 className="font-bold text-sm text-gray-800">{data.exp2Company}</h3>
                      <p className="text-[10px] font-bold text-gray-500 mb-2">{data.exp2Role} {data.exp2Duration}</p>
                      <ul className="list-disc pl-4 text-[10px] text-gray-500 space-y-1">
                         {data.exp2Description.split('\\n').map((d,i) => <li key={i}>{d}</li>)}
                      </ul>
                   </div>
                )}
             </div>
          </div>

          {/* Contact Bottom */}
          <div className="mt-8 pt-6 border-t border-gray-200">
             <h2 className="text-[#b45309] font-bold tracking-widest uppercase mb-4 text-center">CONTACT</h2>
             <div className="flex justify-center gap-8 text-[10px] text-gray-600 font-bold">
                <div className="flex items-center gap-1"><span className="w-5 h-5 rounded-full bg-[#b45309] text-white flex items-center justify-center">📞</span> {data.phone || "123-456-7890"}</div>
                <div className="flex items-center gap-1"><span className="w-5 h-5 rounded-full bg-[#b45309] text-white flex items-center justify-center">🏠</span> {data.address || "123 Anywhere St., Any City"}</div>
                <div className="flex items-center gap-1"><span className="w-5 h-5 rounded-full bg-[#b45309] text-white flex items-center justify-center">✉</span> {data.email || "hello@reallygreatsite.com"}</div>
             </div>
          </div>
       </div>
    </div>
  );

  const renderDesignerBrown = (data: any) => (
    <div className="bg-white w-[210mm] min-h-[297mm] shadow-2xl shrink-0 font-sans text-gray-800 flex flex-col">
       {/* Top Header */}
       <div className="bg-[#2a2426] text-[#eab308] p-10 flex justify-between items-center h-48">
          <div>
             <h1 className="text-5xl font-black uppercase tracking-wider mb-2">{data.name || "AARON LOEB"}</h1>
             <p className="text-lg text-gray-400 tracking-[0.3em] uppercase">{data.profession || data.role || "GRAPHIC DESIGNER"}</p>
          </div>
          <div className="w-36 h-40 bg-white border-4 border-white shadow-lg mr-4 mt-16 relative z-10">
             {data.photo ? <img src={data.photo} className="w-full h-full object-cover" alt="Profile" /> : <div className="w-full h-full bg-gray-300"></div>}
          </div>
       </div>

       <div className="flex flex-1 mt-4">
          {/* Left Column */}
          <div className="w-[35%] p-8 pr-4">
             <div className="bg-[#2a2426] text-[#eab308] font-bold py-2 px-6 rounded-r-3xl inline-block mb-6 -ml-8 tracking-widest shadow-md">Contact</div>
             <div className="text-[10px] space-y-4 font-bold text-gray-600 mb-8">
                <div><p className="text-black mb-1">Phone</p><p>{data.phone || "+123-456-7890"}</p></div>
                <div><p className="text-black mb-1">Email</p><p>{data.email || "hello@reallygreatsite.com"}</p></div>
                <div><p className="text-black mb-1">Address</p><p>{data.address || "123 Anywhere St., Any City"}</p></div>
             </div>

             <div className="bg-[#2a2426] text-[#eab308] font-bold py-2 px-6 rounded-r-3xl inline-block mb-6 -ml-8 tracking-widest shadow-md mt-4">Expertise</div>
             <ul className="list-none text-[10px] font-bold text-gray-500 space-y-2 mb-8 ml-2">
                {data.technicalSkills ? data.technicalSkills.split(',').map((s, i) => <li key={i} className="flex items-center before:content-['•'] before:text-[#eab308] before:mr-2 before:text-lg">{s.trim()}</li>) : (
                   <>
                     <li className="flex items-center before:content-['•'] before:text-[#eab308] before:mr-2 before:text-lg">ui/ux</li>
                     <li className="flex items-center before:content-['•'] before:text-[#eab308] before:mr-2 before:text-lg">visual design</li>
                     <li className="flex items-center before:content-['•'] before:text-[#eab308] before:mr-2 before:text-lg">leadership</li>
                   </>
                )}
             </ul>

             <div className="bg-[#2a2426] text-[#eab308] font-bold py-2 px-6 rounded-r-3xl inline-block mb-6 -ml-8 tracking-widest shadow-md mt-4">Language</div>
             <div className="text-[10px] font-bold text-gray-500 space-y-3 mb-8 ml-2">
                {data.languages ? data.languages.split(',').map((l, i) => (
                   <div key={i} className="flex justify-between items-center">
                      <span className="w-1/2">{l.split('(')[0].trim()}</span>
                      <div className="w-1/2 h-1 bg-gray-200"><div className="h-full bg-[#2a2426] w-[80%] relative"><div className="absolute right-0 top-0 h-full w-2 bg-[#eab308]"></div></div></div>
                   </div>
                )) : (
                   <>
                     <div className="flex justify-between items-center"><span className="w-1/2">Spanish</span><div className="w-1/2 h-1 bg-gray-200"><div className="h-full bg-[#2a2426] w-[90%] relative"><div className="absolute right-0 top-0 h-full w-2 bg-[#eab308]"></div></div></div></div>
                     <div className="flex justify-between items-center"><span className="w-1/2">English</span><div className="w-1/2 h-1 bg-gray-200"><div className="h-full bg-[#2a2426] w-[100%] relative"><div className="absolute right-0 top-0 h-full w-2 bg-[#eab308]"></div></div></div></div>
                   </>
                )}
             </div>

             <div className="bg-[#2a2426] text-[#eab308] font-bold py-2 px-6 rounded-r-3xl inline-block mb-6 -ml-8 tracking-widest shadow-md mt-4">Reference</div>
             <div className="text-[10px] text-gray-500 ml-2 whitespace-pre-line leading-relaxed">
                {data.references || "Lorna Alvarado\\nCompany Name/Position\\nPhone\\n+123-456-7890"}
             </div>
          </div>

          {/* Right Column */}
          <div className="w-[65%] p-8 pl-4">
             <div className="bg-[#2a2426] text-[#eab308] font-bold py-2 px-6 rounded-3xl inline-block mb-6 tracking-widest shadow-md">About Me</div>
             <p className="text-[10px] text-gray-400 leading-relaxed mb-8 text-justify">
                {data.summary || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
             </p>

             <div className="bg-[#2a2426] text-[#eab308] font-bold py-2 px-6 rounded-3xl inline-block mb-6 tracking-widest shadow-md">Experience</div>
             
             <div className="mb-6">
                <p className="font-bold text-xs">{data.company || "Company Name"} <span className="text-gray-500 font-normal">{data.expDuration || "2017 - 2020"}</span></p>
                <p className="text-[10px] text-gray-600 mb-2 italic">{data.role || "Job Position"}</p>
                <p className="text-[10px] text-gray-400 leading-relaxed text-justify">{data.expDescription || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."}</p>
             </div>
             
             {data.exp2Role && (
                <div className="mb-8">
                   <p className="font-bold text-xs">{data.exp2Company} <span className="text-gray-500 font-normal">{data.exp2Duration}</span></p>
                   <p className="text-[10px] text-gray-600 mb-2 italic">{data.exp2Role}</p>
                   <p className="text-[10px] text-gray-400 leading-relaxed text-justify">{data.exp2Description}</p>
                </div>
             )}

             <div className="bg-[#2a2426] text-[#eab308] font-bold py-2 px-6 rounded-3xl inline-block mb-6 tracking-widest shadow-md mt-4">Education</div>
             
             <div className="flex mb-4">
                <div className="w-1/4">
                   <p className="font-bold text-[10px]">{data.eduYear || "2015"}</p>
                   <p className="text-[10px] text-gray-600">{data.school || "University Name"}</p>
                   <p className="text-[10px] text-gray-600">{data.degree || "Your Degree"}</p>
                </div>
                <div className="w-3/4 pl-4 text-[10px] text-gray-400 leading-relaxed text-justify border-l border-gray-200">
                   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
                </div>
             </div>
             
             {data.edu2Degree && (
                <div className="flex mb-4">
                   <div className="w-1/4">
                      <p className="font-bold text-[10px]">{data.edu2Year}</p>
                      <p className="text-[10px] text-gray-600">{data.edu2School}</p>
                      <p className="text-[10px] text-gray-600">{data.edu2Degree}</p>
                   </div>
                   <div className="w-3/4 pl-4 text-[10px] text-gray-400 leading-relaxed text-justify border-l border-gray-200">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
                   </div>
                </div>
             )}
          </div>
       </div>
       <div className="h-4 bg-[#2a2426] w-1/2 self-end mt-auto"></div>
    </div>
  );
`;

let content = fs.readFileSync('src/app/builder/page.tsx', 'utf8');
content = content.replace('const renderModernYellow =', code + '\n  const renderModernYellow =');

// update templates array
content = content.replace(
  /];\s*const experienceOptions/,
  `  { id: 'marketing-orange', name: 'Marketing Manager', desc: 'White with orange accent circles' },
    { id: 'designer-brown', name: 'Designer Brown', desc: 'Dark brown rounded headers' },
  ];\n  const experienceOptions`
);

// update switch
content = content.replace(
  /\{selectedTemplate === 'modern-yellow' && renderModernYellow\(resumeData\)\}/,
  `{selectedTemplate === 'marketing-orange' && renderMarketingOrange(resumeData)}
                    {selectedTemplate === 'designer-brown' && renderDesignerBrown(resumeData)}
                    {selectedTemplate === 'modern-yellow' && renderModernYellow(resumeData)}`
);

fs.writeFileSync('src/app/builder/page.tsx', content);
console.log('Batch 2 added!');
