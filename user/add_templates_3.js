const fs = require('fs');

const code = `
  const renderAnimatorBlue = (data: any) => (
    <div className="bg-white w-[210mm] min-h-[297mm] shadow-2xl shrink-0 font-sans text-gray-800 flex flex-col">
       {/* Top Header */}
       <div className="bg-[#0f172a] text-white p-10 flex flex-col items-center justify-center relative pb-24 h-56">
          <h1 className="text-4xl font-bold uppercase tracking-widest mb-2 z-10">{data.name || "STEVEN JOHNSON"}</h1>
          <p className="text-lg text-[#f97316] tracking-[0.3em] uppercase z-10">{data.profession || data.role || "2D ANIMATOR"}</p>
          <div className="absolute -bottom-20 w-40 h-40 rounded-full border-4 border-white overflow-hidden bg-gray-200 shadow-xl z-20">
             {data.photo ? <img src={data.photo} className="w-full h-full object-cover" alt="Profile" /> : <div className="w-full h-full bg-[#1e293b]"></div>}
          </div>
       </div>

       {/* Contact Info Bar */}
       <div className="mt-24 px-12 flex justify-between text-xs font-bold text-gray-700 border-b-2 border-gray-300 pb-6 mb-8">
          <div className="text-left">
             <p>{data.phone || "+111 2222 3333"}</p>
             <p>{data.email || "StevenJohnson@mail.com"}</p>
          </div>
          <div className="text-right">
             <p>{data.linkedin || "Linkedin Account"}</p>
             <p>{data.address || "City, District, State"}</p>
          </div>
       </div>

       {/* Main Content */}
       <div className="flex px-12 pb-12 flex-1">
          {/* Left Column */}
          <div className="w-1/2 pr-6 border-r border-gray-200">
             <h2 className="text-sm font-bold text-[#0f172a] tracking-widest uppercase mb-6">EXPERIENCE</h2>
             
             <div className="mb-6">
                <p className="text-[#f97316] font-bold text-xs uppercase">{data.role || "JOB POSITION"}</p>
                <p className="text-[10px] font-bold text-gray-800 mb-2">{data.company || "Company Name"} | {data.expDuration || "Years"}</p>
                <p className="text-[10px] text-gray-500 leading-relaxed text-justify">{data.expDescription || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et."}</p>
             </div>

             {data.exp2Role && (
                <div className="mb-6">
                   <p className="text-[#f97316] font-bold text-xs uppercase">{data.exp2Role}</p>
                   <p className="text-[10px] font-bold text-gray-800 mb-2">{data.exp2Company} | {data.exp2Duration}</p>
                   <p className="text-[10px] text-gray-500 leading-relaxed text-justify">{data.exp2Description}</p>
                </div>
             )}
             
             {data.exp3Role && (
                <div className="mb-6">
                   <p className="text-[#f97316] font-bold text-xs uppercase">{data.exp3Role}</p>
                   <p className="text-[10px] font-bold text-gray-800 mb-2">{data.exp3Company} | {data.exp3Duration}</p>
                   <p className="text-[10px] text-gray-500 leading-relaxed text-justify">{data.exp3Description}</p>
                </div>
             )}

             <h2 className="text-sm font-bold text-[#0f172a] tracking-widest uppercase mt-8 mb-6">EDUCATION</h2>
             
             <div className="mb-6">
                <p className="text-[#f97316] font-bold text-xs uppercase">{data.degree || "JOB POSITION"}</p>
                <p className="text-[10px] font-bold text-gray-800 mb-2">{data.school || "Company Name"} | {data.eduYear || "Years"}</p>
                <p className="text-[10px] text-gray-500 leading-relaxed text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.</p>
             </div>

             {data.edu2Degree && (
                <div className="mb-6">
                   <p className="text-[#f97316] font-bold text-xs uppercase">{data.edu2Degree}</p>
                   <p className="text-[10px] font-bold text-gray-800 mb-2">{data.edu2School} | {data.edu2Year}</p>
                   <p className="text-[10px] text-gray-500 leading-relaxed text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.</p>
                </div>
             )}
          </div>

          {/* Right Column */}
          <div className="w-1/2 pl-6">
             <h2 className="text-sm font-bold text-[#0f172a] tracking-widest uppercase mb-6">ACHIEVEMENTS</h2>
             <div className="mb-6">
                {data.achievements ? data.achievements.split('\\n').map((a, i) => (
                   <div key={i} className="mb-4">
                      <p className="text-[#f97316] font-bold text-xs uppercase">{a.split(' ')[0]} {a.split(' ')[1]}</p>
                      <p className="text-[10px] font-bold text-gray-800 mb-1">Year</p>
                      <p className="text-[10px] text-gray-500 leading-relaxed text-justify">{a}</p>
                   </div>
                )) : (
                   <>
                     <div className="mb-4">
                        <p className="text-[#f97316] font-bold text-xs uppercase">1ST WINNER</p>
                        <p className="text-[10px] font-bold text-gray-800 mb-1">Year</p>
                        <p className="text-[10px] text-gray-500 leading-relaxed text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.</p>
                     </div>
                     <div className="mb-4">
                        <p className="text-[#f97316] font-bold text-xs uppercase">2ND WINNER</p>
                        <p className="text-[10px] font-bold text-gray-800 mb-1">Year</p>
                        <p className="text-[10px] text-gray-500 leading-relaxed text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.</p>
                     </div>
                   </>
                )}
             </div>

             <h2 className="text-sm font-bold text-[#0f172a] tracking-widest uppercase mt-8 mb-6">LANGUAGES</h2>
             <div className="flex gap-8 mb-8">
                {data.languages ? data.languages.split(',').map((l, i) => (
                   <div key={i}>
                      <p className="text-[#f97316] font-bold text-[10px] uppercase">{l.split('(')[0].trim()}</p>
                      <p className="text-[10px] text-gray-600">{l.includes('(') ? l.split('(')[1].replace(')', '') : 'Fluent'}</p>
                   </div>
                )) : (
                   <>
                     <div>
                        <p className="text-[#f97316] font-bold text-[10px] uppercase">ENGLISH</p>
                        <p className="text-[10px] text-gray-600">Native</p>
                     </div>
                     <div>
                        <p className="text-[#f97316] font-bold text-[10px] uppercase">GERMAN</p>
                        <p className="text-[10px] text-gray-600">Advanced</p>
                     </div>
                   </>
                )}
             </div>

             <h2 className="text-sm font-bold text-[#0f172a] tracking-widest uppercase mt-8 mb-6">PROFESSIONAL SKILLS</h2>
             <div className="grid grid-cols-2 gap-6">
                {data.technicalSkills ? data.technicalSkills.split(',').slice(0,4).map((s, i) => {
                   const pct = Math.floor(Math.random() * 40 + 60);
                   return (
                   <div key={i} className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full border-4 border-gray-200 flex items-center justify-center relative mb-2">
                         <div className="absolute top-[-4px] left-[-4px] w-12 h-12 rounded-full border-4 border-transparent border-t-[#f97316] border-r-[#f97316]" style={{transform: \`rotate(\${pct * 3.6}deg)\`}}></div>
                         <span className="text-[10px] font-bold text-gray-700">{pct}%</span>
                      </div>
                      <p className="text-[10px] text-gray-600 text-center">{s.trim()}</p>
                   </div>
                )}) : (
                   <>
                     <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full border-4 border-[#f97316] border-l-gray-200 flex items-center justify-center mb-2"><span className="text-[10px] font-bold text-gray-700">65%</span></div>
                        <p className="text-[10px] text-gray-600 text-center">Leadership</p>
                     </div>
                     <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full border-4 border-[#f97316] border-b-gray-200 flex items-center justify-center mb-2"><span className="text-[10px] font-bold text-gray-700">75%</span></div>
                        <p className="text-[10px] text-gray-600 text-center">Teamwork</p>
                     </div>
                     <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full border-4 border-[#f97316] flex items-center justify-center mb-2"><span className="text-[10px] font-bold text-gray-700">93%</span></div>
                        <p className="text-[10px] text-gray-600 text-center">Innovative</p>
                     </div>
                     <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full border-4 border-[#f97316] border-r-gray-200 flex items-center justify-center mb-2"><span className="text-[10px] font-bold text-gray-700">82%</span></div>
                        <p className="text-[10px] text-gray-600 text-center">Communication</p>
                     </div>
                   </>
                )}
             </div>
          </div>
       </div>
       <div className="h-10 bg-[#0f172a] w-full mt-auto"></div>
    </div>
  );

  const renderDesignerGray = (data: any) => (
    <div className="bg-white w-[210mm] min-h-[297mm] shadow-2xl flex shrink-0 font-sans text-gray-800">
       {/* Left Column */}
       <div className="w-[35%] bg-[#2a2a2a] text-gray-300 pt-10 pb-8 flex flex-col relative z-10 shadow-xl border-r border-gray-600">
          <div className="w-32 h-32 rounded-full border-2 border-[#d97706] mx-auto overflow-hidden mb-12 p-1">
             {data.photo ? <img src={data.photo} className="w-full h-full object-cover rounded-full" alt="Profile" /> : <div className="w-full h-full bg-gray-500 rounded-full"></div>}
          </div>

          <div className="px-6">
             <h2 className="bg-[#b45309] text-white font-bold text-xs tracking-widest uppercase px-4 py-1 inline-block mb-6 shadow-sm">INFO</h2>
             <div className="space-y-4 text-[10px] mb-8">
                <div className="flex items-start gap-3">
                   <span className="text-[#d97706] text-sm">👤</span>
                   <div><p className="font-bold text-white mb-0.5">Name</p><p>{data.name || "Ricardo Gomes"}</p></div>
                </div>
                <div className="flex items-start gap-3">
                   <span className="text-[#d97706] text-sm">📍</span>
                   <div><p className="font-bold text-white mb-0.5">Address</p><p>{data.address || "45641x Street Name\\nCity, Province\\nState Country"}</p></div>
                </div>
                <div className="flex items-start gap-3">
                   <span className="text-[#d97706] text-sm">📞</span>
                   <div><p className="font-bold text-white mb-0.5">Phone</p><p>{data.phone || "012 301 230123"}</p></div>
                </div>
                <div className="flex items-start gap-3">
                   <span className="text-[#d97706] text-sm">✉</span>
                   <div><p className="font-bold text-white mb-0.5">Email</p><p className="break-all">{data.email || "youremail@mail.com"}</p></div>
                </div>
                <div className="flex items-start gap-3">
                   <span className="text-[#d97706] text-sm">🌐</span>
                   <div><p className="font-bold text-white mb-0.5">Website</p><p className="break-all">{data.portfolio || "yourwebsite.com"}</p></div>
                </div>
             </div>

             <h2 className="bg-[#b45309] text-white font-bold text-xs tracking-widest uppercase px-4 py-1 inline-block mb-6 shadow-sm">SOCIAL</h2>
             <div className="space-y-4 text-[10px] mb-8">
                <div className="flex items-center gap-3">
                   <span className="text-[#d97706] text-sm">🔗</span>
                   <div><p className="font-bold text-white mb-0.5">LinkedIn</p><p className="break-all">{data.linkedin || "linkedin.com/in/name"}</p></div>
                </div>
             </div>

             <h2 className="bg-[#b45309] text-white font-bold text-xs tracking-widest uppercase px-4 py-1 inline-block mb-6 shadow-sm">AWARDS</h2>
             <div className="space-y-4 text-[10px]">
                {data.achievements ? data.achievements.split('\\n').map((a, i) => (
                   <div key={i} className="flex items-start gap-3">
                      <span className="text-[#d97706] text-sm">🔗</span>
                      <div><p className="font-bold text-white mb-0.5">{a.split(' ')[0]} Award</p><p>{a}</p></div>
                   </div>
                )) : (
                   <>
                      <div className="flex items-start gap-3">
                         <span className="text-[#d97706] text-sm">🔗</span>
                         <div><p className="font-bold text-white mb-0.5">Typo Award</p><p>Senior Designer at Capital P.\\n2009</p></div>
                      </div>
                      <div className="flex items-start gap-3">
                         <span className="text-[#d97706] text-sm">🔗</span>
                         <div><p className="font-bold text-white mb-0.5">Best Illustration</p><p>Milano Cup 2007</p></div>
                      </div>
                   </>
                )}
             </div>
          </div>
       </div>

       {/* Right Column */}
       <div className="w-[65%] pt-10 pb-8 relative bg-gray-50">
          <div className="bg-[#2a2a2a] text-white p-8 absolute top-0 left-0 w-full h-32 -z-10"></div>
          
          <div className="px-8 mt-2 mb-12">
             <h1 className="text-4xl font-bold text-[#b45309] uppercase tracking-wide mb-1">{data.name || "SANDRA MAYER"}</h1>
             <p className="text-sm text-gray-300 italic">{data.profession || data.role || "Graphic and Web designer"}</p>
          </div>

          <div className="px-8 pr-12">
             <h2 className="text-sm font-bold text-gray-800 tracking-widest uppercase mb-6 flex items-center"><span className="border-b border-gray-400 flex-1 mr-4"></span>EXPERIENCE</h2>
             
             <div className="flex mb-6 relative">
                <div className="w-1/4 pt-1 pr-4">
                   <div className="border border-gray-300 text-[9px] text-gray-500 py-1 px-2 text-center rounded">{data.expDuration || "2012 - 2010"}</div>
                </div>
                <div className="w-3/4 pl-4 border-l border-gray-300 pb-2">
                   <p className="font-bold text-xs text-gray-800">{data.company || "Braunhouse Studio xl"}</p>
                   <p className="text-[10px] text-[#d97706] mb-2">{data.role || "graphic designer"}</p>
                   <p className="text-[9px] text-gray-500 leading-relaxed text-justify">{data.expDescription || "Esperum id ea utandi reperori peribus erspellacus mairum reped modict que consequid ute bea num, quidi volupta dundandam, aliquam derrick everri conedte volori bus eiumquatur."}</p>
                </div>
             </div>

             {data.exp2Role && (
                <div className="flex mb-6 relative">
                   <div className="w-1/4 pt-1 pr-4">
                      <div className="border border-gray-300 text-[9px] text-gray-500 py-1 px-2 text-center rounded">{data.exp2Duration}</div>
                   </div>
                   <div className="w-3/4 pl-4 border-l border-gray-300 pb-2">
                      <p className="font-bold text-xs text-gray-800">{data.exp2Company}</p>
                      <p className="text-[10px] text-[#d97706] mb-2">{data.exp2Role}</p>
                      <p className="text-[9px] text-gray-500 leading-relaxed text-justify">{data.exp2Description}</p>
                   </div>
                </div>
             )}
             
             {data.exp3Role && (
                <div className="flex mb-6 relative">
                   <div className="w-1/4 pt-1 pr-4">
                      <div className="border border-gray-300 text-[9px] text-gray-500 py-1 px-2 text-center rounded">{data.exp3Duration}</div>
                   </div>
                   <div className="w-3/4 pl-4 border-l border-gray-300 pb-2">
                      <p className="font-bold text-xs text-gray-800">{data.exp3Company}</p>
                      <p className="text-[10px] text-[#d97706] mb-2">{data.exp3Role}</p>
                      <p className="text-[9px] text-gray-500 leading-relaxed text-justify">{data.exp3Description}</p>
                   </div>
                </div>
             )}

             <h2 className="text-sm font-bold text-gray-800 tracking-widest uppercase mb-6 flex items-center mt-4"><span className="border-b border-gray-400 flex-1 mr-4"></span>EDUCATION</h2>
             
             <div className="flex mb-4">
                <div className="w-1/4 pt-1 pr-4">
                   <div className="border border-gray-300 text-[9px] text-gray-500 py-1 px-2 text-center rounded">{data.eduYear || "2007 - 2005"}</div>
                </div>
                <div className="w-3/4 pl-4 pb-2">
                   <p className="font-bold text-xs text-gray-800">{data.school || "Jazell University, London"}</p>
                   <p className="text-[10px] text-[#d97706] mb-1">{data.degree || "Master in graphic design"}</p>
                   <p className="text-[9px] text-gray-500 leading-relaxed text-justify">Latas volum que culaimus ma ditius examdelenis eum</p>
                </div>
             </div>

             {data.edu2Degree && (
                <div className="flex mb-4">
                   <div className="w-1/4 pt-1 pr-4">
                      <div className="border border-gray-300 text-[9px] text-gray-500 py-1 px-2 text-center rounded">{data.edu2Year}</div>
                   </div>
                   <div className="w-3/4 pl-4 pb-2">
                      <p className="font-bold text-xs text-gray-800">{data.edu2School}</p>
                      <p className="text-[10px] text-[#d97706] mb-1">{data.edu2Degree}</p>
                      <p className="text-[9px] text-gray-500 leading-relaxed text-justify">Latas volum que culaimus ma ditius examdelenis eum</p>
                   </div>
                </div>
             )}

             <h2 className="text-sm font-bold text-gray-800 tracking-widest uppercase mb-4 flex items-center mt-6"><span className="border-b border-gray-400 flex-1 mr-4"></span>SKILLS AND EXPERTIZE</h2>
             <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                {data.technicalSkills ? data.technicalSkills.split(',').map((s, i) => (
                   <div key={i} className="flex justify-between items-center text-[9px]">
                      <span className="text-gray-800 font-bold">{s.trim()}</span>
                      <div className="w-12 h-1.5 bg-gray-200"><div className="bg-[#b45309] h-full" style={{width: Math.floor(Math.random() * 40 + 60) + '%'}}></div></div>
                   </div>
                )) : (
                   <>
                      <div className="flex justify-between items-center text-[9px]"><span className="text-gray-800 font-bold">Photoshop</span><div className="w-12 h-1.5 bg-gray-200"><div className="bg-[#b45309] h-full w-[90%]"></div></div></div>
                      <div className="flex justify-between items-center text-[9px]"><span className="text-gray-800 font-bold">Illustrator</span><div className="w-12 h-1.5 bg-gray-200"><div className="bg-[#b45309] h-full w-[80%]"></div></div></div>
                      <div className="flex justify-between items-center text-[9px]"><span className="text-gray-800 font-bold">Dreamweaver</span><div className="w-12 h-1.5 bg-gray-200"><div className="bg-[#b45309] h-full w-[70%]"></div></div></div>
                      <div className="flex justify-between items-center text-[9px]"><span className="text-gray-800 font-bold">After Effects</span><div className="w-12 h-1.5 bg-gray-200"><div className="bg-[#b45309] h-full w-[60%]"></div></div></div>
                      <div className="flex justify-between items-center text-[9px]"><span className="text-gray-800 font-bold">Ms Word</span><div className="w-12 h-1.5 bg-gray-200"><div className="bg-[#b45309] h-full w-[95%]"></div></div></div>
                      <div className="flex justify-between items-center text-[9px]"><span className="text-gray-800 font-bold">Ms Excel</span><div className="w-12 h-1.5 bg-gray-200"><div className="bg-[#b45309] h-full w-[85%]"></div></div></div>
                   </>
                )}
             </div>
          </div>
       </div>
    </div>
  );

  const renderDesignerCharcoal = (data: any) => (
    <div className="bg-[#3b3b3b] w-[210mm] min-h-[297mm] shadow-2xl shrink-0 font-sans text-gray-200 flex flex-col relative overflow-hidden">
       {/* Background accents */}
       <div className="absolute top-0 left-0 w-[40%] h-full bg-[#3b3b3b] z-0"></div>
       <div className="absolute top-0 right-0 w-[60%] h-full bg-white z-0"></div>
       
       <div className="relative z-10 flex flex-col h-full">
          {/* Header */}
          <div className="flex pt-12 pl-12 h-48">
             <div className="w-[30%]">
                <div className="w-36 h-36 rounded-full border-4 border-[#eab308] overflow-hidden bg-gray-300 relative">
                   {data.photo ? <img src={data.photo} className="w-full h-full object-cover" alt="Profile" /> : <div className="w-full h-full bg-[#f97316]"></div>}
                </div>
             </div>
             <div className="w-[70%] pl-8 pt-4">
                <h1 className="text-5xl font-serif text-white tracking-wider mb-2">{data.name || "Ornela Smith"}</h1>
                <p className="text-sm tracking-[0.3em] text-gray-300 uppercase pl-1">{data.profession || data.role || "Graphic Designer"}</p>
             </div>
          </div>

          <div className="flex flex-1 mt-4">
             {/* Left Column */}
             <div className="w-[35%] pl-8 pr-4">
                <div className="relative mb-8 mt-4">
                   <div className="bg-transparent border-2 border-[#eab308] rounded-full px-4 py-2 absolute -top-1 -left-1 w-full h-full"></div>
                   <h2 className="bg-[#4b4b4b] text-white font-bold tracking-widest uppercase px-4 py-1.5 rounded-full relative z-10 w-full text-center">CONTACT ME:</h2>
                </div>
                <div className="text-[10px] space-y-4 font-bold text-gray-300 mb-12 px-2">
                   <div className="flex items-start gap-3">
                      <span className="text-[#eab308] text-lg">☎</span>
                      <div><p className="text-gray-400 font-normal mb-0.5">Phone</p><p>{data.phone || "123-456-5425"}</p></div>
                   </div>
                   <div className="flex items-start gap-3">
                      <span className="text-[#eab308] text-lg">🌐</span>
                      <div><p className="text-gray-400 font-normal mb-0.5">Web</p><p className="break-all">{data.portfolio || "contactme@email.com\\nwww.contactme.com"}</p></div>
                   </div>
                   <div className="flex items-start gap-3">
                      <span className="text-[#eab308] text-lg">📍</span>
                      <div><p className="text-gray-400 font-normal mb-0.5">Address</p><p>{data.address || "123, Street, Odiaho,\\nNew York City, USA"}</p></div>
                   </div>
                </div>

                <div className="relative mb-8">
                   <div className="bg-transparent border-2 border-[#eab308] rounded-full px-4 py-2 absolute -top-1 -left-1 w-full h-full"></div>
                   <h2 className="bg-[#4b4b4b] text-white font-bold tracking-widest uppercase px-4 py-1.5 rounded-full relative z-10 w-full text-center">SKILLS</h2>
                </div>
                <div className="space-y-4 mb-12 px-2">
                   {data.technicalSkills ? data.technicalSkills.split(',').slice(0,5).map((s, i) => (
                      <div key={i}>
                         <p className="text-[10px] text-gray-300 mb-1">{s.trim()}</p>
                         <div className="w-full h-1.5 bg-gray-600"><div className="h-full bg-[#eab308]" style={{width: Math.floor(Math.random() * 40 + 60) + '%'}}></div></div>
                      </div>
                   )) : (
                      <>
                         <div><p className="text-[10px] text-gray-300 mb-1">Photoshop</p><div className="w-full h-1.5 bg-gray-600"><div className="h-full bg-[#eab308] w-[90%]"></div></div></div>
                         <div><p className="text-[10px] text-gray-300 mb-1">Illustrator</p><div className="w-full h-1.5 bg-gray-600"><div className="h-full bg-[#eab308] w-[80%]"></div></div></div>
                         <div><p className="text-[10px] text-gray-300 mb-1">Indesign</p><div className="w-full h-1.5 bg-gray-600"><div className="h-full bg-[#eab308] w-[70%]"></div></div></div>
                         <div><p className="text-[10px] text-gray-300 mb-1">Microsoft Word</p><div className="w-full h-1.5 bg-gray-600"><div className="h-full bg-[#eab308] w-[60%]"></div></div></div>
                      </>
                   )}
                </div>

                <div className="relative mb-8">
                   <div className="bg-transparent border-2 border-[#eab308] rounded-full px-4 py-2 absolute -top-1 -left-1 w-full h-full"></div>
                   <h2 className="bg-[#4b4b4b] text-white font-bold tracking-widest uppercase px-4 py-1.5 rounded-full relative z-10 w-full text-center">LANGUAGE</h2>
                </div>
                <div className="flex justify-between px-2 text-center text-[9px] text-gray-300">
                   {data.languages ? data.languages.split(',').slice(0,3).map((l, i) => (
                      <div key={i}>
                         <div className="w-10 h-10 rounded-full bg-[#eab308] text-[#3b3b3b] font-bold flex items-center justify-center mx-auto mb-1">100%</div>
                         <p>{l.split('(')[0].trim()}</p>
                      </div>
                   )) : (
                      <>
                         <div><div className="w-10 h-10 rounded-full bg-[#eab308] text-[#3b3b3b] font-bold flex items-center justify-center mx-auto mb-1">100%</div><p>English</p></div>
                         <div><div className="w-10 h-10 rounded-full bg-[#eab308] text-[#3b3b3b] font-bold flex items-center justify-center mx-auto mb-1">100%</div><p>Spanish</p></div>
                         <div><div className="w-10 h-10 rounded-full bg-[#eab308] text-[#3b3b3b] font-bold flex items-center justify-center mx-auto mb-1">100%</div><p>French</p></div>
                      </>
                   )}
                </div>
             </div>

             {/* Right Column */}
             <div className="w-[65%] pl-6 pr-12 pt-4">
                <div className="flex items-center mb-4">
                   <div className="w-16 h-6 bg-[#4b4b4b] rounded-l-full -ml-6"></div>
                   <h2 className="text-lg font-bold text-gray-800 tracking-widest uppercase ml-4">PROFILE</h2>
                </div>
                <div className="w-full h-[1px] bg-gray-800 mb-4"></div>
                <p className="text-[10px] text-gray-600 leading-relaxed text-justify mb-8">
                   {data.summary || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
                </p>

                <div className="flex items-center mb-4">
                   <div className="w-16 h-6 bg-[#4b4b4b] rounded-l-full -ml-6"></div>
                   <h2 className="text-lg font-bold text-gray-800 tracking-widest uppercase ml-4">EXPERIENCE</h2>
                </div>
                <div className="w-full h-[1px] bg-gray-800 mb-6"></div>
                
                <div className="flex mb-6 text-gray-800">
                   <div className="w-1/3">
                      <div className="flex items-start gap-2">
                         <div className="w-2 h-2 bg-[#eab308] mt-1"></div>
                         <div>
                            <p className="text-[9px] font-bold">Year: {data.expDuration || "2005-2007"}</p>
                            <p className="text-[9px] font-bold">{data.company || "Your College name here"}</p>
                         </div>
                      </div>
                   </div>
                   <div className="w-2/3 pl-2">
                      <p className="text-[10px] font-bold mb-1 uppercase">{data.role || "NAME OF CERTIFICATION"}</p>
                      <p className="text-[9px] text-gray-500 leading-relaxed text-justify">{data.expDescription || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore."}</p>
                   </div>
                </div>

                {data.exp2Role && (
                   <div className="flex mb-6 text-gray-800">
                      <div className="w-1/3">
                         <div className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-[#eab308] mt-1"></div>
                            <div>
                               <p className="text-[9px] font-bold">Year: {data.exp2Duration}</p>
                               <p className="text-[9px] font-bold">{data.exp2Company}</p>
                            </div>
                         </div>
                      </div>
                      <div className="w-2/3 pl-2">
                         <p className="text-[10px] font-bold mb-1 uppercase">{data.exp2Role}</p>
                         <p className="text-[9px] text-gray-500 leading-relaxed text-justify">{data.exp2Description}</p>
                      </div>
                   </div>
                )}
                
                {data.exp3Role && (
                   <div className="flex mb-8 text-gray-800">
                      <div className="w-1/3">
                         <div className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-[#eab308] mt-1"></div>
                            <div>
                               <p className="text-[9px] font-bold">Year: {data.exp3Duration}</p>
                               <p className="text-[9px] font-bold">{data.exp3Company}</p>
                            </div>
                         </div>
                      </div>
                      <div className="w-2/3 pl-2">
                         <p className="text-[10px] font-bold mb-1 uppercase">{data.exp3Role}</p>
                         <p className="text-[9px] text-gray-500 leading-relaxed text-justify">{data.exp3Description}</p>
                      </div>
                   </div>
                )}

                <div className="flex items-center mb-4 mt-2">
                   <div className="w-16 h-6 bg-[#4b4b4b] rounded-l-full -ml-6"></div>
                   <h2 className="text-lg font-bold text-gray-800 tracking-widest uppercase ml-4">EDUCATION</h2>
                </div>
                <div className="w-full h-[1px] bg-gray-800 mb-6"></div>
                
                <div className="flex mb-4 text-gray-800">
                   <div className="w-1/3">
                      <div className="flex items-start gap-2">
                         <div className="w-2 h-2 bg-[#eab308] mt-1"></div>
                         <div>
                            <p className="text-[9px] font-bold">Year: {data.eduYear || "2005-2007"}</p>
                            <p className="text-[9px] font-bold">{data.school || "Your College name here"}</p>
                         </div>
                      </div>
                   </div>
                   <div className="w-2/3 pl-2">
                      <p className="text-[10px] font-bold mb-1 uppercase">{data.degree || "Bachelor Of Fine Arts"}</p>
                      <p className="text-[9px] text-gray-500 leading-relaxed text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p>
                   </div>
                </div>

                {data.edu2Degree && (
                   <div className="flex mb-4 text-gray-800">
                      <div className="w-1/3">
                         <div className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-[#eab308] mt-1"></div>
                            <div>
                               <p className="text-[9px] font-bold">Year: {data.edu2Year}</p>
                               <p className="text-[9px] font-bold">{data.edu2School}</p>
                            </div>
                         </div>
                      </div>
                      <div className="w-2/3 pl-2">
                         <p className="text-[10px] font-bold mb-1 uppercase">{data.edu2Degree}</p>
                         <p className="text-[9px] text-gray-500 leading-relaxed text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p>
                      </div>
                   </div>
                )}
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
  `  { id: 'animator-blue', name: '2D Animator', desc: 'Dark blue header with circular stats' },
    { id: 'designer-gray', name: 'Designer Gray', desc: 'Dark gray sidebar with orange accents' },
    { id: 'designer-charcoal', name: 'Charcoal Wavy', desc: 'Charcoal background with yellow wavy labels' },
  ];\n  const experienceOptions`
);

// update switch
content = content.replace(
  /\{selectedTemplate === 'modern-yellow' && renderModernYellow\(resumeData\)\}/,
  `{selectedTemplate === 'animator-blue' && renderAnimatorBlue(resumeData)}
                    {selectedTemplate === 'designer-gray' && renderDesignerGray(resumeData)}
                    {selectedTemplate === 'designer-charcoal' && renderDesignerCharcoal(resumeData)}
                    {selectedTemplate === 'modern-yellow' && renderModernYellow(resumeData)}`
);

fs.writeFileSync('src/app/builder/page.tsx', content);
console.log('Batch 3 added!');
