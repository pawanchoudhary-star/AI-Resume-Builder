"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FileText, Plus, LogOut, Loader2 } from 'lucide-react';

export default function Dashboard() {
  const router = useRouter();
  const [resumes, setResumes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check auth and fetch resumes
    const init = async () => {
      try {
        const userRes = await fetch('/api/auth/me');
        if (!userRes.ok) {
          router.push('/login');
          return;
        }
        const userData = await userRes.json();
        setUser(userData);

        const resumeRes = await fetch('/api/resumes');
        if (resumeRes.ok) {
          const resumeData = await resumeRes.json();
          setResumes(resumeData);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [router]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-purple-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">My Dashboard</h1>
            <p className="text-gray-400">Welcome back, {user?.name}</p>
          </div>
          <div className="flex gap-4">
            <Link href="/builder" className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl transition flex items-center gap-2">
              <Plus className="w-5 h-5" /> Create New Resume
            </Link>
            <button onClick={handleLogout} className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl transition flex items-center gap-2 border border-white/10">
              <LogOut className="w-4 h-4" /> Log out
            </button>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6">Saved Resumes</h2>

        {resumes.length === 0 ? (
          <div className="text-center py-20 bg-white/5 border border-white/10 rounded-3xl">
            <FileText className="w-16 h-16 text-gray-500 mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-medium mb-2">No resumes yet</h3>
            <p className="text-gray-400 mb-6">Create your first professional resume to get started</p>
            <Link href="/builder" className="inline-block px-6 py-3 bg-purple-600 text-white font-medium rounded-xl hover:bg-purple-700 transition shadow-[0_0_20px_rgba(147,51,234,0.3)]">
              Build Resume Now
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume) => (
              <div key={resume._id} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-purple-500/50 hover:bg-white/10 transition group">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
                  <FileText className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-1">{resume.title}</h3>
                <p className="text-sm text-gray-400 mb-6">Level: <span className="capitalize">{resume.experienceLevel}</span></p>
                <div className="flex justify-between items-center mt-auto">
                   <p className="text-xs text-gray-500">Updated: {new Date(resume.updatedAt).toLocaleDateString()}</p>
                   {/* In a real app we would pass the ID to builder to edit, but for now we just show it */}
                   <span className="text-xs px-3 py-1 bg-green-500/20 text-green-400 rounded-full">Saved</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
