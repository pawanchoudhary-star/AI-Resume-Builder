import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      <nav className="border-b border-white/10 bg-black/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-bold text-xl tracking-tighter">
            <Link href="/">ResumeAI <span className="text-purple-500">Pro</span></Link>
          </div>
          <div className="flex space-x-4">
             <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-300 font-bold border border-purple-500/50">
                P
             </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-12">
          <div>
             <h1 className="text-3xl font-bold mb-2">My Dashboard</h1>
             <p className="text-gray-400">Manage your resumes and track your career progress.</p>
          </div>
          <Link href="/builder" className="px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition">
             + Create New Resume
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[{ title: 'Total Resumes', val: '0' }, { title: 'Avg ATS Score', val: 'N/A' }, { title: 'Profile Views', val: '0' }, { title: 'Job Match', val: 'N/A' }].map((stat, i) => (
             <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-xl backdrop-blur-sm">
                <p className="text-gray-400 text-sm font-medium mb-2">{stat.title}</p>
                <p className="text-3xl font-bold">{stat.val}</p>
             </div>
          ))}
        </div>

        <div>
           <h2 className="text-xl font-bold mb-6">Recent Resumes</h2>
           <div className="h-64 border border-dashed border-white/20 rounded-xl flex items-center justify-center text-gray-500 bg-white/5">
              No resumes found. Create one to get started!
           </div>
        </div>
      </main>
    </div>
  );
}
