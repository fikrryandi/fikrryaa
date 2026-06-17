import React, { useState, useRef } from 'react';
import { SystemSettings } from '../types';
import { 
  Home, 
  Save, 
  CheckCircle, 
  Upload, 
  Image as ImageIcon, 
  FileText, 
  Trash2 
} from 'lucide-react';

interface AdminHomeSettingsProps {
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

export default function AdminHomeSettings({
  settings,
  onUpdateSettings,
  isDarkMode = false
}: AdminHomeSettingsProps) {
  const [ownerName, setOwnerName] = useState(settings.ownerName || 'Alex Vance');
  const [homeJobTitle, setHomeJobTitle] = useState(settings.homeJobTitle || '');
  const [homeHeadingSubtitle, setHomeHeadingSubtitle] = useState(settings.homeHeadingSubtitle || 'Hello Mate 👋');
  const [homeBioID, setHomeBioID] = useState(settings.homeBioID || 'Saya merupakan mahasiswa S1 Teknik Industri di Sekolah Tinggi Teknologi Wastukancana dengan ketertarikan pada bidang manajemen proses, PPIC, logistik, efisiensi operasional, serta pengembangan sistem digital. Saya memiliki pengalaman magang di PT Velasto Indonesia pada Department PPIC Delivery dan Department Komite, serta aktif dalam kegiatan kampus sebagai panitia MABIM Divisi Peralatan dan Sekretaris MUMAS. Di luar kegiatan akademik, saya juga mengembangkan website sederhana menggunakan Google Apps Script, Visual Studio Code, Cursor, Kiro, dan Antigravity.');
  const [homeBioEN, setHomeBioEN] = useState(settings.homeBioEN || 'I am a Bachelor of Industrial Engineering student at Sekolah Tinggi Teknologi Wastukancana with an interest in process management, PPIC, logistics, operational efficiency, and digital system development. I have internship experience at PT Velasto Indonesia in the PPIC Delivery Department and Committee Department, and am active in campus activities as a MABIM Equipment Division committee member and MUMAS Secretary. Outside of academic activities, I also develop simple websites using Google Apps Script, Visual Studio Code, Cursor, Kiro, and Antigravity.');
  const [profilePicUrlHome, setProfilePicUrlHome] = useState(settings.profilePicUrlHome || '');
  
  const [homeCardHandle, setHomeCardHandle] = useState(settings.homeCardHandle || '@dftvln');
  const [homeCardStatusText, setHomeCardStatusText] = useState(settings.homeCardStatusText || 'Online');
  const [homeCardStatusColor, setHomeCardStatusColor] = useState(settings.homeCardStatusColor || '#10b981');
  const [homeCardCreatorLabelID, setHomeCardCreatorLabelID] = useState(settings.homeCardCreatorLabelID || 'Kreator');
  const [homeCardCreatorLabelEN, setHomeCardCreatorLabelEN] = useState(settings.homeCardCreatorLabelEN || 'Creator');
  
  const [cvUrl, setCvUrl] = useState(settings.cvUrl || '');
  const [cvFileName, setCvFileName] = useState(settings.cvFileName || 'Fikri_Yandi_CV.pdf');
  const [resumeFileName, setResumeFileName] = useState(settings.resumeFileName || 'Fikri_Yandi_CV.pdf');

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [cvDragActive, setCvDragActive] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cvFileInputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (settings) {
      setOwnerName(settings.ownerName || 'Alex Vance');
      setHomeJobTitle(settings.homeJobTitle || '');
      setHomeHeadingSubtitle(settings.homeHeadingSubtitle || 'Hello Mate 👋');
      setHomeBioID(settings.homeBioID || '');
      setHomeBioEN(settings.homeBioEN || '');
      setProfilePicUrlHome(settings.profilePicUrlHome || '');
      setHomeCardHandle(settings.homeCardHandle || '@dftvln');
      setHomeCardStatusText(settings.homeCardStatusText || 'Online');
      setHomeCardStatusColor(settings.homeCardStatusColor || '#10b981');
      setHomeCardCreatorLabelID(settings.homeCardCreatorLabelID || 'Kreator');
      setHomeCardCreatorLabelEN(settings.homeCardCreatorLabelEN || 'Creator');
      setCvUrl(settings.cvUrl || '');
      setCvFileName(settings.cvFileName || 'Fikri_Yandi_CV.pdf');
      setResumeFileName(settings.resumeFileName || 'Fikri_Yandi_CV.pdf');
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
            setProfilePicUrlHome(compressed);
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
            setProfilePicUrlHome(compressed);
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCvDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setCvDragActive(true);
    } else if (e.type === "dragleave") {
      setCvDragActive(false);
    }
  };

