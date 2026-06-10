const fs = require('fs');

const code = `
  const renderDesignerYellow = (data: any) => (
    <div className="bg-[#333333] w-[210mm] min-h-[297mm] shadow-2xl shrink-0 font-sans text-white flex flex-col overflow-hidden relative">
       {/* Background accents */}
       <div className="absolute top-0 left-0 w-[40%] h-full bg-white z-0"></div>
       <div className="absolute top-0 left-8 w-[25%] h-40 bg-[#eab308] z-0"></div>

       <div className="relative z-10 flex flex-col h-full pt-16">
          <div className="flex px-8 mb-12">
             <div className="w-[40%] flex justify-center items-start">
                <div className="w-44 h-44 rounded-full border-8 border-[#333333] overflow-hidden bg-gray-200 shadow-xl relative z-20 -mt-8">
                   {data.photo ? <img src={data.photo} className="w-full h-full object-cover" alt="Profile" /> : <div className="w-full h-full bg-[#eab308]"></div>}
                </div>
             </div>
             <div className="w-[60%] pl-8 pt-6">
                <h1 className="text-5xl font-bold text-[#eab308] tracking-widest uppercase mb-2">{data.name || "JOHAN SMITH"}</h1>
                <p className="text-sm text-gray-300 italic mb-4">{data.profession || data.role || "Graphics Designer"}</p>
                <div className="flex gap-1 text-[#eab308] mb-6">
                   <span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
                <div className="flex gap-4 text-xs text-white">
                   <div className="w-6 h-6 rounded-full border border-white flex items-center justify-center">f</div>
                   <div className="w-6 h-6 rounded-full border border-white flex items-center justify-center">t</div>
                   <div className="w-6 h-6 rounded-full border border-white flex items-center justify-center">in</div>
                   <div className="w-6 h-6 rounded-full border border-white flex items-center justify-center">w</div>
                </div>
             </div>
          </div>

          <div className="flex flex-1">
             {/* Left Column (White bg) */}
             <div className="w-[40%] px-8 text-gray-800">
                <h2 className="bg-[#eab308] text-black font-bold tracking-widest uppercase px-4 py-1 mb-6 text-center text-sm shadow-sm mx-[-1rem]">CONTACT ME</h2>
                <div className="text-[10px] space-y-4 font-bold text-gray-600 mb-8">
                   <div className="flex items-start gap-3">
                      <span className="text-[#333333] text-lg">📍</span>
                      <p>{data.address || "Your address, Strewet #\\nLocation, Abc, Country"}</p>
                   </div>
                   <div className="flex items-start gap-3">
                      <span className="text-[#333333] text-lg">📞</span>
                      <p>{data.phone || "phone +00 0123 456 78"}</p>
                   </div>
                   <div className="flex items-start gap-3">
                      <span className="text-[#333333] text-lg">✉</span>
                      <p className="break-all">{data.email || "youremail@email.co"}</p>
                   </div>
                </div>

                <h2 className="bg-[#eab308] text-black font-bold tracking-widest uppercase px-4 py-1 mb-6 text-center text-sm shadow-sm mx-[-1rem]">EXPERIENCE</h2>
                <div className="space-y-6 mb-8">
                   <div className="relative pl-6">
                      <div className="absolute left-0 top-1 w-3 h-3 bg-[#333333] rounded-full"></div>
                      <p className="font-bold text-xs uppercase text-gray-800">{data.role || "LOREM IPSUM"}</p>
                      <p className="text-[9px] text-gray-500 leading-relaxed text-justify mt-1">
                         {data.expDescription || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore."}
                      </p>
                   </div>
                   
                   {data.exp2Role && (
                      <div className="relative pl-6">
                         <div className="absolute left-0 top-1 w-3 h-3 bg-[#333333] rounded-full"></div>
                         <p className="font-bold text-xs uppercase text-gray-800">{data.exp2Role}</p>
                         <p className="text-[9px] text-gray-500 leading-relaxed text-justify mt-1">{data.exp2Description}</p>
                      </div>
                   )}
                   
                   {data.exp3Role && (
                      <div className="relative pl-6">
                         <div className="absolute left-0 top-1 w-3 h-3 bg-[#333333] rounded-full"></div>
                         <p className="font-bold text-xs uppercase text-gray-800">{data.exp3Role}</p>
                         <p className="text-[9px] text-gray-500 leading-relaxed text-justify mt-1">{data.exp3Description}</p>
                      </div>
                   )}
                </div>

                <h2 className="bg-[#eab308] text-black font-bold tracking-widest uppercase px-4 py-1 mb-6 text-center text-sm shadow-sm mx-[-1rem]">EDUCATION</h2>
                <div className="space-y-6 mb-8">
                   <div className="relative pl-6">
                      <div className="absolute left-0 top-1 w-3 h-3 bg-[#333333] rounded-full"></div>
                      <p className="font-bold text-xs uppercase text-gray-800">{data.degree || "LOREM IPSUM"}</p>
                      <p className="text-[9px] text-gray-500 leading-relaxed text-justify mt-1">
                         {data.school || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore."}
                      </p>
                   </div>
                   {data.edu2Degree && (
                      <div className="relative pl-6">
                         <div className="absolute left-0 top-1 w-3 h-3 bg-[#333333] rounded-full"></div>
                         <p className="font-bold text-xs uppercase text-gray-800">{data.edu2Degree}</p>
                         <p className="text-[9px] text-gray-500 leading-relaxed text-justify mt-1">{data.edu2School}</p>
                      </div>
                   )}
                </div>
             </div>

             {/* Right Column (Dark bg) */}
             <div className="w-[60%] pl-8 pr-12 text-gray-300 pb-12">
                <div className="flex items-center mb-4">
                   <div className="w-5 h-5 bg-white rounded-sm mr-4"></div>
                   <h2 className="text-xl font-bold tracking-widest uppercase text-white">ABOUT ME</h2>
                </div>
                <p className="text-[9px] leading-relaxed text-justify mb-8 pb-4 border-b border-gray-600">
                   {data.summary || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
                </p>

                <div className="flex items-center mb-6">
                   <div className="w-5 h-5 bg-white rounded-sm mr-4"></div>
                   <h2 className="text-xl font-bold tracking-widest uppercase text-white">PRO SKILLS</h2>
                </div>
                <div className="space-y-3 mb-8 pb-4 border-b border-gray-600">
                   {data.technicalSkills ? data.technicalSkills.split(',').map((s, i) => (
                      <div key={i} className="flex justify-between items-center text-[10px]">
                         <span className="w-1/4 uppercase">{s.trim()}</span>
                         <div className="w-2/3 flex gap-1">
                            <div className="h-1.5 flex-1 bg-[#eab308]"></div>
                            <div className="h-1.5 flex-1 bg-[#eab308]"></div>
                            <div className="h-1.5 flex-1 bg-[#eab308]"></div>
                            <div className="h-1.5 flex-1 bg-white"></div>
                         </div>
                      </div>
                   )) : (
                      <>
                         <div className="flex justify-between items-center text-[10px]"><span className="w-1/4 uppercase">skills 01</span><div className="w-2/3 flex gap-1"><div className="h-1.5 flex-1 bg-[#eab308]"></div><div className="h-1.5 flex-1 bg-[#eab308]"></div><div className="h-1.5 flex-1 bg-[#eab308]"></div><div className="h-1.5 flex-1 bg-[#eab308]"></div></div></div>
                         <div className="flex justify-between items-center text-[10px]"><span className="w-1/4 uppercase">skills 02</span><div className="w-2/3 flex gap-1"><div className="h-1.5 flex-1 bg-[#eab308]"></div><div className="h-1.5 flex-1 bg-[#eab308]"></div><div className="h-1.5 flex-1 bg-[#eab308]"></div><div className="h-1.5 flex-1 bg-white"></div></div></div>
                         <div className="flex justify-between items-center text-[10px]"><span className="w-1/4 uppercase">skills 03</span><div className="w-2/3 flex gap-1"><div className="h-1.5 flex-1 bg-[#eab308]"></div><div className="h-1.5 flex-1 bg-[#eab308]"></div><div className="h-1.5 flex-1 bg-[#eab308]"></div><div className="h-1.5 flex-1 bg-white"></div></div></div>
                         <div className="flex justify-between items-center text-[10px]"><span className="w-1/4 uppercase">skills 04</span><div className="w-2/3 flex gap-1"><div className="h-1.5 flex-1 bg-[#eab308]"></div><div className="h-1.5 flex-1 bg-[#eab308]"></div><div className="h-1.5 flex-1 bg-[#eab308]"></div><div className="h-1.5 flex-1 bg-white"></div></div></div>
                      </>
                   )}
                </div>

                <div className="flex items-center mb-6">
                   <div className="w-5 h-5 bg-white rounded-sm mr-4"></div>
                   <h2 className="text-xl font-bold tracking-widest uppercase text-white">LANGUAGE</h2>
                </div>
                <div className="space-y-4 mb-8 pb-4 border-b border-gray-600">
                   {data.languages ? data.languages.split(',').slice(0,3).map((l, i) => (
                      <div key={i} className="text-[10px]">
                         <p className="uppercase mb-1">{l.split('(')[0].trim()}</p>
                         <div className="w-full flex gap-1"><div className="h-1.5 flex-1 bg-[#eab308]"></div><div className="h-1.5 flex-1 bg-[#eab308]"></div><div className="h-1.5 flex-1 bg-[#eab308]"></div><div className="h-1.5 flex-1 bg-white"></div></div>
                      </div>
                   )) : (
                      <>
                         <div className="text-[10px]"><p className="uppercase mb-1">LOREM IPSUM</p><div className="w-full flex gap-1"><div className="h-1.5 flex-1 bg-[#eab308]"></div><div className="h-1.5 flex-1 bg-[#eab308]"></div><div className="h-1.5 flex-1 bg-white"></div><div className="h-1.5 flex-1 bg-white"></div></div></div>
                         <div className="text-[10px]"><p className="uppercase mb-1">DOLOR SIT AMET</p><div className="w-full flex gap-1"><div className="h-1.5 flex-1 bg-[#eab308]"></div><div className="h-1.5 flex-1 bg-[#eab308]"></div><div className="h-1.5 flex-1 bg-[#eab308]"></div><div className="h-1.5 flex-1 bg-[#eab308]"></div></div></div>
                      </>
                   )}
                </div>

                <div className="flex items-center mb-6">
                   <div className="w-5 h-5 bg-white rounded-sm mr-4"></div>
                   <h2 className="text-xl font-bold tracking-widest uppercase text-white">YOUR HOBBY</h2>
                </div>
                <div className="text-[9px] leading-relaxed text-justify mb-8">
                   <p className="uppercase font-bold mb-1">{data.hobbies ? data.hobbies.split(',')[0] : "LOREM IPSUM"}</p>
                   <p className="mb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p>
                   {data.hobbies && data.hobbies.split(',').length > 1 && (
                      <>
                         <p className="uppercase font-bold mb-1">{data.hobbies.split(',')[1]}</p>
                         <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                      </>
                   )}
                </div>
             </div>
          </div>
       </div>
    </div>
  );

  const renderDesignerTan = (data: any) => (
    <div className="bg-white w-[210mm] min-h-[297mm] shadow-2xl shrink-0 font-sans text-gray-800 flex flex-col relative overflow-hidden">
       {/* Backgrounds */}
       <div className="absolute top-0 left-0 w-full h-[25%] bg-[#363945] z-0"></div>
       <div className="absolute bottom-0 left-0 w-[40%] h-[75%] bg-[#d3cbb8] z-0"></div>

       <div className="relative z-10 flex flex-col h-full">
          {/* Header */}
          <div className="flex h-[25%] px-12 pt-16">
             <div className="w-[40%] flex justify-center relative">
                <div className="w-48 h-56 rounded-md overflow-hidden bg-gray-200 border-4 border-[#d3cbb8] shadow-xl relative z-20 -mt-4" style={{clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"}}>
                   {data.photo ? <img src={data.photo} className="w-full h-full object-cover" alt="Profile" /> : <div className="w-full h-full bg-[#1e293b]"></div>}
                </div>
             </div>
             <div className="w-[60%] pl-8 pt-8">
                <div className="border-4 border-[#d3cbb8] p-4 text-center">
                   <h1 className="text-4xl font-bold text-white tracking-wider mb-1">{data.name || "Roy Alexander"}</h1>
                   <p className="text-sm text-gray-300">{data.profession || data.role || "Your Designation"}</p>
                </div>
             </div>
          </div>

          <div className="flex flex-1">
             {/* Left Column (Tan bg) */}
             <div className="w-[40%] px-10 pt-16 text-[#363945]">
                <h2 className="text-lg font-bold tracking-widest uppercase mb-6 text-center">CONTACT</h2>
                <div className="text-[10px] space-y-3 font-medium mb-12">
                   <div className="flex items-center gap-3">
                      <span className="text-lg">📞</span>
                      <p>{data.phone || "+91 966 00 000 00"}</p>
                   </div>
                   <div className="flex items-center gap-3">
                      <span className="text-lg">✉</span>
                      <p className="break-all">{data.email || "youremail@gmail.com"}</p>
                   </div>
                   <div className="flex items-center gap-3">
                      <span className="text-lg">📍</span>
                      <p>{data.address || "Address, City, ST ZIP Code"}</p>
                   </div>
                </div>

                <h2 className="text-lg font-bold tracking-widest uppercase mb-4 text-center">SUMMARY</h2>
                <p className="text-[9px] leading-relaxed text-justify mb-12 text-[#363945]">
                   {data.summary || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\\n\\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
                </p>

                <h2 className="text-lg font-bold tracking-widest uppercase mb-4 text-center">LEADERSHIP</h2>
                <p className="text-[9px] leading-relaxed text-justify mb-12 text-[#363945]">
                   Lorem ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </p>
             </div>

             {/* Right Column (White bg) */}
             <div className="w-[60%] pl-8 pr-12 pt-16">
                <div className="bg-[#363945] text-white px-6 py-2 inline-block rounded-r-full mb-6 font-bold tracking-widest -ml-8 text-sm">WORK EXPERIENCE</div>
                
                <div className="mb-6 flex">
                   <div className="w-1/4">
                      <p className="text-[10px] font-bold text-gray-500 pt-1">{data.expDuration || "2014\\n2012"}</p>
                   </div>
                   <div className="w-3/4">
                      <p className="font-bold text-[10px] uppercase text-[#363945]">{data.role || "JOB TITLE 01"}</p>
                      <p className="font-bold text-[10px] uppercase text-[#363945] mb-1">{data.company || "COMPANY NAME"}</p>
                      <p className="text-[9px] text-gray-600 leading-relaxed text-justify">{data.expDescription || "Lorem ipsum is simply dummy text of the printing and typesetting industry."}</p>
                   </div>
                </div>

                {data.exp2Role && (
                   <div className="mb-8 flex">
                      <div className="w-1/4">
                         <p className="text-[10px] font-bold text-gray-500 pt-1">{data.exp2Duration}</p>
                      </div>
                      <div className="w-3/4">
                         <p className="font-bold text-[10px] uppercase text-[#363945]">{data.exp2Role}</p>
                         <p className="font-bold text-[10px] uppercase text-[#363945] mb-1">{data.exp2Company}</p>
                         <p className="text-[9px] text-gray-600 leading-relaxed text-justify">{data.exp2Description}</p>
                      </div>
                   </div>
                )}
                
                {data.exp3Role && (
                   <div className="mb-8 flex">
                      <div className="w-1/4">
                         <p className="text-[10px] font-bold text-gray-500 pt-1">{data.exp3Duration}</p>
                      </div>
                      <div className="w-3/4">
                         <p className="font-bold text-[10px] uppercase text-[#363945]">{data.exp3Role}</p>
                         <p className="font-bold text-[10px] uppercase text-[#363945] mb-1">{data.exp3Company}</p>
                         <p className="text-[9px] text-gray-600 leading-relaxed text-justify">{data.exp3Description}</p>
                      </div>
                   </div>
                )}

                <div className="bg-[#363945] text-white px-6 py-2 inline-block rounded-r-full mb-6 font-bold tracking-widest -ml-8 text-sm mt-4">EDUCATION</div>
                
                <div className="mb-4 flex">
                   <div className="w-1/4">
                      <p className="text-[10px] font-bold text-gray-500 pt-1">{data.eduYear || "2009\\n2012"}</p>
                   </div>
                   <div className="w-3/4">
                      <p className="font-bold text-[10px] uppercase text-[#363945]">{data.school || "COLLAGE OF USA"}</p>
                      <p className="font-bold text-[10px] uppercase text-[#363945] mb-1">{data.degree || "MASTER IN PROGRAMMING"}</p>
                      <p className="text-[9px] text-gray-600 leading-relaxed text-justify">Lorem ipsum is simply dummy text of the printing and typesetting industry.</p>
                   </div>
                </div>

                {data.edu2Degree && (
                   <div className="mb-8 flex">
                      <div className="w-1/4">
                         <p className="text-[10px] font-bold text-gray-500 pt-1">{data.edu2Year}</p>
                      </div>
                      <div className="w-3/4">
                         <p className="font-bold text-[10px] uppercase text-[#363945]">{data.edu2School}</p>
                         <p className="font-bold text-[10px] uppercase text-[#363945] mb-1">{data.edu2Degree}</p>
                         <p className="text-[9px] text-gray-600 leading-relaxed text-justify">Lorem ipsum is simply dummy text of the printing and typesetting industry.</p>
                      </div>
                   </div>
                )}

                <div className="bg-[#363945] text-white px-6 py-2 inline-block rounded-r-full mb-6 font-bold tracking-widest -ml-8 text-sm mt-4">SKILLS</div>
                
                <div className="space-y-3">
                   {data.technicalSkills ? data.technicalSkills.split(',').slice(0,6).map((s, i) => (
                      <div key={i} className="flex justify-between items-center text-[10px]">
                         <span className="w-1/3 text-[#363945] font-bold">{s.trim()}</span>
                         <div className="w-2/3 h-1 bg-[#363945]"><div className="h-full bg-[#d3cbb8]" style={{width: Math.floor(Math.random() * 20) + '%'}}></div></div>
                      </div>
                   )) : (
                      <>
                         <div className="flex justify-between items-center text-[10px]"><span className="w-1/3 text-[#363945] font-bold">Adobe Photoshop</span><div className="w-2/3 h-1 bg-[#363945]"><div className="h-full bg-[#d3cbb8] w-[20%]"></div></div></div>
                         <div className="flex justify-between items-center text-[10px]"><span className="w-1/3 text-[#363945] font-bold">Adobe Dreamweaver</span><div className="w-2/3 h-1 bg-[#363945]"><div className="h-full bg-[#d3cbb8] w-[10%]"></div></div></div>
                         <div className="flex justify-between items-center text-[10px]"><span className="w-1/3 text-[#363945] font-bold">Adobe Illustrator</span><div className="w-2/3 h-1 bg-[#363945]"><div className="h-full bg-[#d3cbb8] w-[15%]"></div></div></div>
                         <div className="flex justify-between items-center text-[10px]"><span className="w-1/3 text-[#363945] font-bold">Adobe Premiere</span><div className="w-2/3 h-1 bg-[#363945]"><div className="h-full bg-[#d3cbb8] w-[25%]"></div></div></div>
                      </>
                   )}
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
  `  { id: 'designer-yellow', name: 'Designer Yellow', desc: 'Black background with yellow sidebars' },
    { id: 'designer-tan', name: 'Designer Tan', desc: 'Tan sidebar with dark top header' },
  ];\n  const experienceOptions`
);

// update switch
content = content.replace(
  /\{selectedTemplate === 'modern-yellow' && renderModernYellow\(resumeData\)\}/,
  `{selectedTemplate === 'designer-yellow' && renderDesignerYellow(resumeData)}
                    {selectedTemplate === 'designer-tan' && renderDesignerTan(resumeData)}
                    {selectedTemplate === 'modern-yellow' && renderModernYellow(resumeData)}`
);

fs.writeFileSync('src/app/builder/page.tsx', content);
console.log('Batch 4 added!');
