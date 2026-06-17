import React, { useState, useEffect } from 'react';
import { 
  Project, 
  Skill, 
  Experience, 
  Message, 
  SystemSettings,
  Education,
  Certificate
} from './types';
import { 
  INITIAL_PROJECTS, 
  INITIAL_SKILLS, 
  INITIAL_EXPERIENCES, 
  INITIAL_MESSAGES, 
  INITIAL_SETTINGS,
  INITIAL_EDUCATIONS,
  INITIAL_CERTIFICATES
} from './data';

import PublicPortfolio from './components/PublicPortfolio';
import AdminLogin from './components/AdminLogin';
import AdminSidebar from './components/AdminSidebar';
import AdminDashboard from './components/AdminDashboard';
import AdminProjects from './components/AdminProjects';
import AdminSkills from './components/AdminSkills';
import AdminExperiences from './components/AdminExperiences';
import AdminMessages from './components/AdminMessages';
import AdminSettings from './components/AdminSettings';
import AdminHomeSettings from './components/AdminHomeSettings';
import AdminAboutSettings from './components/AdminAboutSettings';
import AdminEducations from './components/AdminEducations';
import AdminCertificates from './components/AdminCertificates';

import { 
  ShieldAlert, 
  Menu, 
  X, 
  Cpu,
  Sun,
  Moon,
  Calendar,
  Clock,
  User,
  Activity,
  LogOut,
  Bot,
  AlertTriangle
} from 'lucide-react';

