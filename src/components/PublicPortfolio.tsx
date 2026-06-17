import React, { useState } from 'react';
import ProjectImageCarousel from './ProjectImageCarousel';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { 
  Project, 
  Skill, 
  Experience, 
  Message, 
  SystemSettings,
  Education,
  Certificate
} from '../types';
import { 
  User, 
  GraduationCap, 
  Code, 
  CheckCircle2, 
  Check,
  Zap, 
  Building2, 
  Mail, 
  MapPin, 
  Send, 
  ArrowRight, 
  Menu, 
  X, 
  ExternalLink, 
  Search,
  Phone, 
  Instagram, 
  Linkedin, 
  Github, 
  MessageSquare, 
  MessageCircle, 
  Sun, 
  Moon, 
  Bot, 
  Sparkles, 
  ArrowUpRight, 
  BookOpen, 
  Calendar,
  Database,
  Cpu,
  Globe,
  Award,
  Folder,
  Home,
  Terminal,
  Server,
  Factory,
  Cog,
  Wrench,
  Smartphone,
  Palette,
  Shield,
  Atom
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const WhatsAppCustomIcon = ({ className = "w-5 h-5" }: { className?: string }) => {
  return (
    <svg 
      viewBox="0 0 448 512" 
      fill="currentColor" 
      className={`${className} shrink-0`}
    >
      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L3 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
    </svg>
  );
};

const SkillMatrixCustomIcon = ({ className = "w-5.5 h-5.5" }: { className?: string }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="6" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={`${className} shrink-0`}
    >
      <rect x="15" y="15" width="70" height="70" rx="12" strokeWidth="6" />
      <path d="M 35 15 v 70 M 65 15 v 70 M 15 35 h 70 M 15 65 h 70" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />
      <circle cx="50" cy="50" r="14" fill="currentColor" fillOpacity="0.2" />
      <circle cx="50" cy="50" r="7" fill="currentColor" />
      <circle cx="35" cy="35" r="4.5" fill="currentColor" />
      <circle cx="65" cy="35" r="4.5" fill="currentColor" />
      <circle cx="35" cy="65" r="4.5" fill="currentColor" />
      <circle cx="65" cy="65" r="4.5" fill="currentColor" />
    </svg>
  );
};

const EducationGraduateIcon = ({ className = "w-5.5 h-5.5" }: { className?: string }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="6" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={`${className} shrink-0`}
    >
      {/* Graduation Cap (Mortarboard) */}
      <path d="M 50 12 L 88 26 L 50 40 L 12 26 Z" fill="currentColor" fillOpacity="0.12" />
      
      {/* The Cap Dome/Skull */}
      <path d="M 24 29.5 v 7 c 0 6 10 9 26 9 s 26 -3 26 -9 v -7" />
      
      {/* Tassel on the left side */}
      <circle cx="50" cy="26" r="1.5" fill="currentColor" />
      <path d="M 50 26 L 18 31 v 18" strokeWidth="4" />
      <path d="M 15 49 h 6 v 7 h -6 z" fill="currentColor" strokeWidth="3" />

      {/* Graduate Head Silhouette */}
      <circle cx="50" cy="52" r="10" />

      {/* Gown & Shoulders */}
      <path d="M 15 88 c 0 -13 14 -16 35 -16 s 35 3 35 16" fill="currentColor" fillOpacity="0.1" />

      {/* V-neck collar of the graduation gown */}
      <path d="M 39 72 L 50 82 L 61 72" />

      {/* Necktie - hanging inside the V-neck */}
      <path d="M 48 83 h 4 l 2 10 l -4 3 l -4 -3 z" fill="currentColor" strokeWidth="3" />
    </svg>
  );
};

interface ColoredIconProps {
  children: React.ReactNode;
  bgHex?: string;
  index?: number;
  isBig?: boolean;
}

const ColoredIcon = ({ children, bgHex, index = 0, isBig = false }: ColoredIconProps) => {
  const defaultColors = [
    '#6366f1', // Indigo
    '#10b981', // Emerald
    '#f59e0b', // Amber
    '#ef4444', // Rose/Red
    '#06b6d4', // Cyan
    '#8b5cf6', // Violet
    '#ec4899', // Pink
    '#14b8a6', // Teal
  ];
  
  const bgToUse = bgHex || defaultColors[index % defaultColors.length];
  const sizeClass = isBig ? 'w-14 h-14 sm:w-16 sm:h-16 rounded-2xl' : 'w-11 h-11 sm:w-12 sm:h-12 rounded-xl';
  
  const childWithStyles = React.isValidElement(children) 
    ? React.cloneElement(children as React.ReactElement<any>, {
        className: `${(children.props as any).className || ''} ${isBig ? 'w-8 h-8 sm:w-9 sm:h-9' : 'w-6 h-6 sm:w-6.5 sm:h-6.5'} text-white duration-300`,
      })
    : children;

  return (
    <div 
      className={`${sizeClass} flex items-center justify-center shrink-0 shadow-md select-none transform hover:rotate-6 duration-300`}
      style={{ backgroundColor: bgToUse }}
    >
      {childWithStyles}
    </div>
  );
};

const SkillIcon = ({ icon, isDarkMode, title }: { icon: string; isDarkMode: boolean; title?: string }) => {
  const iconLower = (icon || '').toLowerCase();
  
  const isCustomImage = iconLower.startsWith('data:') || iconLower.startsWith('http://') || iconLower.startsWith('https://');

  const containerClasses = `w-12 h-12 rounded-[18px] border flex items-center justify-center shrink-0 overflow-hidden shadow-sm transition-all duration-300 hover:scale-110 ${
    isDarkMode 
      ? 'bg-[#121924] border-[#2e353f]/80' 
      : 'bg-white border-[#e2e8f0] shadow-[0_3px_10px_rgba(0,0,0,0.04)]'
  }`;

  if (isCustomImage) {
    return (
      <div className={`${containerClasses} p-[2.5px]`}>
        <div className="w-full h-full rounded-[14px] bg-white flex items-center justify-center overflow-hidden">
          <img 
            src={icon} 
            alt="Skill Icon" 
            className="w-full h-full object-cover p-1"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    );
  }

  // Unified visual appearance across all skills (both custom image URLs and SVG presets)
  return (
    <div className={containerClasses}>
      <div className="flex items-center justify-center p-2 w-full h-full">
        {getIconElement(icon, title)}
      </div>
    </div>
  );
};

interface SkillsTrainMarqueeProps {
  skills: Skill[];
  isDarkMode: boolean;
  speed?: number;
}