  const handleCvDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCvDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setCvUrl(reader.result);
          setCvFileName(file.name);
          setResumeFileName(file.name);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCvFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setCvUrl(reader.result);
          setCvFileName(file.name);
          setResumeFileName(file.name);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings({
      ...settings,
      ownerName,
      homeJobTitle,
      homeHeadingSubtitle,
      homeBioID,
      homeBioEN,
      profilePicUrlHome,
      homeCardHandle,
      homeCardStatusText,
      homeCardStatusColor,
      homeCardCreatorLabelID,
      homeCardCreatorLabelEN,
      cvUrl,
      cvFileName,
      resumeFileName
    });

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
    }, 4000);
  };

  return (
    <div className={`space-y-6 animate-[fade-in_0.3s_ease-out] max-w-4xl text-left ${isDarkMode ? 'text-[#dce3f0]' : 'text-slate-700'}`}>
      
      {/* Header */}
      <div className="border-l-4 border-[#00c2ff] pl-4 py-1">
        <span className="text-[10px] font-black tracking-widest text-[#00c2ff] uppercase block mb-1">
          Kustomisasi Tampilan Beranda
        </span>
        <h2 className={`text-2xl font-bold tracking-tight flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-[#0f172a]'}`}>
          <Home className="text-[#00c2ff]/80 w-6 h-6" />
          Manajemen Halaman Beranda (Home)
        </h2>
        <p className={`text-xs mt-1 font-medium ${isDarkMode ? 'text-[#8c909f]' : 'text-slate-500'}`}>
          Kelola biografi pendek, foto profile beranda, lencana status online, judul profesi, serta file CV resmi Anda.
        </p>
      </div>

      <form onSubmit={handleSubmit} className={`border p-6 sm:p-8 space-y-6 rounded-3xl ${
        isDarkMode ? 'bg-[#0a0a14] border-[#1d1b32] shadow-[0_4px_24px_rgba(0,0,0,0.4)]' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        
        {/* Row 1: Profile Pic Upload & Basic Text fields */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left panel: Drag and drop profile pic */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <span className={`block text-[10px] font-extrabold uppercase tracking-wider mb-2 self-start ${isDarkMode ? 'text-[#c2c6d6]' : 'text-slate-500'}`}>
              Foto Profil Beranda
            </span>
            <div 
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`w-full h-64 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-4 text-center cursor-pointer transition-all duration-300 relative overflow-hidden group ${
                dragActive 
                  ? 'border-[#00c2ff] bg-[#00c2ff]/10' 
                  : isDarkMode 
                    ? 'border-[#2d2a4a] bg-[#0d0c18] hover:border-[#1e3d5d]' 
                    : 'border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-slate-400'
              }`}
            >
              {profilePicUrlHome ? (
                <>
                  <img 
                    src={profilePicUrlHome} 
                    alt="Home Profile Snapshot" 
                    className="absolute inset-0 w-full h-full object-cover rounded-xl transition-all duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-4">
                    <Upload className="w-8 h-8 mb-2 animate-bounce text-[#00c2ff]" />
                    <span className="text-xs font-black uppercase tracking-wider">Ganti Foto Profil</span>
                    <p className="text-[10px] text-gray-300 mt-1">Seret & taruh atau klik untuk memilih</p>
                  </div>
                </>
              ) : (
                <div className="space-y-3">
                  <div className="w-16 h-16 rounded-full bg-[#00c2ff]/10 flex items-center justify-center text-[#00c2ff] mx-auto">
                    <ImageIcon className="w-8 h-8" />
                  </div>
                  <div>
                    <span className={`text-xs font-bold block ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                      Unggah Foto Profil
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
            {profilePicUrlHome && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setProfilePicUrlHome('');
                }}
                className="mt-3 text-[10px] font-black tracking-wider uppercase text-red-500 hover:text-red-400 flex items-center gap-1 transition-colors self-end"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Hapus Foto
              </button>
            )}
          </div>

          {/* Right panel: Basic home info */}
          <div className="lg:col-span-7 space-y-4">
            <div>
              <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${isDarkMode ? 'text-[#c2c6d6]' : 'text-slate-500'}`}>Nama Utama / Display Name</label>
              <input 
                type="text" 
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                className={`w-full rounded-xl px-4 py-2.5 text-sm outline-none transition-all ${
                  isDarkMode 
                    ? 'bg-[#121124] border border-[#232142] text-white focus:border-[#00c2ff]' 
                    : 'bg-slate-50 border border-slate-200 text-slate-800 focus:border-[#00c2ff] focus:bg-white'
                }`}
                placeholder="display name e.g. Fikri Yandi"
              />
            </div>

            <div>
              <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${isDarkMode ? 'text-[#c2c6d6]' : 'text-slate-500'}`}>Judul Profesi Halaman Beranda (Highlight)</label>
              <input 
                type="text" 
                value={homeJobTitle}
                onChange={(e) => setHomeJobTitle(e.target.value)}
                className={`w-full rounded-xl px-4 py-2.5 text-sm outline-none transition-all ${
                  isDarkMode 
                    ? 'bg-[#121124] border border-[#232142] text-white focus:border-[#00c2ff]' 
                    : 'bg-slate-50 border border-slate-200 text-slate-800 focus:border-[#00c2ff] focus:bg-white'
                }`}
                placeholder="e.g. Industrial Engineering Student"
              />
            </div>

            <div>
              <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${isDarkMode ? 'text-[#c2c6d6]' : 'text-slate-500'}`}>Teks Pembuka Lencana (Greeting Badge)</label>
              <input 
                type="text" 
                value={homeHeadingSubtitle}
                onChange={(e) => setHomeHeadingSubtitle(e.target.value)}
                className={`w-full rounded-xl px-4 py-2.5 text-sm outline-none transition-all ${
                  isDarkMode 
                    ? 'bg-[#121124] border border-[#232142] text-white focus:border-[#00c2ff]' 
                    : 'bg-slate-50 border border-slate-200 text-slate-800 focus:border-[#00c2ff] focus:bg-white'
                }`}
                placeholder="e.g. Hello Mate 👋"
              />
            </div>

            <div>
              <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${isDarkMode ? 'text-[#c2c6d6]' : 'text-slate-500'}`}>Biografi Utama Halaman Beranda (ID)</label>
              <textarea 
                rows={4}
                value={homeBioID}
                onChange={(e) => setHomeBioID(e.target.value)}
                className={`w-full rounded-xl px-4 py-2.5 text-sm outline-none transition-all resize-none ${
                  isDarkMode 
                    ? 'bg-[#121124] border border-[#232142] text-white focus:border-[#00c2ff]' 
                    : 'bg-slate-50 border border-slate-200 text-slate-800 focus:border-[#00c2ff] focus:bg-white'
                }`}
                placeholder="Biografi singkat yang muncul di halaman Beranda (Bahasa Indonesia)"
              />
            </div>

            <div>
              <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${isDarkMode ? 'text-[#c2c6d6]' : 'text-slate-500'}`}>Biografi Utama Halaman Beranda (EN)</label>
              <textarea 
                rows={4}
                value={homeBioEN}
                onChange={(e) => setHomeBioEN(e.target.value)}
                className={`w-full rounded-xl px-4 py-2.5 text-sm outline-none transition-all resize-none ${
                  isDarkMode 
                    ? 'bg-[#121124] border border-[#232142] text-white focus:border-[#00c2ff]' 
                    : 'bg-slate-50 border border-slate-200 text-slate-800 focus:border-[#00c2ff] focus:bg-white'
                }`}
                placeholder="Short bio appearing on the Home page (English)"
              />
            </div>
          </div>

        </div>

        {/* Section: Card Identity & Status parameters Display */}
        <div className={`p-5 rounded-2xl border ${
          isDarkMode ? 'bg-[#05050d] border-[#131127]' : 'bg-slate-50 border-slate-150'
        }`}>
          <h3 className={`text-xs font-black tracking-wider uppercase mb-4 text-[#00c2ff]`}>
            Konfigurasi Lencana Musik / Status Kartu ID (Kanan Atas Beranda)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${isDarkMode ? 'text-[#c2c6d6]' : 'text-slate-500'}`}>Username Handle kartu</label>
              <input 
                type="text" 
                value={homeCardHandle}
                onChange={(e) => setHomeCardHandle(e.target.value)}
                className={`w-full rounded-lg px-3.5 py-2 text-xs outline-none transition-all ${
                  isDarkMode ? 'bg-[#121124] border border-[#232142] text-white' : 'bg-white border border-slate-250 text-slate-800'
                }`} 
                placeholder="@username"
              />
            </div>

            <div>
              <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${isDarkMode ? 'text-[#c2c6d6]' : 'text-slate-500'}`}>Teks Indikator Status Kartu</label>
              <input 
                type="text" 
                value={homeCardStatusText}
                onChange={(e) => setHomeCardStatusText(e.target.value)}
                className={`w-full rounded-lg px-3.5 py-2 text-xs outline-none transition-all ${
                  isDarkMode ? 'bg-[#121124] border border-[#232142] text-white' : 'bg-white border border-slate-250 text-slate-800'
                }`} 
                placeholder="Online, Hubungi Saya dll."
              />
            </div>

            <div>
              <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${isDarkMode ? 'text-[#c2c6d6]' : 'text-slate-500'}`}>Warna Indikator Status Kartu (Hex)</label>
              <div className="flex gap-2">
                <input 
                  type="color" 
                  value={homeCardStatusColor}
                  onChange={(e) => setHomeCardStatusColor(e.target.value)}
                  className="w-8 h-8 rounded border-none cursor-pointer p-0"
                />
                <input 
                  type="text" 
                  value={homeCardStatusColor}
                  onChange={(e) => setHomeCardStatusColor(e.target.value)}
                  className={`flex-grow rounded-lg px-3.5 py-1 text-xs outline-none transition-all font-mono ${
                    isDarkMode ? 'bg-[#121124] border border-[#232142] text-white' : 'bg-white border border-slate-250 text-slate-800'
                  }`} 
                />
              </div>
            </div>

            <div>
              <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${isDarkMode ? 'text-[#c2c6d6]' : 'text-slate-500'}`}>Label Tag Kreator (ID)</label>
              <input 
                type="text" 
                value={homeCardCreatorLabelID}
                onChange={(e) => setHomeCardCreatorLabelID(e.target.value)}
                className={`w-full rounded-lg px-3.5 py-2 text-xs outline-none transition-all ${
                  isDarkMode ? 'bg-[#121124] border border-[#232142] text-white' : 'bg-white border border-slate-250 text-slate-800'
                }`} 
              />
            </div>

            <div>
              <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${isDarkMode ? 'text-[#c2c6d6]' : 'text-slate-500'}`}>Label Tag Kreator (EN)</label>
              <input 
                type="text" 
                value={homeCardCreatorLabelEN}
                onChange={(e) => setHomeCardCreatorLabelEN(e.target.value)}
                className={`w-full rounded-lg px-3.5 py-2 text-xs outline-none transition-all ${
                  isDarkMode ? 'bg-[#121124] border border-[#232142] text-white' : 'bg-white border border-slate-250 text-slate-800'
                }`} 
              />
            </div>
          </div>
        </div>

        {/* Section: CV / Resume File Upload */}
        <div className={`p-5 rounded-2xl border ${
          isDarkMode ? 'bg-[#05050d] border-[#131127]' : 'bg-slate-50 border-slate-150'
        }`}>
          <h3 className={`text-xs font-black tracking-wider uppercase mb-1 text-[#00c2ff] flex items-center gap-1.5`}>
            <FileText className="w-4 h-4" />
            File CV Resmi (Disematkan di Tombol Download CV Beranda)
          </h3>
          <p className="text-[11px] text-slate-400 mb-3 font-medium">Unggah berkas CV Anda (PDF atau dokumen biner base64). Pengguna publik dapat mengunduh ini langsung via beranda utama.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
            <div className="md:col-span-8">
              <div 
                onDragEnter={handleCvDrag}
                onDragOver={handleCvDrag}
                onDragLeave={handleCvDrag}
                onDrop={handleCvDrop}
                onClick={() => cvFileInputRef.current?.click()}
                className={`border-2 border-dashed py-6 px-4 rounded-xl text-center cursor-pointer transition-all duration-300 ${
                  cvDragActive 
                    ? 'border-[#00c2ff] bg-[#00c2ff]/10' 
                    : isDarkMode 
                      ? 'border-[#2d2a4a] bg-[#121124] hover:border-[#1e3d5d]' 
                      : 'border-slate-300 bg-white hover:bg-slate-50 hover:border-slate-400'
                }`}
              >
                <div className="flex flex-col items-center justify-center">
                  <Upload className="w-6 h-6 text-[#00c2ff]/80 mb-2 animate-bounce" />
                  <span className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                    {cvUrl ? 'File CV Sudah Terpasang' : 'Pilih Berkas CV Anda'}
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-1">
                    Format: (.pdf, .doc, .docx - Max 8MB)
                  </span>
                </div>
                <input 
                  type="file"
                  ref={cvFileInputRef}
                  accept=".pdf"
                  onChange={handleCvFileChange}
                  className="hidden"
                />
              </div>
            </div>

            <div className="md:col-span-4 space-y-3 font-medium text-xs">
              <div className={`p-3 rounded-lg border flex flex-col justify-between ${isDarkMode ? 'bg-[#121124]/50 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div>
                  <span className="text-[10px] uppercase font-black tracking-wider text-slate-400 block">Nama Berkas CV:</span>
                  <input 
                    type="text" 
                    value={cvFileName} 
                    onChange={(e) => {
                      setCvFileName(e.target.value);
                      setResumeFileName(e.target.value);
                    }}
                    className={`w-full mt-1 bg-transparent border-b border-purple-500/30 outline-none text-xs font-mono font-bold ${isDarkMode ? 'text-sky-300' : 'text-sky-700'}`}
                  />
                </div>
                <div className="mt-3">
                  <span className="text-[10px] uppercase font-black tracking-wider text-slate-400 block">Status Ukuran:</span>
                  <span className="font-bold text-[11px] block mt-0.5">
                    {cvUrl ? `Terlampir (~${Math.round(cvUrl.length / 1400)} KB)` : 'Belum Ada Berkas'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions footer */}
        <div className="pt-3 border-t border-slate-400/10 flex justify-end items-center gap-4">
          {savedSuccess && (
            <div className="text-xs font-bold text-emerald-500 flex items-center gap-1 bg-emerald-500/10 px-3 py-1.5 rounded-lg animate-pulse">
              <CheckCircle className="w-4 h-4" />
              Perubahan Tampilan Beranda Berhasil Disimpan!
            </div>
          )}
          <button
            type="submit"
            className="flex items-center gap-2 bg-[#00c2ff] hover:bg-[#00a6db] active:scale-95 text-white font-black text-xs px-6 py-3 rounded-xl transition-all shadow-lg shadow-[#00c2ff]/10 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            Simpan Struktur Beranda
          </button>
        </div>

      </form>
    </div>
  );
}