export default function App() {
  // Navigation states
  const [viewState, setViewState] = useState<'home' | 'login' | 'admin'>('home');
  const [adminActiveTab, setAdminActiveTab] = useState<string>('overview');
  const [adminMobileMenuOpen, setAdminMobileMenuOpen] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(true);

  // Custom Confirmation Dialog State
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {}
  });

  const askConfirmation = (title: string, message: string, onConfirm: () => void) => {
    setConfirmDialog({
      isOpen: true,
      title,
      message,
      onConfirm: () => {
        onConfirm();
        setConfirmDialog(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  // Centralized Theme State
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const stored = localStorage.getItem('aether_is_dark_mode');
    return stored !== null ? JSON.parse(stored) : false;
  });

  const handleSetIsDarkMode = (val: boolean) => {
    setIsDarkMode(val);
    localStorage.setItem('aether_is_dark_mode', JSON.stringify(val));
  };

  // Live Digital clock hooks & date helper for the header
  const [currentTime, setCurrentTime] = useState<string>('');
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      const secs = String(now.getSeconds()).padStart(2, '0');
      setCurrentTime(`${hrs} : ${mins} : ${secs}`);
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  const getIndonesianDate = () => {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    const now = new Date();
    return `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
  };

  // Helper to securely get initial state, preferring server-injected data if available to eliminate load latency
  const getInitialValue = <T,>(key: string, backup: T): T => {
    // 1. Check server-side injected state first (critical for instant load on other devices/browsers)
    const injected = (window as any).__INITIAL_DATA__;
    if (injected && injected[key] !== undefined) {
      try {
        localStorage.setItem(`aether_${key}`, JSON.stringify(injected[key]));
      } catch (e) {
        console.error("Local storage error:", e);
      }
      return injected[key] as T;
    }
    
    // 2. Check local storage
    const stored = localStorage.getItem(`aether_${key}`);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error("Failed to parse local storage:", e);
      }
    }
    
    // 3. Fallback to default mock dataset
    try {
      localStorage.setItem(`aether_${key}`, JSON.stringify(backup));
    } catch (e) {}
    return backup;
  };

  // Entities state with synchronous initialization
  const [projects, setProjects] = useState<Project[]>(() => getInitialValue('projects', INITIAL_PROJECTS));
  const [skills, setSkills] = useState<Skill[]>(() => getInitialValue('skills', INITIAL_SKILLS));
  const [experiences, setExperiences] = useState<Experience[]>(() => getInitialValue('experiences', INITIAL_EXPERIENCES));
  const [educations, setEducations] = useState<Education[]>(() => getInitialValue('educations', INITIAL_EDUCATIONS));
  const [messages, setMessages] = useState<Message[]>(() => getInitialValue('messages', INITIAL_MESSAGES));
  const [settings, setSettings] = useState<SystemSettings>(() => getInitialValue('settings', INITIAL_SETTINGS));
  const [certificates, setCertificates] = useState<Certificate[]>(() => getInitialValue('certificates', INITIAL_CERTIFICATES));

  // Load login state and sync state with server on startup
  useEffect(() => {
    const storedLoggedIn = localStorage.getItem('aether_is_logged_in');
    if (storedLoggedIn === 'true') {
      setViewState('admin');
    }
  }, []);

  useEffect(() => {
    async function fetchServerState() {
      try {
        const response = await fetch('/api/portfolio');
        if (!response.ok) throw new Error('Failed to load portfolio database from server');
        const db = await response.json();
        if (db) {
          if (db.projects) {
            setProjects(db.projects);
            localStorage.setItem('aether_projects', JSON.stringify(db.projects));
          }
          if (db.skills) {
            setSkills(db.skills);
            localStorage.setItem('aether_skills', JSON.stringify(db.skills));
          }
          if (db.experiences) {
            setExperiences(db.experiences);
            localStorage.setItem('aether_experiences', JSON.stringify(db.experiences));
          }
          if (db.educations) {
            setEducations(db.educations);
            localStorage.setItem('aether_educations', JSON.stringify(db.educations));
          }
          if (db.messages) {
            setMessages(db.messages);
            localStorage.setItem('aether_messages', JSON.stringify(db.messages));
          }
          if (db.settings) {
            setSettings(db.settings);
            localStorage.setItem('aether_settings', JSON.stringify(db.settings));
          }
          if (db.certificates) {
            setCertificates(db.certificates);
            localStorage.setItem('aether_certificates', JSON.stringify(db.certificates));
          }
        }
      } catch (err) {
        console.error("Failed to sync server data, using cached local states:", err);
      }
    }
    fetchServerState();
  }, []);

  // Server state sync helper
  const syncWithServer = async (key: string, data: any) => {
    try {
      const res = await fetch('/api/portfolio/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ key, data })
      });
      if (!res.ok) {
        console.error(`Failed to sync [${key}] with backend server:`, res.statusText);
      }
    } catch (err) {
      console.error(`Network error syncing [${key}] with server:`, err);
    }
  };

  // Save methods
  const saveProjects = (updated: Project[]) => {
    setProjects(updated);
    try {
      localStorage.setItem('aether_projects', JSON.stringify(updated));
    } catch (e) {
      console.error("Storage save failed:", e);
    }
    syncWithServer('projects', updated);
  };

  const saveSkills = (updated: Skill[]) => {
    setSkills(updated);
    try {
      localStorage.setItem('aether_skills', JSON.stringify(updated));
    } catch (e) {
      console.error("Storage save failed:", e);
    }
    syncWithServer('skills', updated);
  };

  const saveExperiences = (updated: Experience[]) => {
    setExperiences(updated);
    try {
      localStorage.setItem('aether_experiences', JSON.stringify(updated));
    } catch (e) {
      console.error("Storage save failed:", e);
    }
    syncWithServer('experiences', updated);
  };

  const saveEducations = (updated: Education[]) => {
    setEducations(updated);
    try {
      localStorage.setItem('aether_educations', JSON.stringify(updated));
    } catch (e) {
      console.error("Storage save failed:", e);
    }
    syncWithServer('educations', updated);
  };

  const saveMessages = (updated: Message[]) => {
    setMessages(updated);
    try {
      localStorage.setItem('aether_messages', JSON.stringify(updated));
    } catch (e) {
      console.error("Storage save failed:", e);
    }
    syncWithServer('messages', updated);
  };

  const saveSettings = (updated: SystemSettings) => {
    setSettings(updated);
    try {
      localStorage.setItem('aether_settings', JSON.stringify(updated));
    } catch (e) {
      console.error("Storage save failed:", e);
    }
    syncWithServer('settings', updated);
  };

  const saveCertificates = (updated: Certificate[]) => {
    setCertificates(updated);
    try {
      localStorage.setItem('aether_certificates', JSON.stringify(updated));
    } catch (e) {
      console.error("Storage save failed:", e);
    }
    syncWithServer('certificates', updated);
  };

  const handleAddCertificate = (newCert: Omit<Certificate, 'id'>) => {
    const fresh: Certificate = {
      ...newCert,
      id: `cert-${Date.now()}`
    };
    saveCertificates([...certificates, fresh]);
  };

  const handleUpdateCertificate = (updatedVal: Certificate) => {
    const updated = certificates.map(c => c.id === updatedVal.id ? updatedVal : c);
    saveCertificates(updated);
  };

  const handleDeleteCertificate = (id: string) => {
    askConfirmation(
      'Hapus Sertifikat',
      'Apakah Anda yakin ingin menghapus sertifikat ini secara permanen?',
      () => {
        const updated = certificates.filter(c => c.id !== id);
        saveCertificates(updated);
      }
    );
  };

  // Login controllers
  const handleLoginSuccess = () => {
    localStorage.setItem('aether_is_logged_in', 'true');
    setViewState('admin');
  };

  const handleLogout = () => {
    localStorage.removeItem('aether_is_logged_in');
    setViewState('home');
  };

  // Projects Handlers
  const handleAddProject = (newProj: Omit<Project, 'id' | 'dateAdded'>) => {
    const proj: Project = {
      ...newProj,
      id: `p-${Date.now()}`,
      dateAdded: new Date().toISOString().split('T')[0]
    };
    saveProjects([proj, ...projects]);
  };

  const handleUpdateProject = (updatedProj: Project) => {
    const updated = projects.map(p => p.id === updatedProj.id ? updatedProj : p);
    saveProjects(updated);
  };

  const handleDeleteProject = (id: string) => {
    askConfirmation(
      'Hapus Proyek',
      'Apakah Anda yakin ingin menghapus proyek ini secara permanen?',
      () => {
        const filtered = projects.filter(p => p.id !== id);
        saveProjects(filtered);
      }
    );
  };

  // Skills Handlers
  const handleAddSkill = (newSkill: Omit<Skill, 'id'>) => {
    const skill: Skill = {
      ...newSkill,
      id: `s-${Date.now()}`
    };
    saveSkills([...skills, skill]);
  };

  const handleUpdateSkill = (updatedSkill: Skill) => {
    const updated = skills.map(s => s.id === updatedSkill.id ? updatedSkill : s);
    saveSkills(updated);
  };

  const handleDeleteSkill = (id: string) => {
    askConfirmation(
      'Hapus Keahlian',
      'Apakah Anda yakin ingin menghapus keahlian ini secara permanen?',
      () => {
        const filtered = skills.filter(s => s.id !== id);
        saveSkills(filtered);
      }
    );
  };

  // Experience Handlers
  const handleAddExperience = (newExp: Omit<Experience, 'id'>) => {
    const exp: Experience = {
      ...newExp,
      id: `e-${Date.now()}`
    };
    saveExperiences([exp, ...experiences]);
  };

  const handleUpdateExperience = (updatedExp: Experience) => {
    const updated = experiences.map(e => e.id === updatedExp.id ? updatedExp : e);
    saveExperiences(updated);
  };

  const handleDeleteExperience = (id: string) => {
    askConfirmation(
      'Hapus Riwayat Karir',
      'Apakah Anda yakin ingin menghapus riwayat karir ini?',
      () => {
        const filtered = experiences.filter(e => e.id !== id);
        saveExperiences(filtered);
      }
    );
  };

  // Education Handlers
  const handleAddEducation = (newEdu: Omit<Education, 'id'>) => {
    const edu: Education = {
      ...newEdu,
      id: `edu-${Date.now()}`
    };
    saveEducations([edu, ...educations]);
  };

  const handleUpdateEducation = (updatedEdu: Education) => {
    const updated = educations.map(e => e.id === updatedEdu.id ? updatedEdu : e);
    saveEducations(updated);
  };

  const handleDeleteEducation = (id: string) => {
    askConfirmation(
      'Hapus Riwayat Pendidikan',
      'Apakah Anda yakin ingin menghapus riwayat pendidikan ini?',
      () => {
        const filtered = educations.filter(e => e.id !== id);
        saveEducations(filtered);
      }
    );
  };

  // Messages / Contact Form Handlers
  const handleAddMessage = (newMsg: Omit<Message, 'id' | 'senderInitials' | 'dateText' | 'status'>) => {
    const initials = newMsg.sender.substring(0, 2).toUpperCase();
    const msg: Message = {
      ...newMsg,
      id: `m-${Date.now()}`,
      senderInitials: initials,
      dateText: 'Just now',
      status: 'UNREAD'
    };
    saveMessages([msg, ...messages]);
  };

  const handleMarkMessageRead = (id: string, status: 'READ' | 'UNREAD') => {
    const updated = messages.map(m => m.id === id ? { ...m, status } : m);
    saveMessages(updated);
  };

  const handleDeleteMessage = (id: string) => {
    askConfirmation(
      'Hapus Pesan Masuk',
      'Apakah Anda yakin ingin menghapus pesan hubungi ini secara permanen?',
      () => {
        const filtered = messages.filter(m => m.id !== id);
        saveMessages(filtered);
      }
    );
  };

  // Settings handlers
  const handleUpdateSettings = (updated: SystemSettings) => {
    saveSettings(updated);
  };

  const handleResetToDefaults = async () => {
    askConfirmation(
      'Setel Ulang Portofolio',
      'Apakah Anda yakin ingin menyetel ulang semua data ke bawaan aslinya? Tindakan ini akan menghapus semua kustomisasi Anda.',
      async () => {
        try {
          const response = await fetch('/api/portfolio/reset', { method: 'POST' });
          if (response.ok) {
            const resJson = await response.json();
            if (resJson.success && resJson.db) {
              const db = resJson.db;
              setProjects(db.projects);
              setSkills(db.skills);
              setExperiences(db.experiences);
              setEducations(db.educations || INITIAL_EDUCATIONS);
              setMessages(db.messages || INITIAL_MESSAGES);
              setSettings(db.settings);
              
              localStorage.setItem('aether_projects', JSON.stringify(db.projects));
              localStorage.setItem('aether_skills', JSON.stringify(db.skills));
              localStorage.setItem('aether_experiences', JSON.stringify(db.experiences));
              localStorage.setItem('aether_educations', JSON.stringify(db.educations || INITIAL_EDUCATIONS));
              localStorage.setItem('aether_messages', JSON.stringify(db.messages || INITIAL_MESSAGES));
              localStorage.setItem('aether_settings', JSON.stringify(db.settings));
              return;
            }
          }
        } catch (err) {
          console.error("Gagal menyetel ulang database server:", err);
        }
        
        // Fallback local reset if backend request fails
        saveProjects(INITIAL_PROJECTS);
        saveSkills(INITIAL_SKILLS);
        saveExperiences(INITIAL_EXPERIENCES);
        saveEducations(INITIAL_EDUCATIONS);
        saveSettings(INITIAL_SETTINGS);
      }
    );
  };

  // Unread messages getter
  const unreadCount = messages.filter(m => m.status === 'UNREAD').length;

  // View dispatchers
  if (viewState === 'home') {
    return (
      <div className="relative">
        {settings.maintenanceMode && (
          <div className="bg-amber-600 text-white text-xs px-4 py-2 font-bold text-center flex items-center justify-center gap-2 relative z-50">
            <ShieldAlert className="w-4 h-4 animate-bounce" />
            Maintenance Mode Active: The administrator is configuring systems.
          </div>
        )}
        <PublicPortfolio 
          projects={projects}
          skills={skills}
          experiences={experiences}
          educations={educations}
          certificates={certificates}
          settings={settings}
          onNavigateToLogin={() => setViewState('login')}
          onAddMessage={handleAddMessage}
          isDarkMode={isDarkMode}
          setIsDarkMode={handleSetIsDarkMode}
        />
      </div>
    );
  }

  if (viewState === 'login') {
    return (
      <AdminLogin 
        onLoginSuccess={handleLoginSuccess}
        onNavigateHome={() => setViewState('home')}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => handleSetIsDarkMode(!isDarkMode)}
        adminUsername={settings.adminUsername}
        adminPassword={settings.adminPassword}
      />
    );
  }

  // Admin Dashboard Workspace
  return (
    <div className={`min-h-screen font-sans flex flex-col md:flex-row relative transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-[#05050c] text-[#dce3f0]' 
        : 'bg-[#f6f8fc] text-[#1e293b]'
    }`}>
      
      {/* Desktop Sidebar Layout */}
      <div className={`hidden md:block h-screen sticky top-0 transition-all duration-300 ${
        sidebarVisible ? 'w-64' : 'w-0 overflow-hidden'
      } ${
        isDarkMode ? 'border-r border-[#12111d]' : 'border-r border-slate-200'
      }`}>
        <AdminSidebar 
          activeTab={adminActiveTab}
          onTabChange={(tab) => setAdminActiveTab(tab)}
          unreadCount={unreadCount}
          onLogout={handleLogout}
          onViewPortfolio={() => setViewState('home')}
          siteTitle={settings.siteTitle}
          onToggleSidebar={() => setSidebarVisible(false)}
          isDarkMode={isDarkMode}
        />
      </div>

      {/* Core admin content area */}
      <main className="flex-grow md:h-screen md:overflow-y-auto flex flex-col relative z-20 transition-all duration-300">
        
        {/* Sticky PPIC-style Header */}
        <header className={`sticky top-0 z-30 transition-all duration-300 border-b flex items-center justify-between px-4 sm:px-8 py-3 w-full ${
          isDarkMode 
            ? 'bg-[#05050c]/90 backdrop-blur-md border-[#2e353f]/30 text-white shadow-md shadow-black/25' 
            : 'bg-white/95 backdrop-blur-md border-slate-200/85 text-slate-800 shadow-sm'
        }`}>
          {/* Left section: Hamburger & Title */}
          <div className="flex items-center gap-3">
            {/* Desktop toggle menu sidebar */}
            <button 
              onClick={() => setSidebarVisible(!sidebarVisible)}
              className={`hidden md:flex p-2 rounded-lg border transition-all cursor-pointer items-center justify-center ${
                isDarkMode 
                  ? 'bg-[#111827] hover:bg-[#1a212e] border-[#2e353f] text-[#adc6ff]' 
                  : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700 hover:border-slate-300'
              }`}
              title={sidebarVisible ? "Collapse Sidebar" : "Expand Sidebar"}
            >
              <Menu className="w-4.5 h-4.5" />
            </button>

            {/* Mobile menu button */}
            <button 
              onClick={() => setAdminMobileMenuOpen(!adminMobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg border transition-all cursor-pointer flex items-center justify-center ${
                isDarkMode 
                  ? 'bg-[#111827] hover:bg-[#1a212e] border-[#2e353f] text-[#adc6ff]' 
                  : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
              }`}
            >
              <Menu className="w-4.5 h-4.5" />
            </button>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#00c2ff] to-[#0051ff] flex items-center justify-center text-white shadow-sm shadow-sky-500/10 shrink-0">
                <Bot className="w-5 h-5 animate-pulse" />
              </div>
              <span className={`font-black text-xs sm:text-sm tracking-wider uppercase whitespace-nowrap ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                Portofolio Fikri
              </span>
            </div>
          </div>

          {/* Right section: Date, Live Clock, Theme toggler, Profile & Logout */}
          <div className="flex items-center gap-3">
            {/* Calendar pill (rapetin ke sebelahnya mode gelap) */}
            <div className={`hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-black border uppercase tracking-wider leading-none select-none ${
              isDarkMode 
                ? 'bg-[#00c2ff]/5 border-[#00c2ff]/30 text-[#00c2ff]' 
                : 'bg-sky-50 border-sky-200 text-sky-700'
            }`}>
              <Calendar className="w-3.5 h-3.5" />
              <span>{getIndonesianDate()}</span>
            </div>

            {/* Live Clock pill (rapetin ke sebelahnya mode gelap) */}
            <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-black border leading-none tracking-widest ${
              isDarkMode 
                ? 'bg-sky-950/40 border-[#00c2ff]/30 text-[#00c2ff] shadow-sm shadow-[#00c2ff]/5' 
                : 'bg-sky-100/80 border-sky-300 text-sky-800'
            }`}>
              <Clock className="w-3.5 h-3.5" />
              <span>{currentTime}</span>
            </div>

            {/* Theme switcher button */}
            <button 
              onClick={() => handleSetIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-lg border transition-all duration-300 cursor-pointer flex items-center justify-center ${
                isDarkMode 
                  ? 'bg-[#111827] hover:bg-[#1a212e] border-[#2e353f] text-yellow-400' 
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
              }`}
              title={isDarkMode ? "Light Mode" : "Dark Mode"}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Admin Avatar & Badge */}
            <div className="flex items-center gap-2">
              <div className="w-px h-6 bg-slate-250 dark:bg-[#2e353f]/50 mx-1 hidden sm:block"></div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <img 
                    src={settings.profilePicUrl} 
                    alt="Admin avatar" 
                    className="w-8.5 h-8.5 rounded-full border border-purple-500/30 object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-[#05050c] rounded-full"></span>
                </div>
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-xs font-black leading-none">{settings.ownerName || 'Fikrry Andi'}</span>
                  <span className="text-[9px] text-[#8155da] font-black uppercase tracking-widest mt-0.5">Admin</span>
                </div>
                <span className="bg-rose-500 hover:bg-rose-600 text-white text-[9px] font-black uppercase tracking-wider rounded px-2 py-0.5 shadow-sm select-none">
                  Admin
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="w-px h-6 bg-slate-250 dark:bg-[#2e353f]/50 mx-1 hidden sm:block"></div>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className={`p-2 rounded-lg border transition-all duration-300 cursor-pointer flex items-center justify-center ${
                isDarkMode 
                  ? 'bg-rose-950/20 hover:bg-rose-900/40 border-rose-900/40 text-rose-400' 
                  : 'bg-rose-50 hover:bg-rose-100 border-rose-200 text-rose-600'
              }`}
              title="Logout"
            >
              <LogOut className="w-4.5 h-4.5" />
            </button>
          </div>
        </header>

        {/* View dropdown on mobile */}
        {adminMobileMenuOpen && (
          <div className={`md:hidden fixed top-[57px] left-0 right-0 bottom-0 z-40 backdrop-blur-md transition-colors ${
            isDarkMode ? 'bg-[#05050c]/95' : 'bg-white/95'
          }`}>
            <AdminSidebar 
              activeTab={adminActiveTab}
              onTabChange={(tab) => {
                setAdminActiveTab(tab);
                setAdminMobileMenuOpen(false);
              }}
              unreadCount={unreadCount}
              onLogout={() => {
                setAdminMobileMenuOpen(false);
                handleLogout();
              }}
              onViewPortfolio={() => {
                setAdminMobileMenuOpen(false);
                setViewState('home');
              }}
              siteTitle={settings.siteTitle}
              isDarkMode={isDarkMode}
            />
          </div>
        )}

        {/* Wrapper around tab views */}
        <div className="flex-grow p-6 sm:p-10 max-w-7xl mx-auto w-full">
          {adminActiveTab === 'overview' && (
            <AdminDashboard 
              projects={projects}
              skills={skills}
              experiences={experiences}
              messages={messages}
              settings={settings}
              onNavigateToTab={(tab) => setAdminActiveTab(tab)}
              onMarkMessageRead={handleMarkMessageRead}
              onDeleteMessage={handleDeleteMessage}
              isDarkMode={isDarkMode}
            />
          )}

          {adminActiveTab === 'projects' && (
            <AdminProjects 
              projects={projects}
              onAddProject={handleAddProject}
              onUpdateProject={handleUpdateProject}
              onDeleteProject={handleDeleteProject}
              isDarkMode={isDarkMode}
            />
          )}

          {adminActiveTab === 'skills' && (
            <AdminSkills 
              skills={skills}
              onAddSkill={handleAddSkill}
              onUpdateSkill={handleUpdateSkill}
              onDeleteSkill={handleDeleteSkill}
              isDarkMode={isDarkMode}
            />
          )}

          {adminActiveTab === 'certificates' && (
            <AdminCertificates 
              certificates={certificates}
              onAddCertificate={handleAddCertificate}
              onUpdateCertificate={handleUpdateCertificate}
              onDeleteCertificate={handleDeleteCertificate}
              isDarkMode={isDarkMode}
            />
          )}

          {adminActiveTab === 'education' && (
            <AdminEducations 
              educations={educations}
              onAddEducation={handleAddEducation}
              onUpdateEducation={handleUpdateEducation}
              onDeleteEducation={handleDeleteEducation}
              isDarkMode={isDarkMode}
            />
          )}

          {adminActiveTab === 'experience' && (
            <AdminExperiences 
              experiences={experiences}
              onAddExperience={handleAddExperience}
              onUpdateExperience={handleUpdateExperience}
              onDeleteExperience={handleDeleteExperience}
              isDarkMode={isDarkMode}
            />
          )}

          {adminActiveTab === 'inbox' && (
            <AdminMessages 
              messages={messages}
              onMarkMessageRead={handleMarkMessageRead}
              onDeleteMessage={handleDeleteMessage}
              isDarkMode={isDarkMode}
            />
          )}

          {adminActiveTab === 'home_settings' && (
            <AdminHomeSettings 
              settings={settings}
              onUpdateSettings={handleUpdateSettings}
              isDarkMode={isDarkMode}
            />
          )}

          {adminActiveTab === 'about_settings' && (
            <AdminAboutSettings 
              settings={settings}
              onUpdateSettings={handleUpdateSettings}
              isDarkMode={isDarkMode}
            />
          )}

          {adminActiveTab === 'settings' && (
            <AdminSettings 
              settings={settings}
              onUpdateSettings={handleUpdateSettings}
              onResetToDefaults={handleResetToDefaults}
              onAskConfirm={askConfirmation}
              isDarkMode={isDarkMode}
            />
          )}
        </div>
      </main>

      {/* Visual Custom Confirmation Modal Dialog */}
      {confirmDialog.isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-[fade-in_0.2s_ease-out]">
          <div className={`border rounded-2xl max-w-sm w-full overflow-hidden shadow-2xl relative animate-[scale-up_0.2s_ease-out] ${
            isDarkMode ? 'bg-[#111827] border-[#2e353f]' : 'bg-white border-slate-200'
          }`}>
            <div className="p-6 text-center">
              <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-7 h-7 text-red-500" />
              </div>
              <h3 className={`text-lg font-black tracking-tight mb-2 ${
                isDarkMode ? 'text-white' : 'text-slate-800'
              }`}>
                {confirmDialog.title}
              </h3>
              <p className={`text-xs leading-relaxed mb-6 ${
                isDarkMode ? 'text-slate-400' : 'text-slate-500'
              }`}>
                {confirmDialog.message}
              </p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setConfirmDialog(prev => ({ ...prev, isOpen: false }))}
                  className={`flex-1 p-2.5 rounded-xl border text-xs font-bold transition-colors cursor-pointer ${
                    isDarkMode 
                      ? 'bg-[#1a212e] text-[#a0a5b5] hover:text-white border-[#2e353f] hover:bg-[#1f293d]' 
                      : 'bg-white text-slate-500 hover:text-slate-800 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={confirmDialog.onConfirm}
                  className="flex-1 p-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-xs font-bold transition-colors cursor-pointer shadow-lg shadow-red-500/10"
                >
                  {confirmDialog.title.toLowerCase().includes('reset') || confirmDialog.title.toLowerCase().includes('setel') 
                    ? 'Ya, Setel Ulang' 
                    : 'Ya, Hapus'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
