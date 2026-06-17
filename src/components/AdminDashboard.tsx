import React from 'react';
import { 
  Project, 
  Skill, 
  Experience, 
  Message, 
  SystemSettings 
} from '../types';
import { 
  Briefcase, 
  Zap, 
  History, 
  Mail, 
  ArrowRight, 
  Plus, 
  Sliders 
} from 'lucide-react';

interface AdminDashboardProps {
  projects: Project[];
  skills: Skill[];
  experiences: Experience[];
  messages: Message[];
  settings: SystemSettings;
  onNavigateToTab: (tab: string) => void;
  onMarkMessageRead: (id: string, status: 'READ' | 'UNREAD') => void;
  onDeleteMessage: (id: string) => void;
  isDarkMode?: boolean;
}

export default function AdminDashboard({
  projects,
  skills,
  experiences,
  messages,
  settings,
  onNavigateToTab,
  onMarkMessageRead,
  onDeleteMessage,
  isDarkMode = false
}: AdminDashboardProps) {
  const unreadMessages = messages.filter(m => m.status === 'UNREAD');
  const publishedProjects = projects.filter(p => p.status === 'Published');
  const draftProjects = projects.filter(p => p.status === 'Draft');

  return (
    <div className={`space-y-8 animate-[fade-in_0.3s_ease-out] ${isDarkMode ? 'text-[#dce3f0]' : 'text-slate-700'}`}>
      
      {/* Header and intro */}
      <div className="text-left border-l-4 border-indigo-500 pl-4 py-1">
        <span className="text-[10px] font-black tracking-widest text-[#5844da] uppercase block mb-1">
          Tactical System Control
        </span>
        <h2 className={`text-2xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-[#0f172a]'}`}>
          Administrator Command Center
        </h2>
        <p className={`text-xs mt-1 font-medium ${isDarkMode ? 'text-[#8c909f]' : 'text-slate-500'}`}>
          Manage system databases, synchronize live leads records, edit skills proficiencies, and fine-tune aesthetics.
        </p>
      </div>

      {/* Metrics Grid matching image double borders / outlines */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Projects Manager Card */}
        <div 
          onClick={() => onNavigateToTab('projects')}
          className={`rounded-[22px] p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border-2 ${
            isDarkMode 
              ? 'bg-[#0c0b16] border-[#5844da] shadow-[0_0_20px_rgba(88,68,218,0.12)] text-[#dce3f0]' 
              : 'bg-white border-[#5844da]/40 shadow-md shadow-indigo-150/10 text-slate-800'
          }`}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className={`text-[10px] uppercase tracking-wider font-extrabold block mb-1.5 ${isDarkMode ? 'text-[#8b5cf6]' : 'text-purple-650'}`}>
                Active Projects
              </span>
              <p className={`text-3xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {projects.length}
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#5844da]/10 flex items-center justify-center text-[#715df2]">
              <Briefcase className="w-5 h-5" />
            </div>
          </div>
          <div className={`text-[11px] font-semibold flex items-center gap-2 pt-2 border-t ${isDarkMode ? 'border-purple-950/40 text-gray-400' : 'border-slate-100 text-slate-500'}`}>
            <span className="text-pink-500 font-bold">{publishedProjects.length}</span> Published / <span className="text-purple-505 font-bold">{draftProjects.length}</span> Drafts
          </div>
        </div>

        {/* Skills Arsenal Card */}
        <div 
          onClick={() => onNavigateToTab('skills')}
          className={`rounded-[22px] p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border-2 ${
            isDarkMode 
              ? 'bg-[#0c0b16] border-[#16a1b5] shadow-[0_0_20px_rgba(22,161,181,0.12)] text-[#dce3f0]' 
              : 'bg-white border-[#16a1b5]/40 shadow-md shadow-teal-100/20 text-slate-800'
          }`}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className={`text-[10px] uppercase tracking-wider font-extrabold block mb-1.5 ${isDarkMode ? 'text-[#16a1b5]' : 'text-teal-605'}`}>
                Skills Proficiency
              </span>
              <p className={`text-3xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {skills.length}
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#16a1b5]/10 flex items-center justify-center text-[#1ec4dc]">
              <Zap className="w-5 h-5" />
            </div>
          </div>
          <div className={`text-[11px] font-semibold flex items-center gap-2 pt-2 border-t ${isDarkMode ? 'border-teal-950/40 text-gray-400' : 'border-slate-100 text-slate-500'}`}>
            Status: <span className="text-[#16a1b5] font-bold">All Tech Skills Active</span>
          </div>
        </div>

        {/* Experiences Card */}
        <div 
          onClick={() => onNavigateToTab('experience')}
          className={`rounded-[22px] p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border-2 ${
            isDarkMode 
              ? 'bg-[#0c0b16] border-[#3b82f6] shadow-[0_0_20px_rgba(59,130,246,0.12)] text-[#dce3f0]' 
              : 'bg-white border-[#3b82f6]/40 shadow-md shadow-blue-150/15 text-slate-800'
          }`}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className={`text-[10px] uppercase tracking-wider font-extrabold block mb-1.5 ${isDarkMode ? 'text-[#3b82f6]' : 'text-blue-650'}`}>
                Career Milestones
              </span>
              <p className={`text-3xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {experiences.length}
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#3b82f6]/10 flex items-center justify-center text-[#60a5fa]">
              <History className="w-5 h-5" />
            </div>
          </div>
          <div className={`text-[11px] font-semibold flex items-center gap-2 pt-2 border-t ${isDarkMode ? 'border-blue-950/40 text-gray-400' : 'border-slate-100 text-slate-500'}`}>
            Timeline intervals successfully mapped
          </div>
        </div>

        {/* Leads & Inbox Card */}
        <div 
          onClick={() => onNavigateToTab('inbox')}
          className={`rounded-[22px] p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border-2 ${
            isDarkMode 
              ? 'bg-[#0c0b16] border-[#81457d] shadow-[0_0_20px_rgba(129,69,125,0.12)] text-[#dce3f0]' 
              : 'bg-white border-[#81457d]/40 shadow-md shadow-pink-100/20 text-slate-800'
          }`}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className={`text-[10px] uppercase tracking-wider font-extrabold block mb-1.5 ${isDarkMode ? 'text-[#ec4899]' : 'text-pink-655'}`}>
                System Leads Inbox
              </span>
              <p className={`text-3xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {messages.length}
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#ec4899]/10 flex items-center justify-center text-[#f472b6]">
              <Mail className="w-5 h-5" />
            </div>
          </div>
          <div className={`text-[11px] font-semibold flex items-center gap-2 pt-2 border-t ${isDarkMode ? 'border-pink-950/40 text-gray-400' : 'border-slate-100 text-slate-500'}`}>
            <span className="text-[#ec4899] font-bold">{unreadMessages.length}</span> New messages pending action
          </div>
        </div>

      </div>

      {/* Main Grid Layout to prevent any overlap or styling collision */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
        
        {/* Left column: Recent Inbox Leads */}
        <div className={`lg:col-span-8 border-2 rounded-[22px] p-6 flex flex-col h-[520px] shadow-sm ${
          isDarkMode ? 'bg-[#0c0b16] border-[#12111d]' : 'bg-white border-slate-205'
        }`}>
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-[#1a192c]/40">
            <div>
              <h3 className={`text-base font-black flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                <Mail className="w-5 h-5 text-[#81457d]" />
                Recent System Inquiries
              </h3>
              <p className={`text-[11px] font-medium mt-0.5 ${isDarkMode ? 'text-[#8c909f]' : 'text-slate-400'}`}>
                Click messages to toggle status or delete inquiry records
              </p>
            </div>
            <button 
              onClick={() => onNavigateToTab('inbox')}
              className={`text-xs font-bold flex items-center gap-1 group/btn cursor-pointer px-3 py-1.5 rounded-lg border transition-all ${
                isDarkMode 
                  ? 'text-[#adc6ff] hover:text-white bg-[#13112a] border-[#2b264d]' 
                  : 'text-purple-600 hover:text-purple-800 bg-purple-50 border-[#5844da]/20'
              }`}
            >
              Go to Inbox
              <ArrowRight className="w-3" />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto pr-2 space-y-3.5">
            {messages.length === 0 ? (
              <div className={`h-full flex flex-col items-center justify-center text-center ${isDarkMode ? 'text-[#505260]' : 'text-slate-400'}`}>
                <Mail className="w-12 h-12 mb-4 opacity-25" />
                <p className="text-sm font-semibold">Workspace Inbox is empty.</p>
              </div>
            ) : (
              messages.map(msg => (
                <div 
                  key={msg.id}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    msg.status === 'UNREAD' 
                      ? isDarkMode 
                        ? 'bg-purple-950/15 border-[#8b5cf6]/30' 
                        : 'bg-purple-50/70 border-purple-200/90 shadow-[0_2px_8px_rgba(88,68,218,0.04)]' 
                      : isDarkMode 
                        ? 'bg-[#05050c]/80 border-[#1a192c]' 
                        : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2.5">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full border-2 font-black text-xs flex items-center justify-center ${
                        isDarkMode 
                          ? 'bg-purple-900/20 border-purple-500/20 text-[#adc6ff]' 
                          : 'bg-purple-100 border-purple-200 text-purple-755'
                      }`}>
                        {msg.sender.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h4 className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                          {msg.sender}
                        </h4>
                        <p className={`text-[10px] font-mono ${isDarkMode ? 'text-[#8c909f]' : 'text-slate-500'}`}>
                          {msg.email}
                        </p>
                      </div>
                    </div>
                    <span className={`text-[10px] font-bold ${isDarkMode ? 'text-[#5a5c6c]' : 'text-slate-400'}`}>
                      {msg.dateText || 'Just now'}
                    </span>
                  </div>
                  <h5 className={`text-xs font-bold mb-1 ${isDarkMode ? 'text-[#adc6ff]' : 'text-[#5844da]'}`}>
                    {msg.subject}
                  </h5>
                  <p className={`text-xs leading-relaxed mb-4 ${isDarkMode ? 'text-gray-300' : 'text-slate-605'}`}>
                    {msg.message}
                  </p>
                  
                  <div className="flex justify-end gap-2 pt-2 border-t border-dashed border-[#1a192c]/20">
                    <button
                      onClick={() => onMarkMessageRead(msg.id, msg.status === 'READ' ? 'UNREAD' : 'READ')}
                      className={`px-3 py-1 rounded-lg text-[10px] font-bold border-2 transition-all cursor-pointer ${
                        isDarkMode 
                          ? 'bg-[#0c0b16] hover:bg-[#13112a] text-white border-[#1a192c]' 
                          : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-750'
                      }`}
                    >
                      {msg.status === 'READ' ? 'Mark Unread' : 'Mark Read'}
                    </button>
                    <button
                      onClick={() => onDeleteMessage(msg.id)}
                      className="px-3 py-1 rounded-lg text-[10px] font-bold bg-red-500/10 hover:bg-red-500/20 text-red-500 border-2 border-red-500/20 transition-all cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right column: Quick Actions & Configuration Parameters */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Quick Actions Component */}
          <div className={`border-2 rounded-[22px] p-6 shadow-sm ${
            isDarkMode ? 'bg-[#0c0b16] border-[#12111d]' : 'bg-white border-slate-200'
          }`}>
            <h3 className={`text-sm font-black mb-4 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              <Plus className="w-5 h-5 text-[#16a1b5]" />
              Interactive Actions
            </h3>
            <div className="space-y-3">
              <button
                onClick={() => onNavigateToTab('projects')}
                className={`w-full text-left border-2 p-3.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between group cursor-pointer ${
                  isDarkMode 
                    ? 'bg-[#05050c] hover:bg-[#13112a] border-[#1a192c] hover:border-[#5844da]/40 text-[#dce3f0]' 
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                }`}
              >
                <span>Add Portfolio Project</span>
                <Briefcase className="w-4.5 h-4.5 text-[#4a4b5d] group-hover:text-[#5844da] transition-colors" />
              </button>

              <button
                onClick={() => onNavigateToTab('skills')}
                className={`w-full text-left border-2 p-3.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between group cursor-pointer ${
                  isDarkMode 
                    ? 'bg-[#05050c] hover:bg-[#13112a] border-[#1a192c] hover:border-[#16a1b5]/40 text-[#dce3f0]' 
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                }`}
              >
                <span>Add Skill / Proficiency</span>
                <Zap className="w-4.5 h-4.5 text-[#4a4b5d] group-hover:text-[#16a1b5] transition-colors" />
              </button>

              <button
                onClick={() => onNavigateToTab('experience')}
                className={`w-full text-left border-2 p-3.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between group cursor-pointer ${
                  isDarkMode 
                    ? 'bg-[#05050c] hover:bg-[#13112a] border-[#1a192c] hover:border-[#3b82f6]/40 text-[#dce3f0]' 
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-705'
                }`}
              >
                <span>Add Professional Role</span>
                <History className="w-4.5 h-4.5 text-[#4a4b5d] group-hover:text-[#3b82f6] transition-colors" />
              </button>
            </div>
          </div>

          {/* Settings Parameters */}
          <div className={`border-2 rounded-[22px] p-6 shadow-sm ${
            isDarkMode ? 'bg-[#0c0b16] border-[#12111d]' : 'bg-white border-slate-200'
          }`}>
            <h3 className={`text-sm font-black mb-4 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              <Sliders className="w-4 h-4 text-[#5844da]" />
              System Status & Accents
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-1.5 border-b border-slate-100/10">
                <span className={`text-xs font-bold ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>Theme Accent</span>
                <span className={`text-[10px] font-mono font-black border px-2.5 py-1 rounded-lg ${
                  isDarkMode 
                    ? 'bg-[#5844da]/10 text-[#adc6ff] border-[#5844da]/25' 
                    : 'bg-purple-100/40 text-[#5844da] border-[#5844da]/35'
                }`}>
                  {isDarkMode ? 'AETHER DARK' : 'AETHER LIGHT'}
                </span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-slate-100/10">
                <span className={`text-xs font-bold ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>Maintenance State</span>
                <span className={`text-[9px] font-black px-2.5 py-0.5 rounded-full ${
                  settings.maintenanceMode 
                    ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' 
                    : 'bg-emerald-500/10 text-emerald-650 border border-emerald-500/20'
                }`}>
                  {settings.maintenanceMode ? 'ACTIVE' : 'READY'}
                </span>
              </div>
              <button 
                onClick={() => onNavigateToTab('settings')}
                className={`w-full text-xs font-black py-3 rounded-xl border-2 transition-all cursor-pointer ${
                  isDarkMode 
                    ? 'bg-[#13112a] hover:bg-[#5844da]/10 border-[#5844da]/45 text-white' 
                    : 'bg-[#f0effd] text-[#5844da] hover:bg-[#f0effd]/80 border-[#5844da]/25'
                }`}
              >
                Configure Settings
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
