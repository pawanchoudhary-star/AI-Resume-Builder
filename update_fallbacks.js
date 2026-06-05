const fs = require('fs');
const filePath = 'd:\\AI Resume Builder\\resume-ai-pro\\src\\app\\builder\\page.tsx';
let content = fs.readFileSync(filePath, 'utf-8');

// Replace the existing fallback functions block with the updated one
const oldFunctions = `const getExperienceTitle = (uppercase = false) => {
    if (experienceLevel === 'fresher') return uppercase ? 'PROJECTS' : 'Projects';
    return uppercase ? 'EXPERIENCE' : 'Experience';
  };
  const getRoleFallback = () => experienceLevel === 'fresher' ? 'Project Title' : 'Job Title';
  const getCompanyFallback = () => experienceLevel === 'fresher' ? 'Platform' : 'Company';
  const getDescFallback = () => experienceLevel === 'fresher' ? 'Project description goes here...' : 'Job description goes here...';`;

const newFunctions = `const getExperienceTitle = (uppercase = false) => {
    if (experienceLevel === 'student') return '';
    if (experienceLevel === 'fresher') return uppercase ? 'PROJECTS' : 'Projects';
    return uppercase ? 'EXPERIENCE' : 'Experience';
  };
  const getRoleFallback = () => {
    if (experienceLevel === 'student') return '';
    return experienceLevel === 'fresher' ? 'Project Title' : 'Job Title';
  };
  const getCompanyFallback = () => {
    if (experienceLevel === 'student') return '';
    return experienceLevel === 'fresher' ? 'Platform' : 'Company';
  };
  const getDescFallback = () => {
    if (experienceLevel === 'student') return '';
    return experienceLevel === 'fresher' ? 'Project description goes here...' : 'Job description goes here...';
  };
  const getDurationFallback = () => {
    if (experienceLevel === 'student') return '';
    return experienceLevel === 'fresher' ? 'Duration' : 'Duration';
  };`;

content = content.replace(oldFunctions, newFunctions);
content = content.replace(/\|\|\s*"Duration"/g, '|| getDurationFallback()');
content = content.replace(/\|\|\s*"Date - Date"/g, '|| getDurationFallback()');

// If student, hide bullet points or extra text with CSS by injecting a global class
// We can wrap the templates inside a div with className={experienceLevel === 'student' ? 'student-mode' : ''}
// And inject CSS to hide empty paragraphs, etc. But just returning empty is good enough for now.

fs.writeFileSync(filePath, content);
console.log('Fallbacks updated');
