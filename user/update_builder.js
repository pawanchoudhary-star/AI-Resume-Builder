const fs = require('fs');
let c = fs.readFileSync('src/app/builder/page.tsx', 'utf8');

if (!c.includes('const [isSaving, setIsSaving]')) {
  c = c.replace(
    'const [isAiGenerating, setIsAiGenerating] = useState(false);',
    `const [isAiGenerating, setIsAiGenerating] = useState(false);\n  const [isSaving, setIsSaving] = useState(false);\n  const [isLoggedIn, setIsLoggedIn] = useState(false);`
  );
  
  // Remove the static isLoggedIn
  c = c.replace('const isLoggedIn = false;', '');
  
  // Add useEffect to check login
  c = c.replace(
    'const router = useRouter();',
    `const router = useRouter();\n\n  import { useEffect } from 'react';\n  useEffect(() => {\n    fetch('/api/auth/me').then(res => setIsLoggedIn(res.ok));\n  }, []);`
  );
  
  // Add handleSave function
  const handleSaveFunc = `
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
  `;
  c = c.replace('const handleDownload = async () => {', handleSaveFunc + '\n  const handleDownload = async () => {');
  
  // Add the Save button next to the Download PDF button
  const oldBtn = `{isDownloading ? 'Downloading...' : 'Download PDF'}\n                   </button>`;
  const newBtn = `{isDownloading ? 'Downloading...' : 'Download PDF'}\n                   </button>\n                   <button onClick={handleSave} disabled={isSaving} className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition flex items-center gap-2 shadow-lg disabled:opacity-50"> {isSaving ? 'Saving...' : 'Save to Dashboard'} </button>`;
  
  c = c.replace(oldBtn, newBtn);
  
  fs.writeFileSync('src/app/builder/page.tsx', c);
  console.log('Builder updated');
}
