const fs = require('fs');

let code = fs.readFileSync('src/app/builder/page.tsx', 'utf8');

const missingThumbnails = `                          {t.id === 'teacher-blue' && renderTeacherBlue(dummyData)}
                          {t.id === 'ads-expert-black' && renderAdsExpert(dummyData)}
                          {t.id === 'marketing-orange' && renderMarketingOrange(dummyData)}
                          {t.id === 'designer-brown' && renderDesignerBrown(dummyData)}
                          {t.id === 'animator-blue' && renderAnimatorBlue(dummyData)}
                          {t.id === 'designer-gray' && renderDesignerGray(dummyData)}
                          {t.id === 'designer-charcoal' && renderDesignerCharcoal(dummyData)}
                          {t.id === 'designer-yellow' && renderDesignerYellow(dummyData)}
                          {t.id === 'designer-tan' && renderDesignerTan(dummyData)}
                          {t.id === 'orange-modern' && renderOrangeModern(dummyData)}
                          {t.id === 'peach-geometric' && renderPeachGeometric(dummyData)}
                          {t.id === 'grey-elegant' && renderGreyElegant(dummyData)}
                          {t.id === 'blue-intern' && renderBlueIntern(dummyData)}`;

const searchThumb = "{t.id === 'student-job' && renderStudentJob(dummyData)}";
if (code.includes(searchThumb) && !code.includes("{t.id === 'teacher-blue' && renderTeacherBlue(dummyData)}")) {
    code = code.replace(searchThumb, searchThumb + '\n' + missingThumbnails);
}

const missingPreviews = `                    {selectedTemplate === 'teacher-blue' && renderTeacherBlue(resumeData)}
                    {selectedTemplate === 'ads-expert-black' && renderAdsExpert(resumeData)}
                    {selectedTemplate === 'marketing-orange' && renderMarketingOrange(resumeData)}
                    {selectedTemplate === 'designer-brown' && renderDesignerBrown(resumeData)}
                    {selectedTemplate === 'animator-blue' && renderAnimatorBlue(resumeData)}
                    {selectedTemplate === 'designer-gray' && renderDesignerGray(resumeData)}
                    {selectedTemplate === 'designer-charcoal' && renderDesignerCharcoal(resumeData)}
                    {selectedTemplate === 'designer-yellow' && renderDesignerYellow(resumeData)}
                    {selectedTemplate === 'designer-tan' && renderDesignerTan(resumeData)}
                    {selectedTemplate === 'orange-modern' && renderOrangeModern(resumeData)}
                    {selectedTemplate === 'peach-geometric' && renderPeachGeometric(resumeData)}
                    {selectedTemplate === 'grey-elegant' && renderGreyElegant(resumeData)}
                    {selectedTemplate === 'blue-intern' && renderBlueIntern(resumeData)}`;

const searchPreview = "{selectedTemplate === 'student-job' && renderStudentJob(resumeData)}";
if (code.includes(searchPreview) && !code.includes("{selectedTemplate === 'teacher-blue' && renderTeacherBlue(resumeData)}")) {
    code = code.replace(searchPreview, searchPreview + '\n' + missingPreviews);
}

fs.writeFileSync('src/app/builder/page.tsx', code);
console.log('Fixed missing templates in renders!');
