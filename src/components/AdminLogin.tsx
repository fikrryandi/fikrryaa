import React, { useState } from 'react';
import { Bot, Eye, EyeOff, ShieldCheck, ArrowLeft, Sun, Moon } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onNavigateHome: () => void;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
  adminUsername?: string;
  adminPassword?: string;
}

export default function AdminLogin({
  onLoginSuccess,
  onNavigateHome,
  isDarkMode = true,
  onToggleDarkMode,
  adminUsername = 'admin',
  adminPassword = 'admin'
}: AdminLoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorHint, setErrorHint] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;

    const expectedUser = adminUsername.trim().toLowerCase();
    const expectedPass = adminPassword;

    if (username.trim().toLowerCase() === expectedUser && password === expectedPass) {
      onLoginSuccess();
    } else {
      setErrorHint('Invalid credentials.');
      setTimeout(() => {
        setErrorHint('');
      }, 5000);
    }
  };

  return (
    <div className={`flex items-center justify-center min-h-screen px-4 font-sans relative overflow-hidden transition-colors duration-500 ${
      isDarkMode ? 'bg-[#05050c] text-[#dce3f0]' : 'bg-[#f6f8fc] text-[#1e293b]'
    }`}>
      {/* Visual background blurred blob for cosmic aesthetic */}
      <div className={`absolute top-[15%] left-[25%] w-[450px] h-[450px] rounded-full blur-[110px] pointer-events-none transition-colors duration-500 ${
        isDarkMode ? 'bg-purple-900/15' : 'bg-purple-400/10'
      }`}></div>
      <div className={`absolute bottom-[15%] right-[25%] w-[450px] h-[450px] rounded-full blur-[110px] pointer-events-none transition-colors duration-500 ${
        isDarkMode ? 'bg-cyan-900/15' : 'bg-cyan-400/10'
      }`}></div>

      {/* Main glass card wrapper aligned with mockup themes */}
      <div className={`w-full max-w-md rounded-2xl p-8 transition-all duration-500 border-2 text-left relative z-10 ${
        isDarkMode 
          ? 'bg-[#0c0b16]/95 border-[#2b264d] shadow-[0_0_35px_rgba(139,92,246,0.15)] text-[#dce3f0]' 
          : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50 text-slate-800'
      }`}>
        
        {/* Go Back Link */}
        <button 
          onClick={onNavigateHome}
          className={`absolute left-6 top-6 inline-flex items-center gap-1.5 text-xs transition-colors cursor-pointer font-bold ${
            isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Site
        </button>

        {/* Live Theme Toggle at top right */}
        <button 
          onClick={onToggleDarkMode}
          title={isDarkMode ? "Switch to Light Mode (Aesthetic)" : "Switch to Dark Mode (Cosmic)"}
          className={`absolute right-6 top-5 w-8 h-8 rounded-lg flex items-center justify-center border transition-all duration-300 cursor-pointer ${
            isDarkMode 
              ? 'bg-[#0c0b16] border-[#2b264d] text-yellow-400 hover:bg-[#1a192c]' 
              : 'bg-slate-100/80 border-slate-200 text-slate-700 hover:bg-slate-250'
          }`}
        >
          {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        <div className="flex flex-col items-center mt-8 mb-8 text-center select-none">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 border ${
            isDarkMode 
              ? 'bg-purple-950/30 border-purple-500/40 text-purple-400' 
              : 'bg-purple-50 border-purple-200 text-purple-650'
          }`}>
            <Bot className="w-6 h-6 animate-pulse" />
          </div>
          <h2 className={`text-2xl font-black tracking-tight transition-colors duration-500 ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Administrator Portal
          </h2>
          <p className={`text-xs mt-1.5 transition-colors duration-500 ${
            isDarkMode ? 'text-[#8c909f]' : 'text-slate-500'
          }`}>
            Authenticate access to configure database systems and customize layout parameters
          </p>
        </div>

        <form onSubmit={handleLoginSubmit} className="space-y-5">
          <div>
            <label className={`block text-[10px] font-extrabold uppercase tracking-widest mb-1.5 transition-colors ${
              isDarkMode ? 'text-[#c2c6d6]' : 'text-slate-500'
            }`}>
              Username
            </label>
            <input 
              type="text" 
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full rounded-xl px-4 py-3 text-sm outline-none transition-all font-semibold border-2 ${
                isDarkMode 
                  ? 'bg-[#0e0d1c] border-[#1a192c] text-white focus:border-[#4d3cb3] placeholder-gray-600' 
                  : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-purple-600 placeholder-slate-400'
              }`} 
              placeholder="e.g. admin"
            />
          </div>

          <div>
            <label className={`block text-[10px] font-extrabold uppercase tracking-widest mb-1.5 transition-colors ${
              isDarkMode ? 'text-[#c2c6d6]' : 'text-slate-500'
            }`}>
              Password
            </label>
            <div className="relative">
              <input 
                type={showPassword ? 'text' : 'password'} 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full rounded-xl pl-4 pr-10 py-3 text-sm outline-none transition-all font-semibold border-2 ${
                  isDarkMode 
                    ? 'bg-[#0e0d1c] border-[#1a192c] text-white focus:border-[#4d3cb3] placeholder-gray-600' 
                    : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-purple-600 placeholder-slate-400'
                }`} 
                placeholder="••••••"
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-3 top-3.5 transition-colors ${
                  isDarkMode ? 'text-[#8c909f] hover:text-white' : 'text-slate-400 hover:text-slate-800'
                }`}
              >
                {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
              </button>
            </div>
            
          </div>

          {errorHint && (
            <div className={`border p-3.5 rounded-xl text-xs font-semibold text-center mt-2 animate-bounce ${
              isDarkMode 
                ? 'bg-red-950/30 border-red-900/50 text-red-400'
                : 'bg-red-50 border-red-200 text-red-600'
            }`}>
              ⚠️ {errorHint}
            </div>
          )}

          <button 
            type="submit"
            className={`w-full text-white font-extrabold py-3.5 rounded-xl text-sm tracking-widest uppercase transition-all transform hover:translate-y-[-1px] active:translate-y-[1px] cursor-pointer shadow-lg ${
              isDarkMode 
                ? 'bg-[#4d3cb3] hover:bg-[#5b4acc] shadow-purple-950/40' 
                : 'bg-purple-600 hover:bg-purple-500 shadow-purple-500/20'
            }`}
          >
            Authenticate Portal
          </button>
        </form>

        <div className={`mt-8 pt-6 border-t text-center transition-colors ${
          isDarkMode ? 'border-[#2e353f]/50' : 'border-slate-200'
        }`}>
          <p className={`text-[10px] uppercase tracking-widest font-bold flex items-center justify-center gap-1.5 transition-colors ${
            isDarkMode ? 'text-[#8c909f]' : 'text-slate-500'
          }`}>
            <ShieldCheck className="w-4 h-4 text-[#4d3cb3]" />
            SECURE SYSTEM GATEWAY
          </p>
        </div>

      </div>
    </div>
  );
}
