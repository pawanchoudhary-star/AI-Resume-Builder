const fs = require('fs');

const filePath = 'd:\\AI Resume Builder\\resume-ai-pro\\src\\app\\builder\\page.tsx';
let content = fs.readFileSync(filePath, 'utf-8');

// 1. Insert helper variables
if (!content.includes('const getExperienceTitle =')) {
  content = content.replace(
    'const [resumeData, setResumeData] = useState({',
    `const getExperienceTitle = (uppercase = false) => {
    if (experienceLevel === 'fresher') return uppercase ? 'PROJECTS' : 'Projects';
    return uppercase ? 'EXPERIENCE' : 'Experience';
  };
  const getRoleFallback = () => experienceLevel === 'fresher' ? 'Project Title' : 'Job Title';
  const getCompanyFallback = () => experienceLevel === 'fresher' ? 'Platform' : 'Company';
  const getDescFallback = () => experienceLevel === 'fresher' ? 'Project description goes here...' : 'Job description goes here...';

  const [resumeData, setResumeData] = useState({`
  );
}

// 2. Replace the hardcoded fallbacks
content = content.replace(/\|\|\s*"Job Title"/g, '|| getRoleFallback()');
content = content.replace(/\|\|\s*"Company"/g, '|| getCompanyFallback()');
content = content.replace(/\|\|\s*"Job description goes here\.\.\."/g, '|| getDescFallback()');
content = content.replace(/\|\|\s*"Description\.\.\."/g, '|| getDescFallback()');
content = content.replace(/\|\|\s*"Experience details\.\.\."/g, '|| getDescFallback()');
content = content.replace(/\|\|\s*"Description of work experience\.\.\."/g, '|| getDescFallback()');
content = content.replace(/\|\|\s*"Detailed job description\.\.\."/g, '|| getDescFallback()');
content = content.replace(/\|\|\s*"Description of work\.\.\."/g, '|| getDescFallback()');

// 3. Find experience blocks and wrap them
// The blocks generally start with <h2 or <h3 containing Experience or Achievements or EXPERTISE (wait, expertise is skills)
// They end with a </div>.
// We'll use a replacer function to wrap them in {experienceLevel !== 'student' && ( <> ... </> )}

const regex = /(<h[23][^>]*>.*?(?:Experience|EXPERIENCE|Achievements).*?<\/h[23]>\s*<div[^>]*>[\s\S]*?(?:data\.role|getRoleFallback)[\s\S]*?<\/div>)/g;

let matchCount = 0;
content = content.replace(regex, (match) => {
  matchCount++;
  
  // Also replace the hardcoded "Experience" with {getExperienceTitle()}
  let updatedMatch = match;
  updatedMatch = updatedMatch.replace(/>\s*Experience\s*<\/h[23]>/, '>{getExperienceTitle()}</h2$2>'); // wait, we don't know if it's h2 or h3.
  updatedMatch = updatedMatch.replace(/>\s*(?:Experience|EXPERIENCE|Work Experience|WORK EXPERIENCE)\s*<\/h2>/i, '>{getExperienceTitle()}</h2$2>');
  // A safer replace:
  updatedMatch = updatedMatch.replace(/>\s*(?:[A-Za-z\s]+)?(?:Experience|EXPERIENCE|Achievements)\s*<\/h([23])>/i, '>{getExperienceTitle()}</h$1>');

  return `{experienceLevel !== 'student' && (\n<>\n${updatedMatch}\n</>\n)}`;
});

console.log(`Matched and wrapped ${matchCount} experience blocks.`);

// 4. One special case: In elegant-navy, the block is Achievements.
// In yellow-geometric, it's:
// <h2 ...>Experience</h2>
// <div ...>
//   <div ...>
//      <h3 ...>{data.role ...
// It will match because of `[\s\S]*?getRoleFallback`.

fs.writeFileSync(filePath, content);
console.log('Done.');
