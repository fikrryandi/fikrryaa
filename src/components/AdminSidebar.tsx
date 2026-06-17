import React from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  Zap, 
  History, 
  Mail, 
  Settings, 
  LogOut, 
  Bot, 
  Globe,
  GraduationCap,
  Award,
  Home,
  User
} from 'lucide-react';

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  unreadCount: number;
  onLogout: () => void;
  onViewPortfolio: () => void;
  siteTitle: string;
  onToggleSidebar?: () => void;
  isDarkMode?: boolean;
}

export default function AdminSidebar({
  activeTab,
  onTabChange,
  unreadCount,
  onLogout,
  onViewPortfolio,
  siteTitle,
  onToggleSidebar,
  isDarkMode = false
}: AdminSidebarProps) {
  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'home_settings', label: 'Beranda (Home)', icon: Home },
    { id: 'about_settings', label: 'Tentang (About)', icon: User },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'skills', label: 'Skills Arsenal', icon: Zap },
    { id: 'certificates', label: 'Certificates & Awards', icon: Award },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'experience', label: 'Experience', icon: History },
    { id: 'inbox', label: 'Inbox', icon: Mail, badge: unreadCount },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className={`w-64 flex flex-col justify-between h-full transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-[#05050c] border-r border-[#12111d] text-[#dce3f0]' 
        : 'bg-white border-r border-slate-200 text-slate-700'
    }`}>
      {/* Brand Profile Header */}
      <div className={`p-6 flex items-center border-b ${
        isDarkMode ? 'border-[#12111d]' : 'border-slate-100'
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-950/20 border border-[#00c2ff]/20 flex items-center justify-center text-[#00c2ff]">
            <Bot className="w-6 h-6 animate-pulse" />
          </div>
          <div className="text-left select-none">
            <h1 className={`text-xs font-black tracking-wider uppercase whitespace-nowrap overflow-visible ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              {siteTitle || 'Portofolio Fikri'}
            </h1>
            <p className="text-[9px] text-[#8155da] uppercase tracking-widest font-black flex items-center gap-1">
              Admin Portal
            </p>
          </div>
        </div>
      </div>

      {/* Navigation menus */}
      <nav className="flex-grow p-4 space-y-1.5 overflow-y-auto">
        {menuItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-xs font-bold transition-all group cursor-pointer border-l-4 ${
                isActive 
                  ? isDarkMode
                    ? 'bg-[#13112a] text-white border-[#8b5cf6] shadow-sm shadow-[#8b5cf6]/10'
                    : 'bg-[#f0effd] text-[#5844da] border-[#5844da] shadow-sm shadow-indigo-150/10'
                  : isDarkMode
                    ? 'border-transparent text-[#8c909f] hover:text-white hover:bg-[#0c0b16]'
                    : 'border-transparent text-[#64748b] hover:text-[#0f172a] hover:bg-[#f6f8fc]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4.5 h-4.5 ${
                  isActive 
                    ? isDarkMode ? 'text-[#8b5cf6]' : 'text-[#5844da]' 
                    : isDarkMode ? 'text-[#4e4d6a] group-hover:text-[#8d89be]' : 'text-slate-400 group-hover:text-slate-650'
                } transition-colors`} />
                <span className="tracking-wide">{item.label}</span>
              </div>
              {item.badge !== undefined && item.badge > 0 && (
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-black ${
                  isActive ? 'bg-purple-650 text-white' : isDarkMode ? 'bg-[#ff4e4e]/15 text-[#ff6c6c]' : 'bg-red-100 text-red-650'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Action Footer */}
      <div className={`p-4 border-t space-y-2 ${
        isDarkMode ? 'border-[#12111d]' : 'border-slate-100'
      }`}>
        <button
          onClick={onViewPortfolio}
          className={`w-full flex items-center justify-center gap-2 border text-xs font-bold py-2.5 rounded-lg transition-colors cursor-pointer ${
            isDarkMode 
              ? 'bg-[#0c0b16] hover:bg-[#13112a] border-[#1a192c] text-[#adc6ff]' 
              : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
          }`}
        >
          <Globe className="w-4 h-4" />
          View Live Portfolio
        </button>

        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 bg-red-550/10 hover:bg-red-550/15 text-red-550 text-xs font-bold py-2.5 rounded-lg border border-red-500/20 transition-all cursor-pointer scale-98 active:scale-95"
        >
          <LogOut className="w-4 h-4" />
          Sign Out Portal
        </button>
      </div>
    </aside>
  );
}