const SkillsTrainMarquee = ({ skills = [], isDarkMode, speed = 25 }: SkillsTrainMarqueeProps) => {
  if (skills.length === 0) return null;
  
  const shouldSplit = skills.length >= 4;

  let row1 = skills;
  let row2: Skill[] = [];

  if (shouldSplit) {
    row1 = [];
    skills.forEach((skill, idx) => {
      if (idx % 2 === 0) {
        row1.push(skill);
      } else {
        row2.push(skill);
      }
    });
  }

  // Multiply by exactly 6 for mathematically perfect looping marquee transitions
  const items1 = [...row1, ...row1, ...row1, ...row1, ...row1, ...row1];
  const items2 = row2.length > 0 ? [...row2, ...row2, ...row2, ...row2, ...row2, ...row2] : [];
  
  return (
    <div 
      className="w-full overflow-hidden relative py-5 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent rounded-2xl flex flex-col gap-4"
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)'
      }}
    >
      <style>{`
        @keyframes marquee-scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-16.666667%); }
        }
        @keyframes marquee-scroll-right {
          0% { transform: translateX(-16.666667%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-scroll-left {
          animation: marquee-scroll-left ${speed}s linear infinite;
        }
        .animate-marquee-scroll-right {
          animation: marquee-scroll-right ${speed}s linear infinite;
        }
        .animate-marquee-scroll-left:hover,
        .animate-marquee-scroll-right:hover {
          animation-play-state: paused !important;
        }
      `}</style>
      
      {/* Row 1: Scrolling Left */}
      <div 
        className="flex gap-6 w-max animate-marquee-scroll-left transition-all duration-300"
      >
        {items1.map((skill, index) => {
          return (
            <div 
              key={`r1-${index}`} 
              className={`flex items-center gap-4 px-5 py-4 rounded-2xl border font-bold text-xs sm:text-sm tracking-wide shadow-sm h-16 transition-all duration-300 hover:scale-[1.03] ${
                isDarkMode 
                  ? 'bg-[#0f141e]/90 border-sky-500/10 text-white hover:border-[#8b5cf6]/40 shadow-[0_4px_20px_rgba(0,0,0,0.25)]' 
                  : 'bg-white border-slate-200/80 text-slate-800 shadow-[0_4px_12px_rgba(0,0,0,0.02)]'
              }`}
            >
              <SkillIcon icon={skill.icon} isDarkMode={isDarkMode} title={skill.title} />
              <div className="flex flex-col text-left justify-center">
                <span className="font-extrabold leading-tight text-[13px] sm:text-[14px]">{skill.title}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Row 2: Scrolling Right (Only if split is used) */}
      {shouldSplit && items2.length > 0 && (
        <div 
          className="flex gap-6 w-max animate-marquee-scroll-right transition-all duration-300"
        >
          {items2.map((skill, index) => {
            return (
              <div 
                key={`r2-${index}`} 
                className={`flex items-center gap-4 px-5 py-4 rounded-2xl border font-bold text-xs sm:text-sm tracking-wide shadow-sm h-16 transition-all duration-300 hover:scale-[1.03] ${
                  isDarkMode 
                    ? 'bg-[#0f141e]/90 border-sky-500/10 text-white hover:border-[#8b5cf6]/40 shadow-[0_4px_20px_rgba(0,0,0,0.25)]' 
                    : 'bg-white border-slate-200/80 text-slate-800 shadow-[0_4px_12px_rgba(0,0,0,0.02)]'
                }`}
              >
                <SkillIcon icon={skill.icon} isDarkMode={isDarkMode} title={skill.title} />
                <div className="flex flex-col text-left justify-center">
                  <span className="font-extrabold leading-tight text-[13px] sm:text-[14px]">{skill.title}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

interface PublicPortfolioProps {
  projects: Project[];
  skills: Skill[];
  experiences: Experience[];
  educations: Education[];
  certificates: Certificate[];
  settings: SystemSettings;
  onNavigateToLogin: () => void;
  onAddMessage: (msg: Omit<Message, 'id' | 'senderInitials' | 'dateText' | 'status'>) => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
}

const TRANSLATIONS = {
  ID: {
    home: "HOME",
    about: "ABOUT",
    portfolio: "PORTFOLIO",
    contact: "CONTACT",
    hireMe: "HIRE ME",
    halo: "Halo, Saya",
    mariTerhubung: "MARI TERHUBUNG",
    hubungiStudio: "Hubungi Studio Kami",
    tentangSaya: "Tentang Saya",
    matriksSkill: "Matriks Skill",
    riwayatPendidikan: "Riwayat Pendidikan",
    rekamKarier: "Rekam Jejak Karier",
    viewWork: "Lihat Portfolio",
    contactMe: "Hubungi Saya",
    aboutBrief: "Tentang Saya",
    portfolioBrief: "Proyek Terbaru",
    contactBrief: "Hubungi Saya",
    readMore: "Selengkapnya Tentang Saya",
    viewAllProjects: "Lihat Semua Portfolio",
    getInTouch: "Hubungi Saya Sekarang",
    sendMsg: "Kirim Pesan",
    namePlaceholder: "Nama Anda",
    emailPlaceholder: "Email Anda",
    msgPlaceholder: "Pesan Anda...",
    openedInMap: "Buka di Map",
    successMsg: "✓ Terima kasih! Pesan Anda telah terkirim dan disimpan di Admin portal dashboard.",
    educationSDTitle: "Sekolah Dasar",
    educationSDDesc: "SD Negri 2 Sukajadi",
    educationSMPTitle: "Sekolah Menengah Pertama",
    educationSMPDesc: "SMP Negri 2 Pondoksalam",
    educationSMATitle: "Sekolah Menengah Atas",
    educationSMADesc: "SMA Negri 1 Pasawahan",
    taglineDefault: "GRAPHIC DESIGNER, WEB DEVELOPER & VIDEO EDITOR",
    bioDefault: "Berawal dari ketertarikan pada seni visual, saya menemukan passion sejati di dunia UI/UX dan Web Development. Lebih dari 5 tahun pengalaman di dunia desain digital."
  },
  EN: {
    home: "HOME",
    about: "ABOUT",
    portfolio: "PORTFOLIO",
    contact: "CONTACT",
    hireMe: "HIRE ME",
    halo: "Hello, I'm",
    mariTerhubung: "LET'S CONNECT",
    hubungiStudio: "Contact Our Studio",
    tentangSaya: "About Me",
    matriksSkill: "Skill Matrix",
    riwayatPendidikan: "Education History",
    rekamKarier: "Career Records",
    viewWork: "View Work",
    contactMe: "Contact Me",
    aboutBrief: "About Me",
    portfolioBrief: "Featured Works",
    contactBrief: "Get In Touch",
    readMore: "More About Me",
    viewAllProjects: "View All Portfolio",
    getInTouch: "Get In Touch Now",
    sendMsg: "Send Message",
    namePlaceholder: "Your Name",
    emailPlaceholder: "Your Email",
    msgPlaceholder: "Your Message...",
    openedInMap: "Open in Map",
    successMsg: "✓ Thank you! Your message has been sent and stored in the Admin portal dashboard.",
    educationSDTitle: "Elementary School",
    educationSDDesc: "SD Negri 2 Sukajadi",
    educationSMPTitle: "Junior High School",
    educationSMPDesc: "SMP Negri 2 Pondoksalam",
    educationSMATitle: "Senior High School",
    educationSMADesc: "SMA Negri 1 Pasawahan",
    taglineDefault: "GRAPHIC DESIGNER, WEB DEVELOPER & VIDEO EDITOR",
    bioDefault: "Starting from an interest in visual arts, I found my true passion in UI/UX and Web Development. Over 5 years of digital design experience."
  }
};

const ScrollAnimate: React.FC<{ 
  children: React.ReactNode; 
  className?: string; 
  'data-aos'?: string; 
  'data-aos-delay'?: string; 
  'data-aos-duration'?: string;
  'data-aos-offset'?: string;
}> = ({ 
  children, 
  className, 
  'data-aos': aos = 'fade-up', 
  'data-aos-delay': delay,
  'data-aos-duration': duration,
  'data-aos-offset': offset
}) => {
  return (
    <div
      data-aos={aos}
      data-aos-delay={delay}
      data-aos-duration={duration}
      data-aos-offset={offset}
      className={className}
    >
      {children}
    </div>
  );
};

const TypingText: React.FC<{ text: string; className?: string }> = ({ text, className }) => {
  const [displayText, setDisplayText] = React.useState('');
  
  React.useEffect(() => {
    let index = 0;
    let isDeleting = false;
    let currentText = '';
    let timerId: any = null;

    const tick = () => {
      if (!isDeleting) {
        if (index < text.length) {
          currentText += text.charAt(index);
          setDisplayText(currentText);
          index++;
          timerId = setTimeout(tick, 75);
        } else {
          timerId = setTimeout(() => {
            isDeleting = true;
            timerId = setTimeout(tick, 35);
          }, 3500); // Wait 3.5s after typing finishes
        }
      } else {
        if (currentText.length > 0) {
          currentText = currentText.substring(0, currentText.length - 1);
          setDisplayText(currentText);
          timerId = setTimeout(tick, 30);
        } else {
          isDeleting = false;
          index = 0;
          timerId = setTimeout(tick, 500); // 0.5s pause before typing again
        }
      }
    };

    timerId = setTimeout(tick, 200);
    return () => clearTimeout(timerId);
  }, [text]);

  return (
    <span className={className}>
      {displayText}
      <span className="inline-block w-1.5 h-6 sm:h-9 ml-1 bg-[#00c2ff] animate-pulse align-middle">|</span>
    </span>
  );
};

const getInstagramHandle = (url?: string) => {
  if (!url) return '@fikrry_andi';
  const clean = url.trim().replace(/\/$/, "");
  const parts = clean.split('/');
  const last = parts[parts.length - 1];
  if (!last) return '@fikrry_andi';
  return last.startsWith('@') ? last : `@${last}`;
};

const getGithubHandle = (url?: string) => {
  if (!url) return 'fikrryandi';
  const clean = url.trim().replace(/\/$/, "");
  const parts = clean.split('/');
  const last = parts[parts.length - 1];
  return last || 'fikrryandi';
};

const getIconElement = (iconName: string, title?: string, customColorClass?: string) => {
  const iconLower = (iconName || '').toLowerCase();
  const titleLower = (title || '').toLowerCase();

  // Check if the icon is a base64 Data URL or direct HTTP URL
  if (iconName && (iconName.startsWith('data:') || iconName.startsWith('http://') || iconName.startsWith('https://'))) {
    return (
      <img 
        src={iconName} 
        alt="Skill Icon" 
        className="w-full h-full object-cover rounded-lg"
        referrerPolicy="no-referrer"
      />
    );
  }

  // 1. Brand match overrides by Skill Title (for beautiful, authentic, brand-colored official visual display like image 2)
  if (titleLower.includes('tailwind')) {
    return (
      <svg viewBox="0 0 24 24" className="w-8 h-8 select-none shrink-0" fill="none">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 14.881 12 18 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 15.121 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.393 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 9.121 12 6.001 12z" fill="#38bdf8"/>
      </svg>
    );
  }
  
  if (titleLower.includes('postgres')) {
    return (
      <svg viewBox="0 0 100 100" className="w-8 h-8 select-none shrink-0">
        <circle cx="50" cy="50" r="48" fill="#336791" opacity="0.1" />
        <path d="M50 15c-19.34 0-35 15.66-35 35 0 2.9.36 5.72 1.02 8.44l11.02-.32c.56-2.3 2.5-4.48 4.74-5.32l1.62 1.62s-.4-2.2-.4-3.8c0-1.63.4-3.14.93-4.52l.23-.23.1.28c.57 1.64.44 3.44-.3 4.96-.34.7-.8 1.34-1.34 1.88l-.48.48 1.45 1.45c.86-.43 1.56-1.12 2.05-1.99.52-1 .69-2.13.52-3.24a4.9 4.9 0 0 1 1-1.3l.03-.03h1.07l.32-.14c1.38-.62 3-.8 4.45-.3 1 .3 2.14.13 2.94-.48a3.52 3.52 0 0 0 1-2.45c0-1.93-1.57-3.5-3.5-3.5-3.56 0-6.72 2.05-8.23 5.3-.43.91-.76 1.88-1 2.87l-1.01 1c-.26-.13-.5-.28-.7-.45a7.2 7.2 0 0 0-1.95-1.61c-1.1-.6-2.42-.9-3.7-.93V54.4c.57.14 1.13.43 1.58.83l.23.23c-.15.42-.32.84-.5 1.25-.2.5-.43.95-.7 1.34a3.83 3.83 0 0 0-1 1.79c-.4 1.5-.02 3 .95 4.16.55.66 1.25 1.2 2.02 1.6l.08.04.14-.07a10.02 10.02 0 0 0 2.25-1.74l1-1v1c0 1.1.9 2 2 2s2-.9 2-2v-1c.21.05.42.08.64.08 1.05 0 2.03-.4 2.76-1.12a3.88 3.88 0 0 0 1.13-2.76c.07-1.05-.29-2.03-1.02-2.76-.71-.72-1.7-1.12-2.75-1.12-.51 0-1 .1-1.46.28a4.95 4.95 0 0 1-1.78 1.28c-.5.18-.84.6-1 1.1a4.23 4.23 0 0 1-1.28 1.78l-.34.25c-.24-.13-.46-.28-.67-.45-.48-.42-.88-.93-1.17-1.5a4.01 4.01 0 0 0-.48-1.55l.45-1.08c.31-.75.64-1.48.95-2.22l.14-.3.3.14c.48.24.96.48 1.45.71l.33.15-.14-.32z" fill="#336791" />
      </svg>
    );
  }

  if (titleLower.includes('next.js') || titleLower.includes('nextjs')) {
    return (
      <svg viewBox="0 0 128 128" className="w-8 h-8 select-none shrink-0">
        <circle cx="64" cy="64" r="62" fill="#000" />
        <path d="M101.3 103.5 54.6 44.2H44.1v39.7h8.7V55h.3l41 51.7c2.6-2.5 4.9-5.2 6.9-8.2z" fill="url(#nextjs-brand-grad)" />
        <rect x="75" y="44.2" width="8.7" height="39.7" fill="url(#nextjs-brand-grad)" />
        <defs>
          <linearGradient id="nextjs-brand-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fff" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0.25" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  if (titleLower.includes('laravel')) {
    return (
      <svg viewBox="0 0 100 100" className="w-8 h-8 select-none shrink-0" fill="none">
        <rect width="100" height="100" rx="20" fill="#f52d3a" opacity="0.06" />
        <path d="M83.2 25.1L51.6 6.8c-1-.6-2.3-.6-3.3 0L16.8 25.1c-1 .6-1.6 1.7-1.6 2.9v36.6c0 1.2.6 2.3 1.6 2.9l31.6 18.3c1 .6 2.3.6 3.3 0l31.6-18.3c1-.6 1.6-1.7 1.6-2.9V28c-.1-1.2-.7-2.3-1.7-2.9z" stroke="#f55240" strokeWidth="6" strokeLinejoin="round" />
        <path d="M50 25v30M32.5 35l17.5 10 17.5-10" stroke="#f55240" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (titleLower.includes('react')) {
    return (
      <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-8 h-8 select-none shrink-0 hover:rotate-90 duration-1000">
        <circle cx="0" cy="0" r="2.05" fill="#61dafb"/>
        <g stroke="#61dafb" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2"/>
          <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
          <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        </g>
      </svg>
    );
  }

  if (titleLower.includes('figma')) {
    return (
      <svg viewBox="0 0 120 120" className="w-8 h-8 select-none shrink-0">
        <path d="M38 22h22v22H38z" fill="#f24e1e" />
        <path d="M60 22h22c6.6 0 12 5.4 12 12s-5.4 12-12 12H60z" fill="#ff7262" />
        <path d="M60 44H38v22h22z" fill="#a259ff" />
        <path d="M60 44h22c6.6 0 12 5.4 12 12s-5.4 12-12 12H60z" fill="#1abc9c" />
        <path d="M60 88c-6.6 0-12-5.4-12-12s5.4-12 12-12s12 5.4 12 12s-5.4 12-12 12zm-22-22h22v22c0 6.6-5.4 12-12 12s-8-5.4-8-12z" fill="#0acf83" />
      </svg>
    );
  }

  if (titleLower.includes('git')) {
    return (
      <svg viewBox="0 0 128 128" className="w-8 h-8 select-none shrink-0">
        <path d="M124.9 59.9 68.1 3.1c-4-4-10.4-4-14.4 0L3.1 53.7c-4 4-4 10.4 0 14.4l56.8 56.8c4 4 10.4 4 14.4 0l50.6-50.6c4-3.9 4-10.4 0-14.4z" fill="#f05032" />
        <path d="M89.1 63.8c0-3-1.8-5.7-4.5-6.7V42.7c3.4-1.3 5.8-4.6 5.8-8.5 0-5-4.1-9.1-9.1-9.1s-9.1 4.1-9.1 9.1c0 3.9 2.5 7.2 5.8 8.5v14.4c-2.7 1-4.5 3.7-4.5 6.7 0 1.2.3 2.3.8 3.3L61 79.5c-1-.5-2.2-.8-3.4-.8-3.9 0-7.2 2.5-8.5 5.8H39c-1.3-3.4-4.6-5.8-8.5-5.8-5 0-9.1 4.1-9.1 9.1s4.1 9.1 9.1 9.1c3.9 0 7.2-2.5 8.5-5.8h10.4c1.3 3.4 4.6 5.8 8.5 5.8 3.9 0 7.2-2.5 8.5-5.8l13.5-13.5v-1.1c2-.8 3.6-2.4 4.3-4.5l12.4 3.1c.5 1 .8 2.2.8 3.4 0 5 4.1 9.1 9.1 9.1s9.1-4.1 9.1-9.1-4.1-9.1-9.1-9.1zm-48 24.2c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5 4.5 2 4.5 4.5-2 4.5-4.5 4.5zm31.9-53c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5-2 4.5-4.5 4.5-4.5-2-4.5-4.5zm8 43.9c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5 4.5 2 4.5 4.5-2 4.5-4.5 4.5zm8 9.1c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5 4.5 2 4.5 4.5-2 4.5-4.5 4.5z" fill="#fff" />
      </svg>
    );
  }

  if (titleLower.includes('php')) {
    return (
      <svg viewBox="0 0 128 128" className="w-8 h-8 select-none shrink-0">
        <ellipse cx="64" cy="64" rx="60" ry="38" fill="#777bb4" />
        <ellipse cx="64" cy="64" rx="55" ry="33" fill="#4f5b93" />
        <text x="64" y="77" fill="#fff" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="34" letterSpacing="-1" textAnchor="middle">php</text>
      </svg>
    );
  }

  if (titleLower.includes('mysql')) {
    return (
      <svg viewBox="0 0 128 128" className="w-8 h-8 select-none shrink-0">
        <rect width="128" height="128" rx="28" fill="#e8f3f8" />
        <path d="M84.4 44.5c-.8-1.5-2.2-2.7-3.8-3.4-3.6-1.5-7.9-.5-11 2-1.5 1.2-2.7 2.8-3.4 4.6-.5 1.1-.7 2.3-.6 3.5.2 1.9.9 3.7 1.9 5.3 1.1 1.7 2.6 3.1 4.4 4 1.8.9 3.8 1.2 5.8 1 1.7-.2 3.4-.9 4.7-2 1.2-1 2.2-2.3 2.7-3.7 1-2.9.2-6.1-1.7-8.6c-.2-.2-.5-.3-.7-.1s-.2.5 0 .7c1.6 2.1 2.3 4.9 1.5 7.4-.5 1.2-1.3 2.3-2.3 3.1-1.1.9-2.5 1.5-3.9 1.6-1.7.2-3.4-.1-4.9-.9-1.5-.8-2.7-2-3.6-3.4-.9-1.4-1.5-2.9-1.6-4.5-.1-1 .1-2 .5-2.9.6-1.5 1.6-2.9 2.9-3.9 2.7-2.1 6.3-2.9 9.4-1.6 1.4.6 2.6 1.6 3.3 2.9.2.3.5.4.7.2.2-.2.2-.5 0-.7z" fill="#00758f" />
        <path d="M60.1 52.4c-1.5-1.5-3.6-2.4-5.8-2.5-3.9-.1-7.7 2.1-9.4 5.6-.9 1.7-1.1 3.7-.7 5.6.8 3.5 3.3 6.4 6.7 7.7 1.7.7 3.6.9 5.4.5 3.5-.8 6.4-3.3 7.7-6.7.7-1.7.9-3.6.5-5.4-.3-1.8-1.1-3.4-2.3-4.8-.2-.3-.5-.3-.7 0s-.2.5 0 .7c1.1 1.2 1.8 2.7 2 4.3.3 1.5.1 3.1-.5 4.5-1.1 2.9-3.5 5.1-6.5 5.7-1.5.3-3.1.2-4.5-.4-2.9-1.1-5.1-3.5-5.7-6.5-.3-1.5-.1-3.1.5-4.5 1.4-2.9 4.6-4.7 7.8-4.6 1.9 0 3.7.8 5 2.1.2.2.5.2.7 0s.2-.5 0-.7z" fill="#f29111" />
      </svg>
    );
  }

  if (titleLower.includes('typescript') || titleLower === 'ts') {
    return (
      <svg viewBox="0 0 128 128" className="w-8 h-8 select-none shrink-0">
        <rect width="128" height="128" rx="24" fill="#3178c6" />
        <text x="112" y="102" fill="#fff" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="56" textAnchor="end">TS</text>
      </svg>
    );
  }

  // 2. Preset Fallbacks with premium colorful visual configurations
  switch (iconLower) {
    case 'database':
      return (
        <svg viewBox="0 0 100 100" className="w-8 h-8 select-none shrink-0">
          <defs>
            <linearGradient id="db-cyl-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
            <linearGradient id="db-rng" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
          </defs>
          <path d="M15 35c0 8.3 15.7 15 35 15s35-6.7 35-15V20c0-8.3-15.7-15-35-15S15 11.7 15 20v15z" fill="url(#db-cyl-grad)" />
          <ellipse cx="50" cy="20" rx="35" ry="12" fill="url(#db-rng)" />
          
          <path d="M15 60c0 8.3 15.7 15 35 15s35-6.7 35-15V45c0-8.3-15.7-15-35-15S15 36.7 15 45v15z" fill="url(#db-cyl-grad)" opacity="0.85" />
          <ellipse cx="50" cy="45" rx="35" ry="12" fill="url(#db-rng)" />
          
          <path d="M15 85c0 8.3 15.7 15 35 15s35-6.7 35-15V70c0-8.3-15.7-15-35-15S15 61.7 15 70v15z" fill="url(#db-cyl-grad)" opacity="0.7" />
          <ellipse cx="50" cy="70" rx="35" ry="12" fill="url(#db-rng)" />
        </svg>
      );

    case 'cpu':
      return (
        <svg viewBox="0 0 100 100" className="w-8 h-8 select-none shrink-0">
          <defs>
            <linearGradient id="cpu-sil" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id="cpu-pn" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>
          <rect x="15" y="15" width="70" height="70" rx="10" fill="url(#cpu-sil)" stroke="url(#cpu-pn)" strokeWidth="3" />
          {[12, 24, 36, 48, 60, 72, 88].map((pos, i) => (
            <g key={i}>
              <line x1={pos} y1="5" x2={pos} y2="15" stroke="url(#cpu-pn)" strokeWidth="3" strokeLinecap="round" />
              <line x1={pos} y1="85" x2={pos} y2="95" stroke="url(#cpu-pn)" strokeWidth="3" strokeLinecap="round" />
              <line x1="5" y1={pos} x2="15" y2={pos} stroke="url(#cpu-pn)" strokeWidth="3" strokeLinecap="round" />
              <line x1="85" y1={pos} x2="95" y2={pos} stroke="url(#cpu-pn)" strokeWidth="3" strokeLinecap="round" />
            </g>
          ))}
          <rect x="32" y="32" width="36" height="36" rx="6" fill="#020617" stroke="#38bdf8" strokeWidth="2.5" />
          <text x="50" y="55" fill="#38bdf8" fontFamily="monospace" fontSize="13" fontWeight="bold" textAnchor="middle">SOC</text>
        </svg>
      );

    case 'cloud':
      return (
        <svg viewBox="0 0 100 100" className="w-8 h-8 select-none shrink-0">
          <defs>
            <linearGradient id="cld-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="45" fill="#022c22" opacity="0.15" />
          <path d="M42 40a15 15 0 0 1 29 3c4 .2 8 3.5 8 8a9 9 0 0 1-9 9h-36a11 11 0 0 1-2-22c1.3 0 2.5.3 3.6.8A15 15 0 0 1 42 40z" fill="url(#cld-grad)" />
          <circle cx="36" cy="52" r="2.5" fill="#fff" />
          <circle cx="50" cy="48" r="2.5" fill="#fff" />
          <circle cx="64" cy="51" r="2.5" fill="#fff" />
          <line x1="36" y1="52" x2="50" y2="48" stroke="#fff" strokeWidth="1" strokeDasharray="2" />
          <line x1="50" y1="48" x2="64" y2="51" stroke="#fff" strokeWidth="1" strokeDasharray="2" />
        </svg>
      );

    case 'terminal':
      return (
        <svg viewBox="0 0 100 100" className="w-8 h-8 select-none shrink-0">
          <rect x="10" y="20" width="80" height="60" rx="8" fill="#1e293b" stroke="#475569" strokeWidth="2" />
          <path d="M10 28h80V20a8 8 0 0 0-8-8H18a8 8 0 0 0-8 8v8z" fill="#0f172a" />
          <circle cx="20" cy="20" r="3" fill="#ef4444" />
          <circle cx="30" cy="20" r="3" fill="#f59e0b" />
          <circle cx="40" cy="20" r="3" fill="#10b981" />
          <text x="20" y="54" fill="#38bdf8" fontFamily="monospace" fontSize="16" fontWeight="bold">&gt;_</text>
        </svg>
      );

    case 'server':
      return (
        <svg viewBox="0 0 100 100" className="w-8 h-8 select-none shrink-0">
          <rect x="15" y="10" width="70" height="80" rx="8" fill="#334155" stroke="#475569" strokeWidth="2.5" />
          {[18, 42, 66].map((offset, idx) => (
            <g key={idx}>
              <rect x="22" y={offset} width="56" height="18" rx="4" fill="#0f172a" />
              <line x1="28" y1={offset + 5} x2="54" y2={offset + 5} stroke="#1e293b" strokeWidth="2.5" />
              <line x1="28" y1={offset + 11} x2="54" y2={offset + 11} stroke="#1e293b" strokeWidth="2.5" />
              <circle cx="62" cy={offset + 9} r="2.5" fill="#10b981" />
              <circle cx="70" cy={offset + 9} r="2.5" fill="#38bdf8" />
            </g>
          ))}
        </svg>
      );

    case 'factory':
      return (
        <svg viewBox="0 0 100 100" className="w-8 h-8 select-none shrink-0">
          <defs>
            <linearGradient id="fc-body" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
          </defs>
          <path d="M15 85V45l18 15V45l18 15V45l18 15V30h16v55H15z" fill="url(#fc-body)" />
          <circle cx="77" cy="18" r="8" fill="#e2e8f0" opacity="0.8" />
          <circle cx="82" cy="10" r="10" fill="#cbd5e1" opacity="0.6" />
          <rect x="25" y="65" width="12" height="20" fill="#1e293b" rx="2" />
        </svg>
      );

    case 'cog':
      return (
        <svg viewBox="0 0 100 100" className="w-8 h-8 select-none shrink-0 animate-spin" style={{ animationDuration: '20s' }}>
          <circle cx="50" cy="50" r="28" fill="none" stroke="#60a5fa" strokeWidth="12" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((ang) => (
            <rect 
              key={ang}
              x="44" 
              y="10" 
              width="12" 
              height="20" 
              rx="3" 
              fill="#3b82f6" 
              transform={`rotate(${ang} 50 50)`} 
            />
          ))}
          <circle cx="50" cy="50" r="14" fill="#0f172a" />
          <circle cx="50" cy="50" r="6" fill="#60a5fa" />
        </svg>
      );

    case 'wrench':
      return (
        <svg viewBox="0 0 100 100" className="w-8 h-8 select-none shrink-0">
          <g transform="rotate(-45 50 50)">
            <rect x="45" y="25" width="10" height="50" fill="#94a3b8" rx="2" />
            <rect x="47" y="28" width="6" height="44" fill="#cbd5e1" rx="1" />
            <circle cx="50" cy="18" r="16" fill="#64748b" />
            <path d="M50 4l-10 16h20z" fill="#0f172a" />
            <circle cx="50" cy="18" r="7" fill="#0f172a" />
            
            <circle cx="50" cy="80" r="14" fill="#64748b" />
            <circle cx="50" cy="80" r="8" fill="#0f172a" />
          </g>
        </svg>
      );

    case 'smartphone':
      return (
        <svg viewBox="0 0 100 100" className="w-8 h-8 select-none shrink-0">
          <rect x="25" y="10" width="50" height="80" rx="8" fill="#1e1b4b" stroke="#ec4899" strokeWidth="2.5" />
          <rect x="30" y="18" width="40" height="60" rx="4" fill="#e0f2fe" opacity="0.1" />
          <line x1="44" y1="14" x2="52" y2="14" stroke="#ec4899" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="40" cy="30" r="6" fill="#ec4899" opacity="0.6" />
        </svg>
      );

    case 'palette':
      return (
        <svg viewBox="0 0 100 100" className="w-8 h-8 select-none shrink-0">
          <path d="M75 35c7 15 0 35-15 45s-35 8-45-5-2-35 15-45 35-10 45 5z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
          <circle cx="34" cy="56" r="6" fill="#64748b" />
          <circle cx="32" cy="28" r="7" fill="#ef4444" />
          <circle cx="48" cy="22" r="7" fill="#f59e0b" />
          <circle cx="66" cy="32" r="7" fill="#3b82f6" />
          <circle cx="70" cy="52" r="7" fill="#10b981" />
        </svg>
      );

    case 'shield':
      return (
        <svg viewBox="0 0 100 100" className="w-8 h-8 select-none shrink-0">
          <defs>
            <linearGradient id="shd-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#991b1b" />
            </linearGradient>
          </defs>
          <path d="M50 10c18 2 32 10 32 32 0 22-18 38-32 48C36 80 18 64 18 42c0-22 14-30 32-32z" fill="url(#shd-grad)" stroke="#1e1b4b" strokeWidth="2.5" />
          <path d="M50 25l6 14 14 2-10 10 3 14-13-8-13 8 3-14-10-10 14-2z" fill="#fef08a" />
        </svg>
      );

    case 'atom':
      return (
        <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-8 h-8 select-none shrink-0">
          <circle cx="0" cy="0" r="2.05" fill="#06b6d4" />
          <g stroke="#22d3ee" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
      );

    default:
      return <Code className={`w-6 h-6 ${customColorClass || 'text-indigo-400'}`} />;
  }
};

export default function PublicPortfolio({
  projects,
  skills,
  experiences,
  educations,
  settings,
  certificates = [],
  onNavigateToLogin,
  onAddMessage,
  isDarkMode,
  setIsDarkMode
}: PublicPortfolioProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'about' | 'portfolio' | 'contact'>('home');
  const [selectedLang, setSelectedLang] = useState<'ID' | 'EN'>('ID');

  React.useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50,
      delay: 50,
    });
  }, []);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      AOS.refresh();
    }, 400);
    return () => clearTimeout(timer);
  }, [activeTab]);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [showFormSuccess, setShowFormSuccess] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCertImage, setSelectedCertImage] = useState<string | null>(null);
  const [selectedCertTitle, setSelectedCertTitle] = useState<string>('');
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  // Mouse & Touch glow & tilt tracking state for the main picture on Beranda
  const [cardHover, setCardHover] = useState(false);
  const [cardGlow, setCardGlow] = useState({ x: 150, y: 150 });
  const [cardTilt, setCardTilt] = useState({ x: 0, y: 0 });

  const handleCardInteraction = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    let clientX = 0;
    let clientY = 0;

    if ('touches' in e) {
      if (e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        return;
      }
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // Clamp inside frame dimensions for safety
    const clampedX = Math.max(0, Math.min(x, rect.width));
    const clampedY = Math.max(0, Math.min(y, rect.height));

    const px = (clampedX / rect.width) - 0.5;
    const py = (clampedY / rect.height) - 0.5;

    // Rich 3D rotation scaling (tX: rotation around vertical offset, tY: around horizontal offset)
    const tX = -py * 16; 
    const tY = px * 16;  

    setCardGlow({ x: clampedX, y: clampedY });
    setCardTilt({ x: tX, y: tY });
  };

  const t = TRANSLATIONS[selectedLang];
  const activeProjects = projects.filter(p => p.status === 'Published');

  // Dynamic perfectly synchronized shine delay aligned to an absolute 2.4s cycle
  const dynamicShineDelay = `-${(Date.now() / 1000) % 2.4}s`;

  const renderFormattedCardName = (nameToFormat: string) => {
    const trimmed = (nameToFormat || '').trim();
    if (!trimmed) return <span className="text-white">Profile Name</span>;
    const parts = trimmed.split(' ');
    if (parts.length === 1) {
      return <span className="text-white">{trimmed}</span>;
    }
    const last = parts.pop();
    return (
      <>
        <span className="text-white">{parts.join(' ')} </span>
        <span className="text-[#f59e0b]">{last}</span>
      </>
    );
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    onAddMessage({
      sender: formData.name,
      subject: `Portfolio message from ${formData.name}`,
      email: formData.email,
      message: formData.message
    });

    setFormData({ name: '', email: '', message: '' });
    setShowFormSuccess(true);
    setTimeout(() => {
      setShowFormSuccess(false);
    }, 6000);
  };

  // Profile metadata
  const ownerName = settings.ownerName || 'Fikri Yandi';
  const displayPic = settings.profilePicUrl === '' 
    ? 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
    : (settings.profilePicUrl || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBywFPLidaBKxly128lFry3QoA8KAiICg5Na3mCoPpupX45Ex1ICW44wyeRm1_Nc5B6f_X5X7ljd9YY5dZl1CqCkKCy59ATHLp_UIGHTfWPiF66DPqjUSaKD3UfD9OfeDyrFdap4IaL69NArW5LB_KlNo4A9XZ0nEYRGHyof8bdTFbGex9byhMcxrCw1dJlUL2izZKOuPgEhMNQ9tuMcbb8QIym6pMalXoDPBKQn3xPVibMVYnd1nLbZWEsk39LR3y8Ruwbw7J8_E8');
  const displayPicHome = settings.profilePicUrlHome === ''
    ? 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
    : (settings.profilePicUrlHome || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRunyS1hH39mF_PeCr2TBxB4pfPOmmx_9sXVgaVCkwt19ux2hOr7TZ7c2y7DihVjt6CEFJDusVDsuerlYj8Zs8q_HNrEh2VJ33_DlLZtK2cqyraJWKSBhkzlEkW8L09SsTU0rFhdNYgMHWGj3PBadhRfT2MSwFi66cQK55p1isc5rJo7C6eln1VKwx-2BSl7-3YImFSlYxG-UPO08CXrLzXfjK0AJbJEzROA6zHiJDmwCk7gqw5x8KzQILvXVmmap_1Te3dSQGWe8');
  const homeJobTitle = settings.homeJobTitle || 'Presiden Direktur PT Flexora Polymer';
  const homeHeadingSubtitle = settings.homeHeadingSubtitle || 'Hello Mate 👋';

  const getMenuLabel = (tab: string) => {
    if (selectedLang === 'ID') {
      if (tab === 'home') return settings.menuHomeID || t.home;
      if (tab === 'about') return settings.menuAboutID || t.about;
      if (tab === 'portfolio') return settings.menuPortfolioID || t.portfolio;
      if (tab === 'contact') return settings.menuContactID || t.contact;
    } else {
      if (tab === 'home') return settings.menuHomeEN || t.home;
      if (tab === 'about') return settings.menuAboutEN || t.about;
      if (tab === 'portfolio') return settings.menuPortfolioEN || t.portfolio;
      if (tab === 'contact') return settings.menuContactEN || t.contact;
    }
    return t[tab as keyof typeof t];
  };

  const getHireMeLabel = () => {
    return selectedLang === 'ID' 
      ? (settings.menuHireMeID || t.hireMe) 
      : (settings.menuHireMeEN || t.hireMe);
  };

  const tagline = selectedLang === 'ID' 
    ? (settings.taglineID || t.taglineDefault) 
    : (settings.taglineEN || t.taglineDefault);

  const bioDesc = selectedLang === 'ID'
    ? (settings.aboutBioID || settings.metaDescription || t.bioDefault)
    : (settings.aboutBioEN || settings.metaDescription || t.bioDefault);

  const homeBioDesc = selectedLang === 'ID'
    ? (settings.homeBioID || 'Saya merupakan mahasiswa S1 Teknik Industri di Sekolah Tinggi Teknologi Wastukancana dengan ketertarikan pada bidang manajemen proses, PPIC, logistik, efisiensi operasional, serta pengembangan sistem digital. Saya memiliki pengalaman magang di PT Velasto Indonesia pada Department PPIC Delivery dan Department Komite, serta aktif dalam kegiatan kampus sebagai panitia MABIM Divisi Peralatan dan Sekretaris MUMAS. Di luar kegiatan akademik, saya juga mengembangkan website sederhana menggunakan Google Apps Script, Visual Studio Code, Cursor, Kiro, dan Antigravity.')
    : (settings.homeBioEN || 'I am a Bachelor of Industrial Engineering student at Sekolah Tinggi Teknologi Wastukancana with an interest in process management, PPIC, logistics, operational efficiency, and digital system development. I have internship experience at PT Velasto Indonesia in the PPIC Delivery Department and Committee Department, and am active in campus activities as a MABIM Equipment Division committee member and MUMAS Secretary. Outside of academic activities, I also develop simple websites using Google Apps Script, Visual Studio Code, Cursor, Kiro, and Antigravity.');

  const aboutSectionTitle = selectedLang === 'ID'
    ? (settings.aboutSectionTitleID || 'Pengalaman Profesional di Bidang Digital')
    : (settings.aboutSectionTitleEN || 'Professional Experience in Digital Sphere');

  const getSectionAboutLabel = () => {
    return selectedLang === 'ID'
      ? (settings.sectionAboutID || 'TENTANG SAYA')
      : (settings.sectionAboutEN || 'ABOUT ME');
  };

  // Buttons, sections
  const getBtnViewWorkLabel = () => selectedLang === 'ID' ? (settings.btnViewWorkID || t.viewWork) : (settings.btnViewWorkEN || t.viewWork);
  const getBtnContactMeLabel = () => selectedLang === 'ID' ? (settings.btnContactMeID || t.contactMe) : (settings.btnContactMeEN || t.contactMe);
  const getSectionSkillsLabel = () => selectedLang === 'ID' ? (settings.sectionSkillsID || t.matriksSkill) : (settings.sectionSkillsEN || t.matriksSkill);
  const getSectionEducationLabel = () => selectedLang === 'ID' ? (settings.sectionEducationID || t.riwayatPendidikan) : (settings.sectionEducationEN || t.riwayatPendidikan);
  const getSectionCareerLabel = () => selectedLang === 'ID' ? (settings.sectionCareerID || t.rekamKarier) : (settings.sectionCareerEN || t.rekamKarier);
  const getContactHubungiLabel = () => selectedLang === 'ID' ? (settings.contactHubungiID || t.hubungiStudio) : (settings.contactHubungiEN || t.hubungiStudio);
  const getContactFormTitleLabel = () => selectedLang === 'ID' ? (settings.contactFormTitleID || t.getInTouch) : (settings.contactFormTitleEN || t.getInTouch);
  const getContactFormBtnLabel = () => selectedLang === 'ID' ? (settings.contactFormBtnID || t.sendMsg) : (settings.contactFormBtnEN || t.sendMsg);
  const getTabLabel = (tab: string) => {
    if (selectedLang === 'ID') {
      if (tab === 'home') return 'Beranda';
      if (tab === 'about') return 'Tentang';
      if (tab === 'portfolio') return 'Proyek';
      if (tab === 'contact') return 'Kontak';
    } else {
      if (tab === 'home') return 'Home';
      if (tab === 'about') return 'About';
      if (tab === 'portfolio') return 'Projects';
      if (tab === 'contact') return 'Contact';
    }
    return tab;
  };

  const getTabIcon = (tab: string, className = "w-4 h-4") => {
    switch (tab) {
      case 'home':
        return <Home className={className} />;
      case 'about':
        return <User className={className} />;
      case 'portfolio':
        return <Folder className={className} />;
      case 'contact':
        return <Mail className={className} />;
      default:
        return <Bot className={className} />;
    }
  };

  const getTabActiveClass = (tab: string) => {
    switch (tab) {
      case 'home':
        return 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25';
      case 'about':
        return 'bg-gradient-to-r from-[#ff1a5c] to-pink-500 text-white shadow-md shadow-[#ff1a5c]/25';
      case 'portfolio':
        return 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-500/25';
      case 'contact':
        return 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-500/25';
      default:
        return 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25';
    }
  };

  return (
    <div id="landing-page-root" className={`min-h-screen w-full relative overflow-x-hidden font-sans transition-colors duration-500 ${isDarkMode ? 'bg-[#0d141d] text-[#dce3f0]' : 'bg-gradient-to-tr from-[#cfdaf0] via-[#edf2fa] to-[#dbe4f4] text-[#1e293b]'}`}>
      
      {/* 3D-Aesthetic Glassmorphic Grid & Drifting Starry particles backdrop */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        
        {/* Soft glowing ambient orbs */}
        <div className="absolute top-[8%] left-[2%] w-[45vw] h-[45vw] rounded-full blur-[140px] pointer-events-none opacity-[0.25] animate-drift-slow" 
          style={{
            background: isDarkMode ? 'radial-gradient(circle, rgba(0, 194, 255, 0.4) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(0, 194, 255, 0.15) 0%, transparent 70%)',
            transform: 'translateZ(0)'
          }}
        />
        <div className="absolute top-[42%] right-[-10vw] w-[50vw] h-[50vw] rounded-full blur-[150px] pointer-events-none opacity-[0.25] animate-drift-slow-alt" 
          style={{
            background: isDarkMode ? 'radial-gradient(circle, rgba(255, 26, 92, 0.3) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(255, 26, 92, 0.1) 0%, transparent 70%)',
            transform: 'translateZ(0)'
          }}
        />
        <div className="absolute bottom-[5%] left-[5vw] w-[40vw] h-[40vw] rounded-full blur-[130px] pointer-events-none opacity-[0.22] animate-drift-slow" 
          style={{
            background: isDarkMode ? 'radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, transparent 70%)',
            transform: 'translateZ(0)'
          }}
        />

        {/* Ambient grid overlay */}
        <div className={`absolute inset-0 pointer-events-none opacity-90 transition-opacity duration-300 ${isDarkMode ? 'cyber-grid-overlay' : 'cyber-grid-overlay-light'}`} />

        {/* Dynamic, elegantly drifting aesthetic background dust particles and stars */}
        {[
          { left: '8%', top: '15%', size: 'w-1.5 h-1.5', delay: '-2s', dur: '18s', color: 'bg-[#00c2ff]' },
          { left: '88%', top: '10%', size: 'w-2 h-2', delay: '-6s', dur: '22s', color: 'bg-[#ff1a5c]' },
          { left: '42%', top: '38%', size: 'w-1 h-1', delay: '-1s', dur: '15s', color: 'bg-indigo-400' },
          { left: '72%', top: '68%', size: 'w-2.5 h-2.5', delay: '-9s', dur: '26s', color: 'bg-sky-400' },
          { left: '18%', top: '82%', size: 'w-1.5 h-1.5', delay: '-4s', dur: '19s', color: 'bg-[#00c2ff]' },
          { left: '92%', top: '48%', size: 'w-1 h-1', delay: '-12s', dur: '14s', color: 'bg-purple-400' },
          { left: '7%', top: '58%', size: 'w-2 h-2', delay: '-3s', dur: '24s', color: 'bg-indigo-300' },
          { left: '54%', top: '22%', size: 'w-1.5 h-1.5', delay: '-7s', dur: '17s', color: 'bg-[#ff1a5c]' },
          { left: '32%', top: '72%', size: 'w-2.5 h-2.5', delay: '-5s', dur: '21s', color: 'bg-sky-300' },
          { left: '78%', top: '28%', size: 'w-1 h-1', delay: '-11s', dur: '16s', color: 'bg-teal-400' },
          { left: '62%', top: '92%', size: 'w-2 h-2', delay: '-8s', dur: '25s', color: 'bg-[#00c2ff]' },
          { left: '25%', top: '45%', size: 'w-1.5 h-1.5', delay: '-10s', dur: '20s', color: 'bg-[#ff1a5c]' },
          { left: '50%', top: '80%', size: 'w-1 h-1', delay: '-14s', dur: '13s', color: 'bg-violet-400' },
          { left: '12%', top: '90%', size: 'w-2 h-2', delay: '-1.5s', dur: '23s', color: 'bg-[#00c2ff]' },
          { left: '85%', top: '75%', size: 'w-1.5 h-1.5', delay: '-5.5s', dur: '18s', color: 'bg-sky-400' }
        ].map((p, i) => (
          <div 
            key={i}
            className={`absolute ${p.size} rounded-full ${p.color} opacity-[0.35] blur-[0.4px] animate-float-particle`}
            style={{
              left: p.left,
              top: p.top,
              animationDelay: p.delay,
              animationDuration: p.dur,
              transform: 'translateZ(0)'
            }}
          />
        ))}

      </div>
      
      {/* Floating Pill Navigation Bar (Desktop: Top, Mobile: Bottom Sticky with snug width) */}
      <nav id="floating-nav-bar" className="fixed z-50 max-md:bottom-4 md:top-4 left-1/2 -translate-x-1/2 max-md:w-fit max-md:max-w-[95%] md:w-fit transition-all duration-300">
        <div id="nav-pill-container" className={`rounded-full px-3 md:px-4 py-1.5 flex items-center gap-1.5 md:gap-2.5 border shadow-xl backdrop-blur-xl ${
          isDarkMode 
            ? 'bg-[#0e1622]/90 border-[#2e353f]/40 shadow-black/45' 
            : 'bg-white/95 border-slate-200/60 shadow-slate-200/40'
        }`}>
          
          {/* DESKTOP NAV LAYOUT */}
          <div className="hidden md:flex items-center gap-2">
            {/* Left: Brand Logo that hovers to Admin Login */}
            <div 
              onMouseEnter={() => setIsLogoHovered(true)}
              onMouseLeave={() => setIsLogoHovered(false)}
              onClick={() => {
                if (isLogoHovered) {
                  onNavigateToLogin();
                } else {
                  setActiveTab('home');
                }
              }} 
              className="flex items-center justify-center cursor-pointer select-none relative w-12 h-9 rounded-full transition-all duration-300 hover:bg-[#00c2ff]/10 hover:shadow-[0_0_12px_rgba(0,194,255,0.2)]"
              title={isLogoHovered ? "Admin Access Login" : "Kembali ke Beranda"}
            >
              {isLogoHovered ? (
                <User className="w-5 h-5 text-[#00c2ff] animate-pulse" />
              ) : (
                <span className={`font-black tracking-tight text-lg ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  FY<span className="text-[#ff1a5c] font-black">.</span>
                </span>
              )}
            </div>

            {/* Separator */}
            <div className={`w-px h-5 shrink-0 ${isDarkMode ? 'bg-[#2e353f]/50' : 'bg-slate-200'}`} />

            {/* Center: Interactive Tabs */}
            <div className="flex items-center gap-1.5">
              {['home', 'about', 'portfolio', 'contact'].map((tab) => {
                const isActive = activeTab === tab;
                const label = getTabLabel(tab);
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 relative cursor-pointer select-none ${
                      isActive 
                        ? getTabActiveClass(tab) 
                        : isDarkMode 
                          ? 'text-gray-300 hover:text-white hover:bg-slate-800/40' 
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                    }`}
                  >
                    {getTabIcon(tab, `w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500 dark:text-gray-400'}`)}
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>

            {/* Separator */}
            <div className={`w-px h-5 shrink-0 ${isDarkMode ? 'bg-[#2e353f]/50' : 'bg-slate-200'}`} />

            {/* Right Side: Accessories */}
            <div className="flex items-center gap-2">
              
              {/* Language Selector Button */}
              <button 
                onClick={() => setSelectedLang(selectedLang === 'ID' ? 'EN' : 'ID')}
                className={`px-3 py-1.5 rounded-full text-xs font-black flex items-center gap-1.5 transition-all duration-300 border ${
                  isDarkMode 
                    ? 'bg-slate-800/40 border-[#2e353f]/60 hover:bg-slate-800 text-white' 
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
                title="Ganti Bahasa"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{selectedLang}</span>
              </button>

              {/* Theme Selector */}
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`w-8.5 h-8.5 rounded-full border flex items-center justify-center transition-all duration-300 cursor-pointer ${
                  isDarkMode 
                    ? 'bg-slate-800/40 border-[#2e353f]/60 text-yellow-400 hover:bg-slate-850' 
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
                title="Ganti Mode"
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* Action Button: Hire Me */}
              <button 
                onClick={() => setActiveTab('contact')}
                className="bg-[#00c2ff] hover:bg-[#00aae6] text-white font-black text-xs px-4 py-2 rounded-full transition-all duration-300 scale-100 active:scale-95 shadow-md shadow-sky-450/20 uppercase tracking-widest flex items-center gap-1 cursor-pointer"
              >
                {getHireMeLabel()}
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* MOBILE NAV LAYOUT */}
          <div className="md:hidden flex items-center justify-center gap-1.5 px-1 h-11">
            {/* Left Brand Logo that hovers to Admin Login */}
            <div 
              onMouseEnter={() => setIsLogoHovered(true)}
              onMouseLeave={() => setIsLogoHovered(false)}
              onClick={() => {
                if (isLogoHovered) {
                  onNavigateToLogin();
                } else {
                  setActiveTab('home');
                }
              }} 
              className="flex items-center justify-center cursor-pointer select-none shrink-0 w-10 h-7.5 rounded-full transition-all duration-300 hover:bg-[#00c2ff]/10 hover:shadow-[0_0_10px_rgba(0,194,255,0.25)]"
              title={isLogoHovered ? "Admin Access Login" : "Kembali ke Beranda"}
            >
              {isLogoHovered ? (
                <User className="w-4 h-4 text-[#00c2ff] animate-pulse" />
              ) : (
                <span className={`font-black tracking-tighter text-sm ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  FY<span className="text-[#ff1a5c] font-black">.</span>
                </span>
              )}
            </div>

            {/* Separator */}
            <div className={`w-px h-5 shrink-0 ${isDarkMode ? 'bg-[#2e353f]/40' : 'bg-slate-200'}`} />

            {/* Center: Scrollable Tabs Container - Icon-only, circular design matching image 3 */}
            <div className="flex items-center gap-1 shrink-0 overflow-x-auto no-scrollbar max-w-[50%] sm:max-w-[60%]">
              {['home', 'about', 'portfolio', 'contact'].map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`w-8.5 h-8.5 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer select-none ${
                      isActive 
                        ? getTabActiveClass(tab) 
                        : isDarkMode 
                          ? 'text-gray-400 hover:text-white hover:bg-slate-800/30' 
                          : 'text-slate-600 hover:text-[#0d141d] hover:bg-slate-100/40'
                    }`}
                  >
                    {getTabIcon(tab, `w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500 dark:text-gray-400'}`)}
                  </button>
                );
              })}
            </div>

            {/* Separator */}
            <div className={`w-px h-5 shrink-0 ${isDarkMode ? 'bg-[#2e353f]/40' : 'bg-slate-200'}`} />

            {/* Accessories on Mobile */}
            <div className="flex items-center gap-1 shrink-0">
              {/* Lang switcher option */}
              <button 
                onClick={() => setSelectedLang(selectedLang === 'ID' ? 'EN' : 'ID')}
                className={`w-7.5 h-7.5 rounded-full text-[9px] font-black flex items-center justify-center border transition-all ${
                  isDarkMode 
                    ? 'bg-slate-800/50 border-[#2e353f]/60 text-white' 
                    : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
                title="Lang"
              >
                {selectedLang}
              </button>

              {/* Mode toggler */}
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`w-7.5 h-7.5 rounded-full flex items-center justify-center border transition-all ${
                  isDarkMode 
                    ? 'bg-slate-800/50 border-[#2e353f]/60 text-yellow-400' 
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
                title="Theme"
              >
                {isDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

        </div>
      </nav>

      {/* Main Container Layout */}
      <main id="main-content-layout" className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 pb-24 md:pt-28 md:pb-10 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
          >
                {/* VIEW 1: HOME PANEL */}
            {activeTab === 'home' && (
              <div id="view-home" className="space-y-20 py-4">
                
                {/* 1. HERO SECTION BANNER - Matches Image 1 */}
                {(settings.showHeroSection !== false) && (
                  <div data-aos="fade-up" className={`rounded-[35px] p-8 sm:p-12 border flex flex-col-reverse lg:flex-row items-center justify-between gap-10 lg:gap-14 ${
                    isDarkMode ? 'bg-[#151c25]/50 border-[#2e353f]/30' : 'bg-white border-slate-100 shadow-xl shadow-slate-100/40'
                  }`}>
                                 {/* Left Column: Intro Details & CTA buttons aligned as in Image 2 */}
                     <div className="flex-grow text-center lg:text-left space-y-6 max-w-2xl flex flex-col items-center lg:items-start select-none">
                       
                       <div className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#00c2ff]">
                         {homeHeadingSubtitle || (selectedLang === 'ID' ? 'HALO, SAYA' : 'HELLO, I AM')}
                       </div>
                       
                       {/* Name Heading split across two lines for dramatic Swiss/Tech impact */}
                       <div className="space-y-0.5 sm:space-y-1 text-center lg:text-left leading-[1.05]">
                         <h1 className={`text-5xl sm:text-6.5xl lg:text-7.5xl font-black tracking-tighter uppercase ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                           {((ownerName || 'Fikri Yandi').trim().split(' ').slice(0, Math.max(1, (ownerName || 'Fikri Yandi').trim().split(' ').length - 1)).join(' '))} <span className="text-[#00c2ff] inline-block">{((ownerName || 'Fikri Yandi').trim().split(' ').slice(-1)[0] || '')}<span className={isDarkMode ? 'text-white' : 'text-slate-900'}>.</span></span>
                         </h1>
                         <h1 className="hidden">
                           {((ownerName || 'Fikri Yandi').trim().split(' ').slice(-1)[0] || '')}
                           <span className={isDarkMode ? 'text-white' : 'text-slate-900'}>.</span>
                         </h1>
                       </div>
 
                       {/* Job/Role subtitle */}
                       <p className={`text-lg sm:text-xl font-extrabold tracking-tight ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                          {homeJobTitle}
                        </p>
  
                        {/* Social Media Hand-Crafted Brand Accent Icons - Matched Gambar 1 layout and styling precisely */}
                        <div className="flex flex-wrap gap-4 justify-center lg:justify-start items-center">
                          {/* Email (Cyan/Sky) */}
                          <a 
                            href={`mailto:${settings.contactEmail || 'fikrryandi@gmail.com'}`}
                            className={`group relative h-14 w-14 hover:w-34 rounded-2xl border-2 flex items-center pl-1.5 gap-2.5 transition-all duration-300 shadow-sm shrink-0 overflow-hidden ${
                              isDarkMode 
                                ? 'bg-[#121924]/80 border-[#00c2ff]/40 hover:border-[#00c2ff] hover:shadow-[0_4px_15px_rgba(0,194,255,0.25)]' 
                                : 'bg-white border-[#00c2ff]/40 hover:border-[#00c2ff] hover:shadow-[0_4px_15px_rgba(0,194,255,0.15)] shadow-slate-100'
                            }`}
                          >
                            <div className="w-[42px] h-[42px] rounded-[11px] bg-[#00c2ff] flex items-center justify-center text-white shadow-inner flex-shrink-0">
                              <Mail className="w-5.5 h-5.5 stroke-[2.2]" />
                            </div>
                            <span className="opacity-0 w-0 scale-95 group-hover:opacity-100 group-hover:w-auto group-hover:scale-100 transition-all duration-300 text-xs font-black tracking-wider uppercase text-[#00c2ff] pr-4 whitespace-nowrap">
                              Email
                            </span>
                          </a>

                          {/* WhatsApp (Green) */}
                          <a 
                            href={`https://wa.me/${(settings.whatsappBusiness || '+6283817745869').replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noreferrer"
                            className={`group relative h-14 w-14 hover:w-38 rounded-2xl border-2 flex items-center pl-1.5 gap-2.5 transition-all duration-300 shadow-sm shrink-0 overflow-hidden ${
                              isDarkMode 
                                ? 'bg-[#121924]/80 border-[#2ebd59]/40 hover:border-[#2ebd59] hover:shadow-[0_4px_15px_rgba(46,189,89,0.25)]' 
                                : 'bg-white border-[#2ebd59]/40 hover:border-[#2ebd59] hover:shadow-[0_4px_15px_rgba(46,189,89,0.15)] shadow-slate-100'
                            }`}
                          >
                            <div className="w-[42px] h-[42px] rounded-[11px] bg-[#2ebd59] flex items-center justify-center text-white shadow-inner flex-shrink-0">
                              <WhatsAppCustomIcon className="w-5.5 h-5.5" />
                            </div>
                            <span className="opacity-0 w-0 scale-95 group-hover:opacity-100 group-hover:w-auto group-hover:scale-100 transition-all duration-300 text-xs font-black tracking-wider uppercase text-[#2ebd59] pr-4 whitespace-nowrap">
                              WhatsApp
                            </span>
                          </a>

                          {/* Instagram (Instagram gradient) */}
                          <a 
                            href={settings.instagramUrl || "https://instagram.com/fikrry_andi"}
                            target="_blank"
                            rel="noreferrer"
                            className={`group relative h-14 w-14 hover:w-38 rounded-2xl border-2 flex items-center pl-1.5 gap-2.5 transition-all duration-300 shadow-sm shrink-0 overflow-hidden ${
                              isDarkMode 
                                ? 'bg-[#121924]/80 border-[#ee2a7b]/40 hover:border-[#ee2a7b] hover:shadow-[0_4px_15px_rgba(238,42,123,0.25)]' 
                                : 'bg-white border-[#ee2a7b]/40 hover:border-[#ee2a7b] hover:shadow-[0_4px_15px_rgba(238,42,123,0.15)] shadow-slate-100'
                            }`}
                          >
                            <div className="w-[42px] h-[42px] rounded-[11px] bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center text-white shadow-inner flex-shrink-0">
                              <Instagram className="w-5.5 h-5.5 stroke-[2.2]" />
                            </div>
                            <span className="opacity-0 w-0 scale-95 group-hover:opacity-100 group-hover:w-auto group-hover:scale-100 transition-all duration-300 text-xs font-black tracking-wider uppercase text-[#ee2a7b] pr-4 whitespace-nowrap">
                              Instagram
                            </span>
                          </a>

                          {/* LinkedIn (Blue) */}
                          <a 
                            href={settings.linkedinUrl || "https://linkedin.com/in/fikri-yandi-18368529a"}
                            target="_blank"
                            rel="noreferrer"
                            className={`group relative h-14 w-14 hover:w-38 rounded-2xl border-2 flex items-center pl-1.5 gap-2.5 transition-all duration-300 shadow-sm shrink-0 overflow-hidden ${
                              isDarkMode 
                                ? 'bg-[#121924]/80 border-[#0077b5]/40 hover:border-[#0077b5] hover:shadow-[0_4px_15px_rgba(0,119,181,0.25)]' 
                                : 'bg-white border-[#0077b5]/40 hover:border-[#0077b5] hover:shadow-[0_4px_15px_rgba(0,119,181,0.15)] shadow-slate-100'
                            }`}
                          >
                            <div className="w-[42px] h-[42px] rounded-[11px] bg-[#0077b5] flex items-center justify-center text-white shadow-inner flex-shrink-0">
                              <Linkedin className="w-5.5 h-5.5 stroke-[2.2]" />
                            </div>
                            <span className="opacity-0 w-0 scale-95 group-hover:opacity-100 group-hover:w-auto group-hover:scale-100 transition-all duration-300 text-xs font-black tracking-wider uppercase text-[#0077b5] pr-4 whitespace-nowrap">
                              LinkedIn
                            </span>
                          </a>

                          {/* GitHub (Purple) */}
                          <a 
                            href={settings.githubUrl || "https://github.com/fikrryandi"}
                            target="_blank"
                            rel="noreferrer"
                            className={`group relative h-14 w-14 hover:w-36 rounded-2xl border-2 flex items-center pl-1.5 gap-2.5 transition-all duration-300 shadow-sm shrink-0 overflow-hidden ${
                              isDarkMode 
                                ? 'bg-[#121924]/80 border-[#a855f7]/40 hover:border-[#a855f7] hover:shadow-[0_4px_15px_rgba(168,85,247,0.25)]' 
                                : 'bg-white border-[#a855f7]/40 hover:border-[#a855f7] hover:shadow-[0_4px_15px_rgba(168,85,247,0.15)] shadow-slate-100'
                            }`}
                          >
                            <div className="w-[42px] h-[42px] rounded-[11px] bg-[#a855f7] flex items-center justify-center text-white shadow-inner flex-shrink-0">
                              <Github className="w-5.5 h-5.5 stroke-[2.2]" />
                            </div>
                            <span className="opacity-0 w-0 scale-95 group-hover:opacity-100 group-hover:w-auto group-hover:scale-100 transition-all duration-300 text-xs font-black tracking-wider uppercase text-[#a855f7] pr-4 whitespace-nowrap">
                              GitHub
                            </span>
                          </a>
                        </div>
  
                        {/* Rich/Literal description */}
                        <p className={`text-base leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-slate-600'} font-semibold text-center lg:text-left max-w-xl`}>
                         {homeBioDesc}
                       </p>
 
                       {/* Primary/Secondary elegant Call To Action buttons */}
                       <div className="pt-2 flex flex-wrap gap-4 justify-center lg:justify-start w-full">
                         <button 
                           onClick={() => {
                             setActiveTab('portfolio');
                             window.scrollTo({ top: 0, behavior: 'smooth' });
                           }}
                           className="bg-[#00c2ff] hover:bg-[#00aae6] text-slate-950 font-black text-sm px-8 py-3.5 rounded-full transition-all duration-300 shadow-lg shadow-sky-500/15 cursor-pointer flex items-center gap-2 hover:scale-103"
                         >
                           <Folder className="w-4.5 h-4.5" />
                           {t.viewWork}
                         </button>
                         <button 
                           onClick={() => {
                             setActiveTab('contact');
                             window.scrollTo({ top: 0, behavior: 'smooth' });
                           }}
                           className={`font-black text-sm px-8 py-3.5 rounded-full border transition-all duration-300 cursor-pointer flex items-center gap-2 hover:scale-103 ${
                             isDarkMode 
                               ? 'bg-slate-800/40 text-gray-200 border-[#2e353f]/80 hover:bg-slate-800/80 hover:border-[#00c2ff]/50' 
                               : 'bg-white text-slate-700 border-slate-250 hover:bg-slate-50 hover:shadow shadow-sm'
                           }`}
                         >
                           <Mail className="w-4.5 h-4.5" />
                           {t.contactMe}
                         </button>
                       </div>
                     </div>

                    {/* Right Column: Standing Model mock frame matching Image 1 layout */}
                    <div className="relative flex-shrink-0 w-full lg:w-auto flex justify-center">
                      <motion.div 
                        className="relative p-1.5 select-none rounded-[45px] shadow-[0_0_50px_rgba(147,51,234,0.18)] border border-purple-500/10"
                        animate={{
                          y: [0, -10, 0],
                        }}
                        transition={{
                          duration: 6,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        {/* Custom decorative architecture shadow backdrop */}
                        <div className="absolute inset-0 bg-indigo-500/10 rounded-[45px] rotate-2 -translate-x-2 translate-y-3 pointer-events-none"></div>

                        {/* Stand Frame card box representation of Image 1 */}
                        <div 
                          onMouseMove={(e) => {
                            setCardHover(true);
                            handleCardInteraction(e);
                          }}
                          onMouseEnter={() => setCardHover(true)}
                          onMouseLeave={() => {
                            setCardHover(false);
                            setCardTilt({ x: 0, y: 0 });
                          }}
                          onTouchStart={(e) => {
                            setCardHover(true);
                            handleCardInteraction(e);
                          }}
                          onTouchMove={(e) => {
                            handleCardInteraction(e);
                          }}
                          onTouchEnd={() => {
                            setCardHover(false);
                            setCardTilt({ x: 0, y: 0 });
                          }}
                          style={{
                            transform: cardHover
                              ? `perspective(1200px) rotateX(${cardTilt.x}deg) rotateY(${cardTilt.y}deg) translateZ(15px)`
                              : 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
                            transition: cardHover ? 'transform 0.1s ease-out' : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s, box-shadow 0.3s'
                          }}
                          className={`group relative z-10 w-[325px] h-[415px] sm:w-[345px] sm:h-[460px] max-w-[calc(100vw-24px)] overflow-hidden rounded-[38px] border shadow-2xl preserve-rounded-3d ${
                            cardHover ? 'border-[#00c2ff]/50 shadow-[0_20px_50px_rgba(0,194,255,0.22)]' : ''
                          } ${
                            isDarkMode ? 'bg-[#0f151f] border-slate-800' : 'bg-slate-50 border-slate-200'
                          }`}
                        >
                          <img 
                            src={displayPicHome} 
                            alt={ownerName} 
                            className="w-full h-full object-cover transition-all duration-[1200ms] cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-108 group-hover:rotate-1 group-hover:brightness-105 pointer-events-none"
                            referrerPolicy="no-referrer"
                          />

                          {/* Dynamic White Spotlight Follow mouse/touch effect */}
                          <div 
                            className="absolute inset-0 pointer-events-none z-15 mix-blend-screen transition-opacity duration-300"
                            style={{
                              background: `radial-gradient(circle 180px at ${cardGlow.x}px ${cardGlow.y}px, rgba(255, 255, 255, 0.36), rgba(255, 255, 255, 0.12) 35%, transparent 70%)`,
                              opacity: cardHover ? 1 : 0,
                            }}
                          />

                          {/* Top and bottom dark overlays for crisp contrast and readability */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/50 pointer-events-none z-10" />

                          {/* Name & Title inside the card at the top-left (Matches Reference Image Layout) */}
                          <div className="absolute top-5 left-5 right-5 sm:top-6 sm:left-6 sm:right-6 flex flex-col z-20 text-left select-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                            <h3 className="text-xl sm:text-2.5xl md:text-3.5xl font-black tracking-tight leading-none uppercase">
                              {renderFormattedCardName(ownerName || 'Deft Valian Exanova')}
                            </h3>
                            <p className="text-[10px] sm:text-[11.5px] md:text-[12.5px] font-medium tracking-widest text-[#dce3f0] uppercase mt-1.5 font-sans leading-tight">
                              {homeJobTitle}
                            </p>
                          </div>

                          {/* Bottom floating status overlay bar - Glassmorphism style mirroring reference image */}
                          <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 bg-black/45 backdrop-blur-xl rounded-[26px] border border-white/10 p-2.5 sm:p-4 flex items-center justify-between z-20 shadow-2xl">
                            <div className="flex items-center gap-2 sm:gap-3">
                              {/* Small circle avatar */}
                              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-white bg-slate-950 shrink-0 shadow-lg">
                                <img src={displayPic} alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                              </div>
                              <div className="flex flex-col text-left">
                                <span className="text-[11px] sm:text-[13px] font-black text-white tracking-tight leading-none">
                                  {settings.homeCardHandle || '@dftvln'}
                                </span>
                                <div className="flex items-center gap-1.5 mt-1 sm:mt-1.5">
                                  {/* Pulsing Turquoise Blue online status light */}
                                  <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00e5ff] opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-[#00e5ff]"></span>
                                  </span>
                                  <span className="text-[8.5px] sm:text-[10px] font-bold text-slate-100 uppercase tracking-widest leading-none">
                                    {settings.homeCardStatusText || 'ONLINE'}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <button 
                              onClick={() => {
                                setActiveTab('contact');
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }}
                              className="text-[9px] sm:text-[11.5px] font-bold uppercase tracking-wider text-white bg-white/15 border border-white/10 hover:bg-white/25 active:scale-95 transition-all px-3 py-1.5 sm:px-[18px] sm:py-[9px] rounded-full cursor-pointer shadow-inner shrink-0"
                            >
                              {selectedLang === 'ID' ? 'Hubungi Saya' : 'Contact Me'}
                            </button>
                          </div>
                        </div>

                        {/* Top corner float icon node */}
                        <div className="absolute -top-3 -right-3 z-30">
                          <ColoredIcon bgHex="#f59e0b" index={2} isBig={false}>
                            <Sparkles className="w-5 h-5 text-white" />
                          </ColoredIcon>
                        </div>
                      </motion.div>
                    </div>

                  </div>
                )}

                {/* 2. TENTANG SAYA (ABOUT ME) - Matches Image 2 */}
                {(settings.showAboutSection !== false) && (
                  <ScrollAnimate className={`rounded-[35px] p-8 sm:p-12 border flex flex-col lg:flex-row items-center gap-10 lg:gap-14 ${
                    isDarkMode ? 'bg-[#151c25]/50 border-[#2e353f]/30' : 'bg-white border-slate-100 shadow-xl shadow-slate-100/40'
                  }`}>
                    
                    {/* Left Column: Phone standing representation (Matches About page smartphone style perfectly) */}
                    <div className="relative flex-shrink-0 w-full lg:w-1/2 flex items-center justify-center my-6">
                      <motion.div 
                        className="relative w-[300px] h-[480px] sm:w-[320px] sm:h-[500px] flex-shrink-0 flex items-center justify-center group select-none"
                        style={{ perspective: 1200 }}
                        animate={{
                          y: [0, -10, 0],
                          rotateX: [-2, 2, -2],
                          rotateY: [-5, 5, -5],
                        }}
                        transition={{
                          duration: 6,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        {/* Phone Outer Shell / Bezel with premium realistic screen border shadows */}
                        <div className={`absolute inset-0 rounded-[44px] p-[6px] shadow-[0_20px_50px_rgba(0,194,255,0.22)] ring-4 ring-black/10 dark:ring-white/5 overflow-hidden flex flex-col justify-between transition-all duration-500 group-hover:shadow-[0_25px_65px_rgba(0,194,255,0.4)] group-hover:scale-[1.02] ${
                          isDarkMode ? 'bg-slate-900 ring-white/5' : 'bg-slate-950 ring-black/10'
                        }`}>
                          {/* Phone Screen: Electric Bright Blue Screen with deep inner gradient glow mimicking a high-end OLED display */}
                          <div className="relative w-full h-full rounded-[38px] overflow-hidden bg-gradient-to-b from-[#00ffff]/30 via-[#005fb8]/50 to-[#011627] shadow-[inset_0_0_40px_rgba(0,194,255,0.85)] flex items-center justify-center border-2 border-[#00c2ff]/30">
                            
                            {/* Interactive dynamic island reflection notch */}
                            <div className="absolute top-3 inset-x-0 flex justify-center z-30">
                              <div className="w-24 h-5.5 bg-black/95 dark:bg-black rounded-full flex items-center justify-between px-3 shadow-inner">
                                <div className="w-2 h-2 rounded-full bg-slate-900 border border-slate-750" />
                                <div className="w-4.5 h-1 rounded-full bg-slate-950/70" />
                              </div>
                            </div>

                            {/* Aesthetic Grid overlay inside the bright blue phone screen */}
                            <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#00ffff_1px,transparent_1px)] [background-size:14px_14px]" />
                            
                            {/* Ambient glow blobs inside screen */}
                            <div className="absolute top-1/4 left-1/4 w-36 h-36 rounded-full bg-cyan-400/40 blur-2xl animate-pulse" />
                            <div className="absolute bottom-1/4 right-1/4 w-36 h-36 rounded-full bg-blue-600/30 blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }} />

                            {/* Isolated main subject presentation matching transparent background design */}
                            <div className="w-full h-full relative z-10 p-4 pt-12 flex items-center justify-center overflow-hidden">
                              <img 
                                src={displayPic} 
                                alt="Fikri Yandi" 
                                className="w-full h-full object-cover rounded-3xl mix-blend-normal transform scale-[1.05] filter contrast-[1.02] brightness-[1.02] shadow-[0_12px_24px_rgba(0,0,0,0.4)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.12]"
                                referrerPolicy="no-referrer"
                              />
                              {/* Dark overlay at bottom to integrate the photo edges cleanly with the bezel */}
                              <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-slate-950/80 to-transparent pointer-events-none" />
                            </div>
                          </div>
                        </div>

                        {/* FLOATING BADGE 1: Chat bubble "Hi there!" */}
                        <div 
                          className="absolute -top-1.5 -left-4 sm:-left-8 z-20 bg-[#00c2ff] text-slate-950 px-4 py-2.5 rounded-2xl rounded-tl-none font-black text-[11px] sm:text-[12px] leading-tight shadow-[0_10px_25px_rgba(0,194,255,0.25)] ring-1 ring-white/10 flex items-center gap-1.5 animate-bounce" 
                          style={{ animationDuration: '4.5s', transform: "translateZ(30px)" }}
                        >
                          <span className="shrink-0 text-sm">💬</span>
                          <div className="text-left">
                            <div className="text-[9px] opacity-75 uppercase font-black tracking-wider leading-none mb-0.5">
                              {selectedLang === 'ID' ? (settings.bubbleSayLabelID || 'Fikri says:') : (settings.bubbleSayLabelEN || 'Fikri says:')}
                            </div>
                            <span>
                              {selectedLang === 'ID' ? (settings.bubbleChatTextID || 'Hi there! 👋') : (settings.bubbleChatTextEN || 'Hi there! 👋')}
                            </span>
                          </div>
                        </div>

                        {/* FLOATING BADGE 2: Red subscriber pop bubble with user icon and count */}
                        <div 
                          className="absolute top-24 -right-6 sm:-right-10 z-20 bg-[#ff3b30] text-white px-3.5 py-2 sm:py-2.5 rounded-[22px] font-black text-xs sm:text-sm shadow-[0_12px_30px_rgba(255,59,48,0.35)] flex items-center gap-2 transition-all duration-300 hover:scale-110 hover:-rotate-3"
                          style={{ transform: "translateZ(25px)" }}
                        >
                          <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                            <User className="w-3.5 h-3.5 text-white fill-white" />
                          </div>
                          <span className="tracking-tight uppercase text-[10px] sm:text-xs">
                            {selectedLang === 'ID' ? (settings.bubbleFollowerTextID || 'Follower') : (settings.bubbleFollowerTextEN || 'Follower')}
                          </span>
                          <span className="bg-white text-rose-600 px-1.5 py-0.5 rounded-md text-[10px] sm:text-xs font-black">
                            {settings.bubbleFollowerCount || '1'}
                          </span>
                        </div>

                        {/* FLOATING BADGE 3: Verified Check Badge */}
                        <div 
                          className="absolute top-44 -left-7 sm:-left-11 z-20 bg-[#00c2ff]/15 backdrop-blur-md border-2 border-[#00c2ff]/40 text-[#00c2ff] p-3 rounded-2xl shadow-[0_10px_25px_rgba(0,194,255,0.2)] flex items-center justify-center transition-all duration-300 hover:scale-115 rotate-[-6deg] hover:rotate-0 hover:bg-[#00c2ff] hover:text-slate-950"
                          style={{ transform: "translateZ(15px)" }}
                        >
                          <Check className="w-5.5 h-5.5 stroke-[3.5]" />
                        </div>

                        {/* FLOATING BADGE 4: Emoji Glass sunglasses */}
                        <div 
                          className="absolute -bottom-2 -left-3 sm:-left-6 z-20 text-4xl sm:text-5xl filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.3)] transition-transform duration-300 hover:scale-120 hover:rotate-12 select-none cursor-pointer"
                          style={{ transform: "translateZ(35px)" }}
                        >
                          😎
                        </div>

                        {/* FLOATING BADGE 5: Emoji Curious Eyes */}
                        <div 
                          className="absolute bottom-1 right-8 sm:right-12 z-20 text-4.5xl filter drop-shadow-md transition-transform duration-300 hover:scale-115 select-none cursor-pointer"
                          style={{ transform: "translateZ(20px)" }}
                        >
                          👀
                        </div>

                        {/* FLOATING BADGE 6: Collaborations box badge - Adapts elegantly to light/dark mode */}
                        <div 
                          className={`absolute bottom-20 -right-5 sm:-right-9 z-20 border p-3.5 sm:p-4 rounded-3xl shadow-[0_15px_40px_rgba(0,0,0,0.2)] max-w-[160px] sm:max-w-[185px] text-left transition-all duration-300 hover:scale-[1.04] hover:-translate-y-1 ${
                            isDarkMode ? 'bg-slate-900/95 border-slate-800 text-white' : 'bg-white/95 border-slate-200 text-slate-800'
                          }`}
                          style={{ transform: "translateZ(40px)" }}
                        >
                          <div className="text-xs font-black text-[#00c2ff] uppercase tracking-wider mb-1">
                            {selectedLang === 'ID' ? (settings.bubbleCollabTitleID || 'Collaborations') : (settings.bubbleCollabTitleEN || 'Collaborations')}
                          </div>
                          <p className={`text-[10px] sm:text-[11.5px] font-extrabold leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                            {selectedLang === 'ID' ? (settings.bubbleCollabDescID || "Let's build a magnificent digital product together! 🚀") : (settings.bubbleCollabDescEN || "Let's build a magnificent digital product together! 🚀")}
                          </p>
                        </div>
                      </motion.div>
                    </div>

                    {/* Right Column: High typography text nodes */}
                    <div className="flex-grow space-y-6 text-center lg:text-left max-w-xl">
                      <div className="space-y-1.5 text-xs sm:text-sm font-black tracking-widest text-[#00c2ff] uppercase block">
                        {selectedLang === 'ID' ? 'TENTANG SAYA' : 'ABOUT ME'}
                      </div>

                      {/* Display Headings with custom slanted capsules matching the reference image */}
                      <div className="space-y-4 text-center lg:text-left select-none">
                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                          <span className={`text-3xl sm:text-5xl font-black tracking-tight leading-none ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                            I AM
                          </span>
                          <div className="inline-block transform -rotate-1.5 hover:rotate-0 transition-transform duration-300 origin-center">
                            <span 
                              className="inline-block text-2.5xl sm:text-4.5xl font-black text-white px-5 py-2.5 rounded-[12px] shadow-md tracking-wider uppercase"
                              style={{ backgroundColor: settings.aboutNameCapsuleBg || '#3b82f6' }}
                            >
                              {ownerName}
                            </span>
                          </div>
                          <span className={`text-3.5xl sm:text-5xl font-black leading-none -ml-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                            ,
                          </span>
                        </div>

                        <div className="flex items-center justify-center lg:justify-start pt-1">
                          <div className="inline-block transform -rotate-1 hover:rotate-0 transition-transform duration-300 origin-center">
                            <span 
                              className="inline-block text-lg sm:text-2.5xl font-black text-white px-5 py-2.5 rounded-[10px] shadow-md tracking-widest uppercase"
                              style={{ backgroundColor: settings.aboutRoleCapsuleBg || '#10b981' }}
                            >
                              {homeJobTitle}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Bio lines with customized vertical accent lines */}
                      <div className="relative pl-4 border-l-4 border-[#00c2ff]/65 text-left py-1">
                        <p className={`text-sm sm:text-base leading-relaxed font-semibold ${isDarkMode ? 'text-gray-300' : 'text-slate-600'}`}>
                          {bioDesc}
                        </p>
                      </div>

                      <div className="pt-2 flex justify-center lg:justify-start">
                        <button 
                          onClick={() => {
                            const link = document.createElement('a');
                            link.href = settings.cvUrl || '/Fikri_Yandi_CV.pdf';
                            link.download = settings.cvFileName || settings.resumeFileName || 'Fikri_Yandi_CV.pdf';
                            link.click();
                          }}
                          className="bg-black hover:bg-slate-900 text-white font-extrabold text-xs px-7 py-3 rounded-full flex items-center gap-2 transform active:scale-95 transition-all shadow-md cursor-pointer"
                        >
                          <BookOpen className="w-4 h-4 shrink-0" />
                          <span>DOWNLOAD CV</span>
                        </button>
                      </div>
                    </div>

                  </ScrollAnimate>
                )}

                {/* 3. TECH SKILLS SECTION (Marquee Ticker Kereta) - Matches Image 3 */}
                {(settings.showSkillsSection !== false) && (
                  <ScrollAnimate className="space-y-6">
                    <div className="text-center sm:text-left space-y-1">
                      <span className="text-xs sm:text-sm font-black tracking-widest text-[#00c2ff] uppercase block">
                        {selectedLang === 'ID' ? 'KEAHLIAN TEKNOLOGI' : 'TECHNICAL CAPABILITIES'}
                      </span>
                      <h3 className={`text-xl sm:text-2.5xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        {selectedLang === 'ID' ? 'Matriks Skill & Kompetensi' : 'Productivity & Tool Matrix'}
                      </h3>
                    </div>

                    <SkillsTrainMarquee 
                      skills={skills} 
                      isDarkMode={isDarkMode} 
                      speed={settings.skillsMarqueeSpeed || 30} 
                    />
                  </ScrollAnimate>
                )}

                {/* 4. CERTIFICATES & AWARD SECTIONS - Matches Image 4 */}
                {(settings.showCertificatesSection !== false) && (
                  <ScrollAnimate className="space-y-8">
                    <div className="text-center sm:text-left space-y-1">
                      <span className="text-xs sm:text-sm font-black tracking-widest text-[#00c2ff] uppercase block">
                        {selectedLang === 'ID' ? 'SERTIFIKAT & PENGHARGAAN' : 'CREDENTIALS & RECOGNITIONS'}
                      </span>
                      <h3 className={`text-xl sm:text-2.5xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        {selectedLang === 'ID' ? 'Sertifikasi & Penghargaan' : 'Professional Certifications & Badges'}
                      </h3>
                    </div>

                    {certificates.length === 0 ? (
                      <div className={`p-10 text-center rounded-2xl border ${
                        isDarkMode ? 'bg-[#0f141e]/50 border-slate-800' : 'bg-slate-50 border-slate-200'
                      }`}>
                        <Award className="w-10 h-10 text-slate-400 mx-auto opacity-50 mb-2" />
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Belum ada Sertifikat</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {certificates.map((cert, index) => (
                          <div 
                            key={cert.id || index}
                            onClick={() => {
                              setSelectedCertImage(cert.image);
                              setSelectedCertTitle(cert.title);
                            }}
                            className={`group rounded-[20px] overflow-hidden border flex flex-col cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] preserve-rounded-3d ${
                              index % 2 === 0 
                                ? 'hover:[transform:perspective(1000px)_rotateX(6deg)_rotateY(-6deg)_translateZ(6px)] hover:border-[#00c2ff]/40 hover:shadow-[0_15px_30px_rgba(0,194,255,0.12)]' 
                                : 'hover:[transform:perspective(1000px)_rotateX(-6deg)_rotateY(6deg)_translateZ(6px)] hover:border-[#00c2ff]/40 hover:shadow-[0_15px_30px_rgba(0,194,255,0.12)]'
                            } ${
                              isDarkMode 
                                ? 'bg-[#151c25]/85 border-[#2e353f]/30 hover:shadow-[#00c2ff]/5' 
                                : 'bg-white border-slate-150 hover:shadow-slate-100/40'
                            }`}
                          >
                            {/* Full cover photo of certificate */}
                            <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950/25">
                              <img 
                                src={cert.image} 
                                alt={cert.title} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]" 
                                referrerPolicy="no-referrer"
                                style={{ 
                                  imageRendering: 'auto',
                                  backfaceVisibility: 'hidden',
                                  WebkitFontSmoothing: 'antialiased',
                                  transform: 'translateZ(0)'
                                }}
                              />
                              {/* Metallic shine sweep effect of certificate - perfectly synchronized */}
                              <div className="shine-overlay pointer-events-none" style={{ animationDelay: dynamicShineDelay }} />

                              {/* Glowing magnifying overlay for crystal clear presentation */}
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-1.5 text-white">
                                <Search className="w-6 h-6 text-[#00c2ff] animate-pulse" />
                                <span className="text-[10px] font-black tracking-widest uppercase bg-slate-950/80 px-2.5 py-1 rounded-md border border-[#00c2ff]/30 text-[#00c2ff]">
                                  {selectedLang === 'ID' ? 'LIHAT FULL HD' : 'VIEW FULL HD'}
                                </span>
                              </div>
                            </div>
                            
                            {/* Simple clean text below for Certificate Name ONLY */}
                            <div className="p-4 text-left border-t border-slate-100/5 dark:border-slate-800">
                              <h4 className={`text-sm sm:text-[15px] font-black leading-snug truncate ${isDarkMode ? 'text-white' : 'text-slate-805'}`}>
                                {cert.title}
                              </h4>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </ScrollAnimate>
                )}

                {/* Right Column: Experience */}
                {(settings.showExperienceSection !== false) && (
                  <ScrollAnimate className={`p-6 sm:p-9 rounded-[30px] border text-left flex flex-col justify-between mb-8 lg:mb-10 ${
                      isDarkMode ? 'bg-[#151c25]/80 border-[#2e353f]/30' : 'bg-white border-slate-100 shadow-xl shadow-slate-150/40'
                    }`}>
                      <div>
                        <div className="flex items-center gap-3 mb-8">
                          {/* Colored backgrounds briefcase element, enlarged SVG as requested */}
                          <ColoredIcon bgHex="#10b981" index={1} isBig={true}>
                            <Building2 className="text-white" />
                          </ColoredIcon>
                          <h3 className={`text-xl sm:text-2.5xl font-black ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                            {selectedLang === 'ID' ? 'Pengalaman Kerja' : 'Amazing Experience'}
                          </h3>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                          {experiences.map((exp, idx) => (
                            <div key={exp.id || idx} className={`p-6 rounded-[24px] border transition-all duration-300 hover:shadow-xl ${isDarkMode ? 'bg-[#151c25]/80 border-[#2e353f] hover:border-[#8b5cf6]/30 shadow-lg shadow-black/20' : 'bg-white border-slate-200 hover:border-[#8b5cf6]/30 shadow-md shadow-slate-200/50'} text-left flex flex-col space-y-5`}>
                              {/* Top row */}
                              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                                <div className="flex items-center gap-4">
                                  {/* Icon box */}
                                  {exp.companyLogo ? (
  <div className={`w-12 h-12 flex items-center justify-center rounded-[14px] shrink-0 bg-white border overflow-hidden ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>
    <img src={exp.companyLogo} alt={exp.company} className="w-full h-full object-contain p-1" />
  </div>
) : (
  <div className={`w-12 h-12 flex items-center justify-center rounded-[14px] shrink-0 ${isDarkMode ? 'bg-slate-800/80 text-slate-300' : 'bg-slate-100 text-slate-500'}`}>
    <Building2 className="w-6 h-6" />
  </div>
)}
                                  <div>
                                    <h4 className={`text-lg font-black leading-snug ${isDarkMode ? 'text-white' : 'text-[#0f172a]'}`}>
                                      {exp.title}
                                    </h4>
                                    {exp.company && (
                                      <p className="text-[13px] font-bold text-[#8b5cf6]">
                                        {exp.company}
                                      </p>
                                    )}
                                  </div>
                                </div>
                                <div className={`flex flex-col sm:text-right text-[11px] font-bold space-y-1.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                                  <div className="flex items-center sm:justify-end gap-1.5">
                                    <Calendar className="w-3.5 h-3.5" />
                                    <span>{exp.years}</span>
                                  </div>
                                  {exp.location && (
                                    <div className="flex items-center sm:justify-end gap-1.5">
                                      <MapPin className="w-3.5 h-3.5" />
                                      <span>{exp.location}</span>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Description bullets */}
                              {exp.description && (
                                <div className="grid grid-cols-1 gap-y-2.5 pt-1">
                                  {exp.description.split('. ').filter(Boolean).map((bullet, bIdx) => (
                                    <div key={bIdx} className="flex items-start gap-3">
                                      <div className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 ${isDarkMode ? 'bg-[#8b5cf6]' : 'bg-[#8b5cf6]'}`} />
                                      <p className={`text-[13px] leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                                        {bullet.trim()}{!bullet.trim().endsWith('.') ? '.' : ''}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {/* Tags */}
                              {exp.tags && exp.tags.length > 0 && (
                                <div className={`pt-4 border-t ${isDarkMode ? 'border-slate-800' : 'border-slate-100'} mt-auto`}>
                                  <div className={`text-[10px] font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                                    <Code className="w-3.5 h-3.5" />
                                    TEKNOLOGI YANG DIGUNAKAN
                                  </div>
                                  <div className="flex flex-wrap gap-2.5">
                                    {exp.tags.map((tag, tIdx) => (
                                      <span key={tIdx} className={`px-3.5 py-1.5 text-[11px] font-bold rounded-full transition-colors ${isDarkMode ? 'bg-[#1e293b] text-slate-300 hover:bg-[#334155]' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </ScrollAnimate>
                  )}

                                {/* 6. PORTFOLIO */}
                <div className="w-full">
                  {/* Right Column: Portfolio */}
                  {(settings.showProjectsSection !== false) && (
                    <ScrollAnimate className="flex flex-col h-full space-y-6">
                    <div className="space-y-2 text-left">
                      <span className="text-xs sm:text-sm font-black tracking-widest text-[#00c2ff] uppercase block">
                        {selectedLang === 'ID' ? 'PORTOFOLIO PILIHAN' : 'FEATURED PORTFOLIO'}
                      </span>
                      <h3 className={`text-2xl sm:text-3xl font-black ${isDarkMode ? 'text-white' : 'text-[#0f172a]'}`}>
                        {selectedLang === 'ID' ? 'Koleksi Karya Digital Terbaru' : 'Curated Works Directory'}
                      </h3>
                    </div>

                    {/* Grid showing up to 3 featured projects */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 flex-grow">
                      {activeProjects.slice(0, 3).map((project, idx) => (
                        <div 
                          key={project.id || idx} 
                          className={`group rounded-[32px] overflow-hidden border flex flex-col justify-between h-full hover:shadow-xl transition-all duration-300 ${
                            isDarkMode ? 'bg-[#151c25]/80 border-[#2e353f]/30 hover:border-[#00c2ff]/30' : 'bg-white border-slate-100 shadow-lg shadow-slate-100/40 hover:border-[#00c2ff]/25'
                          }`}
                        >
                          <div className="text-left">
                            {/* Cover image wrap */}
                            <div className="h-48 sm:h-56 relative overflow-hidden bg-slate-950">
                              <ProjectImageCarousel 
                                images={project.images && project.images.length > 0 ? project.images : [project.image]} 
                                altText={project.title}
                                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                              />
                              <div className={`absolute inset-0 bg-gradient-to-t ${isDarkMode ? 'from-[#151c25] via-transparent' : 'from-white via-transparent'} to-transparent z-10 pointer-events-none`} />
                            </div>

                            {/* Title details info block */}
                            <div className="p-6 space-y-3 relative z-20 -mt-6">
                              {/* Tags row */}
                              <div className="flex flex-wrap gap-1.5">
                                {project.tags.map(t => (
                                  <span key={t} className="bg-sky-400/10 border border-[#00c2ff]/15 text-[#00c2ff] px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-wider">
                                    {t}
                                  </span>
                                ))}
                              </div>

                              <h4 className={`text-lg font-black group-hover:text-[#00c2ff] transition-colors ${
                                isDarkMode ? 'text-white' : 'text-slate-800'
                              }`}>{project.title}</h4>
                              
                              <p className={`text-xs sm:text-sm line-clamp-2 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-slate-500'}`}>
                                {project.description}
                              </p>
                            </div>
                          </div>

                          {/* Read Case style button footer link */}
                          <div className="px-6 pb-6 pt-2 text-left">
                            <button 
                              onClick={() => setSelectedProject(project)}
                              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00c2ff] hover:underline hover:translate-x-1 transition-all cursor-pointer"
                            >
                              {selectedLang === 'ID' ? 'Lihat Selengkapnya' : 'View Full Case Study'}
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Redirection Notice Box encouraging viewing all other works in the portfolio tab */}
                    <div className={`p-6 sm:p-8 rounded-[24px] border flex flex-col sm:flex-row items-center justify-between gap-6 ${
                      isDarkMode ? 'bg-[#151c25]/30 border-[#2e353f]/30' : 'bg-slate-100/50 border-slate-200'
                    }`}>
                      <div className="space-y-1 text-center sm:text-left">
                        <h4 className={`text-base font-black ${isDarkMode ? 'text-white' : 'text-[#0f172a]'}`}>
                          {selectedLang === 'ID' ? 'Ingin melihat semua karya kami?' : 'Explore our complete catalog'}
                        </h4>
                        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>
                          {selectedLang === 'ID' 
                            ? 'Kami menampilkan sebagian kecil kurasi di halaman utama. Silakan masuk ke tab Portfolio untuk melihat detail lengkap.' 
                            : 'This is just a teaser of our full works portfolio. Head over to the Portfolio tab for full descriptions.'
                          }
                        </p>
                      </div>
                      <button 
                        onClick={() => {
                          setActiveTab('portfolio');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="bg-[#00c2ff] hover:bg-[#00aae6] text-black font-extrabold text-xs px-6 py-3 rounded-full transition-all duration-300 shadow-md shadow-sky-500/10 flex items-center gap-2 cursor-pointer whitespace-nowrap"
                      >
                        <span>{selectedLang === 'ID' ? 'Kunjungi Menu Portfolio' : 'Go to Portfolio Tab'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </ScrollAnimate>
                )}


                </div>

              </div>
            )}

            {/* VIEW 2: ABOUT PANEL (TENTANG SAYA, SKILL MATRIX, TIMELINE, CAREERS) */}
            {activeTab === 'about' && (
              <div id="view-about" className="space-y-12 py-4">
                
                {/* 1. TENTANG SAYA (Matches Image 2) */}
                <ScrollAnimate className={`p-6 sm:p-10 rounded-[35px] border flex flex-col md:flex-row gap-8 sm:gap-12 items-center relative overflow-hidden ${
                  isDarkMode ? 'bg-[#151c25]/80 border-[#2e353f]/30' : 'bg-white border-slate-100 shadow-xl shadow-slate-150/40'
                }`}>
                  
                  {/* Smartphone device mock with interactive 3D elements (Matches Image) */}
                  <div className="relative w-[300px] h-[480px] sm:w-[320px] sm:h-[500px] flex-shrink-0 flex items-center justify-center my-6">
                    <motion.div 
                      className="relative w-[300px] h-[480px] sm:w-[320px] sm:h-[500px] flex-shrink-0 flex items-center justify-center group select-none"
                      style={{ perspective: 1200 }}
                      animate={{
                        y: [0, -10, 0],
                        rotateX: [-2, 2, -2],
                        rotateY: [-5, 5, -5],
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      {/* Phone Outer Shell / Bezel with premium realistic screen border shadows */}
                      <div className={`absolute inset-0 rounded-[44px] p-[6px] shadow-[0_20px_50px_rgba(0,194,255,0.22)] ring-4 ring-black/10 dark:ring-white/5 overflow-hidden flex flex-col justify-between transition-all duration-500 group-hover:shadow-[0_25px_65px_rgba(0,194,255,0.4)] group-hover:scale-[1.02] ${
                        isDarkMode ? 'bg-slate-900 ring-white/5' : 'bg-slate-950 ring-black/10'
                      }`}>
                        {/* Phone Screen: Electric Bright Blue Screen with deep inner gradient glow mimicking a high-end OLED display */}
                        <div className="relative w-full h-full rounded-[38px] overflow-hidden bg-gradient-to-b from-[#00ffff]/30 via-[#005fb8]/50 to-[#011627] shadow-[inset_0_0_40px_rgba(0,194,255,0.85)] flex items-center justify-center border-2 border-[#00c2ff]/30">
                          
                          {/* Interactive dynamic island reflection notch */}
                          <div className="absolute top-3 inset-x-0 flex justify-center z-30">
                            <div className="w-24 h-5.5 bg-black/95 dark:bg-black rounded-full flex items-center justify-between px-3 shadow-inner">
                              <div className="w-2 h-2 rounded-full bg-slate-900 border border-slate-750" />
                              <div className="w-4.5 h-1 rounded-full bg-slate-950/70" />
                            </div>
                          </div>

                          {/* Aesthetic Grid overlay inside the bright blue phone screen */}
                          <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#00ffff_1px,transparent_1px)] [background-size:14px_14px]" />
                          
                          {/* Ambient glow blobs inside screen */}
                          <div className="absolute top-1/4 left-1/4 w-36 h-36 rounded-full bg-cyan-400/40 blur-2xl animate-pulse" />
                          <div className="absolute bottom-1/4 right-1/4 w-36 h-36 rounded-full bg-blue-600/30 blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }} />

                          {/* Isolated main subject presentation matching transparent background design */}
                          <div className="w-full h-full relative z-10 p-4 pt-12 flex items-center justify-center overflow-hidden">
                            <img 
                              src={displayPic} 
                              alt="Fikri Yandi" 
                              className="w-full h-full object-cover rounded-3xl mix-blend-normal transform scale-[1.05] filter contrast-[1.02] brightness-[1.02] shadow-[0_12px_24px_rgba(0,0,0,0.4)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.12]"
                              referrerPolicy="no-referrer"
                            />
                            {/* Dark overlay at bottom to integrate the photo edges cleanly with the bezel */}
                            <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-slate-950/80 to-transparent pointer-events-none" />
                          </div>
                        </div>
                      </div>

                      {/* FLOATING BADGE 1: Chat bubble "Hi there!" */}
                      <div 
                        className="absolute -top-1.5 -left-4 sm:-left-8 z-20 bg-[#00c2ff] text-slate-950 px-4 py-2.5 rounded-2xl rounded-tl-none font-black text-[11px] sm:text-[12px] leading-tight shadow-[0_10px_25px_rgba(0,194,255,0.25)] ring-1 ring-white/10 flex items-center gap-1.5 animate-bounce" 
                        style={{ animationDuration: '4.5s', transform: "translateZ(30px)" }}
                      >
                        <span className="shrink-0 text-sm">💬</span>
                        <div className="text-left">
                          <div className="text-[9px] opacity-75 uppercase font-black tracking-wider leading-none mb-0.5">
                            {selectedLang === 'ID' ? (settings.bubbleSayLabelID || 'Fikri says:') : (settings.bubbleSayLabelEN || 'Fikri says:')}
                          </div>
                          <span>
                            {selectedLang === 'ID' ? (settings.bubbleChatTextID || 'Hi there! 👋') : (settings.bubbleChatTextEN || 'Hi there! 👋')}
                          </span>
                        </div>
                      </div>

                      {/* FLOATING BADGE 2: Red subscriber pop bubble with user icon and count */}
                      <div 
                        className="absolute top-24 -right-6 sm:-right-10 z-20 bg-[#ff3b30] text-white px-3.5 py-2 sm:py-2.5 rounded-[22px] font-black text-xs sm:text-sm shadow-[0_12px_30px_rgba(255,59,48,0.35)] flex items-center gap-2 transition-all duration-300 hover:scale-110 hover:-rotate-3"
                        style={{ transform: "translateZ(25px)" }}
                      >
                        <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                          <User className="w-3.5 h-3.5 text-white fill-white" />
                        </div>
                        <span className="tracking-tight uppercase text-[10px] sm:text-xs">
                          {selectedLang === 'ID' ? (settings.bubbleFollowerTextID || 'Follower') : (settings.bubbleFollowerTextEN || 'Follower')}
                        </span>
                        <span className="bg-white text-rose-600 px-1.5 py-0.5 rounded-md text-[10px] sm:text-xs font-black">
                          {settings.bubbleFollowerCount || '1'}
                        </span>
                      </div>

                      {/* FLOATING BADGE 3: Verified Check Badge */}
                      <div 
                        className="absolute top-44 -left-7 sm:-left-11 z-20 bg-[#00c2ff]/15 backdrop-blur-md border-2 border-[#00c2ff]/40 text-[#00c2ff] p-3 rounded-2xl shadow-[0_10px_25px_rgba(0,194,255,0.2)] flex items-center justify-center transition-all duration-300 hover:scale-115 rotate-[-6deg] hover:rotate-0 hover:bg-[#00c2ff] hover:text-slate-950"
                        style={{ transform: "translateZ(15px)" }}
                      >
                        <Check className="w-5.5 h-5.5 stroke-[3.5]" />
                      </div>

                      {/* FLOATING BADGE 4: Emoji Glass sunglasses */}
                      <div 
                        className="absolute -bottom-2 -left-3 sm:-left-6 z-20 text-4xl sm:text-5xl filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.3)] transition-transform duration-300 hover:scale-120 hover:rotate-12 select-none cursor-pointer"
                        style={{ transform: "translateZ(35px)" }}
                      >
                        😎
                      </div>

                      {/* FLOATING BADGE 5: Emoji Curious Eyes */}
                      <div 
                        className="absolute bottom-1 right-8 sm:right-12 z-20 text-4.5xl filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.3)] transition-transform duration-300 hover:scale-115 select-none cursor-pointer"
                        style={{ transform: "translateZ(20px)" }}
                      >
                        👀
                      </div>

                      {/* FLOATING BADGE 6: Collaborations box badge - Adapts elegantly to light/dark mode */}
                      <div 
                        className={`absolute bottom-20 -right-5 sm:-right-9 z-20 border p-3.5 sm:p-4 rounded-3xl shadow-[0_15px_40px_rgba(0,0,0,0.2)] max-w-[160px] sm:max-w-[185px] text-left transition-all duration-300 hover:scale-[1.04] hover:-translate-y-1 ${
                          isDarkMode ? 'bg-slate-900/95 border-slate-800 text-white' : 'bg-white/95 border-slate-200 text-slate-800'
                        }`}
                        style={{ transform: "translateZ(40px)" }}
                      >
                        <div className="text-xs font-black text-[#00c2ff] uppercase tracking-wider mb-1">
                          {selectedLang === 'ID' ? (settings.bubbleCollabTitleID || 'Collaborations') : (settings.bubbleCollabTitleEN || 'Collaborations')}
                        </div>
                        <p className={`text-[10px] sm:text-[11.5px] font-extrabold leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                          {selectedLang === 'ID' ? (settings.bubbleCollabDescID || "Let's build a magnificent digital product together! 🚀") : (settings.bubbleCollabDescEN || "Let's build a magnificent digital product together! 🚀")}
                        </p>
                      </div>
                    </motion.div>
                  </div>
 
                  {/* Right Side Info Area */}
                  <div className="flex-grow space-y-4 md:space-y-5 text-center md:text-left">
                    <p className="text-[10px] sm:text-xs font-black tracking-widest text-[#00c2ff] uppercase">
                      {tagline}
                    </p>
                    <h2 className={`text-2xl sm:text-4.5xl font-black ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                      {selectedLang === 'ID' ? 'Halo, Saya' : 'Hello, I\'m'} <span className="text-[#00c2ff]">{ownerName}</span>
                    </h2>
                    <p className={`text-sm sm:text-base leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-slate-600'} font-medium`}>
                      {bioDesc}
                    </p>
                  </div>
                </ScrollAnimate>

                {/* 2. SKILL MATRIX & RIWAYAT PENDIDIKAN (Matches Image 3 Grid) */}
                <ScrollAnimate className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                               {/* Left Column: Skill Matrix */}
                  <div className={`lg:col-span-6 p-6 sm:p-8 rounded-[30px] border flex flex-col ${
                    isDarkMode ? 'bg-[#151c25]/80 border-[#2e353f]/30' : 'bg-white border-slate-100 shadow-xl shadow-slate-150/40'
                  }`}>
                    <div className="flex items-center gap-3 mb-8">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-300 ${
                        isDarkMode 
                          ? 'bg-[#121924] border-[#00c2ff]/40 text-[#00c2ff] shadow-[0_0_12px_rgba(0,194,255,0.25)]' 
                          : 'bg-[#00c2ff] border border-[#00c2ff]/10 text-white shadow-md shadow-[#00c2ff]/30'
                      }`}>
                        <SkillMatrixCustomIcon className="w-7.5 h-7.5" />
                      </div>
                      <h3 className={`text-xl sm:text-2xl font-black ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{getSectionSkillsLabel()}</h3>
                    </div>

                    <div className="flex-1 w-full relative min-h-[460px] lg:min-h-0">
                      <style>{`
                        .custom-skill-scrollbar::-webkit-scrollbar {
                          width: 6px;
                        }
                        .custom-skill-scrollbar::-webkit-scrollbar-track {
                          background: transparent;
                        }
                        .custom-skill-scrollbar::-webkit-scrollbar-thumb {
                          background: ${isDarkMode ? '#2e353f' : '#cbd5e1'};
                          border-radius: 9999px;
                        }
                        .custom-skill-scrollbar::-webkit-scrollbar-thumb:hover {
                          background: #00c2ff;
                        }
                      `}</style>
                      <div className="space-y-4 lg:absolute lg:inset-0 overflow-y-auto pr-2 custom-skill-scrollbar pb-2">
                        {skills.map((skill, index) => (
                          <div 
                            key={skill.id || index}
                            className={`flex items-center gap-4 p-3.5 rounded-2xl border transition-all duration-300 hover:translate-x-1 ${
                              isDarkMode 
                                ? 'bg-[#18212e]/70 border-[#2e353f]/60 hover:border-[#00c2ff]/30 shadow-md shadow-black/20' 
                                : 'bg-white border-slate-150 hover:border-[#00c2ff]/20 shadow-sm shadow-slate-100/45'
                            }`}
                          >
                            <div className="shrink-0">
                              <SkillIcon icon={skill.icon} isDarkMode={isDarkMode} title={skill.title} />
                            </div>
                            <div className="flex-grow min-w-0 flex items-center justify-between gap-3">
                              <span className={`font-black text-sm truncate ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                                {skill.title}
                              </span>
                              <span className={`text-[10px] uppercase font-black shrink-0 px-2.5 py-0.5 rounded-full border ${
                                isDarkMode 
                                  ? 'text-[#00c2ff] bg-sky-500/10 border-[#00c2ff]/20' 
                                  : 'text-indigo-600 bg-indigo-50 border-indigo-100'
                              }`}>
                                {skill.category}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
 
                  {/* Right Column: Riwayat Pendidikan (Educations timeline) */}
                  <div className={`lg:col-span-6 p-6 sm:p-8 rounded-[30px] border ${
                    isDarkMode ? 'bg-[#151c25]/80 border-[#2e353f]/30' : 'bg-white border-slate-100 shadow-xl shadow-slate-150/40'
                  }`}>
                    
                    <div className="flex items-center gap-3 mb-8">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-300 ${
                        isDarkMode 
                          ? 'bg-[#111322] border-indigo-500/40 text-indigo-400 shadow-[0_0_12px_rgba(99,102,241,0.25)]' 
                          : 'bg-indigo-600 border border-indigo-600/10 text-white shadow-md shadow-indigo-600/30'
                      }`}>
                        <EducationGraduateIcon className="w-7.5 h-7.5" />
                      </div>
                      <h3 className={`text-xl sm:text-2xl font-black ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{getSectionEducationLabel()}</h3>
                    </div>
 
                    <div className="relative pl-8 border-l-2 border-[#00c2ff]/40 space-y-6 py-2">
                      {educations.map((edu, idx) => (
                        <div key={edu.id || idx} className="relative group/edu text-left">
                          {/* Timeline Circle */}
                          <div className="absolute left-[-39px] top-7 w-4.5 h-4.5 bg-white border-4 border-[#00c2ff] rounded-full shadow-md shadow-sky-500/30 group-hover/edu:scale-125 transition-transform duration-300 z-10"></div>
                          
                          {/* Rich Card Box */}
                          <div className={`p-5 sm:p-6 rounded-2xl border shadow-lg hover:shadow-xl transition-all duration-300 ${
                            isDarkMode 
                              ? 'bg-[#18212e]/70 border-[#2e353f]/60 hover:border-[#00c2ff]/30 shadow-black/30' 
                              : 'bg-white border-slate-150 shadow-slate-100/80 hover:border-[#00c2ff]/20'
                          }`}>
                            <div className="space-y-2">
                              <span className="inline-flex bg-sky-550/10 text-[#00c2ff] text-[10px] font-black rounded-lg px-2.5 py-1 uppercase tracking-wider bg-sky-400/15">
                                {edu.years}
                              </span>
                              <h4 className={`text-lg font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                                {selectedLang === 'ID' ? edu.stage : (edu.stageEN || edu.stage)}
                              </h4>
                              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-slate-500'} font-semibold uppercase`}>
                                {selectedLang === 'ID' ? edu.school : (edu.schoolEN || edu.school)}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
 
                  </div>
 
                </ScrollAnimate>
 
                {/* 3. REKAM JEJAK KARIER (Matches Image 4) */}
                <ScrollAnimate className={`p-6 sm:p-10 rounded-[35px] border ${
                  isDarkMode ? 'bg-[#151c25]/80 border-[#2e353f]/30' : 'bg-white border-slate-100 shadow-xl shadow-slate-150/40'
                }`}>
                  
                  <div className="flex items-center justify-center gap-3 mb-10">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-[#0e1716] border-emerald-500/40 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.25)]' 
                        : 'bg-emerald-500 border border-emerald-500/10 text-white shadow-md shadow-emerald-500/30'
                    }`}>
                      <Building2 className="w-7.5 h-7.5" />
                    </div>
                    <h3 className={`text-xl sm:text-2xl font-black ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{getSectionCareerLabel()}</h3>
                  </div>
 
                  <div className="grid grid-cols-1 gap-6">
                    {experiences.map((exp, idx) => (
                      <div key={exp.id || idx} className={`p-6 rounded-[24px] border transition-all duration-300 hover:shadow-xl ${isDarkMode ? 'bg-[#151c25]/80 border-[#2e353f] hover:border-[#8b5cf6]/30 shadow-lg shadow-black/20' : 'bg-white border-slate-200 hover:border-[#8b5cf6]/30 shadow-md shadow-slate-200/50'} text-left flex flex-col space-y-5`}>
                        {/* Top row */}
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                          <div className="flex items-center gap-4">
                            {/* Icon box */}
                            {exp.companyLogo ? (
  <div className={`w-12 h-12 flex items-center justify-center rounded-[14px] shrink-0 bg-white border overflow-hidden ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>
    <img src={exp.companyLogo} alt={exp.company} className="w-full h-full object-contain p-1" />
  </div>
) : (
  <div className={`w-12 h-12 flex items-center justify-center rounded-[14px] shrink-0 ${isDarkMode ? 'bg-slate-800/80 text-slate-300' : 'bg-slate-100 text-slate-500'}`}>
    <Building2 className="w-6 h-6" />
  </div>
)}
                            <div>
                              <h4 className={`text-lg font-black leading-snug ${isDarkMode ? 'text-white' : 'text-[#0f172a]'}`}>
                                {exp.title}
                              </h4>
                              {exp.company && (
                                <p className="text-[13px] font-bold text-[#8b5cf6]">
                                  {exp.company}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className={`flex flex-col sm:text-right text-[11px] font-bold space-y-1.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                            <div className="flex items-center sm:justify-end gap-1.5">
                              <Calendar className="w-3.5 h-3.5" />
                              <span>{exp.years}</span>
                            </div>
                            {exp.location && (
                              <div className="flex items-center sm:justify-end gap-1.5">
                                <MapPin className="w-3.5 h-3.5" />
                                <span>{exp.location}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Description bullets */}
                        {exp.description && (
                          <div className="grid grid-cols-1 gap-y-2.5 pt-1">
                            {exp.description.split('. ').filter(Boolean).map((bullet, bIdx) => (
                              <div key={bIdx} className="flex items-start gap-3">
                                <div className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 ${isDarkMode ? 'bg-[#8b5cf6]' : 'bg-[#8b5cf6]'}`} />
                                <p className={`text-[13px] leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                                  {bullet.trim()}{!bullet.trim().endsWith('.') ? '.' : ''}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Tags */}
                        {exp.tags && exp.tags.length > 0 && (
                          <div className={`pt-4 border-t ${isDarkMode ? 'border-slate-800' : 'border-slate-100'} mt-auto`}>
                            <div className={`text-[10px] font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                              <Code className="w-3.5 h-3.5" />
                              TEKNOLOGI YANG DIGUNAKAN
                            </div>
                            <div className="flex flex-wrap gap-2.5">
                              {exp.tags.map((tag, tIdx) => (
                                <span key={tIdx} className={`px-3.5 py-1.5 text-[11px] font-bold rounded-full transition-colors ${isDarkMode ? 'bg-[#1e293b] text-slate-300 hover:bg-[#334155]' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
 
                </ScrollAnimate>

                {/* 4. CERTIFICATES & AWARD SECTIONS inside Tentang Saya */}
                {(settings.showCertificatesSection !== false) && (
                  <ScrollAnimate className={`p-6 sm:p-10 rounded-[35px] border ${
                    isDarkMode ? 'bg-[#151c25]/80 border-[#2e353f]/30' : 'bg-white border-slate-100 shadow-xl shadow-slate-150/40'
                  }`}>
                    <div className="flex items-center justify-center gap-3 mb-10">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-300 ${
                        isDarkMode 
                          ? 'bg-[#0d1622] border-[#00c2ff]/40 text-[#00c2ff] shadow-[0_0_12px_rgba(0,194,255,0.25)]' 
                          : 'bg-[#00c2ff] border border-[#00c2ff]/10 text-white shadow-md shadow-[#00c2ff]/30'
                      }`}>
                        <Award className="w-7.5 h-7.5" />
                      </div>
                      <h3 className={`text-xl sm:text-2xl font-black ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                        {selectedLang === 'ID' ? 'Sertifikasi & Penghargaan' : 'Professional Certifications'}
                      </h3>
                    </div>

                    {certificates.length === 0 ? (
                      <div className={`p-10 text-center rounded-2xl border ${
                        isDarkMode ? 'bg-[#0f141e]/50 border-slate-800' : 'bg-slate-50 border-slate-200'
                      }`}>
                        <Award className="w-10 h-10 text-slate-400 mx-auto opacity-50 mb-2" />
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Belum ada Sertifikat</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {certificates.map((cert, index) => (
                          <div 
                            key={cert.id || index}
                            onClick={() => {
                              setSelectedCertImage(cert.image);
                              setSelectedCertTitle(cert.title);
                            }}
                            className={`group rounded-[20px] overflow-hidden border flex flex-col cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] preserve-rounded-3d ${
                              index % 2 === 0 
                                ? 'hover:[transform:perspective(1000px)_rotateX(6deg)_rotateY(-6deg)_translateZ(6px)] hover:border-[#00c2ff]/40 hover:shadow-[0_15px_30px_rgba(0,194,255,0.12)]' 
                                : 'hover:[transform:perspective(1000px)_rotateX(-6deg)_rotateY(6deg)_translateZ(6px)] hover:border-[#00c2ff]/40 hover:shadow-[0_15px_30px_rgba(0,194,255,0.12)]'
                            } ${
                              isDarkMode 
                                ? 'bg-[#151c25]/85 border-[#2e353f]/30 hover:shadow-[#00c2ff]/5' 
                                : 'bg-white border-slate-150 hover:shadow-slate-100/40'
                            }`}
                          >
                            <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950/25">
                              <img 
                                src={cert.image} 
                                alt={cert.title} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]" 
                                referrerPolicy="no-referrer"
                                style={{ 
                                  imageRendering: 'auto',
                                  backfaceVisibility: 'hidden',
                                  WebkitFontSmoothing: 'antialiased',
                                  transform: 'translateZ(0)'
                                }}
                              />
                              {/* Metallic shine sweep effect of certificate - perfectly synchronized */}
                              <div className="shine-overlay pointer-events-none" style={{ animationDelay: dynamicShineDelay }} />

                              {/* Glowing magnifying overlay */}
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-1.5 text-white">
                                <Search className="w-6 h-6 text-[#00c2ff] animate-pulse" />
                                <span className="text-[10px] font-black tracking-widest uppercase bg-slate-950/80 px-2.5 py-1 rounded-md border border-[#00c2ff]/30 text-[#00c2ff]">
                                  {selectedLang === 'ID' ? 'LIHAT FULL HD' : 'VIEW FULL HD'}
                                </span>
                              </div>
                            </div>
                            
                            <div className="p-4 text-left border-t border-slate-100/5 dark:border-slate-800">
                              <h4 className={`text-sm sm:text-[15px] font-black leading-snug truncate ${isDarkMode ? 'text-white' : 'text-slate-805'}`}>
                                {cert.title}
                              </h4>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </ScrollAnimate>
                )}
 
              </div>
            )}

            {/* VIEW 3: PORTFOLIO WORKS PANEL */}
            {activeTab === 'portfolio' && (
              <div id="view-portfolio" className="space-y-10 py-4">
                
                {/* Header title */}
                <ScrollAnimate data-aos="zoom-in" className="text-center max-w-2xl mx-auto space-y-3 mb-6">
                  <h2 className={`text-3xl sm:text-4.5xl font-black ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                    Featured <span className="text-[#00c2ff]">Works & Portfolio</span>
                  </h2>
                  <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>
                    {selectedLang === 'ID' 
                      ? 'Berikut adalah kumpulan proyek digital, rancangan visual, dan software digital yang telah dikembangkan secara mantap.'
                      : 'Browse through our curated projects, structural software systems, and high performance client designs.'
                    }
                  </p>
                </ScrollAnimate>

                {/* Projects Grid lists */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {activeProjects.map((project, idx) => (
                    <ScrollAnimate 
                      key={project.id} 
                      data-aos="fade-up"
                      data-aos-delay={`${(idx % 2) * 150}`}
                      className={`group rounded-3xl overflow-hidden border flex flex-col justify-between h-full hover:shadow-xl transition-all duration-300 ${
                        isDarkMode ? 'bg-[#151c25]/80 border-[#2e353f]/30 hover:border-[#00c2ff]/30' : 'bg-white border-slate-100 shadow-lg shadow-slate-100/40 hover:border-[#00c2ff]/25'
                      }`}
                    >
                      <div>
                        {/* Cover image wrap */}
                        <div className="h-56 sm:h-64 relative overflow-hidden bg-slate-950">
                          <ProjectImageCarousel 
                            images={project.images && project.images.length > 0 ? project.images : [project.image]} 
                            altText={project.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className={`absolute inset-0 bg-gradient-to-t ${isDarkMode ? 'from-[#151c25] via-transparent' : 'from-white via-transparent'} to-transparent z-10 pointer-events-none`} />
                        </div>

                        {/* Title details info block */}
                        <div className="p-6 sm:p-7 space-y-3.5 relative z-20 -mt-8">
                          
                          {/* Tags row */}
                          <div className="flex flex-wrap gap-1.5">
                            {project.tags.map(t => (
                              <span key={t} className="bg-sky-400/10 border border-[#00c2ff]/15 text-[#00c2ff] px-2.5 py-0.5 rounded text-[10px] font-bold">
                                {t}
                              </span>
                            ))}
                          </div>

                          <h3 className={`text-lg sm:text-xl font-bold group-hover:text-[#00c2ff] transition-colors ${
                            isDarkMode ? 'text-white' : 'text-slate-800'
                          }`}>{project.title}</h3>
                          
                          <p className={`text-xs sm:text-sm line-clamp-3 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-slate-500'}`}>
                            {project.description}
                          </p>
                        </div>
                      </div>

                      {/* Read Case style button footer link */}
                      <div className="px-6 sm:px-7 pb-6 sm:pb-7">
                        <button 
                          onClick={() => setSelectedProject(project)}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00c2ff] hover:underline hover:translate-x-1 transition-all"
                        >
                          {selectedLang === 'ID' ? 'Lihat Selengkapnya' : 'View Full Case Study'}
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>

                    </ScrollAnimate>
                  ))}
                </div>

              </div>
            )}

            {/* VIEW 4: CONTACT PANEL (Matches Image 1 layout) */}
            {activeTab === 'contact' && (
              <div id="view-contact" className="space-y-12 py-4">
                
                {/* Header layout match */}
                <ScrollAnimate data-aos="zoom-in" className="text-center space-y-2 mb-10">
                  <p className="text-xs sm:text-sm font-black text-[#00c2ff] uppercase tracking-widest">{t.mariTerhubung}</p>
                  <h2 className={`text-3xl sm:text-4.5xl font-black ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{getContactHubungiLabel()}</h2>
                </ScrollAnimate>
                {/* Restructured Split-Grid layout for Contact Page: Row 1: Snug Home-matched social cards, Row 2: LHS Maps & RHS Form */}
                <div className="max-w-6xl mx-auto space-y-10">
                  
                  {/* Row 1: Social Media Pill Icons (Matched EXACTLY to home page design, animations, & features) */}
                  <ScrollAnimate data-aos="fade-up" data-aos-delay="100" id="contact-pure-icons" className="flex flex-wrap gap-4 items-center justify-center py-4 select-none">
                    {/* Email (Cyan/Sky) */}
                    <a 
                      href={`mailto:${settings.contactEmail || 'fikrryandi@gmail.com'}`}
                      className={`group relative h-14 w-14 hover:w-34 rounded-2xl border-2 flex items-center pl-1.5 gap-2.5 transition-all duration-300 shadow-sm shrink-0 overflow-hidden ${
                        isDarkMode 
                          ? 'bg-[#121924]/80 border-[#00c2ff]/40 hover:border-[#00c2ff] hover:shadow-[0_4px_15px_rgba(0,194,255,0.25)]' 
                          : 'bg-white border-[#00c2ff]/40 hover:border-[#00c2ff] hover:shadow-[0_4px_15px_rgba(0,194,255,0.15)] shadow-slate-100'
                      }`}
                    >
                      <div className="w-[42px] h-[42px] rounded-[11px] bg-[#00c2ff] flex items-center justify-center text-white shadow-inner flex-shrink-0">
                        <Mail className="w-5.5 h-5.5 stroke-[2.2]" />
                      </div>
                      <span className="opacity-0 w-0 scale-95 group-hover:opacity-100 group-hover:w-auto group-hover:scale-100 transition-all duration-300 text-xs font-black tracking-wider uppercase text-[#00c2ff] pr-4 whitespace-nowrap">
                        Email
                      </span>
                    </a>

                    {/* WhatsApp (Green) */}
                    <a 
                      href={`https://wa.me/${(settings.whatsappBusiness || '+6283817745869').replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className={`group relative h-14 w-14 hover:w-38 rounded-2xl border-2 flex items-center pl-1.5 gap-2.5 transition-all duration-300 shadow-sm shrink-0 overflow-hidden ${
                        isDarkMode 
                          ? 'bg-[#121924]/80 border-[#2ebd59]/40 hover:border-[#2ebd59] hover:shadow-[0_4px_15px_rgba(46,189,89,0.25)]' 
                          : 'bg-white border-[#2ebd59]/40 hover:border-[#2ebd59] hover:shadow-[0_4px_15px_rgba(46,189,89,0.15)] shadow-slate-100'
                      }`}
                    >
                      <div className="w-[42px] h-[42px] rounded-[11px] bg-[#2ebd59] flex items-center justify-center text-white shadow-inner flex-shrink-0">
                        <WhatsAppCustomIcon className="w-5.5 h-5.5" />
                      </div>
                      <span className="opacity-0 w-0 scale-95 group-hover:opacity-100 group-hover:w-auto group-hover:scale-100 transition-all duration-300 text-xs font-black tracking-wider uppercase text-[#2ebd59] pr-4 whitespace-nowrap">
                        WhatsApp
                      </span>
                    </a>

                    {/* Instagram (Instagram gradient) */}
                    <a 
                      href={settings.instagramUrl || "https://instagram.com/fikrry_andi"}
                      target="_blank"
                      rel="noreferrer"
                      className={`group relative h-14 w-14 hover:w-38 rounded-2xl border-2 flex items-center pl-1.5 gap-2.5 transition-all duration-300 shadow-sm shrink-0 overflow-hidden ${
                        isDarkMode 
                          ? 'bg-[#121924]/80 border-[#ee2a7b]/40 hover:border-[#ee2a7b] hover:shadow-[0_4px_15px_rgba(238,42,123,0.25)]' 
                          : 'bg-white border-[#ee2a7b]/40 hover:border-[#ee2a7b] hover:shadow-[0_4px_15px_rgba(238,42,123,0.15)] shadow-slate-100'
                      }`}
                    >
                      <div className="w-[42px] h-[42px] rounded-[11px] bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center text-white shadow-inner flex-shrink-0">
                        <Instagram className="w-5.5 h-5.5 stroke-[2.2]" />
                      </div>
                      <span className="opacity-0 w-0 scale-95 group-hover:opacity-100 group-hover:w-auto group-hover:scale-100 transition-all duration-300 text-xs font-black tracking-wider uppercase text-[#ee2a7b] pr-4 whitespace-nowrap">
                        Instagram
                      </span>
                    </a>

                    {/* LinkedIn (Blue) */}
                    <a 
                      href={settings.linkedinUrl || "https://linkedin.com/in/fikri-yandi-18368529a"}
                      target="_blank"
                      rel="noreferrer"
                      className={`group relative h-14 w-14 hover:w-38 rounded-2xl border-2 flex items-center pl-1.5 gap-2.5 transition-all duration-300 shadow-sm shrink-0 overflow-hidden ${
                        isDarkMode 
                          ? 'bg-[#121924]/80 border-[#0077b5]/40 hover:border-[#0077b5] hover:shadow-[0_4px_15px_rgba(0,119,181,0.25)]' 
                          : 'bg-white border-[#0077b5]/40 hover:border-[#0077b5] hover:shadow-[0_4px_15px_rgba(0,119,181,0.15)] shadow-slate-100'
                      }`}
                    >
                      <div className="w-[42px] h-[42px] rounded-[11px] bg-[#0077b5] flex items-center justify-center text-white shadow-inner flex-shrink-0">
                        <Linkedin className="w-5.5 h-5.5 stroke-[2.2]" />
                      </div>
                      <span className="opacity-0 w-0 scale-95 group-hover:opacity-100 group-hover:w-auto group-hover:scale-100 transition-all duration-300 text-xs font-black tracking-wider uppercase text-[#0077b5] pr-4 whitespace-nowrap">
                        LinkedIn
                      </span>
                    </a>

                    {/* GitHub (Purple) */}
                    <a 
                      href={settings.githubUrl || "https://github.com/fikrryandi"}
                      target="_blank"
                      rel="noreferrer"
                      className={`group relative h-14 w-14 hover:w-36 rounded-2xl border-2 flex items-center pl-1.5 gap-2.5 transition-all duration-300 shadow-sm shrink-0 overflow-hidden ${
                        isDarkMode 
                          ? 'bg-[#121924]/80 border-[#a855f7]/40 hover:border-[#a855f7] hover:shadow-[0_4px_15px_rgba(168,85,247,0.25)]' 
                          : 'bg-white border-[#a855f7]/40 hover:border-[#a855f7] hover:shadow-[0_4px_15px_rgba(168,85,247,0.15)] shadow-slate-100'
                      }`}
                    >
                      <div className="w-[42px] h-[42px] rounded-[11px] bg-[#a855f7] flex items-center justify-center text-white shadow-inner flex-shrink-0">
                        <Github className="w-5.5 h-5.5 stroke-[2.2]" />
                      </div>
                      <span className="opacity-0 w-0 scale-95 group-hover:opacity-100 group-hover:w-auto group-hover:scale-100 transition-all duration-300 text-xs font-black tracking-wider uppercase text-[#a855f7] pr-4 whitespace-nowrap">
                        GitHub
                      </span>
                    </a>
                  </ScrollAnimate>

                  {/* Interactive Split Grid - Left: Map, Right: Form */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    
                    {/* Left Column: Map Box */}
                    <ScrollAnimate data-aos="fade-right" data-aos-delay="200" className={`lg:col-span-5 rounded-[30px] border overflow-hidden shadow-lg flex flex-col justify-between ${
                      isDarkMode ? 'bg-[#151c25] border-[#2e353f]/40' : 'bg-white border-slate-150 shadow-slate-100/60'
                    }`}>
                      {/* Warning translation bar */}
                      <div className="bg-[#fff3cd] border-b border-[#ffeeba] px-4 py-2 text-[10px] font-bold text-[#856404] flex justify-between items-center gap-3 select-none">
                        <p className="leading-snug">
                          {selectedLang === 'ID' ? 'Beberapa konten khusus peta tidak dapat dimuat.' : 'Some map features could not be loaded.'}
                        </p>
                      </div>

                      {/* Interactive map */}
                      <div className="relative w-full h-[300px] lg:h-full min-h-[300px] bg-slate-100 flex-grow">
                        <iframe 
                          title="User location Map"
                          src={settings.mapEmbedUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.8562305886567!2d107.43981557454848!3d-6.5398284639434415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e690ee0b4c8033d%3A0xe76e33fd43987f2!2sPurwakarta%2C%20West%2520Java!5e0!3m2!1sen!2sid!4v1716942100000!5m2!1sen!2sid"} 
                          className="w-full h-full border-0 absolute inset-0 z-0" 
                          allowFullScreen 
                          loading="lazy" 
                          referrerPolicy="no-referrer-when-downgrade"
                        />
                        <div className="absolute left-3 bottom-3 z-10">
                          <a 
                            href={settings.mapOpenUrl || "https://maps.google.com/?q=Purwakarta,West+Java,Indonesia"} 
                            target="_blank" 
                            rel="noreferrer"
                            className="bg-[#00c2ff] hover:bg-[#00abec] text-white font-extrabold text-[10px] px-3 py-1.5 rounded-lg flex items-center gap-1 shadow shadow-sky-500/30 transition-all active:scale-95"
                          >
                            {t.openedInMap}
                            <ArrowUpRight className="w-2.5 h-2.5" />
                          </a>
                        </div>
                      </div>
                    </ScrollAnimate>

                    {/* Right Column: Send Message Live Form with custom Title above */}
                    <ScrollAnimate data-aos="fade-left" data-aos-delay="300" className={`lg:col-span-7 p-6 sm:p-10 rounded-[35px] border flex flex-col justify-center ${
                      isDarkMode ? 'bg-[#151c25]/55 border-[#2e353f]/30' : 'bg-white border-slate-150 shadow-xl shadow-slate-100/40'
                    }`}>
                      <div className="space-y-6">
                        <div className="text-left">
                          <h3 className={`text-xl sm:text-2xl font-black ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                            {getContactFormTitleLabel()}
                          </h3>
                          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-slate-500'} mt-1`}>
                            {selectedLang === 'ID' ? 'Pesan Anda akan tersimpan langsung di database Admin Inbox.' : 'Your notes are securely recorded in the Admin Dashboard system.'}
                          </p>
                        </div>

                        <form onSubmit={handleContactSubmit} className="space-y-4">
                          <div>
                            <input 
                              type="text" 
                              required
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              className={`w-full border rounded-xl px-4 py-3.5 text-sm focus:border-[#00c2ff] outline-none transition-all ${
                                isDarkMode ? 'bg-[#18202b] border-[#2e353f]/80 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                              }`}
                              placeholder={t.namePlaceholder}
                            />
                          </div>
                          <div>
                            <input 
                              type="email" 
                              required
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              className={`w-full border rounded-xl px-4 py-3.5 text-sm focus:border-[#00c2ff] outline-none transition-all ${
                                isDarkMode ? 'bg-[#18202b] border-[#2e353f]/80 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                              }`}
                              placeholder={t.emailPlaceholder}
                            />
                          </div>
                          <div>
                            <textarea 
                              rows={5}
                              required
                              value={formData.message}
                              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                              className={`w-full border rounded-xl px-4 py-3.5 text-sm focus:border-[#00c2ff] outline-none transition-all resize-none ${
                                isDarkMode ? 'bg-[#18202b] border-[#2e353f]/80 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                              }`}
                              placeholder={t.msgPlaceholder}
                            />
                          </div>

                          {showFormSuccess && (
                            <div className="bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 p-4 rounded-xl text-xs font-bold transition-all animate-fade-in">
                              {t.successMsg}
                            </div>
                          )}

                          <button 
                            type="submit"
                            className="w-full bg-[#00c2ff] hover:bg-[#00abec] text-white font-extrabold py-3.5 rounded-xl shadow-md shadow-sky-500/15 active:scale-98 transition-all flex justify-center items-center gap-2 cursor-pointer text-sm"
                          >
                            {getContactFormBtnLabel()} <Send className="w-4 h-4" />
                          </button>
                        </form>
                      </div>
                    </ScrollAnimate>

                  </div>
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </main>

      {/* Modern footer area */}
      <footer className={`pt-12 pb-[100px] md:pb-12 border-t px-6 sm:px-10 transition-colors ${
        isDarkMode ? 'bg-[#080f17] border-[#2e353f]/50' : 'bg-white border-slate-200 shadow-inner'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-center items-center text-center">
          <span className={`text-sm font-bold ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>
            © 2026 {ownerName}. All rights reserved.
          </span>
        </div>
      </footer>

      {/* Case Study Modal Dialog */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-[fade-in_0.3s_ease-out]">
          <div className={`border rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl relative animate-[scale-up_0.3s_ease-out] ${
            isDarkMode ? 'bg-[#111827] border-[#2e353f]/65' : 'bg-white border-slate-200'
          }`}>
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute right-4 top-4 z-50 w-9 h-9 rounded-full bg-black/50 text-[#dce3f0] hover:text-white flex items-center justify-center shadow"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="overflow-y-auto overflow-x-hidden flex-1 rounded-3xl">
              <div className="w-full h-56 sm:h-64 relative bg-slate-950 overflow-hidden shrink-0">
              <ProjectImageCarousel 
                images={selectedProject.images && selectedProject.images.length > 0 ? selectedProject.images : [selectedProject.image]} 
                altText={selectedProject.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 sm:p-8 space-y-4">
              <h3 className={`text-xl sm:text-2xl font-black ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{selectedProject.title}</h3>
              
              <p className="text-[10px] font-bold text-[#00c2ff] uppercase tracking-wider">
                Client: {selectedProject.client} &bull; Published {selectedProject.dateAdded}
              </p>
              
              <div className="h-px bg-slate-200/50 my-2"></div>
              
              <p className={`text-xs sm:text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-slate-600'}`}>
                {selectedProject.description}
              </p>

              {/* Tags below description as "TEKNOLOGI YANG DIGUNAKAN" */}
              {selectedProject.tags && selectedProject.tags.length > 0 && (
                <div className={`pt-4 mt-4 border-t ${isDarkMode ? 'border-slate-800' : 'border-slate-100'}`}>
                  <div className={`text-[10px] font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    <Code className="w-3.5 h-3.5" />
                    TEKNOLOGI YANG DIGUNAKAN
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {selectedProject.tags.map((tag, tIdx) => {
                      const matchedSkill = skills.find(s => s.title.toLowerCase() === tag.toLowerCase());
                      return (
                        <span key={tIdx} className={`px-3 py-1.5 text-[11px] font-bold rounded-full transition-colors flex items-center gap-1.5 border ${isDarkMode ? 'bg-[#1e293b] text-slate-300 border-slate-700' : 'bg-slate-50 text-slate-700 border-slate-200'}`}>
                          {matchedSkill && (
                            <div className="flex items-center justify-center w-3.5 h-3.5 [&>svg]:w-full [&>svg]:h-full [&>img]:w-full [&>img]:h-full [&>img]:object-contain">
                              {getIconElement(matchedSkill.icon, matchedSkill.title)}
                            </div>
                          )}
                          {tag}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="h-px bg-slate-200/50 my-4"></div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                {selectedProject.liveUrl && (
                  <a 
                    href={selectedProject.liveUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex-grow flex justify-center items-center gap-2 bg-[#f59e0b] hover:bg-[#d97706] text-white font-bold py-3.5 rounded-xl transition-colors cursor-pointer text-sm shadow-md shadow-orange-500/20"
                  >
                    <ExternalLink className="w-4.5 h-4.5" />
                    Lihat Proyek Asli
                  </a>
                )}
                {selectedProject.githubUrl && (
                  <a 
                    href={selectedProject.githubUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className={`flex-shrink-0 flex justify-center items-center w-[52px] h-[52px] rounded-xl transition-colors cursor-pointer border ${
                      isDarkMode ? 'bg-[#1e293b] hover:bg-[#334155] text-white border-slate-700' : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                    }`}
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )}
              </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dynamic Toast Notification (Pemberitahuan Pesan Terkirim) */}
      <AnimatePresence>
        {showFormSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className={`fixed bottom-6 right-6 z-50 p-4 rounded-2xl shadow-xl flex items-start gap-3.5 max-w-sm border backdrop-blur-md ${
              isDarkMode 
                ? 'bg-[#121a24]/95 border-[#00c2ff]/30 text-[#dce3f0] shadow-sky-950/40' 
                : 'bg-white/95 border-emerald-500/20 text-slate-800 shadow-slate-200/50'
            }`}
          >
            <div className={`p-2 rounded-xl flex-shrink-0 ${isDarkMode ? 'bg-[#00c2ff]/10 text-[#00c2ff]' : 'bg-emerald-50 text-emerald-600'}`}>
              <CheckCircle2 className="w-5 h-5 animate-pulse" />
            </div>
            <div className="space-y-1">
              <h4 className="text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-[#00c2ff]">
                Pemberitahuan Sistem
              </h4>
              <p className="text-xs font-bold leading-relaxed">
                Pesan Anda telah berhasil dikirim!
              </p>
              <p className="text-[10px] opacity-70 leading-normal">
                Pesan telah diteruskan langsung ke email kontak & sistem database admin.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Certificate Lightbox Modal (High-Resolution Zoom) */}
      <AnimatePresence>
        {selectedCertImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-md"
            onClick={() => setSelectedCertImage(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              className="relative max-w-5xl w-full flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button with large hit area and nice hover animation */}
              <button 
                onClick={() => setSelectedCertImage(null)}
                className="absolute -top-12 sm:-top-16 right-0 sm:-right-2 p-3 text-white/70 hover:text-white transition-all hover:scale-110 cursor-pointer bg-slate-900/40 rounded-full border border-white/10 hover:border-white/30"
                title={selectedLang === 'ID' ? 'Tutup' : 'Close'}
              >
                <X className="w-6 h-6" />
              </button>

              {/* High-definition Image container with smooth scaling and no compression */}
              <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl border border-white/5 bg-slate-950 flex items-center justify-center p-1 sm:p-2">
                <img 
                  src={selectedCertImage} 
                  alt={selectedCertTitle || "Certificate Thumbnail"} 
                  className="w-full h-auto max-h-[75vh] object-contain rounded-xl select-none mx-auto opacity-100"
                  referrerPolicy="no-referrer"
                  style={{ imageRendering: 'auto' }}
                />
              </div>

              {/* Title / Description caption overlay below */}
              {selectedCertTitle && (
                <div className="mt-4 sm:mt-5 text-center max-w-2xl px-4">
                  <h4 className="text-sm sm:text-base font-black text-white uppercase tracking-widest">{selectedCertTitle}</h4>
                  <p className="text-[10px] sm:text-xs text-[#00c2ff] font-bold tracking-wider mt-1 sm:mt-1.5 uppercase">
                    {selectedLang === 'ID' ? 'Kualitas Gambar HD Asli • Klik di luar untuk menutup' : 'Original High Definition Quality • Click outside to close'}
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

