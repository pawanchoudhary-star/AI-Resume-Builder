import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-purple-500/30 font-sans">
      {/* Floating Glass Navigation */}
      <div className="fixed top-6 inset-x-0 flex justify-center z-50 px-4">
        <nav className="w-full max-w-5xl h-16 flex items-center justify-between px-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
          <div className="font-bold text-xl tracking-tighter">
            ResumeAI <span className="text-purple-500">Pro</span>
          </div>
          <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-200">
            <Link href="#features" className="hover:text-white transition-colors">Features</Link>
            <Link href="#templates" className="hover:text-white transition-colors">Templates</Link>
            <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/login" className="text-sm font-medium text-gray-200 hover:text-white transition">Log in</Link>
            <Link href="/builder" className="text-sm font-medium px-6 py-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition shadow-lg">
              Get Started
            </Link>
          </div>
        </nav>
      </div>

      {/* Hero Section */}
      <main className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center mt-20">
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-medium mb-8">
            <span className="flex h-2 w-2 rounded-full bg-purple-500 mr-2 animate-pulse"></span>
            AI-Powered Career Coach is Live
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
            Build your perfect <br /> resume with AI.
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 font-light">
            Generate ATS-friendly resumes, analyze your skills, and get a custom 30-day roadmap. Land your dream job faster.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/builder" className="px-8 py-4 bg-white text-black rounded-full font-medium text-lg hover:bg-gray-200 transition shadow-[0_0_40px_rgba(255,255,255,0.3)]">
              Create Resume for Free
            </Link>
            <Link href="/builder" className="px-8 py-4 bg-transparent border border-white/20 rounded-full font-medium text-lg text-white hover:bg-white/5 transition">
              View Templates
            </Link>
          </div>
        </div>

        {/* Dashboard Preview Mockup */}
        <div className="max-w-5xl mx-auto mt-24 rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-2xl overflow-hidden relative">
          <div className="border-b border-white/10 bg-white/5 p-4 flex items-center justify-between">
            <div className="flex space-x-2">
               <div className="w-3 h-3 rounded-full bg-red-500"></div>
               <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
               <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-xs text-gray-500 font-medium tracking-widest uppercase">ResumeAI Dashboard</div>
            <div className="w-12"></div>
          </div>
          
          <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="md:col-span-2 space-y-6">
                <div className="h-32 bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-white/10 rounded-xl p-6 flex flex-col justify-end relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-4 opacity-50">
                      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                   </div>
                   <h3 className="text-xl font-bold text-white relative z-10">Software Engineer Resume</h3>
                   <p className="text-purple-200 text-sm relative z-10">Updated 2 mins ago • ATS Score: 92%</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                   <div className="h-24 bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col justify-center">
                      <p className="text-gray-400 text-xs mb-1">AI Job Match</p>
                      <p className="text-2xl font-bold text-green-400">88%</p>
                   </div>
                   <div className="h-24 bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col justify-center">
                      <p className="text-gray-400 text-xs mb-1">Missing Skills</p>
                      <p className="text-2xl font-bold text-yellow-400">3</p>
                   </div>
                </div>
             </div>
             
             <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h4 className="text-sm font-bold text-white mb-4">30-Day AI Roadmap</h4>
                <div className="space-y-4">
                   {[1,2,3].map(i => (
                      <div key={i} className="flex items-center space-x-3">
                         <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                         <div className="h-2 bg-white/10 rounded-full w-full"></div>
                      </div>
                   ))}
                   <div className="pt-4 mt-4 border-t border-white/10">
                      <div className="h-8 bg-purple-600 rounded-lg w-full flex items-center justify-center text-xs font-bold">Generate Interview Qs</div>
                   </div>
                </div>
             </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 pointer-events-none"></div>
        </div>
      </main>
    </div>
  );
}
