import React, { useState, useRef } from 'react';
import { SystemSettings } from '../types';
import { 
  User, 
  Save, 
  CheckCircle, 
  Upload, 
  Image as ImageIcon, 
  Palette, 
  Trash2,
  Sparkles
} from 'lucide-react';

interface AdminAboutSettingsProps {
  settings: SystemSettings;
  onUpdateSettings: (settings: SystemSettings) => void;
  isDarkMode?: boolean;
}

// Image compression helper identical to App/Settings standard
const compressImage = (base64Str: string, maxWidth = 1600, maxHeight = 1600, quality = 0.88): Promise<string> => {
  return new Promise((resolve) => {
    if (true) {
      resolve(base64Str);
      return;
    }
    const img = new Image();
    img.src = base64Str;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }
      if (height > maxHeight) {
        width = Math.round((width * maxHeight) / height);
        height = maxHeight;
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Clear rect to ensure transparency remains clean
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        
        // Preserve PNG/WebP/GIF transparent alpha channels using WebP with low footprint
        const isTransparentFormat = base64Str.startsWith('data:image/png') || 
                                    base64Str.startsWith('data:image/webp') || 
                                    base64Str.startsWith('data:image/gif');
        const format = isTransparentFormat ? 'image/webp' : 'image/jpeg';
        resolve(canvas.toDataURL(format, isTransparentFormat ? 0.85 : quality));
      } else {
        resolve(base64Str);
      }
    };
    img.onerror = () => {
      resolve(base64Str);
    };
  });
};

