const fs = require('fs');
let code = fs.readFileSync('src/app/builder/page.tsx', 'utf8');

const newTemplates = `
    { id: 'teacher-blue', name: 'Certified Teacher', desc: 'Blue left sidebar with hexagon photo' },
    { id: 'ads-expert-black', name: 'Ads Expert Black', desc: 'Black sidebar with yellow progress bars' },
    { id: 'marketing-orange', name: 'Marketing Manager', desc: 'Orange corner circles, minimal layout' },
    { id: 'designer-brown', name: 'Graphic Designer Brown', desc: 'Elegant brown design with pill headers' },
    { id: 'animator-blue', name: '2D Animator', desc: 'Solid blue top with circular skill charts' },
    { id: 'designer-gray', name: 'Graphic & Web Designer', desc: 'Dark gray sidebar, warm orange accents' },
    { id: 'designer-charcoal', name: 'Graphic Designer Charcoal', desc: 'Sleek charcoal design with yellow waves' },
    { id: 'designer-yellow', name: 'Graphics Designer Yellow', desc: 'Striking black background with yellow bars' },
    { id: 'designer-tan', name: 'Roy Alexander Designation', desc: 'Professional tan sidebar, dark header' },
    { id: 'orange-modern', name: 'Orange Modern', desc: 'Navy blue and orange layout' },
    { id: 'peach-geometric', name: 'Peach Geometric', desc: 'Geometric peach background layout' },
    { id: 'grey-elegant', name: 'Grey Elegant', desc: 'Sophisticated grey background with pill timeline' },
    { id: 'blue-intern', name: 'Blue Intern', desc: 'Light blue sidebar with volunteer section' },
  ];
`;

code = code.replace(
  /\{\s*id:\s*'student-job'.*?\},[\r\n\s]*\];/,
  "{ id: 'student-job', name: 'Student Job', desc: 'Tan diagonal elements, clear layout' }," + newTemplates
);

fs.writeFileSync('src/app/builder/page.tsx', code);
console.log('Fixed templates dropdown array!');
