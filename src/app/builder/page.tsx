"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export default function Builder() {
  const router = useRouter();

  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [experienceLevel, setExperienceLevel] = useState('experienced');
  const isLoggedIn = false; 

  const getExperienceTitle = (uppercase = false) => {
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
  };

  const [resumeData, setResumeData] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    summary: '',
    degree: '',
    school: '',
    eduYear: '',
    role: '',
    company: '',
    expDuration: '',
    expDescription: '',
    skills: '',
    hobbies: '',
    photo: ''
  });

  const dummyData = {
    name: 'Alex Johnson',
    email: 'alex.j@example.com',
    phone: '+1 234 567 8900',
    linkedin: 'linkedin.com/in/alexj',
    summary: 'A highly motivated and results-driven professional with a strong track record of success in developing innovative solutions. Experienced in leading teams and managing complex projects from conception to completion.',
    degree: 'B.Sc. in Computer Science',
    school: 'Stanford University',
    eduYear: '2016 - 2020',
    role: 'Senior Product Manager',
    company: 'Tech Innovations Inc.',
    expDuration: 'Jan 2021 - Present',
    expDescription: '• Spearheaded the development of a new AI-driven product, resulting in a 30% increase in user engagement.\n• Led a cross-functional team of 15 engineers and designers.\n• Improved operational efficiency by 40% through process optimization.',
    skills: 'Product Management, Agile, UI/UX Design, Data Analysis, Leadership',
    hobbies: 'Photography, Traveling, Hiking, Reading',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80' // Professional man in suit
  };

  const templates = [
    { id: 'modern-yellow', name: 'Modern Yellow', desc: 'Creative & vibrant with circular header' },
    { id: 'classic-sidebar', name: 'Classic Sidebar', desc: 'Professional with a distinct left column' },
    { id: 'dark-sidebar', name: 'Dark Profile', desc: 'Bold dark sidebar with elegant typography' },
    { id: 'minimalist', name: 'Minimalist Clean', desc: 'Simple, spacious, and ATS-friendly' },
    { id: 'corporate-blue', name: 'Corporate Blue', desc: 'Standard business layout with blue accents' },
    { id: 'creative-split', name: 'Creative Split', desc: 'Modern split-screen design' },
    { id: 'bold-red', name: 'Bold Red', desc: 'Striking red header with structured columns' },
    { id: 'elegant-navy', name: 'Elegant Navy', desc: 'Sophisticated navy and gold layout' },
    { id: 'monochrome-bold', name: 'Monochrome Bold', desc: 'High-contrast black and white design' },
    { id: 'elegant-beige', name: 'Elegant Beige', desc: 'Soft tones with a touch of luxury' },
    { id: 'modern-taupe', name: 'Modern Taupe', desc: 'Elegant taupe sidebar with clean right column' },
    { id: 'teal-peach', name: 'Teal & Peach', desc: 'Stylish color block design with teal sidebar' },
    { id: 'brown-arch', name: 'Brown Arch', desc: 'Trendy arch design with earthy brown tones' },
    { id: 'yellow-geometric', name: 'Yellow Geometric', desc: 'Dynamic black and yellow diagonal layout' },
    { id: 'peach-soft', name: 'Peach Soft', desc: 'Soft pastel colors with organic shapes' },
    { id: 'green-corporate', name: 'Green Corporate', desc: 'Professional dark green sidebar layout' }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setResumeData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setResumeData(prev => ({ ...prev, photo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateResume = () => {
    alert("Resume saved successfully!");
  };

  const handleCreateWithAI = () => {
    setIsAiGenerating(true);
    setTimeout(() => {
      setResumeData(prev => ({
        ...prev,
        summary: prev.summary ? prev.summary + " (Enhanced by AI: Demonstrated strong leadership and problem-solving skills.)" : "A highly motivated professional with excellent problem-solving skills, enhanced by AI.",
        expDescription: prev.expDescription ? prev.expDescription + " (AI Optimized: Increased efficiency by 40%.)" : "AI Optimized: Spearheaded key initiatives that resulted in a 40% increase in operational efficiency."
      }));
      setIsAiGenerating(false);
    }, 2000);
  };

  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    const element = document.getElementById('resume-preview-container');
    if (!element || !selectedTemplate) {
      alert("Please select a template first!");
      return;
    }
    
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(element, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${resumeData.name ? resumeData.name.replace(/\s+/g, '_') : 'Resume'}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("An error occurred while generating the PDF. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  // --- TEMPLATE RENDERERS ---

  const renderModernYellow = (data: any) => (
    <div className="bg-white text-black w-[210mm] min-h-[297mm] shadow-2xl flex flex-col relative overflow-hidden shrink-0">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#facc15] rounded-bl-full z-0"></div>
      <div className="relative z-10 p-10">
        <div className="flex justify-between items-center mb-8 border-b-4 border-[#facc15] pb-6">
          <div className="w-2/3">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 mb-2">{data.name || "Your Name"}</h1>
            <p className="text-xl text-[#ca8a04] font-semibold tracking-widest uppercase">{data.role || "Professional Title"}</p>
          </div>
          <div className="w-1/3 flex justify-end">
            <div className="w-32 h-32 bg-gray-200 rounded-full border-4 border-white shadow-lg overflow-hidden flex items-center justify-center text-gray-400">
               {data.photo ? <img src={data.photo} className="w-full h-full object-cover" alt="Profile" /> : "Photo"}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div>
             <h2 className="text-xl font-bold flex items-center gap-2 mb-4"><span className="w-8 h-8 rounded-full bg-[#facc15] flex items-center justify-center">🎓</span> Education</h2>
             <div className="mb-6">
               <p className="font-bold">{data.degree || "Degree Program"}</p>
               <p className="text-gray-600">{data.school || "University Name"} • {data.eduYear || "Year"}</p>
             </div>
             
             <h2 className="text-xl font-bold flex items-center gap-2 mb-4 mt-8"><span className="w-8 h-8 rounded-full bg-[#facc15] flex items-center justify-center">💼</span>{getExperienceTitle()}</h2>
             <div>
               <p className="font-bold">{data.role || getRoleFallback()} at {data.company || getCompanyFallback()}</p>
               <p className="text-gray-500 text-sm mb-2">{data.expDuration || getDurationFallback()}</p>
               <p className="text-sm text-gray-700 whitespace-pre-line">{data.expDescription || getDescFallback()}</p>
             </div>
          </div>
          
          <div>
             <h2 className="text-xl font-bold flex items-center gap-2 mb-4"><span className="w-8 h-8 rounded-full bg-[#facc15] flex items-center justify-center">💡</span> Summary</h2>
             <p className="text-sm text-gray-700 leading-relaxed mb-8">{data.summary || "Summary goes here..."}</p>

             <h2 className="text-xl font-bold flex items-center gap-2 mb-4"><span className="w-8 h-8 rounded-full bg-[#facc15] flex items-center justify-center">🎯</span> Skills & Hobbies</h2>
             <p className="text-sm text-gray-700 mb-2"><strong>Skills:</strong> {data.skills || "Add skills"}</p>
             <p className="text-sm text-gray-700"><strong>Hobbies:</strong> {data.hobbies || "Add hobbies"}</p>
          </div>
        </div>
      </div>
      <div className="mt-auto bg-[#facc15]/10 p-6 flex flex-wrap justify-center gap-6 border-t border-[#facc15]/30">
         <span className="text-sm">📧 {data.email || "email@example.com"}</span>
         <span className="text-sm">📱 {data.phone || "+123456789"}</span>
         <span className="text-sm">🔗 {data.linkedin || "linkedin.com/in/"}</span>
      </div>
    </div>
  );

  const renderClassicSidebar = (data: any) => (
    <div className="bg-white text-black w-[210mm] min-h-[297mm] shadow-2xl flex border-t-[16px] border-[#facc15] shrink-0">
      {/* Sidebar */}
      <div className="w-1/3 bg-gray-100 p-8 border-r border-gray-200">
         <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-8 border-4 border-white shadow overflow-hidden">
            {data.photo && <img src={data.photo} className="w-full h-full object-cover" alt="Profile" />}
         </div>
         
         <h2 className="text-[#1e3a8a] font-bold tracking-widest border-b border-gray-300 pb-2 mb-4">CONTACT</h2>
         <div className="space-y-3 text-sm text-gray-700 mb-8">
            <p className="flex flex-col"><strong>Phone:</strong> {data.phone || "Your Number"}</p>
            <p className="flex flex-col"><strong>Email:</strong> {data.email || "Your Email"}</p>
            <p className="flex flex-col break-all"><strong>LinkedIn:</strong> {data.linkedin || "Your Profile"}</p>
         </div>

         <h2 className="text-[#1e3a8a] font-bold tracking-widest border-b border-gray-300 pb-2 mb-4">SKILLS</h2>
         <p className="text-sm text-gray-700 mb-8 leading-relaxed">{data.skills || "List your skills here..."}</p>

         <h2 className="text-[#1e3a8a] font-bold tracking-widest border-b border-gray-300 pb-2 mb-4">HOBBIES</h2>
         <p className="text-sm text-gray-700 leading-relaxed">{data.hobbies || "List your hobbies here..."}</p>
      </div>
      
      {/* Main Content */}
      <div className="w-2/3 p-8">
         <div className="bg-[#1e3a8a] text-white p-6 -mt-8 -mr-8 mb-8">
            <h1 className="text-3xl font-bold uppercase tracking-widest">{data.name || "[YOUR FULL NAME]"}</h1>
         </div>

         <h2 className="text-[#1e3a8a] font-bold tracking-widest border-b border-gray-300 pb-2 mb-4 flex items-center gap-2">👤 CAREER OBJECTIVE</h2>
         <p className="text-sm text-gray-700 mb-8">{data.summary || "Summary text here..."}</p>

         <h2 className="text-[#1e3a8a] font-bold tracking-widest border-b border-gray-300 pb-2 mb-4 flex items-center gap-2">💼 EXPERIENCE</h2>
         <div className="mb-8 border-l-2 border-[#1e3a8a] pl-4 ml-2">
            <h3 className="font-bold">{data.role || getRoleFallback()} - {data.company || getCompanyFallback()}</h3>
            <p className="text-sm text-gray-500 mb-2">{data.expDuration || getDurationFallback()}</p>
            <p className="text-sm text-gray-700 whitespace-pre-line">{data.expDescription || getDescFallback()}</p>
         </div>

         <h2 className="text-[#1e3a8a] font-bold tracking-widest border-b border-gray-300 pb-2 mb-4 flex items-center gap-2">🎓 EDUCATION</h2>
         <div className="border-l-2 border-[#1e3a8a] pl-4 ml-2">
            <h3 className="font-bold">{data.degree || "Degree"}</h3>
            <p className="text-sm text-gray-700">{data.school || "University"} • {data.eduYear || "Year"}</p>
         </div>
      </div>
    </div>
  );

  const renderDarkSidebar = (data: any) => (
    <div className="bg-white text-black w-[210mm] min-h-[297mm] shadow-2xl flex shrink-0">
      {/* Dark Sidebar */}
      <div className="w-1/3 bg-[#1a1a1a] text-white p-8">
         <div className="w-full aspect-square bg-gray-700 mb-6 border-2 border-gray-500 overflow-hidden">
            {data.photo && <img src={data.photo} className="w-full h-full object-cover" alt="Profile" />}
         </div>
         
         <div className="space-y-2 text-xs text-gray-300 mb-8 border-b border-gray-600 pb-6">
            <p>📍 Location</p>
            <p>📱 {data.phone || "555-555-5555"}</p>
            <p className="break-all">📧 {data.email || "email@example.com"}</p>
            <p className="break-all">🔗 {data.linkedin || "linkedin.com/in/"}</p>
         </div>

         <h2 className="font-serif tracking-widest border-b border-gray-600 pb-1 mb-3 uppercase">Education</h2>
         <div className="mb-6">
            <p className="text-sm font-bold">{data.degree || "Degree"}</p>
            <p className="text-xs text-gray-400">{data.school || "University"}</p>
            <p className="text-xs text-gray-400">{data.eduYear || "Year"}</p>
         </div>

         <h2 className="font-serif tracking-widest border-b border-gray-600 pb-1 mb-3 uppercase">Skills</h2>
         <p className="text-xs text-gray-300 leading-relaxed mb-6">{data.skills || "Add your skills..."}</p>

         <h2 className="font-serif tracking-widest border-b border-gray-600 pb-1 mb-3 uppercase">Hobbies</h2>
         <p className="text-xs text-gray-300 leading-relaxed">{data.hobbies || "Add your hobbies..."}</p>
      </div>
      
      {/* Light Main Content */}
      <div className="w-2/3 p-10 bg-gray-50">
         <h1 className="text-5xl font-serif text-[#8b7355] mb-8 tracking-tighter">
            {data.name || "Terrance Ryan"}
         </h1>

         <h2 className="text-sm font-bold tracking-widest border-b border-gray-300 pb-2 mb-3">PROFESSIONAL SUMMARY</h2>
         <p className="text-sm text-gray-800 mb-8 leading-relaxed">{data.summary || "Summary goes here..."}</p>

         <h2 className="text-sm font-bold tracking-widest border-b border-gray-300 pb-2 mb-3">WORK HISTORY</h2>
         <div className="mb-8">
            <div className="flex justify-between items-baseline mb-1">
               <h3 className="font-bold text-sm">{data.role || getRoleFallback()}</h3>
               <span className="text-xs text-gray-500 font-bold">{data.expDuration || getDurationFallback()}</span>
            </div>
            <p className="text-sm text-[#8b7355] mb-2">{data.company || "Company Name"}</p>
            <p className="text-sm text-gray-700 whitespace-pre-line">{data.expDescription || getDescFallback()}</p>
         </div>
      </div>
    </div>
  );

  const renderMinimalist = (data: any) => (
    <div className="bg-white text-black w-[210mm] min-h-[297mm] shadow-2xl p-12 shrink-0">
      <div className="text-center mb-12">
         <h1 className="text-5xl font-light tracking-[0.2em] mb-2">{data.name || "JANE PORTER"}</h1>
         <p className="text-gray-500 tracking-widest uppercase">{data.role || "Professional Title"}</p>
      </div>
      
      <div className="h-1 w-full bg-gray-800 mb-8"></div>

      <div className="flex gap-12">
         {/* Left Col */}
         <div className="w-1/3">
            <h2 className="text-lg font-bold tracking-widest mb-4">CONTACT</h2>
            <div className="space-y-2 text-sm text-gray-600 mb-10">
               <p>📱 {data.phone || "+00 1234 56789"}</p>
               <p className="break-all">✉️ {data.email || "email@example.com"}</p>
               <p className="break-all">🔗 {data.linkedin || "linkedin.com/in/"}</p>
            </div>

            <h2 className="text-lg font-bold tracking-widest mb-4">EDUCATION</h2>
            <div className="mb-10 text-sm text-gray-600">
               <p className="font-bold text-gray-800">{data.degree || "Degree"}</p>
               <p className="italic">{data.school || "University"} / {data.eduYear}</p>
            </div>

            <h2 className="text-lg font-bold tracking-widest mb-4">SKILLS</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-10">{data.skills || "Your skills..."}</p>
         </div>

         {/* Right Col */}
         <div className="w-2/3 border-l border-gray-300 pl-12">
            <h2 className="text-lg font-bold tracking-widest mb-4">SUMMARY</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-10">
               {data.summary || "This is where you sell yourself and be quick recruiters only skim through..."}
            </p>

            <div className="h-px w-full bg-gray-300 mb-8"></div>

            <h2 className="text-lg font-bold tracking-widest mb-4">{getExperienceTitle()}</h2>
            <div>
               <h3 className="font-bold text-gray-800 uppercase">{data.role || getRoleFallback()}</h3>
               <p className="text-sm italic text-gray-500 mb-2">{data.company || getCompanyFallback()} / {data.expDuration}</p>
               <p className="text-sm text-gray-600 whitespace-pre-line">{data.expDescription || "Use this to give a quick short summary of your accomplishments..."}</p>
            </div>
         </div>
      </div>
    </div>
  );

  const renderCorporateBlue = (data: any) => (
    <div className="bg-white text-black w-[210mm] min-h-[297mm] shadow-2xl flex flex-col shrink-0 font-sans">
      <div className="bg-[#1e40af] text-white p-10 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold uppercase tracking-wider mb-2">{data.name || "JOHN DOE"}</h1>
          <p className="text-xl text-blue-200">{data.role || "Professional Title"}</p>
        </div>
        {data.photo && (
          <div className="w-24 h-24 rounded-full border-2 border-white overflow-hidden shadow-lg flex-shrink-0">
             <img src={data.photo} className="w-full h-full object-cover" alt="Profile" />
          </div>
        )}
      </div>
      <div className="bg-blue-50/50 p-4 flex flex-wrap justify-center gap-6 border-b border-gray-200 text-sm text-gray-700">
         <span>📧 {data.email || "email@example.com"}</span>
         <span>📱 {data.phone || "555-555-5555"}</span>
         <span>🔗 {data.linkedin || "linkedin.com/in/"}</span>
      </div>
      <div className="p-10 flex-1 flex flex-col gap-8">
         <section>
            <h2 className="text-[#1e40af] text-xl font-bold uppercase border-b-2 border-[#1e40af] pb-1 mb-3">Professional Summary</h2>
            <p className="text-sm text-gray-700 leading-relaxed">{data.summary || "Summary of your professional experience..."}</p>
         </section>
         <section>
            <h2 className="text-[#1e40af] text-xl font-bold uppercase border-b-2 border-[#1e40af] pb-1 mb-4">{getExperienceTitle()}</h2>
            <div className="mb-4">
               <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-gray-900">{data.role || getRoleFallback()}</h3>
                  <span className="text-sm text-gray-500 font-medium">{data.expDuration || getDurationFallback()}</span>
               </div>
               <p className="text-[#1e40af] font-medium text-sm mb-2">{data.company || "Company Name"}</p>
               <p className="text-sm text-gray-700 whitespace-pre-line">{data.expDescription || "Describe your responsibilities and achievements..."}</p>
            </div>
         </section>
         <div className="grid grid-cols-2 gap-8">
            <section>
               <h2 className="text-[#1e40af] text-xl font-bold uppercase border-b-2 border-[#1e40af] pb-1 mb-3">Education</h2>
               <h3 className="font-bold text-gray-900">{data.degree || "Degree Name"}</h3>
               <p className="text-sm text-gray-600">{data.school || "University Name"}</p>
               <p className="text-sm text-gray-500">{data.eduYear || "Graduation Year"}</p>
            </section>
            <section>
               <h2 className="text-[#1e40af] text-xl font-bold uppercase border-b-2 border-[#1e40af] pb-1 mb-3">Skills & Hobbies</h2>
               <p className="text-sm text-gray-700 mb-2"><strong>Skills:</strong> {data.skills || "Your skills..."}</p>
               <p className="text-sm text-gray-700"><strong>Hobbies:</strong> {data.hobbies || "Your hobbies..."}</p>
            </section>
         </div>
      </div>
    </div>
  );

  const renderCreativeSplit = (data: any) => (
    <div className="bg-white text-black w-[210mm] min-h-[297mm] shadow-2xl flex shrink-0 font-sans">
      <div className="w-[40%] bg-[#2c3e50] text-white p-10 flex flex-col">
         {data.photo && (
            <div className="w-32 h-32 rounded-full mx-auto mb-6 overflow-hidden border-4 border-[#34495e]">
               <img src={data.photo} className="w-full h-full object-cover" alt="Profile" />
            </div>
         )}
         <h1 className="text-3xl font-bold text-center mb-1">{data.name || "Your Name"}</h1>
         <p className="text-[#1abc9c] text-center font-medium mb-10 tracking-wide">{data.role || "Your Role"}</p>
         
         <div className="space-y-4 text-sm text-gray-300 mb-10 border-t border-gray-600 pt-6">
            <h3 className="text-white font-bold tracking-widest uppercase text-xs mb-4">Contact Info</h3>
            <p className="flex items-center gap-3"><span className="text-[#1abc9c]">✉</span> <span className="break-all">{data.email || "email@example.com"}</span></p>
            <p className="flex items-center gap-3"><span className="text-[#1abc9c]">☏</span> <span>{data.phone || "Phone Number"}</span></p>
            <p className="flex items-center gap-3"><span className="text-[#1abc9c]">🔗</span> <span className="break-all">{data.linkedin || "LinkedIn"}</span></p>
         </div>

         <div className="border-t border-gray-600 pt-6 mb-10">
            <h3 className="text-white font-bold tracking-widest uppercase text-xs mb-4">Education</h3>
            <p className="font-bold text-sm">{data.degree || "Your Degree"}</p>
            <p className="text-xs text-[#1abc9c]">{data.school || "University"}</p>
            <p className="text-xs text-gray-400">{data.eduYear || "Year"}</p>
         </div>

         <div className="border-t border-gray-600 pt-6 flex-1">
            <h3 className="text-white font-bold tracking-widest uppercase text-xs mb-4">Skills</h3>
            <p className="text-sm text-gray-300 leading-relaxed">{data.skills || "Your Skills"}</p>
         </div>
      </div>
      <div className="w-[60%] p-10 bg-[#ecf0f1]">
         <div className="mb-10">
            <h2 className="text-[#2c3e50] text-2xl font-bold border-b-2 border-[#1abc9c] pb-2 mb-4 uppercase tracking-wide">About Me</h2>
            <p className="text-sm text-gray-700 leading-relaxed">{data.summary || "Write a brief summary about yourself..."}</p>
         </div>

         <div className="mb-10">
            <h2 className="text-[#2c3e50] text-2xl font-bold border-b-2 border-[#1abc9c] pb-2 mb-4 uppercase tracking-wide">{getExperienceTitle()}</h2>
            <div className="mb-6 relative pl-6 border-l-2 border-[#1abc9c]">
               <div className="absolute w-3 h-3 bg-[#1abc9c] rounded-full -left-[7px] top-1.5"></div>
               <h3 className="font-bold text-lg text-[#2c3e50]">{data.role || getRoleFallback()}</h3>
               <p className="text-sm font-medium text-gray-500 mb-2">{data.company || getCompanyFallback()} | {data.expDuration || getDurationFallback()}</p>
               <p className="text-sm text-gray-700 whitespace-pre-line">{data.expDescription || "Job description..."}</p>
            </div>
         </div>

         <div>
            <h2 className="text-[#2c3e50] text-2xl font-bold border-b-2 border-[#1abc9c] pb-2 mb-4 uppercase tracking-wide">Hobbies</h2>
            <p className="text-sm text-gray-700 leading-relaxed">{data.hobbies || "Your Hobbies"}</p>
         </div>
      </div>
    </div>
  );

  const renderBoldRed = (data: any) => (
    <div className="bg-white text-black w-[210mm] min-h-[297mm] shadow-2xl flex flex-col shrink-0 font-sans">
      <div className="bg-[#982b35] text-white pt-12 pb-6 px-10">
         <h1 className="text-5xl font-bold tracking-widest uppercase mb-2">{data.name || "SAM RESUMGO"}</h1>
         <p className="text-sm tracking-[0.3em] uppercase">{data.role || "MARKETING MANAGER"}</p>
      </div>
      <div className="bg-[#221214] text-gray-300 px-10 py-3 text-xs flex justify-between">
         <span>✉ {data.email || "email@address.com"}</span>
         <span>☏ {data.phone || "(123) 456-7890"}</span>
         <span>🔗 {data.linkedin || "linkedin.com/in/yourname"}</span>
      </div>
      <div className="flex px-10 py-8 gap-8">
         {/* Left Col */}
         <div className="w-[55%]">
            <h2 className="text-[#982b35] font-bold tracking-widest uppercase border-b border-[#982b35] pb-2 mb-4">Key Expertise</h2>
            <div className="flex flex-wrap gap-2 mb-8">
               {data.skills ? data.skills.split(',').map((s:string,i:number)=>(
                  <span key={i} className="text-[#982b35] border border-[#982b35] px-2 py-1 text-xs font-bold text-center">{s.trim()}</span>
               )) : (
                  <>
                     <span className="text-[#982b35] border border-[#982b35] px-2 py-1 text-xs font-bold text-center w-[48%]">Strategy</span>
                     <span className="text-[#982b35] border border-[#982b35] px-2 py-1 text-xs font-bold text-center w-[48%]">Planning</span>
                  </>
               )}
            </div>
            
            <h2 className="text-[#982b35] font-bold tracking-widest uppercase border-b border-[#982b35] pb-2 mb-4">{getExperienceTitle()}</h2>
            <div className="mb-6 flex gap-4">
               <div className="w-16 h-16 bg-[#982b35] text-white flex items-center justify-center font-bold text-sm text-center shrink-0">
                  {data.expDuration ? data.expDuration.split('-')[0]?.trim() || "2022" : "2022"}
               </div>
               <div>
                  <p className="text-xs text-gray-500 mb-1">{data.company || "Company Name"}</p>
                  <h3 className="text-[#982b35] font-bold uppercase text-sm mb-2">{data.role || "Project Manager"}</h3>
                  <p className="text-xs text-gray-700 whitespace-pre-line">{data.expDescription || "Job responsibilities and achievements go here. Detailed bullet points work best."}</p>
               </div>
            </div>
         </div>
         {/* Right Col */}
         <div className="w-[45%]">
            <div className="w-32 h-40 bg-gray-200 mx-auto mb-6 border-4 border-white shadow-md overflow-hidden relative -mt-20">
               {data.photo ? <img src={data.photo} className="w-full h-full object-cover" alt="Profile" /> : <div className="w-full h-full bg-gray-300"></div>}
            </div>
            <h2 className="text-[#982b35] font-bold tracking-widest uppercase border-b border-[#982b35] pb-2 mb-4">About Me</h2>
            <p className="text-xs text-gray-700 leading-relaxed mb-8">{data.summary || "Driven and results-oriented professional with experience delivering impactful solutions..."}</p>

            <h2 className="text-[#982b35] font-bold tracking-widest uppercase border-b border-[#982b35] pb-2 mb-4">Education</h2>
            <div className="mb-8 text-xs">
               <p className="text-gray-500 mb-1">{data.school || "University Name"}</p>
               <h3 className="font-bold uppercase text-[#982b35] mb-1">{data.degree || "Degree Name"}</h3>
               <p className="text-gray-500">{data.eduYear || "2016"}</p>
            </div>

            <h2 className="text-[#982b35] font-bold tracking-widest uppercase border-b border-[#982b35] pb-2 mb-4">Hobbies</h2>
            <p className="text-xs text-gray-700 leading-relaxed">{data.hobbies || "Reading, Traveling, Coding"}</p>
         </div>
      </div>
    </div>
  );

  const renderElegantNavy = (data: any) => (
    <div className="bg-white text-black w-[210mm] min-h-[297mm] shadow-2xl flex shrink-0 font-sans">
      <div className="w-[35%] bg-[#e5e7eb] pt-8 px-6 flex flex-col relative border-t-[16px] border-[#283655]">
         <div className="w-full aspect-[3/4] bg-gray-300 border-4 border-white shadow-lg overflow-hidden mb-8 z-10 -mt-12">
            {data.photo ? <img src={data.photo} className="w-full h-full object-cover" alt="Profile" /> : null}
         </div>
         
         <div className="flex flex-col gap-6">
            <h3 className="text-center text-[#283655] font-bold tracking-widest uppercase border-y border-gray-400 py-1 mb-2">Passions</h3>
            <p className="text-xs text-center text-gray-600 mb-4">{data.hobbies || "Music, Photography, Reading"}</p>
            
            <h3 className="text-center text-[#283655] font-bold tracking-widest uppercase border-y border-gray-400 py-1 mb-2">Contact</h3>
            <div className="text-xs text-gray-700 space-y-2 mb-4">
               <p className="flex justify-between flex-col"><strong>Phone:</strong> <span>{data.phone || "555-1234"}</span></p>
               <p className="flex justify-between flex-col"><strong>Email:</strong> <span className="break-all">{data.email || "email@example.com"}</span></p>
               <p className="flex justify-between flex-col"><strong>LinkedIn:</strong> <span className="break-all">{data.linkedin || "linkedin.com/in/"}</span></p>
            </div>

            <h3 className="text-center text-[#283655] font-bold tracking-widest uppercase border-y border-gray-400 py-1 mb-2">Certifications</h3>
            <p className="text-xs text-gray-700 text-center">{data.degree || "Degree Name"} - {data.eduYear || "2020"}</p>
         </div>
      </div>

      <div className="w-[65%] flex flex-col">
         <div className="bg-[#283655] text-white p-8 relative pt-12 pb-16">
            <div className="absolute top-4 left-0 bg-[#cda366] text-[#283655] px-6 py-1 font-bold tracking-widest text-sm uppercase">Profile</div>
            <p className="text-sm mt-6 leading-relaxed text-gray-200">{data.summary || "Thorough and meticulous professional passionate about helping businesses succeed. Possessing strong technical skills rooted in substantial training."}</p>
         </div>
         
         <div className="p-8 -mt-6">
            <div className="mb-8 border-b-2 border-gray-200 pb-6 bg-white p-6 shadow-sm rounded">
               <h1 className="text-4xl text-[#283655] tracking-widest uppercase mb-1">{data.name?.split(' ')[0] || "NADIA"} <br/><span className="font-bold">{data.name?.split(' ').slice(1).join(' ') || "PATTERSON"}</span></h1>
               <p className="text-lg text-gray-500 italic">{data.role || "Data Analyst"}</p>
            </div>
            
            <h3 className="text-[#cda366] font-bold tracking-widest uppercase flex items-center gap-2 mb-4"><span className="w-2 h-2 rounded-full bg-[#cda366]"></span> Education</h3>
            <div className="mb-6">
               <p className="font-bold text-[#283655] text-sm">{data.degree || "Bachelor's in Statistical Science"}</p>
               <p className="text-gray-500 text-xs italic mb-2">{data.school || "University Name"} | {data.eduYear || "2009 - 13"}</p>
            </div>

            <h3 className="text-[#cda366] font-bold tracking-widest uppercase flex items-center gap-2 mb-4"><span className="w-2 h-2 rounded-full bg-[#cda366]"></span>{getExperienceTitle()}</h3>
            <div className="mb-6">
               <p className="font-bold text-[#283655] text-sm">{data.role || getRoleFallback()} at {data.company || getCompanyFallback()}</p>
               <p className="text-gray-500 text-xs italic mb-2">{data.expDuration || getDurationFallback()}</p>
               <p className="text-xs text-gray-700 whitespace-pre-line leading-relaxed">{data.expDescription || "Completed market analysis resulting in sales increase..."}</p>
            </div>

            <h3 className="text-[#cda366] font-bold tracking-widest uppercase flex items-center gap-2 mb-4"><span className="w-2 h-2 rounded-full bg-[#cda366]"></span> Skills</h3>
            <p className="text-xs text-gray-700 leading-relaxed">{data.skills || "Add your skills here..."}</p>
         </div>
      </div>
    </div>
  );

  const renderMonochromeBold = (data: any) => (
    <div className="bg-white text-black w-[210mm] min-h-[297mm] shadow-2xl flex flex-col shrink-0 font-sans">
      <div className="bg-black text-white p-12 relative overflow-hidden">
         <div className="absolute right-0 top-0 w-1/2 h-full opacity-30 flex flex-wrap gap-4 p-4 pointer-events-none overflow-hidden">
            <div className="text-9xl font-black rotate-45 transform origin-center leading-none">X</div>
            <div className="text-9xl font-black rotate-12 transform origin-center leading-none mt-10">X</div>
            <div className="text-9xl font-black -rotate-12 transform origin-center leading-none -mt-10 ml-10">X</div>
         </div>
         
         <div className="relative z-10 w-2/3">
            <h1 className="text-5xl font-bold tracking-wider uppercase mb-2">{data.name || "KAI CARTER"}</h1>
            <p className="text-xl tracking-widest text-gray-400 mb-8 uppercase">{data.role || "GENERAL PRACTITIONER"}</p>
            
            <h3 className="font-bold tracking-widest uppercase text-sm mb-4">Contact</h3>
            <div className="text-xs space-y-1 text-gray-300">
               <div className="flex"><span className="w-24 font-bold">PHONE:</span> <span>{data.phone || "678-555-0103"}</span></div>
               <div className="flex"><span className="w-24 font-bold">LINKEDIN:</span> <span>{data.linkedin || "linkedin.com/in/"}</span></div>
               <div className="flex"><span className="w-24 font-bold">EMAIL:</span> <span>{data.email || "kai@healthcare.com"}</span></div>
            </div>
         </div>
      </div>

      <div className="flex flex-1 p-12 gap-12">
         {/* Left Col */}
         <div className="w-[55%]">
            <h2 className="text-xl font-bold tracking-wider uppercase mb-4 text-black border-b-2 border-black pb-2">Profile</h2>
            <p className="text-xs leading-relaxed mb-10 text-gray-800 font-medium">{data.summary || "Experienced and compassionate professional dedicated to delivering excellent work..."}</p>

            <h2 className="text-xl font-bold tracking-wider uppercase mb-6 text-black border-b-2 border-black pb-2">{getExperienceTitle()}</h2>
            <div className="mb-6">
               <h3 className="font-bold text-sm uppercase">{data.company || "LAMNA HEALTHCARE"}, <span className="font-normal text-gray-600">{data.role || "GENERAL PRACTITIONER"}</span></h3>
               <p className="text-xs font-bold text-gray-500 mb-3">{data.expDuration || "20XX - PRESENT"}</p>
               <p className="text-xs text-gray-800 font-medium leading-relaxed whitespace-pre-line">{data.expDescription || "Implemented evidence-based medicine for accurate diagnosis..."}</p>
            </div>
         </div>

         {/* Right Col */}
         <div className="w-[45%] border-l-2 border-black pl-12">
            <h2 className="text-xl font-bold tracking-wider uppercase mb-4 text-black border-b-2 border-black pb-2">Education</h2>
            <div className="mb-10">
               <h3 className="font-bold text-sm uppercase">{data.school || "JASPER UNIVERSITY"}</h3>
               <p className="text-xs font-bold text-gray-500 mb-2">{data.eduYear || "20XX - 20XX"}</p>
               <p className="text-xs text-gray-800 font-medium">{data.degree || "Degree details here"}</p>
            </div>

            <h2 className="text-xl font-bold tracking-wider uppercase mb-4 text-black border-b-2 border-black pb-2">Skills</h2>
            <div className="mb-10 text-xs text-gray-800 font-medium leading-loose">
               {data.skills ? data.skills.split(',').map((s:string, i:number) => <p key={i}>• {s.trim()}</p>) : (
                  <><p>• Clinical diagnosis</p><p>• Patient-centered care</p><p>• Health promotion</p></>
               )}
            </div>

            <h2 className="text-xl font-bold tracking-wider uppercase mb-4 text-black border-b-2 border-black pb-2">Hobbies</h2>
            <div className="text-xs text-gray-800 font-medium leading-loose">
               {data.hobbies ? data.hobbies.split(',').map((s:string, i:number) => <p key={i}>• {s.trim()}</p>) : (
                  <><p>• Running</p><p>• Photography</p><p>• Traveling</p></>
               )}
            </div>
         </div>
      </div>
    </div>
  );

  const renderElegantBeige = (data: any) => (
    <div className="bg-[#fdfbf7] text-black w-[210mm] min-h-[297mm] shadow-2xl flex shrink-0 font-sans">
      <div className="w-[40%] bg-[#dcd3cb]/30 p-8 flex flex-col items-center">
         <div className="w-full aspect-[4/5] bg-gray-200 mb-6 relative overflow-hidden shadow-sm">
            {data.photo ? <img src={data.photo} className="w-full h-full object-cover" alt="Profile" /> : null}
         </div>
         <div className="bg-white border-2 border-[#dcd3cb] py-2 px-6 w-[110%] text-center -mt-12 z-10 shadow-md mb-12">
            <p className="font-bold tracking-widest uppercase text-sm">{data.role || "MBA CANDIDATE"}</p>
         </div>

         <div className="w-full text-left">
            <h2 className="text-lg text-gray-700 tracking-wider mb-4 border-b border-gray-300 pb-2">ABOUT ME</h2>
            <p className="text-xs text-gray-600 leading-relaxed mb-10">{data.summary || "MBA candidate specializing in Marketing Strategy and Digital Innovation..."}</p>

            <h2 className="text-lg text-gray-700 tracking-wider mb-4 border-b border-gray-300 pb-2">SKILLS</h2>
            <ul className="text-xs text-gray-600 leading-relaxed list-disc pl-4 mb-10">
               {data.skills ? data.skills.split(',').map((s:string, i:number) => <li key={i} className="mb-1">{s.trim()}</li>) : (
                  <><li className="mb-1">Market research</li><li className="mb-1">Data analysis</li><li className="mb-1">Communication</li></>
               )}
            </ul>
            
            <h2 className="text-lg text-gray-700 tracking-wider mb-4 border-b border-gray-300 pb-2">CONTACT</h2>
            <div className="text-xs text-gray-600 space-y-2 break-all">
               <p>✉ {data.email || "email@example.com"}</p>
               <p>☏ {data.phone || "123-456-7890"}</p>
               <p>🔗 {data.linkedin || "linkedin.com/in/"}</p>
            </div>
         </div>
      </div>

      <div className="w-[60%] p-12">
         <div className="mb-16 border-b border-gray-300 pb-8">
            <h1 className="text-6xl font-serif text-gray-800 mb-2 leading-none uppercase">{data.name?.split(' ')[0] || "SARAH"}</h1>
            <h1 className="text-5xl font-serif italic text-[#c8a97e] leading-none">{data.name?.split(' ').slice(1).join(' ') || "Samonely"}</h1>
         </div>

         <div className="mb-10">
            <h2 className="text-lg text-gray-700 font-bold tracking-widest mb-4">EDUCATION</h2>
            <div className="mb-6">
               <h3 className="font-bold text-sm text-gray-800">{data.degree || "MBA, Marketing Strategy"}</h3>
               <p className="text-xs font-bold text-gray-500 mb-1">{data.eduYear || "2023 - 2025"}</p>
               <p className="text-xs text-gray-600 italic">{data.school || "University Name"}</p>
            </div>
         </div>

         <div className="mb-10">
            <h2 className="text-lg text-gray-700 font-bold tracking-widest mb-4">{getExperienceTitle()}</h2>
            <div>
               <h3 className="font-bold text-sm text-gray-800">{data.role || getRoleFallback()}</h3>
               <p className="text-xs font-bold text-gray-500 mb-1">{data.company || getCompanyFallback()} | {data.expDuration || getDurationFallback()}</p>
               <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-line">{data.expDescription || "Description of responsibilities and impact..."}</p>
            </div>
         </div>

         <div>
            <h2 className="text-lg text-gray-700 font-bold tracking-widest mb-4">HOBBIES</h2>
            <div className="flex gap-4 text-xs font-bold text-white">
               {data.hobbies ? data.hobbies.split(',').slice(0,3).map((s:string, i:number) => (
                  <div key={i} className={`w-14 h-14 rounded-full flex items-center justify-center text-center p-1 shadow-md ${i===0?'bg-gray-700':i===1?'bg-[#e6d0bf] text-gray-800':'bg-gray-600'}`}>
                     {s.trim().substring(0,4)}
                  </div>
               )) : (
                  <>
                     <div className="w-14 h-14 rounded-full bg-gray-700 flex items-center justify-center shadow-md">READ</div>
                     <div className="w-14 h-14 rounded-full bg-[#e6d0bf] text-gray-800 flex items-center justify-center shadow-md">ART</div>
                     <div className="w-14 h-14 rounded-full bg-gray-600 flex items-center justify-center shadow-md">TECH</div>
                  </>
               )}
            </div>
         </div>
      </div>
    </div>
  );

  const renderModernTaupe = (data: any) => (
    <div className="bg-white text-black w-[210mm] min-h-[297mm] shadow-2xl flex shrink-0 font-sans">
      <div className="w-[40%] bg-[#746b61] text-white p-8 flex flex-col">
         <div className="w-40 h-40 rounded-full border-4 border-white mx-auto mb-6 overflow-hidden shadow-lg">
            {data.photo ? <img src={data.photo} className="w-full h-full object-cover" alt="Profile" /> : <div className="w-full h-full bg-gray-400"></div>}
         </div>
         <h1 className="text-4xl font-bold text-center mb-8 uppercase leading-tight">{data.name?.split(' ').join('\n') || "Hannah\nMorales"}</h1>
         
         <div className="mb-8">
            <h2 className="text-lg font-bold tracking-widest mb-4 uppercase">Education</h2>
            <div className="mb-4">
               <p className="font-bold text-sm">{data.degree || "Bachelor of Design"}</p>
               <p className="text-xs text-gray-300">{data.school || "University Name"} | {data.eduYear || "2018"}</p>
            </div>
         </div>

         <div className="mb-8">
            <h2 className="text-lg font-bold tracking-widest mb-4 uppercase">Expertise</h2>
            <div className="space-y-3 text-xs">
               {data.skills ? data.skills.split(',').map((s:string, i:number) => (
                  <div key={i} className="flex justify-between items-center">
                     <span>{s.trim()}</span>
                     <div className="w-12 h-1.5 bg-gray-400 rounded-full overflow-hidden"><div className="w-[80%] h-full bg-white rounded-full"></div></div>
                  </div>
               )) : (
                  <>
                     <div className="flex justify-between items-center"><span>Content Planning</span><div className="w-12 h-1.5 bg-gray-400 rounded-full overflow-hidden"><div className="w-[80%] h-full bg-white rounded-full"></div></div></div>
                     <div className="flex justify-between items-center"><span>Graphic Design</span><div className="w-12 h-1.5 bg-gray-400 rounded-full overflow-hidden"><div className="w-[90%] h-full bg-white rounded-full"></div></div></div>
                  </>
               )}
            </div>
         </div>

         <div>
            <h2 className="text-lg font-bold tracking-widest mb-4 uppercase">Reference</h2>
            <p className="text-xs text-gray-300 leading-relaxed break-all">
               Email: {data.email || "hello@reallygreatsite.com"}<br/>
               Phone: {data.phone || "+123-456-7890"}
            </p>
         </div>
      </div>

      <div className="w-[60%] bg-[#f5f5f5] flex flex-col relative">
         <div className="p-10 pb-6">
            <p className="text-xs text-gray-700 leading-relaxed font-medium">{data.summary || "Hello, I'm a professional who loves to engage and interact..."}</p>
         </div>
         
         <div className="bg-[#746b61] text-white py-3 px-10 text-lg font-bold tracking-widest uppercase mb-8">
            {data.role || "Social Media Manager"}
         </div>
         
         <div className="px-10 flex flex-col gap-8 flex-1">
            <div className="text-xs text-gray-800 space-y-2 font-medium">
               <p className="flex items-center gap-3"><span className="text-[#746b61]">🏠</span> 123 Anywhere St., Any City</p>
               <p className="flex items-center gap-3"><span className="text-[#746b61]">☏</span> {data.phone || "+123-456-7890"}</p>
               <p className="flex items-center gap-3"><span className="text-[#746b61]">✉</span> {data.email || "hello@reallygreatsite.com"}</p>
            </div>

            <div>
               <h2 className="text-xl font-bold tracking-widest uppercase mb-6 text-gray-900">{getExperienceTitle()}</h2>
               <div className="mb-6 relative">
                  <div className="absolute w-2 h-2 bg-[#746b61] rounded-full -left-4 top-1.5"></div>
                  <h3 className="font-bold text-sm text-gray-900">{data.role || getRoleFallback()}</h3>
                  <p className="text-xs text-gray-500 mb-2">{data.company || "Company Name"} | {data.expDuration || "May 2019 - Present"}</p>
                  <p className="text-xs text-gray-700 whitespace-pre-line leading-relaxed">{data.expDescription || "• Organizes all social media posts\n• Approves all content\n• Engages with readers online"}</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );

  const renderTealPeach = (data: any) => (
    <div className="bg-white text-black w-[210mm] min-h-[297mm] shadow-2xl flex shrink-0 font-sans relative overflow-hidden">
      {/* Background blocks */}
      <div className="absolute top-16 left-0 right-0 h-32 bg-[#e6c3b8] z-0"></div>
      
      <div className="w-[35%] bg-[#598583] h-full z-10 p-8 flex flex-col text-white ml-8 shadow-xl">
         <div className="w-32 h-32 rounded-full border-4 border-white mx-auto mt-4 mb-10 overflow-hidden shadow-lg bg-white">
            {data.photo ? <img src={data.photo} className="w-full h-full object-cover" alt="Profile" /> : null}
         </div>
         
         <div className="mb-10">
            <h2 className="text-sm font-bold tracking-widest uppercase mb-4 text-white">Profile</h2>
            <p className="text-xs text-gray-200 leading-relaxed">{data.summary || "Business Administration student. I consider myself a responsible and orderly person..."}</p>
         </div>
         
         <div className="mb-10">
            <h2 className="text-sm font-bold tracking-widest uppercase mb-4 text-white">Contact Me</h2>
            <div className="text-xs text-gray-200 space-y-3 break-all">
               <p className="flex items-center gap-2"><span>📞</span> {data.phone || "(123) 456-7890"}</p>
               <p className="flex items-center gap-2"><span>✉</span> {data.email || "hello@reallygreatsite.com"}</p>
               <p className="flex items-center gap-2"><span>📍</span> {data.linkedin || "linkedin.com/in/"}</p>
            </div>
         </div>
      </div>

      <div className="w-[65%] z-10 pt-16 px-10 bg-transparent">
         <div className="h-32 flex flex-col justify-center mb-8 pl-4">
            <h1 className="text-4xl font-bold text-gray-900 uppercase tracking-widest leading-none mb-2">{data.name?.split(' ')[0] || "OLIVIA"}<br/>{data.name?.split(' ').slice(1).join(' ') || "WILSON"}</h1>
            <p className="text-sm text-gray-700 italic">{data.role || "Student"}</p>
         </div>

         <div className="pl-4">
            <div className="mb-8">
               <h2 className="text-sm font-bold tracking-widest uppercase mb-4 text-[#598583] flex items-center gap-2"><span>➤</span> Education</h2>
               <div className="mb-4">
                  <h3 className="font-bold text-sm text-gray-800 uppercase">{data.school || "MILEMORA UNIVERSITY"}</h3>
                  <p className="text-xs text-gray-600 mb-1">{data.degree || "Business Administration career"}</p>
                  <p className="text-xs text-gray-500 italic">{data.eduYear || "2017 - 2021"}</p>
               </div>
            </div>

            <div className="mb-8">
               <h2 className="text-sm font-bold tracking-widest uppercase mb-4 text-[#598583] flex items-center gap-2"><span>➤</span>{getExperienceTitle()}</h2>
               <div className="mb-4">
                  <h3 className="font-bold text-sm text-gray-800 uppercase">{data.company || "COMPANY NAME"}</h3>
                  <p className="text-xs text-gray-600 mb-1">{data.role || "Job Role"}</p>
                  <p className="text-xs text-gray-700 whitespace-pre-line leading-relaxed">{data.expDescription || "Job description and achievements..."}</p>
               </div>
            </div>

            <div className="mb-8">
               <h2 className="text-sm font-bold tracking-widest uppercase mb-4 text-[#598583] flex items-center gap-2"><span>➤</span> Skills</h2>
               <p className="text-xs text-gray-700 leading-relaxed">{data.skills || "Text processor, Spreadsheet, Slide presentation"}</p>
            </div>
         </div>
      </div>
    </div>
  );

  const renderBrownArch = (data: any) => (
    <div className="bg-[#f8f5f1] text-black w-[210mm] min-h-[297mm] shadow-2xl flex flex-col shrink-0 font-sans">
      <div className="bg-[#8b7355] text-white p-12 flex items-center gap-10 rounded-b-[60px] shadow-lg">
         <div className="w-40 h-56 bg-white rounded-t-full rounded-b-xl border-4 border-white shadow-lg overflow-hidden shrink-0">
            {data.photo ? <img src={data.photo} className="w-full h-full object-cover" alt="Profile" /> : <div className="w-full h-full bg-gray-300"></div>}
         </div>
         <div>
            <h1 className="text-5xl font-serif mb-2">{data.name || "Aleena Josephine"}</h1>
            <p className="text-lg font-light tracking-widest uppercase text-[#e6d5c3]">{data.role || "Your Description"}</p>
         </div>
      </div>
      
      <div className="flex px-12 py-10 gap-10">
         <div className="w-1/3">
            <h2 className="text-[#8b7355] text-lg font-bold tracking-widest uppercase border-b-2 border-[#8b7355] pb-2 mb-4">About Me</h2>
            <p className="text-xs text-gray-700 leading-relaxed mb-8">{data.summary || "Passionate professional looking to excel in the industry..."}</p>
            
            <h2 className="text-[#8b7355] text-lg font-bold tracking-widest uppercase border-b-2 border-[#8b7355] pb-2 mb-4">Contact</h2>
            <div className="text-xs text-gray-700 space-y-2 mb-8 break-all">
               <p>📞 {data.phone || "123-456-7890"}</p>
               <p>✉ {data.email || "email@address.com"}</p>
               <p>📍 {data.linkedin || "linkedin.com/in/"}</p>
            </div>

            <h2 className="text-[#8b7355] text-lg font-bold tracking-widest uppercase border-b-2 border-[#8b7355] pb-2 mb-4">Skills</h2>
            <p className="text-xs text-gray-700 leading-relaxed">{data.skills || "List your skills here..."}</p>
         </div>
         
         <div className="w-2/3 pl-6 border-l border-gray-300">
            <h2 className="text-[#8b7355] text-lg font-bold tracking-widest uppercase border-b-2 border-[#8b7355] pb-2 mb-4">Education</h2>
            <div className="mb-8">
               <h3 className="font-bold text-gray-900">{data.degree || "Degree Name"}</h3>
               <p className="text-xs text-[#8b7355] font-bold">{data.eduYear || "2020"}</p>
               <p className="text-xs text-gray-600">{data.school || "University Name"}</p>
            </div>

            <h2 className="text-[#8b7355] text-lg font-bold tracking-widest uppercase border-b-2 border-[#8b7355] pb-2 mb-4">{getExperienceTitle()}</h2>
            <div className="mb-8">
               <h3 className="font-bold text-gray-900">{data.role || getRoleFallback()}</h3>
               <p className="text-xs text-[#8b7355] font-bold mb-2">{data.company || getCompanyFallback()} | {data.expDuration || getDurationFallback()}</p>
               <p className="text-xs text-gray-700 whitespace-pre-line leading-relaxed">{data.expDescription || getDescFallback()}</p>
            </div>
         </div>
      </div>
    </div>
  );

  const renderYellowGeometric = (data: any) => (
    <div className="bg-white text-black w-[210mm] min-h-[297mm] shadow-2xl flex shrink-0 font-sans relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[70%] h-48 bg-[#facc15]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 20% 100%)' }}></div>
      <div className="absolute top-0 right-0 w-[60%] h-48 bg-black" style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 100%, 30% 100%)' }}></div>
      
      <div className="w-1/3 bg-[#f3f4f6] pt-12 px-8 flex flex-col z-10 border-r border-gray-200">
         <div className="w-32 h-32 rounded-full border-4 border-[#facc15] mx-auto mb-8 overflow-hidden bg-white shadow-lg">
            {data.photo ? <img src={data.photo} className="w-full h-full object-cover" alt="Profile" /> : null}
         </div>
         
         <div className="mb-8 text-center">
            <h2 className="bg-black text-white text-xs font-bold tracking-widest uppercase py-2 px-4 inline-block mb-4">Contact</h2>
            <div className="text-xs text-gray-700 space-y-3 break-all text-left">
               <p className="flex items-center gap-3"><span className="w-6 h-6 rounded-full bg-[#facc15] flex items-center justify-center text-black font-bold">P</span> {data.phone || "123-456-7890"}</p>
               <p className="flex items-center gap-3"><span className="w-6 h-6 rounded-full bg-[#facc15] flex items-center justify-center text-black font-bold">E</span> {data.email || "email@address.com"}</p>
               <p className="flex items-center gap-3"><span className="w-6 h-6 rounded-full bg-[#facc15] flex items-center justify-center text-black font-bold">L</span> {data.linkedin || "linkedin.com/in/"}</p>
            </div>
         </div>

         <div className="mb-8 text-center">
            <h2 className="bg-black text-white text-xs font-bold tracking-widest uppercase py-2 px-4 inline-block mb-4">Skills</h2>
            <p className="text-xs text-gray-700 leading-relaxed text-left">{data.skills || "Add your skills..."}</p>
         </div>
      </div>

      <div className="w-2/3 p-12 pt-20 z-10 relative">
         <h1 className="text-5xl font-black uppercase text-white drop-shadow-md mb-2">{data.name || "YOUR NAME"}</h1>
         <p className="text-xl font-bold text-[#facc15] uppercase tracking-widest drop-shadow mb-12">{data.role || getRoleFallback()}</p>
         
         <h2 className="text-2xl font-black uppercase border-b-4 border-[#facc15] pb-1 mb-4 inline-block">Profile</h2>
         <p className="text-sm text-gray-700 leading-relaxed mb-10">{data.summary || "Summary of your profile goes here..."}</p>

         <h2 className="text-2xl font-black uppercase border-b-4 border-[#facc15] pb-1 mb-4 inline-block">{getExperienceTitle()}</h2>
         <div className="mb-10">
            <div className="flex justify-between items-baseline mb-2">
               <h3 className="font-bold text-lg uppercase">{data.role || getRoleFallback()}</h3>
               <span className="text-sm font-bold text-[#facc15] bg-black px-2 py-1">{data.expDuration || getDurationFallback()}</span>
            </div>
            <p className="text-sm font-bold text-gray-500 mb-2">{data.company || "Company Name"}</p>
            <p className="text-sm text-gray-700 whitespace-pre-line">{data.expDescription || getDescFallback()}</p>
         </div>

         <h2 className="text-2xl font-black uppercase border-b-4 border-[#facc15] pb-1 mb-4 inline-block">Education</h2>
         <div>
            <h3 className="font-bold text-lg uppercase">{data.degree || "Degree Name"}</h3>
            <p className="text-sm font-bold text-gray-500">{data.school || "University"} - {data.eduYear || "Year"}</p>
         </div>
      </div>
    </div>
  );

  const renderPeachSoft = (data: any) => (
    <div className="bg-[#fff9f5] text-gray-800 w-[210mm] min-h-[297mm] shadow-2xl flex shrink-0 font-sans relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#ffb39c] rounded-bl-full opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#ffdb58] rounded-tr-full opacity-30"></div>
      
      <div className="w-[40%] p-10 z-10 border-r border-[#ffb39c]/30">
         <div className="w-32 h-32 rounded-[2rem] rotate-12 overflow-hidden mx-auto mb-10 bg-white shadow-xl border-4 border-white">
            {data.photo ? <img src={data.photo} className="w-full h-full object-cover -rotate-12 scale-125" alt="Profile" /> : null}
         </div>
         
         <div className="mb-10">
            <h2 className="text-sm font-black tracking-widest uppercase text-[#e07a5f] mb-4">Contact</h2>
            <div className="text-xs font-medium space-y-3 break-all bg-white/50 p-4 rounded-xl shadow-sm">
               <p>📞 {data.phone || "Phone Number"}</p>
               <p>✉ {data.email || "Email Address"}</p>
               <p>📍 {data.linkedin || "LinkedIn"}</p>
            </div>
         </div>

         <div className="mb-10">
            <h2 className="text-sm font-black tracking-widest uppercase text-[#e07a5f] mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2 text-xs">
               {data.skills ? data.skills.split(',').map((s:string, i:number) => (
                  <span key={i} className="bg-[#ffb39c]/20 text-[#e07a5f] font-bold px-3 py-1 rounded-full">{s.trim()}</span>
               )) : <span className="bg-[#ffb39c]/20 text-[#e07a5f] font-bold px-3 py-1 rounded-full">Skills here</span>}
            </div>
         </div>
         
         <div>
            <h2 className="text-sm font-black tracking-widest uppercase text-[#e07a5f] mb-4">Hobbies</h2>
            <p className="text-xs font-medium leading-relaxed">{data.hobbies || "Hobbies here"}</p>
         </div>
      </div>

      <div className="w-[60%] p-12 z-10">
         <div className="mb-12">
            <h1 className="text-5xl font-black text-gray-900 mb-2">{data.name || "Alanis Jones"}</h1>
            <p className="text-lg font-bold text-[#e07a5f] tracking-widest uppercase">{data.role || getRoleFallback()}</p>
         </div>

         <div className="mb-10 bg-white/60 p-6 rounded-2xl shadow-sm">
            <h2 className="text-sm font-black tracking-widest uppercase text-[#e07a5f] mb-4">About Me</h2>
            <p className="text-sm font-medium leading-relaxed text-gray-700">{data.summary || "Summary text here..."}</p>
         </div>

         <div className="mb-10">
            <h2 className="text-sm font-black tracking-widest uppercase text-[#e07a5f] mb-6">{getExperienceTitle()}</h2>
            <div className="relative pl-6 border-l-2 border-[#ffb39c]">
               <div className="absolute w-4 h-4 bg-[#ffdb58] rounded-full -left-[9px] top-0 border-2 border-white shadow-sm"></div>
               <h3 className="font-bold text-gray-900">{data.role || getRoleFallback()}</h3>
               <p className="text-xs font-bold text-gray-500 mb-2">{data.company || getCompanyFallback()} | {data.expDuration || getDurationFallback()}</p>
               <p className="text-sm font-medium text-gray-700 whitespace-pre-line">{data.expDescription || getDescFallback()}</p>
            </div>
         </div>

         <div>
            <h2 className="text-sm font-black tracking-widest uppercase text-[#e07a5f] mb-6">Education</h2>
            <div className="relative pl-6 border-l-2 border-[#ffdb58]">
               <div className="absolute w-4 h-4 bg-[#ffb39c] rounded-full -left-[9px] top-0 border-2 border-white shadow-sm"></div>
               <h3 className="font-bold text-gray-900">{data.degree || "Degree Name"}</h3>
               <p className="text-xs font-bold text-gray-500">{data.school || "University"} | {data.eduYear || "Year"}</p>
            </div>
         </div>
      </div>
    </div>
  );

  const renderGreenCorporate = (data: any) => (
    <div className="bg-white text-black w-[210mm] min-h-[297mm] shadow-2xl flex shrink-0 font-sans">
      <div className="w-[35%] bg-[#1d5d4d] text-white p-8 flex flex-col">
         <div className="w-full aspect-square border-4 border-white/20 mb-8 overflow-hidden bg-white/10">
            {data.photo ? <img src={data.photo} className="w-full h-full object-cover" alt="Profile" /> : null}
         </div>
         
         <div className="mb-8">
            <h2 className="text-sm font-bold tracking-widest uppercase border-b border-white/30 pb-2 mb-4">Contact</h2>
            <div className="text-xs space-y-3 break-all text-gray-200">
               <p>📞 {data.phone || "Phone Number"}</p>
               <p>✉ {data.email || "Email"}</p>
               <p>📍 {data.linkedin || "LinkedIn"}</p>
            </div>
         </div>

         <div className="mb-8">
            <h2 className="text-sm font-bold tracking-widest uppercase border-b border-white/30 pb-2 mb-4">Education</h2>
            <div className="text-xs text-gray-200">
               <p className="font-bold text-white text-sm mb-1">{data.degree || "Degree"}</p>
               <p>{data.school || "University"}</p>
               <p className="italic">{data.eduYear || "Year"}</p>
            </div>
         </div>

         <div>
            <h2 className="text-sm font-bold tracking-widest uppercase border-b border-white/30 pb-2 mb-4">Skills</h2>
            <p className="text-xs text-gray-200 leading-relaxed">{data.skills || "Skills..."}</p>
         </div>
      </div>

      <div className="w-[65%] p-10">
         <div className="mb-10">
            <h1 className="text-5xl font-black uppercase text-gray-900 mb-2 tracking-tight">{data.name || "Basil Hallward"}</h1>
            <p className="text-lg font-bold text-[#1d5d4d] tracking-widest uppercase">{data.role || getRoleFallback()}</p>
         </div>

         <div className="mb-8">
            <h2 className="text-lg font-black tracking-widest uppercase text-gray-900 border-b-2 border-gray-200 pb-1 mb-4 flex items-center gap-2">
               <span className="w-6 h-6 bg-[#1d5d4d] text-white rounded flex items-center justify-center text-xs">👤</span> Profile
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed font-medium">{data.summary || "Profile summary..."}</p>
         </div>

         <div className="mb-8">
            <h2 className="text-lg font-black tracking-widest uppercase text-gray-900 border-b-2 border-gray-200 pb-1 mb-4 flex items-center gap-2">
               <span className="w-6 h-6 bg-[#1d5d4d] text-white rounded flex items-center justify-center text-xs">💼</span> Experience
            </h2>
            <div className="mb-4">
               <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-gray-900 uppercase">{data.role || getRoleFallback()}</h3>
                  <span className="text-xs font-bold text-gray-500">{data.expDuration || getDurationFallback()}</span>
               </div>
               <p className="text-sm font-bold text-[#1d5d4d] mb-2">{data.company || getCompanyFallback()}</p>
               <p className="text-sm text-gray-700 whitespace-pre-line font-medium">{data.expDescription || getDescFallback()}</p>
            </div>
         </div>
         
         <div>
            <h2 className="text-lg font-black tracking-widest uppercase text-gray-900 border-b-2 border-gray-200 pb-1 mb-4 flex items-center gap-2">
               <span className="w-6 h-6 bg-[#1d5d4d] text-white rounded flex items-center justify-center text-xs">🎯</span> Hobbies
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed font-medium">{data.hobbies || "Hobbies..."}</p>
         </div>
      </div>
    </div>
  );

  // --- TEMPLATE SELECTION VIEW ---
  if (!selectedTemplate) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col font-sans">
        <nav className="border-b border-white/10 bg-black/50 p-6 flex justify-between items-center">
          <Link href="/" className="font-bold text-xl tracking-tighter">ResumeAI <span className="text-purple-500">Pro</span></Link>
        </nav>
        
        <div className="flex-1 flex flex-col items-center p-10 mt-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Choose your Template</h1>
          <p className="text-gray-400 mb-12 text-center max-w-2xl">Select a professional design to get started. You can change the layout or colors anytime while editing your resume data.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl w-full">
             {templates.map(t => (
                <div 
                  key={t.id} 
                  onClick={() => setSelectedTemplate(t.id)}
                  className="bg-white/5 border border-white/10 rounded-2xl p-5 cursor-pointer hover:border-purple-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] hover:-translate-y-2 transition-all duration-300 group flex flex-col items-center text-center"
                >
                   {/* Fixed size wrapper for perfect scaling */}
                   <div className="w-[210px] h-[297px] bg-white rounded-xl mb-6 overflow-hidden relative border border-white/5 shadow-lg">
                      <div className="absolute top-0 left-0 origin-top-left pointer-events-none" style={{ transform: 'scale(0.2647)' }}>
                          {t.id === 'modern-yellow' && renderModernYellow(dummyData)}
                          {t.id === 'classic-sidebar' && renderClassicSidebar(dummyData)}
                          {t.id === 'dark-sidebar' && renderDarkSidebar(dummyData)}
                          {t.id === 'minimalist' && renderMinimalist(dummyData)}
                          {t.id === 'corporate-blue' && renderCorporateBlue(dummyData)}
                          {t.id === 'creative-split' && renderCreativeSplit(dummyData)}
                          {t.id === 'bold-red' && renderBoldRed(dummyData)}
                          {t.id === 'elegant-navy' && renderElegantNavy(dummyData)}
                          {t.id === 'monochrome-bold' && renderMonochromeBold(dummyData)}
                          {t.id === 'elegant-beige' && renderElegantBeige(dummyData)}
                          {t.id === 'modern-taupe' && renderModernTaupe(dummyData)}
                          {t.id === 'teal-peach' && renderTealPeach(dummyData)}
                          {t.id === 'brown-arch' && renderBrownArch(dummyData)}
                          {t.id === 'yellow-geometric' && renderYellowGeometric(dummyData)}
                          {t.id === 'peach-soft' && renderPeachSoft(dummyData)}
                          {t.id === 'green-corporate' && renderGreenCorporate(dummyData)}
                      </div>
                      
                      <div className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                   </div>
                   <h3 className="text-xl font-bold mb-2">{t.name}</h3>
                   <p className="text-sm text-gray-400">{t.desc}</p>
                </div>
             ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans flex flex-col">
      {/* Navbar */}
      <nav className="border-b border-white/10 bg-black/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-bold text-xl tracking-tighter flex items-center">
            <button onClick={() => setSelectedTemplate(null)} className="hover:text-purple-400 transition flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              <span className="hidden sm:inline">Change Template</span>
            </button>
            <span className="mx-4 text-white/20">|</span>
            <Link href="/">ResumeAI <span className="text-purple-500">Pro</span></Link>
          </div>
          <div className="flex space-x-4">
             <Link href="/login" className="text-sm font-medium px-4 py-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition">
               Save Progress (Log in)
             </Link>
          </div>
        </div>
      </nav>

      {/* Main Builder Interface */}
      <div className="flex-1 max-w-screen-2xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-64px)]">
        
        {/* Left Panel: Scrollable Form */}
        <div className="lg:col-span-1 bg-white/5 border border-white/10 rounded-xl flex flex-col h-full overflow-hidden">
           <div className="p-6 border-b border-white/10 bg-black/40">
              <h2 className="text-2xl font-bold">Resume Details</h2>
              <p className="text-gray-400 text-sm mt-1">Fill out your details below. The preview updates instantly.</p>
           </div>
           
           <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              
              {/* Experience Level Selection */}
               <section className="space-y-4">
                  <h3 className="text-lg font-semibold text-pink-400 border-b border-white/10 pb-2">Your Current Status</h3>
                  <div className="flex gap-4">
                     <label className={`flex-1 p-3 rounded-lg border cursor-pointer text-center transition ${experienceLevel === 'student' ? 'bg-pink-500/20 border-pink-500 text-pink-300' : 'bg-black border-white/10 hover:border-white/30'}`}>
                        <input type="radio" name="level" value="student" checked={experienceLevel === 'student'} onChange={(e) => setExperienceLevel(e.target.value)} className="hidden" />
                        Student
                     </label>
                     <label className={`flex-1 p-3 rounded-lg border cursor-pointer text-center transition ${experienceLevel === 'fresher' ? 'bg-pink-500/20 border-pink-500 text-pink-300' : 'bg-black border-white/10 hover:border-white/30'}`}>
                        <input type="radio" name="level" value="fresher" checked={experienceLevel === 'fresher'} onChange={(e) => setExperienceLevel(e.target.value)} className="hidden" />
                        Fresher
                     </label>
                     <label className={`flex-1 p-3 rounded-lg border cursor-pointer text-center transition ${experienceLevel === 'experienced' ? 'bg-pink-500/20 border-pink-500 text-pink-300' : 'bg-black border-white/10 hover:border-white/30'}`}>
                        <input type="radio" name="level" value="experienced" checked={experienceLevel === 'experienced'} onChange={(e) => setExperienceLevel(e.target.value)} className="hidden" />
                        Experienced
                     </label>
                  </div>
               </section>

               {/* Personal Info */}
               <section className="space-y-4">
                 <h3 className="text-lg font-semibold text-purple-400 border-b border-white/10 pb-2">Personal Information</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1">Full Name</label>
                      <input type="text" name="name" value={resumeData.name} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition" placeholder="e.g. Pawan Choudhary" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1">Email Address</label>
                      <input type="email" name="email" value={resumeData.email} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition" placeholder="you@example.com" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium text-gray-400 mb-1">Phone Number</label>
                      <input type="text" name="phone" value={resumeData.phone} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition" placeholder="+91 98765 43210" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium text-gray-400 mb-1">Upload Photo</label>
                      <input type="file" accept="image/*" onChange={handlePhotoUpload} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-500 file:text-white hover:file:bg-purple-600" />
                    </div>
                 </div>
                 <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">Professional Summary</label>
                    <textarea name="summary" value={resumeData.summary} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition h-24" placeholder="Briefly describe your career goals and top skills..."></textarea>
                 </div>
              </section>

              {/* Education */}
              <section className="space-y-4">
                 <h3 className="text-lg font-semibold text-blue-400 border-b border-white/10 pb-2">Qualifications / Education</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1">Degree / Course</label>
                      <input type="text" name="degree" value={resumeData.degree} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition" placeholder="B.Tech in Computer Science" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1">College / School Name</label>
                      <input type="text" name="school" value={resumeData.school} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition" placeholder="ABC University" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium text-gray-400 mb-1">Passing Year</label>
                      <input type="text" name="eduYear" value={resumeData.eduYear} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition" placeholder="2020 - 2024" />
                    </div>
                 </div>
              </section>

              {/* Experience / Projects */}
              {experienceLevel !== 'student' && (
               <section className="space-y-4">
                  <h3 className="text-lg font-semibold text-green-400 border-b border-white/10 pb-2">
                    {experienceLevel === 'fresher' ? 'Projects / Internships' : 'Experience'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div>
                       <label className="block text-xs font-medium text-gray-400 mb-1">
                         {experienceLevel === 'fresher' ? 'Project / Internship Title' : 'Job Title'}
                       </label>
                       <input type="text" name="role" value={resumeData.role} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition" placeholder={experienceLevel === 'fresher' ? 'E-commerce Website' : 'Software Developer'} />
                     </div>
                     <div>
                       <label className="block text-xs font-medium text-gray-400 mb-1">
                         {experienceLevel === 'fresher' ? 'Organization / Platform' : 'Company Name'}
                       </label>
                       <input type="text" name="company" value={resumeData.company} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition" placeholder={experienceLevel === 'fresher' ? 'College Project / XYZ Company' : 'Tech Solutions Inc.'} />
                     </div>
                     <div className="md:col-span-2">
                       <label className="block text-xs font-medium text-gray-400 mb-1">Duration</label>
                       <input type="text" name="expDuration" value={resumeData.expDuration} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition" placeholder={experienceLevel === 'fresher' ? '3 Months' : 'Jan 2022 - Present'} />
                     </div>
                  </div>
                  <div>
                     <label className="block text-xs font-medium text-gray-400 mb-1">
                       {experienceLevel === 'fresher' ? 'Project Details & Learnings' : 'Job Description'}
                     </label>
                     <textarea name="expDescription" value={resumeData.expDescription} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition h-24" placeholder="What were your key responsibilities and achievements?"></textarea>
                  </div>
               </section>
              )}

              {/* Extra */}
              <section className="space-y-4">
                 <h3 className="text-lg font-semibold text-yellow-400 border-b border-white/10 pb-2">Links, Skills & Hobbies</h3>
                 <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">LinkedIn URL</label>
                    <input type="text" name="linkedin" value={resumeData.linkedin} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition" placeholder="linkedin.com/in/pawan" />
                 </div>
                 <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">Skills (comma separated)</label>
                    <input type="text" name="skills" value={resumeData.skills} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition" placeholder="React, Next.js, Node.js, TypeScript" />
                 </div>
                 <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">Hobbies</label>
                    <input type="text" name="hobbies" value={resumeData.hobbies} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition" placeholder="Reading, Traveling, Coding" />
                 </div>
              </section>
              
              {/* Action Buttons */}
              <div className="pt-6 border-t border-white/10 space-y-4">
                 <button onClick={handleCreateResume} className="w-full py-4 px-4 bg-white/10 border border-white/20 text-white font-medium rounded-xl hover:bg-white/20 transition flex flex-col items-center justify-center">
                    <span className="text-lg">Finalize Resume</span>
                    <span className="text-xs text-gray-400 mt-1">Save your exact details</span>
                 </button>
                 
                 <button onClick={handleCreateWithAI} className="w-full py-4 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl hover:opacity-90 transition flex flex-col items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.4)] relative overflow-hidden">
                    {isAiGenerating ? (
                       <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                          <span>AI is analyzing & improving...</span>
                       </div>
                    ) : (
                       <>
                          <span className="text-lg flex items-center gap-2">✨ Enhance Resume with AI</span>
                          <span className="text-xs text-purple-200 mt-1">AI rewrites your descriptions for maximum impact</span>
                       </>
                    )}
                 </button>
              </div>

           </div>
        </div>

        {/* Right Panel: Live Preview */}
        <div className="lg:col-span-1 bg-white/5 border border-white/10 rounded-xl flex flex-col h-full overflow-hidden relative">
              {/* Toolbar */}
              <div className="bg-black/40 border-b border-white/10 p-4 flex justify-between items-center z-10 absolute top-0 w-full">
                 <div className="text-sm font-medium text-gray-300">Live Preview</div>
                 <button onClick={handleDownload} disabled={isDownloading} className={`px-4 py-1.5 ${isDownloading ? 'bg-green-800 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'} text-white text-sm font-bold rounded transition flex items-center gap-2 shadow-[0_0_15px_rgba(22,163,74,0.3)]`}>
                    {isDownloading ? (
                      <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    )}
                    {isDownloading ? 'Downloading...' : 'Download PDF'}
                 </button>
              </div>
              
              {/* Preview Area */}
              <div className="flex-1 bg-[#2a2a2a] pt-20 p-4 md:p-8 flex items-start justify-center overflow-auto custom-scrollbar">
                  <div id="resume-preview-container">
                    {selectedTemplate === 'modern-yellow' && renderModernYellow(resumeData)}
                    {selectedTemplate === 'classic-sidebar' && renderClassicSidebar(resumeData)}
                    {selectedTemplate === 'dark-sidebar' && renderDarkSidebar(resumeData)}
                    {selectedTemplate === 'minimalist' && renderMinimalist(resumeData)}
                    {selectedTemplate === 'corporate-blue' && renderCorporateBlue(resumeData)}
                    {selectedTemplate === 'creative-split' && renderCreativeSplit(resumeData)}
                    {selectedTemplate === 'bold-red' && renderBoldRed(resumeData)}
                    {selectedTemplate === 'elegant-navy' && renderElegantNavy(resumeData)}
                    {selectedTemplate === 'monochrome-bold' && renderMonochromeBold(resumeData)}
                    {selectedTemplate === 'elegant-beige' && renderElegantBeige(resumeData)}
                    {selectedTemplate === 'modern-taupe' && renderModernTaupe(resumeData)}
                    {selectedTemplate === 'teal-peach' && renderTealPeach(resumeData)}
                    {selectedTemplate === 'brown-arch' && renderBrownArch(resumeData)}
                    {selectedTemplate === 'yellow-geometric' && renderYellowGeometric(resumeData)}
                    {selectedTemplate === 'peach-soft' && renderPeachSoft(resumeData)}
                    {selectedTemplate === 'green-corporate' && renderGreenCorporate(resumeData)}
                  </div>
              </div>
        </div>

      </div>
    </div>
  );
}
