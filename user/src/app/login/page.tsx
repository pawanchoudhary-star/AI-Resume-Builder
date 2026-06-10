"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export default function Login() {
  const router = useRouter();
  const [loginState, setLoginState] = useState<'idle' | 'success' | 'welcome'>('idle');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setLoginState('success');
        setTimeout(() => {
          setLoginState('welcome');
          setTimeout(() => {
            router.push('/dashboard'); // Go to dashboard instead of home
          }, 2000);
        }, 1500);
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Extract name from email (e.g. pawan@example.com -> Pawan)
  const formattedName = email 
    ? email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1) 
    : 'User';

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center font-sans overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
         <div className="w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]"></div>
      </div>

      <AnimatePresence mode="wait">
        {loginState === 'idle' && (
          <motion.div 
            key="login-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md shadow-2xl relative z-10"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
              <p className="text-gray-400">Log in to continue to ResumeAI Pro</p>
            </div>
            
            {error && <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-sm text-center">{error}</div>}

            
            <form onSubmit={handleLogin} className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 transition"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 transition"
                  placeholder="••••••••"
                />
              </div>
              <button 
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-purple-600 text-white font-medium rounded-xl hover:bg-purple-700 transition shadow-[0_0_20px_rgba(147,51,234,0.3)] disabled:opacity-50"
              >
                {loading ? 'Logging in...' : 'Log in'}
              </button>
            </form>

            <div className="relative flex items-center py-5">
                <div className="flex-grow border-t border-white/10"></div>
                <span className="flex-shrink-0 mx-4 text-gray-500 text-sm">or</span>
                <div className="flex-grow border-t border-white/10"></div>
            </div>
            
            <div className="space-y-4">
              <button onClick={() => { setEmail('Google User'); handleLogin(); }} type="button" className="w-full py-3 px-4 bg-white text-black font-medium rounded-xl hover:bg-gray-200 transition flex justify-center items-center">
                Continue with Google
              </button>
              <button onClick={() => { setEmail('GitHub User'); handleLogin(); }} type="button" className="w-full py-3 px-4 bg-[#24292e] text-white font-medium rounded-xl hover:bg-[#2f363d] transition flex justify-center items-center">
                Continue with GitHub
              </button>
            </div>
            
            <div className="mt-8 text-center text-sm text-gray-400">
              Don't have an account? <Link href="/register" className="text-purple-400 hover:text-purple-300 font-medium">Sign up</Link>
            </div>
            
            <div className="mt-6 text-center">
              <Link href="/" className="text-gray-500 hover:text-gray-300 text-sm">
                &larr; Back to Home
              </Link>
            </div>
          </motion.div>
        )}

        {loginState === 'success' && (
          <motion.div 
            key="success-message"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="flex flex-col items-center justify-center relative z-10"
          >
            <motion.div 
               initial={{ scale: 0 }}
               animate={{ scale: 1 }}
               transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
               className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(34,197,94,0.4)]"
            >
               <CheckCircle2 className="w-10 h-10 text-green-400" />
            </motion.div>
            <h2 className="text-4xl font-bold text-white tracking-tight">Login Successfully!</h2>
          </motion.div>
        )}

        {loginState === 'welcome' && (
          <motion.div 
            key="welcome-message"
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center relative z-10 text-center"
          >
            <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent tracking-tighter">
              Welcome, {formattedName}!
            </h2>
            <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-8 text-gray-400 flex items-center gap-3"
            >
              <div className="w-5 h-5 rounded-full border-2 border-purple-500 border-t-transparent animate-spin"></div>
              <span>Taking you to home page...</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

