"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export default function Builder() {
  const router = useRouter();

  useEffect(() => {
    fetch('/api/auth/me').then(res => setIsLoggedIn(res.ok));
  }, []);

  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [experienceLevel, setExperienceLevel] = useState('experienced');
   

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
    profession: '',
    email: '',
    phone: '',
    linkedin: '',
    address: '',
    portfolio: '',
    technicalSkills: '',
    certifications: '',
    references: '',
    languages: '',
    achievements: '',
    exp2Role: '', exp2Company: '', exp2Duration: '', exp2Description: '',
    exp3Role: '', exp3Company: '', exp3Duration: '', exp3Description: '',
    exp4Role: '', exp4Company: '', exp4Duration: '', exp4Description: '',
    volunteerRole: '', volunteerCompany: '', volunteerDuration: '', volunteerDescription: '',
    interests: '',
    edu2Degree: '', edu2School: '', edu2Year: '',
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
    profession: 'Senior Product Manager',
    email: 'alex.j@example.com',
    phone: '+1 234 567 8900',
    linkedin: 'linkedin.com/in/alexj',
    address: 'New York, USA',
    portfolio: 'alexj.dev',
    technicalSkills: 'React, Node.js, TypeScript',
    certifications: 'AWS Certified Solutions Architect, Google Analytics Certification',
    references: 'Sarah Smith, Director at Tech Inc. | +1 234 567 8900',
    languages: 'English (Native), Spanish (Fluent), French (Basic)',
    achievements: 'Employee of the Year 2022\nLed a team that increased sales by 40%',
    exp2Role: 'Product Manager',
    exp2Company: 'Innovatech LLC',
    exp2Duration: '2018 - 2021',
    exp2Description: 'Managed product lifecycle from concept to launch.\nCollaborated with cross-functional teams.',
    exp3Role: 'Junior Analyst',
    exp3Company: 'DataCorp',
    exp3Duration: '2016 - 2018',
    exp3Description: 'Analyzed user metrics and generated reports.',
    exp4Role: 'Intern',
    exp4Company: 'Tech Start',
    exp4Duration: '2015 - 2016',
    exp4Description: 'Assisted in basic design and development.',
    volunteerRole: 'Soup Kitchen Volunteer',
    volunteerCompany: 'Care Connection',
    volunteerDuration: 'Dec 2023 - Present',
    volunteerDescription: 'Prepared food and provided emotional support.',
    interests: 'Travel, Photography, Music, Reading, Outdoor',
    edu2Degree: 'High School Diploma',
    edu2School: 'Springfield High',
    edu2Year: '2012 - 2016',
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
    { id: 'green-corporate', name: 'Green Corporate', desc: 'Professional dark green sidebar layout' },
    { id: 'fresher-blue', name: 'Fresher Resume', desc: 'Blue header, split layout for freshers' },
    { id: 'pm-intern', name: 'Project Manager Intern', desc: 'Dark navy header, gray background sidebar' },
    { id: 'student-job', name: 'Student Job', desc: 'Tan diagonal elements, clear layout' },
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

  const handleCreateWithAI = async () => {
    setIsAiGenerating(true);
    try {
      const response = await fetch('/api/enhance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          summary: resumeData.summary,
          expDescription: resumeData.expDescription,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setResumeData(prev => ({
          ...prev,
          summary: data.summary || prev.summary,
          expDescription: data.expDescription || prev.expDescription,
        }));
        if (data.error) {
          alert(data.error);
        }
      } else {
        alert("Failed to connect to AI service.");
      }
    } catch (error) {
      console.error(error);
      alert("Error enhancing resume with AI.");
    } finally {
      setIsAiGenerating(false);
    }
  };

  const [isDownloading, setIsDownloading] = useState(false);
  const [isQualityModalOpen, setIsQualityModalOpen] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);




  
  const handleSave = async () => {
    if (!isLoggedIn) {
      alert("Please log in to save your resume!");
      router.push('/login');
      return;
    }
    
    setIsSaving(true);
    try {
      const res = await fetch('/api/resumes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: resumeData.name ? resumeData.name + " Resume" : "My Resume",
          resumeData,
          experienceLevel,
        })
      });
      
      if (res.ok) {
        alert("Resume saved successfully! You can view it in your dashboard.");
        router.push('/dashboard');
      } else {
        alert("Failed to save resume.");
      }
    } catch (e) {
      alert("Error saving resume.");
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleDownloadClick = () => {
    if (!selectedTemplate) {
      alert("Please select a template first!");
      return;
    }
    setIsQualityModalOpen(true);
  };

  
  const handlePremiumClick = () => {
    setIsQualityModalOpen(false);
    
    const options = {
      key: "rzp_test_aNXXBmbgB2rKjG", // Demo Razorpay Test Key
      amount: 2100, // 21 INR
      currency: "INR",
      name: "Resume AI Pro",
      description: "Ultra HD (1080p) Resume Download",
      handler: function (response: any) {
        // Payment successful
        triggerDownload(4);
      },
      prefill: {
        name: resumeData.name || "Pawan Choudhary",
        email: "pawanchoudhary882455@gmail.com",
        contact: resumeData.phone || "9999999999"
      },
      theme: {
        color: "#9333ea"
      }
    };
    
    // @ts-ignore
    if (window.Razorpay) {
      // @ts-ignore
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } else {
      alert("Razorpay SDK failed to load. Are you online?");
    }
  };

  const triggerDownload = async (scaleValue: number) => {
    const element = document.getElementById('resume-preview-container');
    if (!element || !selectedTemplate) {
      alert("Please select a template first!");
      return;
    }
    
    setIsQualityModalOpen(false);
    setIsScannerOpen(false);
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(element, { scale: scaleValue, useCORS: true });
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

  const renderFresherBlue = (data: any) => (
    <div className="bg-[#e2e8f0] text-[#1e293b] w-[210mm] min-h-[297mm] shadow-2xl flex shrink-0 font-sans relative">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
         <div className="absolute top-0 left-0 w-[110%] h-[35%] bg-[#8ba0b5] -skew-y-[10deg] origin-top-left -mt-10"></div>
         <div className="absolute bottom-0 left-0 w-[40%] h-[30%] bg-[#334b61] skew-y-[35deg] origin-bottom-left -ml-20"></div>
      </div>
      <div className="w-[35%] p-8 pt-64 relative z-10 flex flex-col border-r-2 border-[#1e293b] ml-4">
         <div className="mb-8">
            <h2 className="text-[#1e293b] font-bold text-lg border-b border-[#1e293b] pb-1 mb-4 flex items-center gap-2"><span className="text-xl">📱</span> Contact</h2>
            <div className="text-xs space-y-3 font-medium">
               <p className="flex flex-col"><span className="font-bold text-[10px] uppercase">Phone</span>{data.phone || "+91 8954400000"}</p>
               <p className="flex flex-col"><span className="font-bold text-[10px] uppercase">Email</span><span className="break-all">{data.email || "24billions@mail.com"}</span></p>
               <p className="flex flex-col"><span className="font-bold text-[10px] uppercase">Address</span>{data.address || "New Delhi, India"}</p>
               <p className="flex flex-col"><span className="font-bold text-[10px] uppercase">LinkedIn</span><span className="break-all">{data.linkedin || "linkedin.com/in/sahib"}</span></p>
               <p className="flex flex-col"><span className="font-bold text-[10px] uppercase">Portfolio</span><span className="break-all">{data.portfolio || "sahib.design"}</span></p>
            </div>
         </div>
         <div className="mb-8">
            <h2 className="text-[#1e293b] font-bold text-lg border-b border-[#1e293b] pb-1 mb-4 flex items-center gap-2"><span className="text-xl">👥</span> Personal Skills</h2>
            <ul className="list-disc pl-4 text-xs font-medium space-y-1">
               {data.skills ? data.skills.split(',').map((s:string, i:number) => <li key={i}>{s.trim()}</li>) : (
                  <><li>Communication Skills</li><li>Teamwork</li><li>Adaptability</li><li>Problem Solving</li><li>Time Management</li></>
               )}
            </ul>
         </div>
         <div>
            <h2 className="text-[#1e293b] font-bold text-lg border-b border-[#1e293b] pb-1 mb-4 flex items-center gap-2"><span className="text-xl">🗣</span> Language</h2>
            <ul className="list-disc pl-4 text-xs font-medium space-y-1">
               <li>English</li><li>Hindi</li>
            </ul>
         </div>
      </div>
      <div className="w-[65%] p-8 pt-16 relative z-10">
         <div className="flex justify-between items-start mb-24">
            <div className="pt-8">
               <h1 className="text-4xl font-bold text-[#1e293b] tracking-wider uppercase">{data.name || "SAHIB KHAN"}</h1>
               <p className="text-sm font-medium text-[#1e293b] tracking-widest">{data.profession || data.role || "Graphic Designer"}</p>
            </div>
            <div className="w-36 h-36 rounded-full border-[6px] border-[#1e293b] bg-gray-200 overflow-hidden shadow-xl -mt-4 shrink-0 aspect-square">
               {data.photo ? <img src={data.photo} className="w-full h-full object-cover" alt="Profile" /> : null}
            </div>
         </div>
         
         <div className="mb-8">
            <h2 className="text-[#1e293b] font-bold text-lg mb-3 flex items-center gap-2"><span className="text-xl">💼</span> Career Objective</h2>
            <p className="text-xs text-gray-800 leading-relaxed font-medium">{data.summary || "Enthusiastic individual eager to start a promising career. Looking for an entry-level position to contribute positively to a team and gain valuable experience."}</p>
         </div>

         <div className="mb-8">
            <h2 className="text-[#1e293b] font-bold text-lg mb-4 flex items-center gap-2"><span className="text-xl">📚</span> Education</h2>
            <div className="mb-4">
               <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-xs">{data.degree || "Bachelor of Technology in Computer Science"}</h3>
                  <span className="text-xs font-bold text-gray-700">{data.eduYear || "May 2022"}</span>
               </div>
               <p className="text-[10px] text-gray-600 font-medium">{data.school || "Sunshine Engineering College, Mumbai, Maharashtra"}</p>
            </div>
         </div>

         <div className="mb-8">
            <h2 className="text-[#1e293b] font-bold text-lg mb-4 flex items-center gap-2"><span className="text-xl">💻</span> Technical Skills</h2>
            <ul className="list-disc pl-4 text-xs font-medium space-y-1">
               {data.technicalSkills ? data.technicalSkills.split(',').map((s:string, i:number) => <li key={i}>{s.trim()}</li>) : (
                  <><li>Computer Skills</li><li>Internet Browsing</li><li>Email Communication</li><li>File Management</li></>
               )}
            </ul>
         </div>

         <div>
            <h2 className="text-[#1e293b] font-bold text-lg mb-3 flex items-center gap-2"><span className="text-xl">🎯</span> HOBBIES</h2>
            <ul className="list-disc pl-4 text-xs font-medium space-y-1">
               {data.hobbies ? data.hobbies.split(',').map((s:string, i:number) => <li key={i}>{s.trim()}</li>) : (
                  <><li>Reading Books</li><li>Sports and Fitness</li><li>Music</li><li>Cooking</li></>
               )}
            </ul>
         </div>
      </div>
    </div>
  );

  const renderPMIntern = (data: any) => (
    <div className="bg-white text-[#1a202c] w-[210mm] min-h-[297mm] shadow-2xl flex flex-col shrink-0 font-sans">
      <div className="bg-[#1a2b38] text-white flex px-10 py-8 relative mt-4">
         <div className="w-40 h-40 rounded-full border-[8px] border-white bg-gray-200 overflow-hidden absolute -top-4 shadow-xl z-10">
            {data.photo ? <img src={data.photo} className="w-full h-full object-cover" alt="Profile" /> : null}
         </div>
         <div className="ml-48">
            <h1 className="text-4xl font-bold uppercase tracking-wider mb-2">{data.name || "ALEXANDRA BENNETT"}</h1>
            <p className="text-sm text-gray-300 uppercase tracking-widest">{data.profession || data.role || "PROJECT MANAGER INTERN"}</p>
         </div>
      </div>
      
      <div className="flex bg-[#dce1e6] px-10 py-6 gap-8 text-xs font-medium">
         <div className="w-1/2 space-y-2">
            <p className="flex items-center gap-2"><span>📱</span> {data.phone || "(123)456-6523"}</p>
            <p className="flex items-center gap-2"><span>🏠</span> {data.address || "456 Oak Street, San Francisco"}</p>
            <p className="flex items-center gap-2"><span>✉</span> {data.email || "alexandraben145@gmail.com"}</p>
            <p className="flex items-center gap-2"><span>🔗</span> {data.linkedin || "linkedin.com/in/alex"}</p>
            <p className="flex items-center gap-2"><span>🌐</span> {data.portfolio || "alex.dev"}</p>
         </div>
         <div className="w-1/2">
            <h2 className="text-sm font-bold text-[#1a2b38] uppercase mb-2">PROFESSIONAL SUMMARY</h2>
            <p className="text-gray-700 leading-relaxed text-[11px]">{data.summary || "Goal-oriented college student with strong organizational and leadership skills seeking opportunities to gain hands-on experience in project management. Eager to apply academic knowledge and contribute to successful project outcomes."}</p>
         </div>
      </div>

      <div className="flex flex-1 gap-0">
         <div className="w-[40%] bg-[#9da8b3] p-8 text-gray-900">
            <h2 className="text-lg font-bold text-[#1a2b38] uppercase mb-6">SKILLS</h2>
            <div className="space-y-4 text-xs font-bold">
               {data.skills ? data.skills.split(',').map((s:string, i:number) => (
                  <div key={i}>
                     <p className="mb-1">{s.trim()}</p>
                     <div className="w-full h-1 bg-white/50"><div className="h-full bg-[#1a2b38]" style={{width: Math.floor(Math.random() * 40 + 60) + "%"}}></div></div>
                  </div>
               )) : (
                  <>
                     <div><p className="mb-1">Project Planning</p><div className="w-full h-1 bg-white/50"><div className="w-[100%] h-full bg-[#1a2b38]"></div></div></div>
                     <div><p className="mb-1">Communication Skills</p><div className="w-full h-1 bg-white/50"><div className="w-[90%] h-full bg-[#1a2b38]"></div></div></div>
                     <div><p className="mb-1">Research & Analysis</p><div className="w-full h-1 bg-white/50"><div className="w-[70%] h-full bg-[#1a2b38]"></div></div></div>
                  </>
               )}
            </div>

            <h2 className="text-lg font-bold text-[#1a2b38] uppercase mt-10 mb-4">LANGUAGES</h2>
            <div className="space-y-4 text-xs font-bold">
               <div><p className="mb-1">English</p><div className="w-full h-1 bg-white/50"><div className="w-[100%] h-full bg-[#1a2b38]"></div></div></div>
            </div>

            <h2 className="text-lg font-bold text-[#1a2b38] uppercase mt-10 mb-4">HOBBIES</h2>
            <div className="text-xs font-medium text-white grid grid-cols-2 gap-2">
               {data.hobbies ? data.hobbies.split(',').map((s:string, i:number) => <span key={i}>{i+1}. {s.trim()}</span>) : (
                  <><span>1. Running</span><span>2. Cooking</span><span>3. Reading</span></>
               )}
            </div>
         </div>
         
         <div className="w-[60%] bg-[#eaedf0] p-8">
            <h2 className="text-xl font-bold text-[#1a2b38] uppercase mb-6">PROJECTS</h2>
            <div className="mb-8">
               <h3 className="font-bold text-sm uppercase text-[#1a2b38] mb-1">{data.role || "PROJECT MANAGER INTERN"}</h3>
               <p className="text-xs font-bold text-gray-500 mb-4 uppercase">{data.company || "NEXTGEN TECH SOLUTIONS"} / {data.expDuration || "11/2022 - PRESENT"}</p>
               <div className="text-xs font-medium text-gray-700 leading-relaxed whitespace-pre-line">
                  {data.expDescription || "• Led a team of classmates in planning and organizing a charity fundraising event.\n• Developed project timelines, allocated tasks, and monitored progress.\n• Coordinated with vendors, sponsors, and volunteers."}
               </div>
            </div>

            <h2 className="text-xl font-bold text-[#1a2b38] uppercase mb-6">EDUCATIONAL HISTORY</h2>
            <div>
               <h3 className="font-bold text-sm uppercase text-[#1a2b38] mb-1">{data.school || "UNIVERSITY OF CALIFORNIA"}</h3>
               <p className="text-xs font-bold text-gray-600 mb-2 uppercase">{data.degree || "BACHELOR OF BUSINESS ADMINISTRATION"}, CLASS OF {data.eduYear || "PRESENT"}</p>
            </div>
         </div>
      </div>
    </div>
  );

  const renderStudentJob = (data: any) => (
    <div className="bg-white text-black w-[210mm] min-h-[297mm] shadow-2xl flex flex-col shrink-0 font-sans relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[80%] h-[35%] bg-[#eaddcf] origin-top-left -skew-y-12 translate-y-[-20%] z-0"></div>
      <div className="absolute bottom-0 left-0 w-[50%] h-[20%] bg-[#eaddcf] origin-bottom-right skew-y-12 translate-y-[50%] z-0"></div>

      <div className="relative z-10 pt-16 px-16 flex justify-between items-center mb-8">
         <div className="w-48 h-48 rounded-full border-8 border-white bg-gray-200 overflow-hidden shadow-xl mx-auto flex-shrink-0">
            {data.photo ? <img src={data.photo} className="w-full h-full object-cover" alt="Profile" /> : null}
         </div>
         <div className="flex-1 ml-10">
            <h1 className="text-5xl font-bold text-black mb-2">{data.name?.split(' ')[0] || "Name"} <span className="font-normal">{data.name?.split(' ').slice(1).join(' ') || "Surname"}</span></h1>
            <p className="text-xl tracking-[0.3em] uppercase text-gray-700">{data.profession || data.role || "Student Job"}</p>
         </div>
      </div>

      <div className="relative z-10 px-16 flex gap-12 mt-4">
         <div className="w-[35%]">
            <p className="text-xs font-medium text-gray-800 leading-relaxed mb-10">{data.summary || "Cordial and fashion-forward saleswoman with 2 years of experience working in retail clothing stores. Experienced in accounting and inventory creation."}</p>
            
            <h2 className="text-sm font-bold uppercase mb-4">SKILLS</h2>
            <ul className="list-disc pl-4 text-xs font-bold text-gray-800 space-y-2 mb-10">
               {data.skills ? data.skills.split(',').map((s:string, i:number) => <li key={i}>{s.trim()}</li>) : (
                  <><li>Teamwork</li><li>Customer service</li><li>Communication</li><li>Organisation</li><li>Excel</li></>
               )}
            </ul>

            <h2 className="text-sm font-bold uppercase mb-4">LANGUAGES</h2>
            <div className="space-y-3 text-xs font-bold text-gray-800 mb-10">
               <div className="flex justify-between items-center"><span className="w-16">English</span><div className="h-2 w-24 bg-[#eaddcf] rounded-full"></div></div>
               <div className="flex justify-between items-center"><span className="w-16">Spanish</span><div className="h-2 w-20 bg-[#eaddcf] rounded-full"></div></div>
               <div className="flex justify-between items-center"><span className="w-16">French</span><div className="h-2 w-12 bg-[#eaddcf] rounded-full"></div></div>
            </div>

            <h2 className="text-sm font-bold uppercase mb-4">INTERESTS</h2>
            <ul className="list-disc pl-4 text-xs font-bold text-gray-800 space-y-2">
               {data.hobbies ? data.hobbies.split(',').map((s:string, i:number) => <li key={i}>{s.trim()}</li>) : (
                  <><li>Swimming</li><li>Climbing</li><li>Reading</li><li>Travel</li></>
               )}
            </ul>
         </div>

         <div className="w-[65%]">
            <div className="flex flex-col items-end text-xs font-bold text-gray-800 space-y-2 mb-10">
               <p className="flex items-center gap-2">📞 {data.phone || "+1 315 000 00 00"}</p>
               <p className="flex items-center gap-2">✉ {data.email || "example@mail.com"}</p>
               <p className="flex items-center gap-2">📍 {data.address || "NY, USA"}</p>
               <p className="flex items-center gap-2">🔗 {data.linkedin || "linkedin.com/in/student"}</p>
               <p className="flex items-center gap-2">🌐 {data.portfolio || "student.dev"}</p>
            </div>

            <h2 className="text-sm font-bold uppercase mb-6">EDUCATION</h2>
            <div className="mb-8">
               <h3 className="font-bold text-sm uppercase mb-1">{data.degree || "CUSTOMER SERVICE TRAINING"} | {data.school || "BROOKLYN COLLEGE"}</h3>
               <p className="text-xs text-gray-500 mb-2">{data.eduYear || "20XX (Brooklyn, NY)"}</p>
               <p className="text-xs font-medium text-gray-800">Intensive course in cashiering, restocking and customer service for the retail sector.</p>
            </div>

            <h2 className="text-sm font-bold uppercase mb-6">EXPERIENCE</h2>
            <div className="mb-6">
               <h3 className="font-bold text-sm mb-1">{data.role || "Cashier part-time"} | {data.company || "Zara"}</h3>
               <p className="text-xs text-gray-500 mb-2">{data.expDuration || "20XX (Brooklyn, NY)"}</p>
               <p className="text-xs font-medium text-gray-800 whitespace-pre-line">{data.expDescription || "In charge of opening, counting, and closing the cash register alongside dealing with clients."}</p>
            </div>
         </div>
      </div>
    </div>
  );

  
  const renderTeacherBlue = (data: any) => (
    <div className="bg-white w-[210mm] min-h-[297mm] shadow-2xl flex shrink-0 font-sans text-gray-800">
      {/* Left Column */}
      <div className="w-[30%] bg-gradient-to-b from-[#e0f2fe] to-[#bae6fd] p-6 flex flex-col items-center border-r-4 border-white shadow-[2px_0_10px_rgba(0,0,0,0.05)]">
        <div className="w-full space-y-3 text-[10px] mb-8 font-medium text-[#0369a1]">
          <p className="flex items-center gap-2"><span className="text-sm">📞</span> {data.phone || "+91 1234 567890"}</p>
          <p className="flex items-center gap-2"><span className="text-sm">📍</span> {data.address || "New Delhi, Delhi"}</p>
          <p className="flex items-center gap-2 break-all"><span className="text-sm">✉</span> {data.email || "s.batta@email.com"}</p>
          <p className="flex items-center gap-2 break-all"><span className="text-sm">🔗</span> {data.linkedin || "linkedin.com/in/saanvi-batta"}</p>
        </div>

        {/* Hexagon Photo wrapper */}
        <div className="relative w-40 h-44 mb-10 overflow-hidden" style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}>
           {data.photo ? <img src={data.photo} className="w-full h-full object-cover" alt="Profile" /> : <div className="w-full h-full bg-[#0284c7]"></div>}
        </div>

        <div className="w-full">
           <h3 className="text-[#0369a1] font-bold border-b-2 border-[#0284c7] pb-1 mb-4">Education</h3>
           <div className="mb-4">
              <p className="text-[#0284c7] font-bold text-xs">{data.eduYear || "2021-2023"}</p>
              <p className="font-bold text-sm">{data.degree || "B. Ed."}</p>
              <p className="text-xs">{data.school || "Loreto College, Kolkata"}</p>
           </div>
           {data.edu2Degree && (
             <div className="mb-4">
                <p className="text-[#0284c7] font-bold text-xs">{data.edu2Year || "2018-2021"}</p>
                <p className="font-bold text-sm">{data.edu2Degree || "B.A. English"}</p>
                <p className="text-xs">{data.edu2School || "Delhi University"}</p>
             </div>
           )}

           <h3 className="text-[#0369a1] font-bold border-b-2 border-[#0284c7] pb-1 mb-4 mt-8">Certifications</h3>
           <ul className="list-disc pl-4 text-xs space-y-2">
              {data.certifications ? data.certifications.split(',').map((c: string, i: number) => <li key={i}>{c.trim()}</li>) : (
                <><li>UGC NET</li><li>TET</li><li>First aid (IRCS)</li></>
              )}
           </ul>
        </div>
      </div>

      {/* Right Column */}
      <div className="w-[70%] p-8">
         <h1 className="text-4xl font-light text-[#0284c7] mb-1">{data.name || "Saanvi Batta"}</h1>
         <h2 className="text-sm font-bold text-gray-800 mb-6">{data.profession || data.role || "Certified Teacher"}</h2>
         
         <p className="text-xs text-gray-700 leading-relaxed mb-8">{data.summary || "Recent graduate with a B. Ed. eager to apply knowledge, skills, and passion for teaching in a full-time role. Practical experience in classroom management, lesson planning, and assessment."}</p>

         <h3 className="text-[#0369a1] font-bold border-b border-[#0369a1] pb-1 mb-4">Teaching Experience</h3>
         
         <div className="mb-6">
            <p className="text-[#0284c7] font-bold text-[10px]">{data.expDuration || "December 2021 - Present"}</p>
            <p className="font-bold text-sm">{data.role || "Volunteer Teacher"}</p>
            <p className="text-xs text-gray-600 mb-2">{data.company || "Delhi Senior Care Center"}</p>
            <p className="text-xs text-gray-700 whitespace-pre-line leading-relaxed pl-3 border-l-2 border-[#bae6fd]">
              {data.expDescription || "• Teach adult learners how to read and write in one-on-one and group settings.\n• Develop and implement lesson plans."}
            </p>
         </div>

         {data.exp2Role && (
           <div className="mb-6">
              <p className="text-[#0284c7] font-bold text-[10px]">{data.exp2Duration}</p>
              <p className="font-bold text-sm">{data.exp2Role}</p>
              <p className="text-xs text-gray-600 mb-2">{data.exp2Company}</p>
              <p className="text-xs text-gray-700 whitespace-pre-line leading-relaxed pl-3 border-l-2 border-[#bae6fd]">{data.exp2Description}</p>
           </div>
         )}
         {data.exp3Role && (
           <div className="mb-6">
              <p className="text-[#0284c7] font-bold text-[10px]">{data.exp3Duration}</p>
              <p className="font-bold text-sm">{data.exp3Role}</p>
              <p className="text-xs text-gray-600 mb-2">{data.exp3Company}</p>
              <p className="text-xs text-gray-700 whitespace-pre-line leading-relaxed pl-3 border-l-2 border-[#bae6fd]">{data.exp3Description}</p>
           </div>
         )}

         <h3 className="text-[#0369a1] font-bold border-b border-[#0369a1] pb-1 mb-4">Teaching Skills</h3>
         <ul className="text-xs text-gray-700 space-y-2 list-disc pl-4">
            {data.technicalSkills ? data.technicalSkills.split(',').map((s: string, i: number) => <li key={i}><strong>{s.split(':')[0]}</strong>{s.includes(':') ? ':' + s.split(':')[1] : ''}</li>) : (
               <>
                 <li><strong>Classroom management:</strong> Ability to create and enforce consistent rules and routines.</li>
                 <li><strong>Lesson planning:</strong> Develop well-organised, engaging, and effective lesson plans.</li>
                 <li><strong>Technology integration:</strong> Knowledge of and ability to use a variety of technology tools.</li>
               </>
            )}
         </ul>
      </div>
    </div>
  );

  const renderAdsExpert = (data: any) => (
    <div className="bg-white w-[210mm] min-h-[297mm] shadow-2xl flex shrink-0 font-sans text-gray-800">
       <div className="w-[35%] bg-[#1f1f1f] text-white p-8 flex flex-col relative">
          <div className="absolute top-0 right-0 w-2 h-full bg-gray-300"></div>
          
          <div className="w-40 h-48 bg-white rounded-2xl p-2 mb-6 mx-auto relative z-10 border-2 border-[#eab308]">
             {data.photo ? <img src={data.photo} className="w-full h-full object-cover rounded-xl" alt="Profile" /> : <div className="w-full h-full bg-gray-300 rounded-xl"></div>}
          </div>
          <div className="bg-[#eab308] text-black font-bold text-center py-2 mb-10 mx-[-2rem] uppercase tracking-widest relative z-10">
             {data.profession || data.role || "Google Ads"}
          </div>

          <h3 className="font-bold tracking-widest mb-4">EDUCATION</h3>
          <div className="mb-4">
             <p className="text-xs font-bold">{data.degree || "B.COM MARKETING"}</p>
             <p className="text-[10px] text-gray-400">{data.school || "Bharata mata college, kakkanad"}</p>
             <p className="text-[10px] text-gray-400">{data.eduYear || "MAR 2022"}</p>
          </div>
          {data.edu2Degree && (
             <div className="mb-4">
                <p className="text-xs font-bold">{data.edu2Degree}</p>
                <p className="text-[10px] text-gray-400">{data.edu2School}</p>
                <p className="text-[10px] text-gray-400">{data.edu2Year}</p>
             </div>
          )}

          <h3 className="font-bold tracking-widest mt-6 mb-4">PERSONAL SKILLS</h3>
          <ul className="text-[10px] space-y-1 mb-8 text-gray-300">
             {data.skills ? data.skills.split(',').map((s: string, i: number) => <li key={i}>{s.trim().toUpperCase()}</li>) : (
                <><li>GOOD COMMUNICATION SKILL</li><li>ORGANIZATION SKILL</li><li>TIME MANAGMENT</li><li>ANALYTICAL SKILLS</li></>
             )}
          </ul>

          <div className="bg-gray-200 text-black font-bold py-2 px-4 mb-4 mx-[-2rem] uppercase tracking-widest">
             EXPERTISE
          </div>
          <div className="space-y-4">
             {data.technicalSkills ? data.technicalSkills.split(',').map((s: string, i: number) => (
                <div key={i}>
                   <p className="text-[10px] mb-1">{s.trim()}</p>
                   <div className="w-full bg-gray-600 h-1"><div className="bg-[#eab308] h-1" style={{ width: Math.floor(Math.random() * 40 + 60) + '%' }}></div></div>
                </div>
             )) : (
                <>
                   <div><p className="text-[10px] mb-1">Google ads</p><div className="w-full bg-gray-600 h-1"><div className="bg-[#eab308] h-1 w-[90%]"></div></div></div>
                   <div><p className="text-[10px] mb-1">Content creation</p><div className="w-full bg-gray-600 h-1"><div className="bg-[#eab308] h-1 w-[80%]"></div></div></div>
                   <div><p className="text-[10px] mb-1">Premier pro</p><div className="w-full bg-gray-600 h-1"><div className="bg-[#eab308] h-1 w-[70%]"></div></div></div>
                </>
             )}
          </div>
       </div>

       <div className="w-[65%] p-8 pt-12 relative border-l-4 border-[#eab308]">
          <h1 className="text-5xl font-light tracking-widest uppercase mb-2">{data.name || "NIHAL K E"}</h1>
          <div className="bg-[#eab308] inline-block px-2 py-1 font-bold text-xs tracking-widest mb-6">
             {data.profession || data.role || "GOOGLE ADS EXPERT"}
          </div>

          <h3 className="font-bold tracking-widest text-gray-800 mb-2 mt-4">PROFILE</h3>
          <div className="bg-gray-100 p-4 text-[10px] text-gray-600 leading-relaxed mb-8 border-t border-gray-300">
             {data.summary || "With over 1.5 years of experience in digital marketing, content creation, and product photography. I am a highly capable freelance digital marketing agent..."}
          </div>

          <h3 className="font-bold tracking-widest text-gray-800 mb-4">WORK EXPERIENCE</h3>
          <div className="w-8 h-1 bg-[#eab308] mb-4"></div>
          
          <div className="mb-6">
             <p className="font-bold text-sm tracking-wide uppercase">{data.role || "GOOGLE ADS INTERN"}</p>
             <p className="text-[10px] text-gray-500 mb-2"><span className="bg-[#eab308] text-black px-1 mr-2">{data.expDuration || "Present"}</span> {data.company || "HARIS AND CO / CALICUT"}</p>
             <p className="text-xs text-gray-700 whitespace-pre-line">{data.expDescription || "Optimize Ads, Boost ROI"}</p>
          </div>
          
          {data.exp2Role && (
             <div className="mb-6">
                <p className="font-bold text-sm tracking-wide uppercase">{data.exp2Role}</p>
                <p className="text-[10px] text-gray-500 mb-2"><span className="bg-[#eab308] text-black px-1 mr-2">{data.exp2Duration}</span> {data.exp2Company}</p>
                <p className="text-xs text-gray-700 whitespace-pre-line">{data.exp2Description}</p>
             </div>
          )}

          <h3 className="font-bold tracking-widest text-gray-800 mb-4 mt-8">REFERENCE</h3>
          <div className="w-8 h-1 bg-[#eab308] mb-4"></div>
          <div className="text-[10px] text-gray-700 whitespace-pre-line mb-8">
             {data.references || "Maninath R\nHOD Marketing Dept.\n+91 9048347726"}
          </div>

          <div className="absolute bottom-8 left-0 w-full px-8">
             <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 text-xs"><div className="w-8 h-8 bg-[#eab308] flex items-center justify-center text-lg">📞</div> {data.phone || "+91 7907815281"}</div>
                <div className="flex items-center gap-4 text-xs"><div className="w-8 h-8 bg-[#eab308] flex items-center justify-center text-lg">✉</div> {data.email || "nihalke.media@gmail.com"}</div>
                <div className="flex items-center gap-4 text-xs"><div className="w-8 h-8 bg-[#eab308] flex items-center justify-center text-lg">📍</div> {data.address || "Malappuram"}</div>
             </div>
          </div>
       </div>
    </div>
  );

  
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
                <h1 className="text-4xl font-bold text-[#b45309] uppercase leading-tight mb-2">{data.name?.split(' ').join('\n') || "RICHARD\nSANCHEZ"}</h1>
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
                   {data.skills ? data.skills.split(',').slice(0,5).map((s: string, i: number) => (
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
                      {data.expDescription ? data.expDescription.split('\n').map((d: any, i: number) => <li key={i}>{d}</li>) : <li>Lorem ipsum is simply dummy text of the printing and typesetting industry.</li>}
                   </ul>
                </div>
                {data.exp2Role && (
                   <div className="mb-6">
                      <h3 className="font-bold text-sm text-gray-800">{data.exp2Company}</h3>
                      <p className="text-[10px] font-bold text-gray-500 mb-2">{data.exp2Role} {data.exp2Duration}</p>
                      <ul className="list-disc pl-4 text-[10px] text-gray-500 space-y-1">
                         {data.exp2Description.split('\n').map((d: any, i: number) => <li key={i}>{d}</li>)}
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
                {data.technicalSkills ? data.technicalSkills.split(',').map((s: string, i: number) => <li key={i} className="flex items-center before:content-['•'] before:text-[#eab308] before:mr-2 before:text-lg">{s.trim()}</li>) : (
                   <>
                     <li className="flex items-center before:content-['•'] before:text-[#eab308] before:mr-2 before:text-lg">ui/ux</li>
                     <li className="flex items-center before:content-['•'] before:text-[#eab308] before:mr-2 before:text-lg">visual design</li>
                     <li className="flex items-center before:content-['•'] before:text-[#eab308] before:mr-2 before:text-lg">leadership</li>
                   </>
                )}
             </ul>

             <div className="bg-[#2a2426] text-[#eab308] font-bold py-2 px-6 rounded-r-3xl inline-block mb-6 -ml-8 tracking-widest shadow-md mt-4">Language</div>
             <div className="text-[10px] font-bold text-gray-500 space-y-3 mb-8 ml-2">
                {data.languages ? data.languages.split(',').map((l: string, i: number) => (
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
                {data.references || "Lorna Alvarado\nCompany Name/Position\nPhone\n+123-456-7890"}
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
                {data.achievements ? data.achievements.split('\n').map((a: string, i: number) => (
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
                {data.languages ? data.languages.split(',').map((l: string, i: number) => (
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
                {data.technicalSkills ? data.technicalSkills.split(',').slice(0,4).map((s: string, i: number) => {
                   const pct = Math.floor(Math.random() * 40 + 60);
                   return (
                   <div key={i} className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full border-4 border-gray-200 flex items-center justify-center relative mb-2">
                         <div className="absolute top-[-4px] left-[-4px] w-12 h-12 rounded-full border-4 border-transparent border-t-[#f97316] border-r-[#f97316]" style={{transform: `rotate(${pct * 3.6}deg)`}}></div>
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
                   <div><p className="font-bold text-white mb-0.5">Address</p><p>{data.address || "45641x Street Name\nCity, Province\nState Country"}</p></div>
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
                {data.achievements ? data.achievements.split('\n').map((a: string, i: number) => (
                   <div key={i} className="flex items-start gap-3">
                      <span className="text-[#d97706] text-sm">🔗</span>
                      <div><p className="font-bold text-white mb-0.5">{a.split(' ')[0]} Award</p><p>{a}</p></div>
                   </div>
                )) : (
                   <>
                      <div className="flex items-start gap-3">
                         <span className="text-[#d97706] text-sm">🔗</span>
                         <div><p className="font-bold text-white mb-0.5">Typo Award</p><p>Senior Designer at Capital P.\n2009</p></div>
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
                {data.technicalSkills ? data.technicalSkills.split(',').map((s: string, i: number) => (
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
                      <div><p className="text-gray-400 font-normal mb-0.5">Web</p><p className="break-all">{data.portfolio || "contactme@email.com\nwww.contactme.com"}</p></div>
                   </div>
                   <div className="flex items-start gap-3">
                      <span className="text-[#eab308] text-lg">📍</span>
                      <div><p className="text-gray-400 font-normal mb-0.5">Address</p><p>{data.address || "123, Street, Odiaho,\nNew York City, USA"}</p></div>
                   </div>
                </div>

                <div className="relative mb-8">
                   <div className="bg-transparent border-2 border-[#eab308] rounded-full px-4 py-2 absolute -top-1 -left-1 w-full h-full"></div>
                   <h2 className="bg-[#4b4b4b] text-white font-bold tracking-widest uppercase px-4 py-1.5 rounded-full relative z-10 w-full text-center">SKILLS</h2>
                </div>
                <div className="space-y-4 mb-12 px-2">
                   {data.technicalSkills ? data.technicalSkills.split(',').slice(0,5).map((s: string, i: number) => (
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
                   {data.languages ? data.languages.split(',').slice(0,3).map((l: string, i: number) => (
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
                      <p>{data.address || "Your address, Strewet #\nLocation, Abc, Country"}</p>
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
                   {data.technicalSkills ? data.technicalSkills.split(',').map((s: string, i: number) => (
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
                   {data.languages ? data.languages.split(',').slice(0,3).map((l: string, i: number) => (
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
                   {data.summary || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
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
                      <p className="text-[10px] font-bold text-gray-500 pt-1">{data.expDuration || "2014\n2012"}</p>
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
                      <p className="text-[10px] font-bold text-gray-500 pt-1">{data.eduYear || "2009\n2012"}</p>
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
                   {data.technicalSkills ? data.technicalSkills.split(',').slice(0,6).map((s: string, i: number) => (
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
                <h1 className="text-5xl font-bold tracking-widest text-[#2f3542] leading-tight mb-2 uppercase">{data.name?.split(' ').join('\n') || "NAME\nSURNAME"}</h1>
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
                         <div className="flex-1 h-3 border border-[#f39c12] p-[1px]"><div className="h-full bg-[#f39c12]" style={{width: `${pct}%`}}></div></div>
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
                   <p className="text-[10px] text-gray-500 italic mb-2">{data.role} {data.expDuration ? `(${data.expDuration})` : ''}</p>
                   <p className="text-[10px] text-gray-500 leading-relaxed text-justify">{data.expDescription || "Lorem ipsum is simply dummy text of the printing & typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."}</p>
                </div>

                <div className="mb-6">
                   <p className="font-bold text-xs text-black mb-1 uppercase">{data.exp2Company || "COMPANY NAME"}</p>
                   <p className="text-[10px] text-gray-500 italic mb-2">{data.exp2Role} {data.exp2Duration ? `(${data.exp2Duration})` : ''}</p>
                   <p className="text-[10px] text-gray-500 leading-relaxed text-justify">{data.exp2Description || "Lorem ipsum is simply dummy text of the printing & typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."}</p>
                </div>
             </div>
          </div>
       </div>
    </div>
  );

  
  const renderGreyElegant = (data: any) => (
    <div className="bg-[#e4e4e4] w-[210mm] min-h-[297mm] shadow-2xl shrink-0 font-sans text-gray-800 p-8 flex justify-center items-center">
       <div className="bg-[#fcfcfc] w-full h-full shadow-md flex p-8 relative">
          
          {/* Left Sidebar */}
          <div className="w-[35%] pr-6 border-r border-gray-300 flex flex-col">
             <div className="w-full bg-[#dfdfdf] rounded-t-3xl rounded-b-[40px] p-2 mb-8 mt-2 h-56 flex items-center justify-center overflow-hidden">
                {data.photo ? <img src={data.photo} className="w-full h-full object-cover rounded-t-2xl rounded-b-[30px]" alt="Profile" /> : <div className="w-full h-full bg-gray-400 rounded-t-2xl rounded-b-[30px]"></div>}
             </div>

             <h2 className="text-sm font-bold tracking-widest uppercase mb-4 text-[#2b2b2b] flex items-center justify-between">CONTACT <span className="flex-1 border-b border-[#2b2b2b] ml-4"></span></h2>
             <div className="space-y-4 text-[9px] font-medium text-gray-500 mb-10">
                <div className="flex items-start gap-3"><span className="text-[#2b2b2b] text-xs">✉</span> <span className="break-all">{data.email || "hello@yourwebsite.com"}</span></div>
                <div className="flex items-start gap-3"><span className="text-[#2b2b2b] text-xs">📞</span> <span>{data.phone || "07985 657 435"}</span></div>
                <div className="flex items-start gap-3"><span className="text-[#2b2b2b] text-xs">📍</span> <span>{data.address || "88 Westview, Meadows, NY"}</span></div>
             </div>

             <h2 className="text-sm font-bold tracking-widest uppercase mb-4 text-[#2b2b2b] flex items-center justify-between mt-2">EDUCATION <span className="flex-1 border-b border-[#2b2b2b] ml-4"></span></h2>
             
             <div className="mb-6 relative pl-3 border-l border-gray-300">
                <div className="absolute top-1 -left-1 w-2 h-2 bg-[#2b2b2b] rounded-full"></div>
                <p className="font-bold text-[10px] text-[#2b2b2b] uppercase">{data.school || "Place of Education"}</p>
                <p className="text-[9px] text-gray-500 mb-1">{data.degree || "Qualification"}</p>
                <p className="text-[9px] text-gray-400 italic">{data.eduYear || "1999 - 2003"}</p>
             </div>

             {data.edu2Degree && (
                <div className="mb-6 relative pl-3 border-l border-gray-300">
                   <div className="absolute top-1 -left-1 w-2 h-2 bg-[#2b2b2b] rounded-full"></div>
                   <p className="font-bold text-[10px] text-[#2b2b2b] uppercase">{data.edu2School}</p>
                   <p className="text-[9px] text-gray-500 mb-1">{data.edu2Degree}</p>
                   <p className="text-[9px] text-gray-400 italic">{data.edu2Year}</p>
                </div>
             )}

             <h2 className="text-sm font-bold tracking-widest uppercase mb-4 text-[#2b2b2b] flex items-center justify-between mt-8">SKILLS <span className="flex-1 border-b border-[#2b2b2b] ml-4"></span></h2>
             <ul className="text-[9px] text-gray-500 space-y-2 pl-4 list-disc marker:text-[#2b2b2b]">
                {data.technicalSkills ? data.technicalSkills.split(',').map((s: any, i: number) => <li key={i}>{s.trim()}</li>) : (
                   <>
                      <li>Skill One Goes Here</li>
                      <li>Skill Two Goes Here</li>
                      <li>Skill Three Goes Here</li>
                      <li>Skill Four Goes Here</li>
                      <li>Skill Five Goes Here</li>
                      <li>Skill Six Goes Here</li>
                   </>
                )}
             </ul>
          </div>

          {/* Right Main Content */}
          <div className="w-[65%] pl-8 pt-6">
             <div className="mb-8">
                <h1 className="text-4xl font-light text-[#2b2b2b] tracking-wider mb-2">{data.name?.split(' ')[0] || "Megan"}<br/><span className="font-bold tracking-widest uppercase">{data.name?.split(' ').slice(1).join(' ') || "ANDERSON"}</span></h1>
                <p className="text-sm text-gray-400 tracking-[0.2em] uppercase">{data.profession || data.role || "Professional job title"}</p>
             </div>

             <h2 className="text-sm font-bold tracking-widest uppercase mb-4 text-[#2b2b2b] flex items-center">ABOUT <span className="text-2xl ml-2 -mt-2">❝</span> <span className="flex-1 border-b border-gray-300 ml-4"></span></h2>
             <p className="text-[9px] text-gray-500 leading-relaxed text-justify mb-8 pr-4">
                {data.summary || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacus enim, semper ut imperdiet et, congue at elit. Phasellus lacinia turpis sit amet lorem hendrerit, a gravida velit bibendum. In erat nisl, venenatis semper tortor et, finibus mattis velit. Integer egestas lacinia arcu. Nullam nec eros tincidunt neque condimentum dignissim. Nulla eget elementum quam."}
             </p>

             <h2 className="text-sm font-bold tracking-widest uppercase mb-6 text-[#2b2b2b] flex items-center">WORK EXPERIENCE <span className="flex-1 border-b border-gray-300 ml-4"></span></h2>
             
             <div className="relative border-l border-gray-200 pl-10 mb-6 ml-4">
                <div className="absolute top-0 -left-6 bg-[#dfdfdf] text-[#2b2b2b] text-[8px] tracking-wider py-4 px-1 rounded-full whitespace-nowrap transform -rotate-90 origin-center h-24 flex items-center justify-center font-bold">
                   <span className="transform rotate-90 w-full text-center leading-tight">{data.expDuration?.replace('-', '\n') || "2020\n-\nPresent"}</span>
                </div>
                <div className="bg-white relative z-10 -mt-2">
                   <h3 className="font-bold text-xs text-[#2b2b2b] uppercase">{data.role || "Job Title"}</h3>
                   <p className="text-[9px] text-gray-400 italic mb-2">{data.company || "Company | Location"}</p>
                   <p className="text-[9px] text-gray-500 leading-relaxed text-justify pr-4">{data.expDescription || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pharetra in lorem at laoreet. Donec hendrerit libero eget est tempor, quis tempus arcu elementum. In elementum elit at dui tristique feugiat."}</p>
                </div>
             </div>

             {data.exp2Role && (
                <div className="relative border-l border-gray-200 pl-10 mb-6 ml-4">
                   <div className="absolute top-0 -left-6 bg-[#dfdfdf] text-[#2b2b2b] text-[8px] tracking-wider py-4 px-1 rounded-full whitespace-nowrap transform -rotate-90 origin-center h-24 flex items-center justify-center font-bold">
                      <span className="transform rotate-90 w-full text-center leading-tight">{data.exp2Duration?.replace('-', '\n')}</span>
                   </div>
                   <div className="bg-white relative z-10 -mt-2">
                      <h3 className="font-bold text-xs text-[#2b2b2b] uppercase">{data.exp2Role}</h3>
                      <p className="text-[9px] text-gray-400 italic mb-2">{data.exp2Company}</p>
                      <p className="text-[9px] text-gray-500 leading-relaxed text-justify pr-4">{data.exp2Description}</p>
                   </div>
                </div>
             )}

             {data.exp3Role && (
                <div className="relative border-l border-gray-200 pl-10 mb-6 ml-4">
                   <div className="absolute top-0 -left-6 bg-[#dfdfdf] text-[#2b2b2b] text-[8px] tracking-wider py-4 px-1 rounded-full whitespace-nowrap transform -rotate-90 origin-center h-24 flex items-center justify-center font-bold">
                      <span className="transform rotate-90 w-full text-center leading-tight">{data.exp3Duration?.replace('-', '\n')}</span>
                   </div>
                   <div className="bg-white relative z-10 -mt-2">
                      <h3 className="font-bold text-xs text-[#2b2b2b] uppercase">{data.exp3Role}</h3>
                      <p className="text-[9px] text-gray-400 italic mb-2">{data.exp3Company}</p>
                      <p className="text-[9px] text-gray-500 leading-relaxed text-justify pr-4">{data.exp3Description}</p>
                   </div>
                </div>
             )}

             {data.exp4Role && (
                <div className="relative border-l border-gray-200 pl-10 mb-6 ml-4">
                   <div className="absolute top-0 -left-6 bg-[#dfdfdf] text-[#2b2b2b] text-[8px] tracking-wider py-4 px-1 rounded-full whitespace-nowrap transform -rotate-90 origin-center h-24 flex items-center justify-center font-bold">
                      <span className="transform rotate-90 w-full text-center leading-tight">{data.exp4Duration?.replace('-', '\n')}</span>
                   </div>
                   <div className="bg-white relative z-10 -mt-2">
                      <h3 className="font-bold text-xs text-[#2b2b2b] uppercase">{data.exp4Role}</h3>
                      <p className="text-[9px] text-gray-400 italic mb-2">{data.exp4Company}</p>
                      <p className="text-[9px] text-gray-500 leading-relaxed text-justify pr-4">{data.exp4Description}</p>
                   </div>
                </div>
             )}
          </div>
       </div>
    </div>
  );

  const renderBlueIntern = (data: any) => (
    <div className="bg-white w-[210mm] min-h-[297mm] shadow-2xl shrink-0 font-sans text-gray-800 flex">
       {/* Left Column (Light Blue) */}
       <div className="w-[35%] bg-[#e0ecf4] pt-12 pb-12 flex flex-col relative z-10">
          <div className="w-40 h-40 rounded-full border-[6px] border-white mx-auto overflow-hidden shadow-sm mb-10 bg-gray-200">
             {data.photo ? <img src={data.photo} className="w-full h-full object-cover rounded-full" alt="Profile" /> : <div className="w-full h-full bg-[#a9cce3]"></div>}
          </div>

          <div className="px-8">
             <h2 className="text-lg font-['Impact'] tracking-widest uppercase mb-4 text-[#333333]">CONTACT</h2>
             <div className="space-y-4 text-[10px] text-[#333333] mb-8 font-medium">
                <div className="flex items-center gap-3"><span className="text-[#a9cce3] text-sm font-bold bg-white rounded-full w-5 h-5 flex items-center justify-center">📞</span> <span>{data.phone || "+1 212 06 06 060"}</span></div>
                <div className="flex items-center gap-3"><span className="text-[#a9cce3] text-sm font-bold bg-white rounded-full w-5 h-5 flex items-center justify-center">✉</span> <span className="break-all">{data.email || "name@email.com"}</span></div>
                <div className="flex items-center gap-3"><span className="text-[#a9cce3] text-sm font-bold bg-white rounded-full w-5 h-5 flex items-center justify-center">📍</span> <span>{data.address || "LA, California"}</span></div>
             </div>

             <h2 className="text-lg font-['Impact'] tracking-widest uppercase mb-2 text-[#333333] mt-2">CAREER OBJECTIVE</h2>
             <p className="text-[10px] text-[#333333] leading-relaxed text-justify mb-8">
                {data.summary || "Passionate and enthusiastic 3rd year student with excellent interpersonal skills and a high interest in foreign languages. Looking for a student job as a hostess in a hotel or a catering company."}
             </p>

             <h2 className="text-lg font-['Impact'] tracking-widest uppercase mb-4 text-[#333333]">LANGUAGES</h2>
             <div className="space-y-3 mb-8 text-[10px] text-[#333333]">
                {data.languages ? data.languages.split(',').map((l: any, i: number) => (
                   <div key={i} className="flex justify-between items-center">
                      <span className="w-1/3">{l.split('(')[0].trim()}</span>
                      <div className="w-1/2 h-2.5 bg-white rounded-full"><div className="bg-[#a9cce3] h-full rounded-full" style={{width: Math.floor(Math.random() * 40 + 60) + '%'}}></div></div>
                   </div>
                )) : (
                   <>
                      <div className="flex justify-between items-center"><span className="w-1/3">English</span><div className="w-1/2 h-2.5 bg-white rounded-full"><div className="bg-[#a9cce3] h-full rounded-full w-[90%]"></div></div></div>
                      <div className="flex justify-between items-center"><span className="w-1/3">French</span><div className="w-1/2 h-2.5 bg-white rounded-full"><div className="bg-[#a9cce3] h-full rounded-full w-[70%]"></div></div></div>
                      <div className="flex justify-between items-center"><span className="w-1/3">Italian</span><div className="w-1/2 h-2.5 bg-white rounded-full"><div className="bg-[#a9cce3] h-full rounded-full w-[50%]"></div></div></div>
                   </>
                )}
             </div>

             <h2 className="text-lg font-['Impact'] tracking-widest uppercase mb-4 text-[#333333]">SKILLS</h2>
             <ul className="text-[10px] text-[#333333] space-y-1.5 list-disc pl-5 mb-8 marker:text-[#333333]">
                {data.technicalSkills ? data.technicalSkills.split(',').map((s: any, i: number) => <li key={i}>{s.trim()}</li>) : (
                   <>
                      <li>Team work</li>
                      <li>Creativity</li>
                      <li>Open-mindedness</li>
                      <li>Punctuality</li>
                      <li>Photoshop</li>
                      <li>Video</li>
                   </>
                )}
             </ul>

             <h2 className="text-lg font-['Impact'] tracking-widest uppercase mb-4 text-[#333333]">INTERESTS</h2>
             <div className="grid grid-cols-3 gap-y-4 text-2xl text-[#333333]">
                {data.interests ? data.interests.split(',').map((int: any, i: number) => (
                   <div key={i} className="flex justify-center flex-col items-center"><span className="text-[10px] font-bold">{int.trim().substring(0, 5)}</span></div>
                )) : (
                   <>
                      <div className="flex justify-center">🌍</div>
                      <div className="flex justify-center">📷</div>
                      <div className="flex justify-center">🎧</div>
                      <div className="flex justify-center">🎭</div>
                      <div className="flex justify-center">🚶</div>
                      <div className="flex justify-center">📖</div>
                   </>
                )}
             </div>
          </div>
       </div>

       {/* Right Column (White) */}
       <div className="w-[65%] p-10 pt-16 relative">
          <div className="mb-10">
             <h1 className="text-5xl font-['Impact'] tracking-widest uppercase text-[#333333] mb-2">{data.name?.split(' ')[0] || "NANCY"} <span className="font-sans">{data.name?.split(' ').slice(1).join(' ') || "MICHEALS"}</span></h1>
             <p className="text-sm text-[#333333] uppercase font-bold tracking-widest">{data.profession || data.role || "INTERNSHIP / STUDENT JOB"}</p>
          </div>

          <h2 className="text-xl font-['Impact'] tracking-widest uppercase mb-6 text-[#333333] bg-white border border-[#a9cce3] border-l-0 py-2 pr-4 shadow-[5px_5px_0px_0px_#e0ecf4] inline-block -ml-10 pl-10 relative">EDUCATION</h2>
          
          <div className="mb-6">
             <h3 className="font-bold text-[#333333] uppercase text-xs">{data.degree || "HOSPITALITY & TOURISM, B.S."}</h3>
             <p className="text-[10px] text-[#333333] font-bold mb-2">{data.school || "California State University"} <span className="text-gray-400 font-normal ml-1">| {data.eduYear || "20XX - 20XX"}</span></p>
             <ul className="text-[10px] text-[#333333] list-disc pl-4 space-y-1">
                <li>F&B management</li>
                <li>Travel and tourism</li>
                <li>Revenue management</li>
                <li>Law and ethics</li>
             </ul>
          </div>

          <div className="mb-10">
             <h3 className="font-bold text-[#333333] uppercase text-xs">{data.edu2Degree || "HIGH SCHOOL DIPLOMA"}</h3>
             <p className="text-[10px] text-[#333333] font-bold mb-2">{data.edu2School || "Los Angeles High School"} <span className="text-gray-400 font-normal ml-1">| {data.edu2Year || "20XX"}</span></p>
             <ul className="text-[10px] text-[#333333] list-disc pl-4 space-y-1">
                <li>Graduated with honors</li>
                <li>Class valedictorian</li>
                <li>National debate team</li>
                <li>Captain of basketball team</li>
             </ul>
          </div>

          <h2 className="text-xl font-['Impact'] tracking-widest uppercase mb-6 text-[#333333] bg-white border border-[#a9cce3] border-l-0 py-2 pr-4 shadow-[5px_5px_0px_0px_#e0ecf4] inline-block -ml-10 pl-10 relative mt-2">PROFESSIONAL EXPERIENCE</h2>

          <div className="mb-6">
             <h3 className="font-bold text-[#333333] uppercase text-xs">{data.role || "CATERING SERVICES"}</h3>
             <p className="text-[10px] text-[#333333] font-bold mb-2 uppercase">{data.company || "CATER2U, LA"} <span className="text-gray-400 font-normal normal-case ml-1">| {data.expDuration || "July 20XX"}</span></p>
             <ul className="text-[10px] text-[#333333] list-disc pl-4 space-y-1">
                {data.expDescription ? data.expDescription.split('\n').map((d: any, i: number) => <li key={i}>{d}</li>) : (
                   <>
                      <li>Taking inventory</li>
                      <li>Assisting in kitchen duties</li>
                      <li>Serving event attendees</li>
                   </>
                )}
             </ul>
          </div>

          <div className="mb-10">
             <h3 className="font-bold text-[#333333] uppercase text-xs">{data.exp2Role || "FRY COOK"}</h3>
             <p className="text-[10px] text-[#333333] font-bold mb-1 uppercase">{data.exp2Company || "POPEYE'S"} <span className="text-gray-400 font-normal normal-case ml-1">| {data.exp2Duration || "July 20XX"}</span></p>
             <p className="text-[10px] text-[#333333] mb-2 text-gray-500 italic">High school summer job | Junior year</p>
             <ul className="text-[10px] text-[#333333] list-disc pl-4 space-y-1">
                {data.exp2Description ? data.exp2Description.split('\n').map((d: any, i: number) => <li key={i}>{d}</li>) : (
                   <>
                      <li>Prepared and executed dishes</li>
                      <li>Kept an organized workstation</li>
                   </>
                )}
             </ul>
          </div>

          {(data.volunteerRole || !data.exp3Role) && (
             <>
                <h2 className="text-xl font-['Impact'] tracking-widest uppercase mb-6 text-[#333333] bg-white border border-[#a9cce3] border-l-0 py-2 pr-4 shadow-[5px_5px_0px_0px_#e0ecf4] inline-block -ml-10 pl-10 relative mt-2">VOLUNTEER</h2>
                <div className="mb-6">
                   <h3 className="font-bold text-[#333333] uppercase text-xs">{data.volunteerRole || "SOUP KITCHEN"}</h3>
                   <p className="text-[10px] text-[#333333] font-bold mb-2">{data.volunteerCompany || "Leeza's Care Connection"} <span className="text-gray-400 font-normal ml-1">| {data.volunteerDuration || "December 20XX"}</span></p>
                   <ul className="text-[10px] text-[#333333] list-disc pl-4 space-y-1">
                      {data.volunteerDescription ? data.volunteerDescription.split('\n').map((d: any, i: number) => <li key={i}>{d}</li>) : (
                         <>
                            <li>Prepared food for Alzheimer patients</li>
                            <li>Food distribution</li>
                            <li>Provided emotional support when needed</li>
                         </>
                      )}
                   </ul>
                </div>
             </>
          )}
       </div>
    </div>
  );

  const renderModernYellow = (data: any) => (
    <div className="bg-white text-black w-[210mm] min-h-[297mm] shadow-2xl flex flex-col relative overflow-hidden shrink-0">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#facc15] rounded-bl-full z-0"></div>
      <div className="relative z-10 p-10">
        <div className="flex justify-between items-center mb-8 border-b-4 border-[#facc15] pb-6">
          <div className="w-2/3">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 mb-2">{data.name || "Your Name"}</h1>
            <p className="text-xl text-[#ca8a04] font-semibold tracking-widest uppercase">{data.profession || data.role || "Professional Title"}</p>
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
            <h3 className="font-bold">{data.profession || data.role || getRoleFallback()} - {data.company || getCompanyFallback()}</h3>
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
               <h3 className="font-bold text-sm">{data.profession || data.role || getRoleFallback()}</h3>
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
         <p className="text-gray-500 tracking-widest uppercase">{data.profession || data.role || "Professional Title"}</p>
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
          <p className="text-xl text-blue-200">{data.profession || data.role || "Professional Title"}</p>
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
         <p className="text-[#1abc9c] text-center font-medium mb-10 tracking-wide">{data.profession || data.role || "Your Role"}</p>
         
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
         <p className="text-sm tracking-[0.3em] uppercase">{data.profession || data.role || "MARKETING MANAGER"}</p>
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
               <p className="text-lg text-gray-500 italic">{data.profession || data.role || "Data Analyst"}</p>
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
            <p className="text-xl tracking-widest text-gray-400 mb-8 uppercase">{data.profession || data.role || "GENERAL PRACTITIONER"}</p>
            
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
            <p className="font-bold tracking-widest uppercase text-sm">{data.profession || data.role || "MBA CANDIDATE"}</p>
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
            {data.profession || data.role || "Social Media Manager"}
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
            <p className="text-sm text-gray-700 italic">{data.profession || data.role || "Student"}</p>
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
            <p className="text-lg font-light tracking-widest uppercase text-[#e6d5c3]">{data.profession || data.role || "Your Description"}</p>
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
         <p className="text-xl font-bold text-[#facc15] uppercase tracking-widest drop-shadow mb-12">{data.profession || data.role || getRoleFallback()}</p>
         
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
            <p className="text-lg font-bold text-[#e07a5f] tracking-widest uppercase">{data.profession || data.role || getRoleFallback()}</p>
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
            <p className="text-lg font-bold text-[#1d5d4d] tracking-widest uppercase">{data.profession || data.role || getRoleFallback()}</p>
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
                          {t.id === 'fresher-blue' && renderFresherBlue(dummyData)}
                          {t.id === 'pm-intern' && renderPMIntern(dummyData)}
                          {t.id === 'student-job' && renderStudentJob(dummyData)}
                          {t.id === 'teacher-blue' && renderTeacherBlue(dummyData)}
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
                          {t.id === 'blue-intern' && renderBlueIntern(dummyData)}
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
                      <label className="block text-xs font-medium text-gray-400 mb-1">Profession / Title</label>
                      <input type="text" name="profession" value={resumeData.profession} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition" placeholder="e.g. Full Stack Developer" />
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
                    <label className="block text-xs font-medium text-gray-400 mb-1">Address</label>
                    <input type="text" name="address" value={resumeData.address} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition" placeholder="e.g. New York, USA" />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">LinkedIn URL</label>
                        <input type="text" name="linkedin" value={resumeData.linkedin} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition" placeholder="linkedin.com/in/pawan" />
                     </div>
                     <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">Portfolio / Website</label>
                        <input type="text" name="portfolio" value={resumeData.portfolio} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition" placeholder="e.g. github.com/pawan" />
                     </div>
                 </div>
                 <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">Soft / Personal Skills</label>
                    <input type="text" name="skills" value={resumeData.skills} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition" placeholder="React, Next.js, Node.js, TypeScript" />
                 </div>
                 <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">Technical Skills</label>
                    <input type="text" name="technicalSkills" value={resumeData.technicalSkills} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition" placeholder="React, Node.js, MongoDB" />
                 </div>
                 <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">Hobbies</label>
                    <input type="text" name="hobbies" value={resumeData.hobbies} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition" placeholder="Reading, Traveling, Coding" />
                 </div>
              </section>
              
              {/* Extra Sections */}
              <section className="space-y-4 pt-6 border-t border-white/10">
                 <h3 className="text-lg font-semibold text-pink-400 border-b border-white/10 pb-2">Certifications & Awards</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">Certifications</label>
                        <textarea name="certifications" value={resumeData.certifications} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition h-20" placeholder="AWS Certified, PMP, etc."></textarea>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">Achievements / Awards</label>
                        <textarea name="achievements" value={resumeData.achievements} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition h-20" placeholder="Employee of the Year 2023"></textarea>
                    </div>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">Languages</label>
                        <input type="text" name="languages" value={resumeData.languages} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition" placeholder="English, Hindi, Spanish" />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">References</label>
                        <textarea name="references" value={resumeData.references} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition h-20" placeholder="John Doe - Manager - +1 234 567 8900"></textarea>
                    </div>
                 </div>
              </section>

              <section className="space-y-4 pt-6 border-t border-white/10">
                 <h3 className="text-lg font-semibold text-orange-400 border-b border-white/10 pb-2">Additional Experience & Education</h3>
                 <div className="p-4 bg-white/5 rounded-lg space-y-4">
                    <h4 className="text-sm font-bold text-gray-300">Experience 2</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div><label className="block text-xs font-medium text-gray-400 mb-1">Job Title</label><input type="text" name="exp2Role" value={resumeData.exp2Role} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition" /></div>
                       <div><label className="block text-xs font-medium text-gray-400 mb-1">Company</label><input type="text" name="exp2Company" value={resumeData.exp2Company} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition" /></div>
                       <div className="md:col-span-2"><label className="block text-xs font-medium text-gray-400 mb-1">Duration</label><input type="text" name="exp2Duration" value={resumeData.exp2Duration} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition" /></div>
                       <div className="md:col-span-2"><label className="block text-xs font-medium text-gray-400 mb-1">Description</label><textarea name="exp2Description" value={resumeData.exp2Description} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition h-20"></textarea></div>
                    </div>
                 </div>
                 
                 <div className="p-4 bg-white/5 rounded-lg space-y-4">
                    <h4 className="text-sm font-bold text-gray-300">Experience 3</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div><label className="block text-xs font-medium text-gray-400 mb-1">Job Title</label><input type="text" name="exp3Role" value={resumeData.exp3Role} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition" /></div>
                       <div><label className="block text-xs font-medium text-gray-400 mb-1">Company</label><input type="text" name="exp3Company" value={resumeData.exp3Company} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition" /></div>
                       <div className="md:col-span-2"><label className="block text-xs font-medium text-gray-400 mb-1">Duration</label><input type="text" name="exp3Duration" value={resumeData.exp3Duration} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition" /></div>
                       <div className="md:col-span-2"><label className="block text-xs font-medium text-gray-400 mb-1">Description</label><textarea name="exp3Description" value={resumeData.exp3Description} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition h-20"></textarea></div>
                    </div>
                 </div>

                 <div className="p-4 bg-white/5 rounded-lg space-y-4">
                    
                 <div className="p-4 bg-white/5 rounded-lg space-y-4">
                    <h4 className="text-sm font-bold text-gray-300">Experience 4</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div><label className="block text-xs font-medium text-gray-400 mb-1">Job Title</label><input type="text" name="exp4Role" value={resumeData.exp4Role} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition" /></div>
                       <div><label className="block text-xs font-medium text-gray-400 mb-1">Company</label><input type="text" name="exp4Company" value={resumeData.exp4Company} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition" /></div>
                       <div className="md:col-span-2"><label className="block text-xs font-medium text-gray-400 mb-1">Duration</label><input type="text" name="exp4Duration" value={resumeData.exp4Duration} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition" /></div>
                       <div className="md:col-span-2"><label className="block text-xs font-medium text-gray-400 mb-1">Description</label><textarea name="exp4Description" value={resumeData.exp4Description} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition h-20"></textarea></div>
                    </div>
                 </div>

                 <div className="p-4 bg-white/5 rounded-lg space-y-4">
                    <h4 className="text-sm font-bold text-gray-300">Volunteer Experience</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div><label className="block text-xs font-medium text-gray-400 mb-1">Role</label><input type="text" name="volunteerRole" value={resumeData.volunteerRole} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition" /></div>
                       <div><label className="block text-xs font-medium text-gray-400 mb-1">Organization</label><input type="text" name="volunteerCompany" value={resumeData.volunteerCompany} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition" /></div>
                       <div className="md:col-span-2"><label className="block text-xs font-medium text-gray-400 mb-1">Duration</label><input type="text" name="volunteerDuration" value={resumeData.volunteerDuration} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition" /></div>
                       <div className="md:col-span-2"><label className="block text-xs font-medium text-gray-400 mb-1">Description</label><textarea name="volunteerDescription" value={resumeData.volunteerDescription} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition h-20"></textarea></div>
                    </div>
                 </div>

                 <div className="p-4 bg-white/5 rounded-lg space-y-4">
                    <h4 className="text-sm font-bold text-gray-300">Interests</h4>
                    <div><label className="block text-xs font-medium text-gray-400 mb-1">Interests (comma separated)</label><input type="text" name="interests" value={resumeData.interests} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition" placeholder="Reading, Coding, Traveling" /></div>
                 </div>

                 <h4 className="text-sm font-bold text-gray-300">Education 2</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div><label className="block text-xs font-medium text-gray-400 mb-1">Degree</label><input type="text" name="edu2Degree" value={resumeData.edu2Degree} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition" /></div>
                       <div><label className="block text-xs font-medium text-gray-400 mb-1">School</label><input type="text" name="edu2School" value={resumeData.edu2School} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition" /></div>
                       <div className="md:col-span-2"><label className="block text-xs font-medium text-gray-400 mb-1">Year</label><input type="text" name="edu2Year" value={resumeData.edu2Year} onChange={handleChange} className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition" /></div>
                    </div>
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
                 <button onClick={handleDownloadClick} disabled={isDownloading} className={`px-4 py-1.5 ${isDownloading ? 'bg-green-800 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'} text-white text-sm font-bold rounded transition flex items-center gap-2 shadow-[0_0_15px_rgba(22,163,74,0.3)]`}>
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
                    {selectedTemplate === 'teacher-blue' && renderTeacherBlue(resumeData)}
                    {selectedTemplate === 'ads-expert' && renderAdsExpert(resumeData)}
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
                    {selectedTemplate === 'blue-intern' && renderBlueIntern(resumeData)}
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
                    {selectedTemplate === 'fresher-blue' && renderFresherBlue(resumeData)}
                    {selectedTemplate === 'pm-intern' && renderPMIntern(resumeData)}
                    {selectedTemplate === 'student-job' && renderStudentJob(resumeData)}
                  </div>
              </div>
        </div>


      {/* Quality Selection Modal */}
      {isQualityModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#1a1a1a] border border-white/10 p-8 rounded-2xl max-w-md w-full shadow-2xl relative text-center">
            <button onClick={() => setIsQualityModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white">✕</button>
            <h3 className="text-2xl font-bold text-white mb-2">Download Quality</h3>
            <p className="text-gray-400 text-sm mb-6">Choose the resolution for your resume PDF.</p>
            
            <div className="space-y-3">
              <button onClick={() => triggerDownload(1)} className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold py-3 px-4 rounded-xl transition flex justify-between items-center">
                <span>Standard (360p)</span><span className="text-xs bg-gray-700 px-2 py-1 rounded text-gray-300">Free</span>
              </button>
              <button onClick={() => triggerDownload(1.5)} className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold py-3 px-4 rounded-xl transition flex justify-between items-center">
                <span>Good (480p)</span><span className="text-xs bg-gray-700 px-2 py-1 rounded text-gray-300">Free</span>
              </button>
              <button onClick={() => triggerDownload(2)} className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold py-3 px-4 rounded-xl transition flex justify-between items-center">
                <span>High (720p HD)</span><span className="text-xs bg-gray-700 px-2 py-1 rounded text-gray-300">Free</span>
              </button>
              <button onClick={handlePremiumClick} className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-3 px-4 rounded-xl transition shadow-[0_0_15px_rgba(147,51,234,0.3)] flex justify-between items-center mt-4">
                <div className="flex items-center gap-2"><span>⭐</span><span>Ultra HD (1080p)</span></div><span className="text-sm bg-black/30 px-2 py-1 rounded">₹21</span>
              </button>
            </div>
          </div>
        </div>
      )}

      

      </div>
    </div>
  );
}