export default function AdminAboutSettings({
  settings,
  onUpdateSettings,
  isDarkMode = false
}: AdminAboutSettingsProps) {
  const [aboutSectionTitleID, setAboutSectionTitleID] = useState(settings.aboutSectionTitleID || 'Pengalaman Profesional di Bidang Digital');
  const [aboutSectionTitleEN, setAboutSectionTitleEN] = useState(settings.aboutSectionTitleEN || 'Professional Experience in Digital Sphere');
  const [taglineID, setTaglineID] = useState(settings.taglineID || 'INDUSTRIAL ENGINEERING STUDENT');
  const [taglineEN, setTaglineEN] = useState(settings.taglineEN || 'INDUSTRIAL ENGINEERING STUDENT');
  const [aboutBioID, setAboutBioID] = useState(settings.aboutBioID || '');
  const [aboutBioEN, setAboutBioEN] = useState(settings.aboutBioEN || '');
  const [profilePicUrl, setProfilePicUrl] = useState(settings.profilePicUrl || '');
  
  const [aboutNameCapsuleBg, setAboutNameCapsuleBg] = useState(settings.aboutNameCapsuleBg || '#3b82f6');
  const [aboutRoleCapsuleBg, setAboutRoleCapsuleBg] = useState(settings.aboutRoleCapsuleBg || '#10b981');

  // Photo bubble text management states
  const [bubbleSayLabelID, setBubbleSayLabelID] = useState(settings.bubbleSayLabelID || 'Fikri says:');
  const [bubbleSayLabelEN, setBubbleSayLabelEN] = useState(settings.bubbleSayLabelEN || 'Fikri says:');
  const [bubbleChatTextID, setBubbleChatTextID] = useState(settings.bubbleChatTextID || 'Hi there! 👋');
  const [bubbleChatTextEN, setBubbleChatTextEN] = useState(settings.bubbleChatTextEN || 'Hi there! 👋');
  const [bubbleFollowerTextID, setBubbleFollowerTextID] = useState(settings.bubbleFollowerTextID || 'Follower');
  const [bubbleFollowerTextEN, setBubbleFollowerTextEN] = useState(settings.bubbleFollowerTextEN || 'Follower');
  const [bubbleFollowerCount, setBubbleFollowerCount] = useState(settings.bubbleFollowerCount || '1');
  const [bubbleCollabTitleID, setBubbleCollabTitleID] = useState(settings.bubbleCollabTitleID || 'Collaborations');
  const [bubbleCollabTitleEN, setBubbleCollabTitleEN] = useState(settings.bubbleCollabTitleEN || 'Collaborations');
  const [bubbleCollabDescID, setBubbleCollabDescID] = useState(settings.bubbleCollabDescID || "Let's build a magnificent digital product together! 🚀");
  const [bubbleCollabDescEN, setBubbleCollabDescEN] = useState(settings.bubbleCollabDescEN || "Let's build a magnificent digital product together! 🚀");

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync state when settings asynchronously updates/loads from server
  React.useEffect(() => {
    if (settings) {
      setAboutSectionTitleID(settings.aboutSectionTitleID || 'Pengalaman Profesional di Bidang Digital');
      setAboutSectionTitleEN(settings.aboutSectionTitleEN || 'Professional Experience in Digital Sphere');
      setTaglineID(settings.taglineID || 'INDUSTRIAL ENGINEERING STUDENT');
      setTaglineEN(settings.taglineEN || 'INDUSTRIAL ENGINEERING STUDENT');
      setAboutBioID(settings.aboutBioID || '');
      setAboutBioEN(settings.aboutBioEN || '');
      setProfilePicUrl(settings.profilePicUrl || '');
      setAboutNameCapsuleBg(settings.aboutNameCapsuleBg || '#3b82f6');
      setAboutRoleCapsuleBg(settings.aboutRoleCapsuleBg || '#10b981');

      setBubbleSayLabelID(settings.bubbleSayLabelID || 'Fikri says:');
      setBubbleSayLabelEN(settings.bubbleSayLabelEN || 'Fikri says:');
      setBubbleChatTextID(settings.bubbleChatTextID || 'Hi there! 👋');
      setBubbleChatTextEN(settings.bubbleChatTextEN || 'Hi there! 👋');
      setBubbleFollowerTextID(settings.bubbleFollowerTextID || 'Follower');
      setBubbleFollowerTextEN(settings.bubbleFollowerTextEN || 'Follower');
      setBubbleFollowerCount(settings.bubbleFollowerCount || '1');
      setBubbleCollabTitleID(settings.bubbleCollabTitleID || 'Collaborations');
      setBubbleCollabTitleEN(settings.bubbleCollabTitleEN || 'Collaborations');
      setBubbleCollabDescID(settings.bubbleCollabDescID || "Let's build a magnificent digital product together! 🚀");
      setBubbleCollabDescEN(settings.bubbleCollabDescEN || "Let's build a magnificent digital product together! 🚀");
    }
  }, [settings]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          compressImage(reader.result).then(compressed => {
            setProfilePicUrl(compressed);
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          compressImage(reader.result).then(compressed => {
            setProfilePicUrl(compressed);
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings({
      ...settings,
      aboutSectionTitleID,
      aboutSectionTitleEN,
      taglineID,
      taglineEN,
      aboutBioID,
      aboutBioEN,
      profilePicUrl,
      aboutNameCapsuleBg,
      aboutRoleCapsuleBg,
      bubbleSayLabelID,
      bubbleSayLabelEN,
      bubbleChatTextID,
      bubbleChatTextEN,
      bubbleFollowerTextID,
      bubbleFollowerTextEN,
      bubbleFollowerCount,
      bubbleCollabTitleID,
      bubbleCollabTitleEN,
      bubbleCollabDescID,
      bubbleCollabDescEN
    });

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
    }, 4000);
  };

  return (
    <div className={`space-y-6 animate-[fade-in_0.3s_ease-out] max-w-4xl text-left ${isDarkMode ? 'text-[#dce3f0]' : 'text-slate-700'}`}>
      
      {/* Header */}
      <div className="border-l-4 border-purple-500 pl-4 py-1">
        <span className="text-[10px] font-black tracking-widest text-purple-500 uppercase block mb-1">
          Kustomisasi Profil Tentang Saya
        </span>
        <h2 className={`text-2xl font-bold tracking-tight flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-[#0f172a]'}`}>
          <User className="text-purple-500/80 w-6 h-6" />
          Manajemen Halaman Tentang (About)
        </h2>
        <p className={`text-xs mt-1 font-medium ${isDarkMode ? 'text-[#8c909f]' : 'text-slate-500'}`}>
          Kelola biografi utama, foto profil sekunder halaman Tentang, heading, serta warna aksen kapsul lencana nama Anda.
        </p>
      </div>

      <form onSubmit={handleSubmit} className={`border p-6 sm:p-8 space-y-6 rounded-3xl ${
        isDarkMode ? 'bg-[#0a0a14] border-[#1d1b32] shadow-[0_4px_24px_rgba(0,0,0,0.4)]' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        
        {/* Sync Bio Banner Section */}
        <div className={`p-4 rounded-xl border flex items-start gap-3 ${
          isDarkMode ? 'bg-indigo-950/20 border-indigo-500/25 text-indigo-300' : 'bg-indigo-50 border-indigo-200 text-indigo-850'
        }`}>
          <Sparkles className="w-5 h-5 shrink-0 text-indigo-500 mt-0.5 animate-pulse" />
          <div className="text-xs space-y-1">
            <span className="font-extrabold block">Pemberitahuan Sinkronisasi Informasi:</span>
            <p className="opacity-90 leading-relaxed">
              Biografi/deskripsi diri yang Anda ubah di bawah ini akan <strong>otomatis disinkronkan</strong> dan ditampilkan baik pada halaman Beranda (sebelah kanan profile) maupun halaman Tentang. Ini menjaga konsistensi konten personal brand Anda.
            </p>
          </div>
        </div>

        {/* Row 1: Profile Pic Upload & About Text fields */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left panel: Drag and drop picture */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <span className={`block text-[10px] font-extrabold uppercase tracking-wider mb-2 self-start ${isDarkMode ? 'text-[#c2c6d6]' : 'text-slate-500'}`}>
              Foto Profil Tentang Saya (About)
            </span>
            <div 
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`w-full h-64 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-4 text-center cursor-pointer transition-all duration-300 relative overflow-hidden group ${
                dragActive 
                  ? 'border-purple-500 bg-purple-500/10' 
                  : isDarkMode 
                    ? 'border-[#2d2a4a] bg-[#0d0c18] hover:border-[#3c1e5a]' 
                    : 'border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-slate-400'
              }`}
            >
              {profilePicUrl ? (
                <>
                  <img 
                    src={profilePicUrl} 
                    alt="About Profile Snapshot" 
                    className="absolute inset-0 w-full h-full object-cover rounded-xl transition-all duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-4">
                    <Upload className="w-8 h-8 mb-2 animate-bounce text-purple-400" />
                    <span className="text-xs font-black uppercase tracking-wider">Ganti Foto Profil</span>
                    <p className="text-[10px] text-gray-300 mt-1">Seret & taruh atau klik untuk memilih</p>
                  </div>
                </>
              ) : (
                <div className="space-y-3">
                  <div className="w-16 h-16 rounded-full bg-purple-550/10 flex items-center justify-center text-purple-500 mx-auto">
                    <ImageIcon className="w-8 h-8" />
                  </div>
                  <div>
                    <span className="text-xs font-bold block text-slate-800 dark:text-white">
                      Unggah Foto Tentang Saya
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-1">
                      Mendukung PNG, JPG (Maks. 3MB)
                    </span>
                  </div>
                </div>
              )}
              <input 
                ref={fileInputRef}
                type="file" 
                accept="image/*"
                onChange={handleFileChange}
                className="hidden" 
              />
            </div>
            {profilePicUrl && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setProfilePicUrl('');
                }}
                className="mt-3 text-[10px] font-black tracking-wider uppercase text-red-500 hover:text-red-400 flex items-center gap-1 transition-colors self-end"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Hapus Foto
              </button>
            )}
          </div>

          {/* Right panel: Titles & Taglines in both languages */}
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${isDarkMode ? 'text-[#c2c6d6]' : 'text-slate-500'}`}>Judul Konten Tentang Saya (ID)</label>
                <input 
                  type="text" 
                  value={aboutSectionTitleID}
                  onChange={(e) => setAboutSectionTitleID(e.target.value)}
                  className={`w-full rounded-xl px-4 py-2.5 text-xs outline-none transition-all ${
                    isDarkMode 
                      ? 'bg-[#121124] border border-[#232142] text-white focus:border-purple-500' 
                      : 'bg-slate-50 border border-slate-200 text-slate-800 focus:border-purple-500 focus:bg-white'
                  }`}
                  placeholder="e.g. Mahasiswa Teknik Industri"
                />
              </div>

              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${isDarkMode ? 'text-[#c2c6d6]' : 'text-slate-500'}`}>Judul Konten Tentang Saya (EN)</label>
                <input 
                  type="text" 
                  value={aboutSectionTitleEN}
                  onChange={(e) => setAboutSectionTitleEN(e.target.value)}
                  className={`w-full rounded-xl px-4 py-2.5 text-xs outline-none transition-all ${
                    isDarkMode 
                      ? 'bg-[#121124] border border-[#232142] text-white focus:border-purple-500' 
                      : 'bg-slate-50 border border-slate-200 text-slate-800 focus:border-purple-500 focus:bg-white'
                  }`}
                  placeholder="e.g. Industrial Engineering Student"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${isDarkMode ? 'text-[#c2c6d6]' : 'text-slate-500'}`}>Teks Tagline Display Atas (ID)</label>
                <input 
                  type="text" 
                  value={taglineID}
                  onChange={(e) => setTaglineID(e.target.value)}
                  className={`w-full rounded-xl px-4 py-2.5 text-xs outline-none transition-all ${
                    isDarkMode 
                      ? 'bg-[#121124] border border-[#232142] text-white focus:border-purple-500' 
                      : 'bg-slate-50 border border-slate-200 text-slate-800 focus:border-purple-500 focus:bg-white'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${isDarkMode ? 'text-[#c2c6d6]' : 'text-slate-500'}`}>Teks Tagline Display Atas (EN)</label>
                <input 
                  type="text" 
                  value={taglineEN}
                  onChange={(e) => setTaglineEN(e.target.value)}
                  className={`w-full rounded-xl px-4 py-2.5 text-xs outline-none transition-all ${
                    isDarkMode 
                      ? 'bg-[#121124] border border-[#232142] text-white focus:border-purple-500' 
                      : 'bg-slate-50 border border-slate-200 text-slate-800 focus:border-purple-500 focus:bg-white'
                  }`}
                />
              </div>
            </div>

            {/* Colors customizing */}
            <div className={`p-4 rounded-xl border ${
              isDarkMode ? 'bg-[#111122]/30 border-purple-500/10' : 'bg-slate-50 border-slate-150'
            }`}>
              <h3 className="text-[10px] font-black uppercase tracking-wider text-purple-400 mb-3 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5" />
                Aksen Warna Lencana (Badge Color Accents)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-[9px] font-bold uppercase tracking-wider mb-1 ${isDarkMode ? 'text-[#c2c6d6]' : 'text-slate-500'}`}>Latar Nama Capsule (Beranda)</label>
                  <div className="flex gap-2">
                    <input 
                      type="color" 
                      value={aboutNameCapsuleBg}
                      onChange={(e) => setAboutNameCapsuleBg(e.target.value)}
                      className="w-7 h-7 rounded border-none cursor-pointer p-0"
                    />
                    <input 
                      type="text" 
                      value={aboutNameCapsuleBg}
                      onChange={(e) => setAboutNameCapsuleBg(e.target.value)}
                      className={`flex-grow rounded-lg px-2.5 py-1 text-xs outline-none font-mono ${
                        isDarkMode ? 'bg-[#121124] border border-[#232142] text-white' : 'bg-white border border-slate-250 text-slate-800'
                      }`} 
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-[9px] font-bold uppercase tracking-wider mb-1 ${isDarkMode ? 'text-[#c2c6d6]' : 'text-slate-500'}`}>Latar Role/Pekerjaan Capsule</label>
                  <div className="flex gap-2">
                    <input 
                      type="color" 
                      value={aboutRoleCapsuleBg}
                      onChange={(e) => setAboutRoleCapsuleBg(e.target.value)}
                      className="w-7 h-7 rounded border-none cursor-pointer p-0"
                    />
                    <input 
                      type="text" 
                      value={aboutRoleCapsuleBg}
                      onChange={(e) => setAboutRoleCapsuleBg(e.target.value)}
                      className={`flex-grow rounded-lg px-2.5 py-1 text-xs outline-none font-mono ${
                        isDarkMode ? 'bg-[#121124] border border-[#232142] text-white' : 'bg-white border border-slate-250 text-slate-800'
                      }`} 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Row: Photo Bubble Text Management */}
        <div className={`p-5 sm:p-6 rounded-2xl border space-y-4 ${
          isDarkMode ? 'bg-[#111122]/30 border-purple-500/10' : 'bg-slate-50 border-slate-150'
        }`}>
          <h3 className="text-xs font-black uppercase tracking-wider text-purple-400 flex items-center gap-1.5 border-b pb-2 border-slate-400/10 mb-2">
            💬 Manajemen Teks Gelembung Foto (Photo Badge Bubbles)
          </h3>
          <p className={`text-[10px] leading-relaxed -mt-1 font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Sesuaikan konten dari teks gelembung interaktif / floating badges yang berada di sekeliling frame HP foto profil Anda. Teks ini berlaku baik pada Beranda maupun halaman Tentang.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Gelembung 1: Greeting */}
            <div className="space-y-3 p-3 bg-white/45 dark:bg-black/30 rounded-xl border border-slate-400/5">
              <span className="text-[10px] font-black uppercase text-sky-500 block">💬 Gelembung 1: Chat "Hi there!"</span>
              <div className="grid grid-cols-1 gap-2">
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase">Label Pengirim (e.g. Fikri says:)</label>
                  <input
                    type="text"
                    value={bubbleSayLabelID}
                    onChange={(e) => {
                      setBubbleSayLabelID(e.target.value);
                      setBubbleSayLabelEN(e.target.value);
                    }}
                    className={`w-full rounded-lg px-3 py-1.5 text-xs outline-none ${
                      isDarkMode ? 'bg-[#121124] border border-[#232142] text-white' : 'bg-white border border-slate-200 text-slate-800'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase font-mono">Teks Pesan (ID)</label>
                  <input
                    type="text"
                    value={bubbleChatTextID}
                    onChange={(e) => setBubbleChatTextID(e.target.value)}
                    className={`w-full rounded-lg px-3 py-1.5 text-xs outline-none ${
                      isDarkMode ? 'bg-[#121124] border border-[#232142] text-white' : 'bg-white border border-slate-200 text-slate-800'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase font-mono">Teks Pesan (EN)</label>
                  <input
                    type="text"
                    value={bubbleChatTextEN}
                    onChange={(e) => setBubbleChatTextEN(e.target.value)}
                    className={`w-full rounded-lg px-3 py-1.5 text-xs outline-none ${
                      isDarkMode ? 'bg-[#121124] border border-[#232142] text-white' : 'bg-white border border-slate-200 text-slate-800'
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Gelembung 2: Follower */}
            <div className="space-y-3 p-3 bg-white/45 dark:bg-black/30 rounded-xl border border-slate-400/5">
              <span className="text-[10px] font-black uppercase text-rose-500 block">👤 Gelembung 2: Pengikut / Follower</span>
              <div className="grid grid-cols-1 gap-2">
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase">Label (ID)</label>
                  <input
                    type="text"
                    value={bubbleFollowerTextID}
                    onChange={(e) => setBubbleFollowerTextID(e.target.value)}
                    className={`w-full rounded-lg px-3 py-1.5 text-xs outline-none ${
                      isDarkMode ? 'bg-[#121124] border border-[#232142] text-white' : 'bg-white border border-slate-200 text-slate-800'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase">Label (EN)</label>
                  <input
                    type="text"
                    value={bubbleFollowerTextEN}
                    onChange={(e) => setBubbleFollowerTextEN(e.target.value)}
                    className={`w-full rounded-lg px-3 py-1.5 text-xs outline-none ${
                      isDarkMode ? 'bg-[#121124] border border-[#232142] text-white' : 'bg-white border border-slate-200 text-slate-800'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase">Jumlah / Count</label>
                  <input
                    type="text"
                    value={bubbleFollowerCount}
                    onChange={(e) => setBubbleFollowerCount(e.target.value)}
                    className={`w-full rounded-lg px-3 py-1.5 text-xs outline-none ${
                      isDarkMode ? 'bg-[#121124] border border-[#232142] text-white' : 'bg-white border border-slate-200 text-slate-800'
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Gelembung 3: Collaboration Card */}
          <div className="p-3 bg-white/45 dark:bg-black/30 rounded-xl border border-slate-400/5 space-y-2">
            <span className="text-[10px] font-black uppercase text-amber-500 block">🚀 Gelembung 3: Kolaborasi / Collaboration</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[9px] font-bold text-slate-400 uppercase">Judul Gelembung (ID)</label>
                <input
                  type="text"
                  value={bubbleCollabTitleID}
                  onChange={(e) => setBubbleCollabTitleID(e.target.value)}
                  className={`w-full rounded-lg px-3 py-1.5 text-xs outline-none ${
                    isDarkMode ? 'bg-[#121124] border border-[#232142] text-white' : 'bg-white border border-slate-200 text-slate-800'
                  }`}
                />
              </div>
              <div>
                <label className="block text-[9px] font-bold text-slate-400 uppercase">Judul Gelembung (EN)</label>
                <input
                  type="text"
                  value={bubbleCollabTitleEN}
                  onChange={(e) => setBubbleCollabTitleEN(e.target.value)}
                  className={`w-full rounded-lg px-3 py-1.5 text-xs outline-none ${
                    isDarkMode ? 'bg-[#121124] border border-[#232142] text-white' : 'bg-white border border-slate-200 text-slate-800'
                  }`}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-[9px] font-bold text-slate-400 uppercase">Deskripsi Ajakan Kolaborasi (ID)</label>
                <textarea
                  rows={2}
                  value={bubbleCollabDescID}
                  onChange={(e) => setBubbleCollabDescID(e.target.value)}
                  className={`w-full rounded-lg px-3 py-1.5 text-xs outline-none resize-none ${
                    isDarkMode ? 'bg-[#121124] border border-[#232142] text-white' : 'bg-white border border-slate-200 text-slate-800'
                  }`}
                />
              </div>
              <div>
                <label className="block text-[9px] font-bold text-slate-400 uppercase">Deskripsi Ajakan Kolaborasi (EN)</label>
                <textarea
                  rows={2}
                  value={bubbleCollabDescEN}
                  onChange={(e) => setBubbleCollabDescEN(e.target.value)}
                  className={`w-full rounded-lg px-3 py-1.5 text-xs outline-none resize-none ${
                    isDarkMode ? 'bg-[#121124] border border-[#232142] text-white' : 'bg-white border border-slate-200 text-slate-800'
                  }`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Biography texts ID / EN with explicit sync warnings */}
        <div className="space-y-4">
          <div>
            <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${isDarkMode ? 'text-[#c2c6d6]' : 'text-slate-500'}`}>Biografi Deskripsi Lengkap (ID) - <span className="text-purple-400">Sinkron Beranda & Tentang</span></label>
            <textarea 
              rows={4} 
              value={aboutBioID} 
              onChange={(e) => setAboutBioID(e.target.value)} 
              className={`w-full rounded-xl px-4 py-3 text-sm outline-none transition-all resize-none ${
                isDarkMode 
                  ? 'bg-[#121124] border border-[#232142] text-white focus:border-purple-500' 
                  : 'bg-slate-50 border border-slate-200 text-slate-800 focus:border-purple-500 focus:bg-white'
              }`} 
              placeholder="Tulis biografi lengkap Anda dalam Bahasa Indonesia..." 
            />
          </div>

          <div>
            <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${isDarkMode ? 'text-[#c2c6d6]' : 'text-slate-500'}`}>Biografi Deskripsi Lengkap (EN) - <span className="text-purple-400">Sync Home & About</span></label>
            <textarea 
              rows={4} 
              value={aboutBioEN} 
              onChange={(e) => setAboutBioEN(e.target.value)} 
              className={`w-full rounded-xl px-4 py-3 text-sm outline-none transition-all resize-none ${
                isDarkMode 
                  ? 'bg-[#121124] border border-[#232142] text-white focus:border-purple-500' 
                  : 'bg-slate-50 border border-slate-200 text-slate-800 focus:border-purple-500 focus:bg-white'
              }`} 
              placeholder="Tulis biografi lengkap Anda dalam Bahasa Inggris..." 
            />
          </div>
        </div>

        {/* Save updates panel */}
        <div className="pt-3 border-t border-slate-400/10 flex justify-end items-center gap-4">
          {savedSuccess && (
            <div className="text-xs font-bold text-emerald-500 flex items-center gap-1 bg-emerald-500/10 px-3 py-1.5 rounded-lg animate-pulse">
              <CheckCircle className="w-4 h-4" />
              Perubahan Tampilan Tentang Berhasil Disimpan!
            </div>
          )}
          <button
            type="submit"
            className="flex items-center gap-2 bg-purple-650 hover:bg-purple-700 active:scale-95 text-white font-black text-xs px-6 py-3 rounded-xl transition-all shadow-lg shadow-purple-500/10 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            Simpan Struktur Tentang
          </button>
        </div>

      </form>
    </div>
  );
}
