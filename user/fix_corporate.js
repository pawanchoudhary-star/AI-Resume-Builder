const fs = require('fs');
let c = fs.readFileSync('src/app/builder/page.tsx', 'utf8');

c = c.replace(
`            {experienceLevel !== 'student' && (
<>
<h2 className="text-[#1e40af] text-xl font-bold uppercase border-b-2 border-[#1e40af] pb-1 mb-4">{getExperienceTitle()}</h2>
            <div className="mb-4">
               <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-gray-900">{data.role || getRoleFallback()}</h3>
                  <span className="text-sm text-gray-500 font-medium">{data.expDuration || "Date - Date"}</span>
               </div>
</>
)}
               <p className="text-[#1e40af] font-medium text-sm mb-2">{data.company || "Company Name"}</p>
               <p className="text-sm text-gray-700 whitespace-pre-line">{data.expDescription || "Describe your responsibilities and achievements..."}</p>
            </div>`,
`            {experienceLevel !== 'student' && (
<>
<h2 className="text-[#1e40af] text-xl font-bold uppercase border-b-2 border-[#1e40af] pb-1 mb-4">{getExperienceTitle()}</h2>
            <div className="mb-4">
               <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-gray-900">{data.role || getRoleFallback()}</h3>
                  <span className="text-sm text-gray-500 font-medium">{data.expDuration || "Date - Date"}</span>
               </div>
               <p className="text-[#1e40af] font-medium text-sm mb-2">{data.company || "Company Name"}</p>
               <p className="text-sm text-gray-700 whitespace-pre-line">{data.expDescription || "Describe your responsibilities and achievements..."}</p>
            </div>
</>
)}`
);

fs.writeFileSync('src/app/builder/page.tsx', c);
