import React, { useState, useRef } from 'react';
import { SystemSettings } from '../types';
import { 
  Settings, 
  Save, 
  Sliders, 
  Trash2, 
  Sparkles, 
  CheckCircle, 
  RefreshCw,
  Upload,
  Image as ImageIcon,
  FileText,
  Instagram,
  Github
} from 'lucide-react';

interface AdminSettingsProps {
  settings: SystemSettings;
  onUpdateSettings: (settings: SystemSettings) => void;
  onResetToDefaults: () => void;
  onAskConfirm?: (title: string, message: string, onConfirm: () => void) => void;
  isDarkMode?: boolean;
}

// Helper to compress and downscale high-resolution uploaded images (such as phone camera captures)
// down to a highly portable, beautiful size (~2-10KB each) for contact icons in localStorage.
const compressIconImage = (base64Str: string, maxWidth = 120, maxHeight = 120, quality = 0.7): Promise<string> => {
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
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        
        const isTransparentFormat = base64Str.startsWith('data:image/png') || 
                                    base64Str.startsWith('data:image/webp') || 
                                    base64Str.startsWith('data:image/gif');
        const format = isTransparentFormat ? 'image/webp' : 'image/jpeg';
        resolve(canvas.toDataURL(format, isTransparentFormat ? 0.6 : quality));
      } else {
        resolve(base64Str);
      }
    };
    img.onerror = () => {
      resolve(base64Str);
    };
  });
};

const compressProfileImage = (base64Str: string, maxWidth = 1600, maxHeight = 1600, quality = 0.88): Promise<string> => {
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
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        
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


export default function AdminSettings({
  settings,
  onUpdateSettings,
  onResetToDefaults,
  onAskConfirm,
  isDarkMode = false
}: AdminSettingsProps) {
  const [ownerName, setOwnerName] = useState(settings.ownerName || 'Alex Vance');
  const [siteTitle, setSiteTitle] = useState(settings.siteTitle);
  const [metaDescription, setMetaDescription] = useState(settings.metaDescription);
  const [themeMode, setThemeMode] = useState(settings.themeMode);
  const [maintenanceMode, setMaintenanceMode] = useState(settings.maintenanceMode);
  const [contactEmail, setContactEmail] = useState(settings.contactEmail);
  const [whatsappBusiness, setWhatsappBusiness] = useState(settings.whatsappBusiness);
  const [linkedinUrl, setLinkedinUrl] = useState(settings.linkedinUrl);
  const [resumeFileName, setResumeFileName] = useState(settings.resumeFileName);
  const [profilePicUrl, setProfilePicUrl] = useState(settings.profilePicUrl !== undefined ? settings.profilePicUrl : 'https://lh3.googleusercontent.com/aida-public/AB6AXuBywFPLidaBKxly128lFry3QoA8KAiICg5Na3mCoPpupX45Ex1ICW44wyeRm1_Nc5B6f_X5X7ljd9YY5dZl1CqCkKCy59ATHLp_UIGHTfWPiF66DPqjUSaKD3UfD9OfeDyrFdap4IaL69NArW5LB_KlNo4A9XZ0nEYRGHyof8bdTFbGex9byhMcxrCw1dJlUL2izZKOuPgEhMNQ9tuMcbb8QIym6pMalXoDPBKQn3xPVibMVYnd1nLbZWEsk39LR3y8Ruwbw7J8_E8');
  const [profilePicUrlHome, setProfilePicUrlHome] = useState(settings.profilePicUrlHome !== undefined ? settings.profilePicUrlHome : 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRunyS1hH39mF_PeCr2TBxB4pfPOmmx_9sXVgaVCkwt19ux2hOr7TZ7c2y7DihVjt6CEFJDusVDsuerlYj8Zs8q_HNrEh2VJ33_DlLZtK2cqyraJWKSBhkzlEkW8L09SsTU0rFhdNYgMHWGj3PBadhRfT2MSwFi66cQK55p1isc5rJo7C6eln1VKwx-2BSl7-3YImFSlYxG-UPO08CXrLzXfjK0AJbJEzROA6zHiJDmwCk7gqw5x8KzQILvXVmmap_1Te3dSQGWe8');
  const [homeJobTitle, setHomeJobTitle] = useState(settings.homeJobTitle || 'Presiden Direktur PT Flexora Polymer');
  const [homeHeadingSubtitle, setHomeHeadingSubtitle] = useState(settings.homeHeadingSubtitle || 'Hello Mate 👋');
  const [adminUsername, setAdminUsername] = useState(settings.adminUsername || 'admin');
  const [adminPassword, setAdminPassword] = useState(settings.adminPassword || 'admin');
  const [instagramUrl, setInstagramUrl] = useState(settings.instagramUrl || 'https://instagram.com/fikrry_andi');
  const [githubUrl, setGithubUrl] = useState(settings.githubUrl || 'https://github.com/fikrryandi');
  const [cvUrl, setCvUrl] = useState(settings.cvUrl || '');
  const [cvFileName, setCvFileName] = useState(settings.cvFileName || 'Fikri_Yandi_CV.pdf');

  // Layout Management and Aesthetic Style Customization
  const [showHeroSection, setShowHeroSection] = useState(settings.showHeroSection !== false);
  const [showAboutSection, setShowAboutSection] = useState(settings.showAboutSection !== false);
  const [showSkillsSection, setShowSkillsSection] = useState(settings.showSkillsSection !== false);
  const [showCertificatesSection, setShowCertificatesSection] = useState(settings.showCertificatesSection !== false);
  const [showEducationSection, setShowEducationSection] = useState(settings.showEducationSection !== false);
  const [showExperienceSection, setShowExperienceSection] = useState(settings.showExperienceSection !== false);
  const [showProjectsSection, setShowProjectsSection] = useState(settings.showProjectsSection !== false);

  const [homeCardHandle, setHomeCardHandle] = useState(settings.homeCardHandle || '@dftvln');
  const [homeCardStatusText, setHomeCardStatusText] = useState(settings.homeCardStatusText || 'Online');
  const [homeCardStatusColor, setHomeCardStatusColor] = useState(settings.homeCardStatusColor || '#10b981');
  const [homeCardCreatorLabelID, setHomeCardCreatorLabelID] = useState(settings.homeCardCreatorLabelID || 'Kreator');
  const [homeCardCreatorLabelEN, setHomeCardCreatorLabelEN] = useState(settings.homeCardCreatorLabelEN || 'Creator');

  const [aboutNameCapsuleBg, setAboutNameCapsuleBg] = useState(settings.aboutNameCapsuleBg || '#3b82f6');
  const [aboutRoleCapsuleBg, setAboutRoleCapsuleBg] = useState(settings.aboutRoleCapsuleBg || '#10b981');

  const [skillsMarqueeSpeed, setSkillsMarqueeSpeed] = useState(settings.skillsMarqueeSpeed || 30);
  const [skillsMarqueeDirection, setSkillsMarqueeDirection] = useState(settings.skillsMarqueeDirection || 'left');

  // Map & Contact Custom Icon configuration states
  const [contactEmailIcon, setContactEmailIcon] = useState(settings.contactEmailIcon || '');
  const [whatsappBusinessIcon, setWhatsappBusinessIcon] = useState(settings.whatsappBusinessIcon || '');
  const [instagramUrlIcon, setInstagramUrlIcon] = useState(settings.instagramUrlIcon || '');
  const [linkedinUrlIcon, setLinkedinUrlIcon] = useState(settings.linkedinUrlIcon || '');
  const [githubUrlIcon, setGithubUrlIcon] = useState(settings.githubUrlIcon || '');
  const [mapEmbedUrl, setMapEmbedUrl] = useState(settings.mapEmbedUrl || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.8562305886567!2d107.43981557454848!3d-6.5398284639434415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e690ee0b4c8033d%3A0xe76e33fd43987f2!2sPurwakarta%2C%20West%20Java!5e0!3m2!1sen!2sid!4v1716942100000!5m2!1sen!2sid');
  const [mapOpenUrl, setMapOpenUrl] = useState(settings.mapOpenUrl || 'https://maps.google.com/?q=Purwakarta,West+Java,Indonesia');

  // SMTP Real-time Email notifications configuration settings
  const [smtpHost, setSmtpHost] = useState(settings.smtpHost || '');
  const [smtpPort, setSmtpPort] = useState(settings.smtpPort || '465');
  const [smtpUser, setSmtpUser] = useState(settings.smtpUser || '');
  const [smtpPass, setSmtpPass] = useState(settings.smtpPass || '');
  const [enableEmailNotify, setEnableEmailNotify] = useState(!!settings.enableEmailNotify);
  const [senderName, setSenderName] = useState(settings.senderName || 'Fikri Portfolio Form');

  // Page Menu navigation custom texts states
  const [menuHomeID, setMenuHomeID] = useState(settings.menuHomeID || 'HOME');
  const [menuHomeEN, setMenuHomeEN] = useState(settings.menuHomeEN || 'HOME');
  const [menuAboutID, setMenuAboutID] = useState(settings.menuAboutID || 'ABOUT');
  const [menuAboutEN, setMenuAboutEN] = useState(settings.menuAboutEN || 'ABOUT');
  const [menuPortfolioID, setMenuPortfolioID] = useState(settings.menuPortfolioID || 'PORTFOLIO');
  const [menuPortfolioEN, setMenuPortfolioEN] = useState(settings.menuPortfolioEN || 'PORTFOLIO');
  const [menuContactID, setMenuContactID] = useState(settings.menuContactID || 'CONTACT');
  const [menuContactEN, setMenuContactEN] = useState(settings.menuContactEN || 'CONTACT');
  const [menuHireMeID, setMenuHireMeID] = useState(settings.menuHireMeID || 'HIRE ME');
  const [menuHireMeEN, setMenuHireMeEN] = useState(settings.menuHireMeEN || 'HIRE ME');

  // Main headings, subheadings, bographies and taglines states
  const [aboutSectionTitleID, setAboutSectionTitleID] = useState(settings.aboutSectionTitleID || 'Pengalaman Profesional di Bidang Digital');
  const [aboutSectionTitleEN, setAboutSectionTitleEN] = useState(settings.aboutSectionTitleEN || 'Professional Experience in Digital Sphere');
  const [taglineID, setTaglineID] = useState(settings.taglineID || 'GRAPHIC DESIGNER, WEB DEVELOPER & VIDEO EDITOR');
  const [taglineEN, setTaglineEN] = useState(settings.taglineEN || 'GRAPHIC DESIGNER, WEB DEVELOPER & VIDEO EDITOR');
  const [aboutBioID, setAboutBioID] = useState(settings.aboutBioID || 'Berawal dari ketertarikan pada seni visual, saya menemukan passion sejati di dunia UI/UX dan Web Development. Lebih dari 5 tahun pengalaman di dunia desain digital.');
  const [aboutBioEN, setAboutBioEN] = useState(settings.aboutBioEN || 'Starting from an interest in visual arts, I found my true passion in UI/UX and Web Development. Over 5 years of digital design experience.');
  const [homeBioID, setHomeBioID] = useState(settings.homeBioID || 'Saya merupakan mahasiswa S1 Teknik Industri di Sekolah Tinggi Teknologi Wastukancana dengan ketertarikan pada bidang manajemen proses, PPIC, logistik, efisiensi operasional, serta pengembangan sistem digital. Saya memiliki pengalaman magang di PT Velasto Indonesia pada Department PPIC Delivery dan Department Komite, serta aktif dalam kegiatan kampus sebagai panitia MABIM Divisi Peralatan dan Sekretaris MUMAS. Di luar kegiatan akademik, saya juga mengembangkan website sederhana menggunakan Google Apps Script, Visual Studio Code, Cursor, Kiro, dan Antigravity.');
  const [homeBioEN, setHomeBioEN] = useState(settings.homeBioEN || 'I am a Bachelor of Industrial Engineering student at Sekolah Tinggi Teknologi Wastukancana with an interest in process management, PPIC, logistics, operational efficiency, and digital system development. I have internship experience at PT Velasto Indonesia in the PPIC Delivery Department and Committee Department, and am active in campus activities as a MABIM Equipment Division committee member and MUMAS Secretary. Outside of academic activities, I also develop simple websites using Google Apps Script, Visual Studio Code, Cursor, Kiro, and Antigravity.');

  // Custom static labels and CTA buttons states
  const [sectionAboutID, setSectionAboutID] = useState(settings.sectionAboutID || 'TENTANG SAYA');
  const [sectionAboutEN, setSectionAboutEN] = useState(settings.sectionAboutEN || 'ABOUT ME');
  const [btnViewWorkID, setBtnViewWorkID] = useState(settings.btnViewWorkID || 'Lihat Portfolio');
  const [btnViewWorkEN, setBtnViewWorkEN] = useState(settings.btnViewWorkEN || 'View Work');
  const [btnContactMeID, setBtnContactMeID] = useState(settings.btnContactMeID || 'Hubungi Saya');
  const [btnContactMeEN, setBtnContactMeEN] = useState(settings.btnContactMeEN || 'Contact Me');
  const [sectionSkillsID, setSectionSkillsID] = useState(settings.sectionSkillsID || 'Matriks Skill');
  const [sectionSkillsEN, setSectionSkillsEN] = useState(settings.sectionSkillsEN || 'Skill Matrix');
  const [sectionEducationID, setSectionEducationID] = useState(settings.sectionEducationID || 'Riwayat Pendidikan');
  const [sectionEducationEN, setSectionEducationEN] = useState(settings.sectionEducationEN || 'Education History');
  const [sectionCareerID, setSectionCareerID] = useState(settings.sectionCareerID || 'Rekam Jejak Karier');
  const [sectionCareerEN, setSectionCareerEN] = useState(settings.sectionCareerEN || 'Career Records');
  const [contactHubungiID, setContactHubungiID] = useState(settings.contactHubungiID || 'Hubungi Studio Kami');
  const [contactHubungiEN, setContactHubungiEN] = useState(settings.contactHubungiEN || 'Contact Our Studio');
  const [contactFormTitleID, setContactFormTitleID] = useState(settings.contactFormTitleID || 'Hubungi Saya Sekarang');
  const [contactFormTitleEN, setContactFormTitleEN] = useState(settings.contactFormTitleEN || 'Get In Touch Now');
  const [contactFormBtnID, setContactFormBtnID] = useState(settings.contactFormBtnID || 'Kirim Pesan');
  const [contactFormBtnEN, setContactFormBtnEN] = useState(settings.contactFormBtnEN || 'Send Message');

  const [profilePicDragActive, setProfilePicDragActive] = useState(false);
  const [profilePicHomeDragActive, setProfilePicHomeDragActive] = useState(false);
  const [cvDragActive, setCvDragActive] = useState(false);
  
  const profileFileInputRef = useRef<HTMLInputElement>(null);
  const profileHomeFileInputRef = useRef<HTMLInputElement>(null);
  const cvFileInputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (settings) {
      setSiteTitle(settings.siteTitle || 'Portofolio Fikrry');
      setMetaDescription(settings.metaDescription || '');
      setContactEmail(settings.contactEmail || '');
      setWhatsappBusiness(settings.whatsappBusiness || '');
      setLinkedinUrl(settings.linkedinUrl || '');
      setResumeFileName(settings.resumeFileName || 'Fikri_Yandi_CV.pdf');
      setOwnerName(settings.ownerName || 'Alex Vance');
      setProfilePicUrl(settings.profilePicUrl || '');
      setProfilePicUrlHome(settings.profilePicUrlHome || '');
      setHomeJobTitle(settings.homeJobTitle || '');
      setHomeHeadingSubtitle(settings.homeHeadingSubtitle || 'Hello Mate 👋');
      setInstagramUrl(settings.instagramUrl || '');
      setGithubUrl(settings.githubUrl || '');
      setCvUrl(settings.cvUrl || '');
      setCvFileName(settings.cvFileName || 'Fikri_Yandi_CV.pdf');
      setContactEmailIcon(settings.contactEmailIcon || '');
      setWhatsappBusinessIcon(settings.whatsappBusinessIcon || '');
      setInstagramUrlIcon(settings.instagramUrlIcon || '');
      setLinkedinUrlIcon(settings.linkedinUrlIcon || '');
      setGithubUrlIcon(settings.githubUrlIcon || '');
      setMapEmbedUrl(settings.mapEmbedUrl || '');
      setMapOpenUrl(settings.mapOpenUrl || '');
      
      setMenuHomeID(settings.menuHomeID || 'HOME');
      setMenuHomeEN(settings.menuHomeEN || 'HOME');
      setMenuAboutID(settings.menuAboutID || 'ABOUT');
      setMenuAboutEN(settings.menuAboutEN || 'ABOUT');
      setMenuPortfolioID(settings.menuPortfolioID || 'PORTFOLIO');
      setMenuPortfolioEN(settings.menuPortfolioEN || 'PORTFOLIO');
      setMenuContactID(settings.menuContactID || 'CONTACT');
      setMenuContactEN(settings.menuContactEN || 'CONTACT');
      setMenuHireMeID(settings.menuHireMeID || 'HIRE ME');
      setMenuHireMeEN(settings.menuHireMeEN || 'HIRE ME');
      
      setAboutSectionTitleID(settings.aboutSectionTitleID || 'Pengalaman Profesional di Bidang Digital');
      setAboutSectionTitleEN(settings.aboutSectionTitleEN || 'Professional Experience in Digital Sphere');
      setTaglineID(settings.taglineID || 'INDUSTRIAL ENGINEERING STUDENT');
      setTaglineEN(settings.taglineEN || 'INDUSTRIAL ENGINEERING STUDENT');
      setAboutBioID(settings.aboutBioID || '');
      setAboutBioEN(settings.aboutBioEN || '');
      setHomeBioID(settings.homeBioID || '');
      setHomeBioEN(settings.homeBioEN || '');
      
      setSectionAboutID(settings.sectionAboutID || 'TENTANG SAYA');
      setSectionAboutEN(settings.sectionAboutEN || 'ABOUT ME');
      setBtnViewWorkID(settings.btnViewWorkID || 'Lihat Portfolio');
      setBtnViewWorkEN(settings.btnViewWorkEN || 'View Work');
      setBtnContactMeID(settings.btnContactMeID || 'Hubungi Saya');
      setBtnContactMeEN(settings.btnContactMeEN || 'Contact Me');
      setSectionSkillsID(settings.sectionSkillsID || 'Matriks Skill');
      setSectionSkillsEN(settings.sectionSkillsEN || 'Skill Matrix');
      setSectionEducationID(settings.sectionEducationID || 'Riwayat Pendidikan');
      setSectionEducationEN(settings.sectionEducationEN || 'Education History');
      setSectionCareerID(settings.sectionCareerID || 'Rekam Jejak Karier');
      setSectionCareerEN(settings.sectionCareerEN || 'Career Records');
      setContactHubungiID(settings.contactHubungiID || 'Hubungi Studio Kami');
      setContactHubungiEN(settings.contactHubungiEN || 'Contact Our Studio');
      setContactFormTitleID(settings.contactFormTitleID || 'Hubungi Saya Sekarang');
      setContactFormTitleEN(settings.contactFormTitleEN || 'Get In Touch Now');
      setContactFormBtnID(settings.contactFormBtnID || 'Kirim Pesan');
      setContactFormBtnEN(settings.contactFormBtnEN || 'Send Message');
    }
  }, [settings]);

  const handleCvFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setCvUrl(reader.result);
          setCvFileName(file.name);
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
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          compressProfileImage(reader.result).then(compressed => {
            setProfilePicUrl(compressed);
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setProfilePicDragActive(true);
    } else if (e.type === "dragleave") {
      setProfilePicDragActive(false);
    }
  };

  const handleProfileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setProfilePicDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          compressProfileImage(reader.result).then(compressed => {
            setProfilePicUrl(compressed);
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileHomeFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          compressProfileImage(reader.result).then(compressed => {
            setProfilePicUrlHome(compressed);
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileHomeDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setProfilePicHomeDragActive(true);
    } else if (e.type === "dragleave") {
      setProfilePicHomeDragActive(false);
    }
  };

  const handleProfileHomeDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setProfilePicHomeDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          compressProfileImage(reader.result).then(compressed => {
            setProfilePicUrlHome(compressed);
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings({
      ...settings,
      ownerName,
      siteTitle,
      metaDescription,
      themeMode,
      maintenanceMode,
      contactEmail,
      whatsappBusiness,
      linkedinUrl,
      resumeFileName,
      profilePicUrl,
      profilePicUrlHome,
      homeJobTitle,
      homeHeadingSubtitle,
      adminUsername,
      adminPassword,
      instagramUrl,
      githubUrl,
      cvUrl,
      cvFileName,
      contactEmailIcon,
      whatsappBusinessIcon,
      instagramUrlIcon,
      linkedinUrlIcon,
      githubUrlIcon,
      mapEmbedUrl,
      mapOpenUrl,
      smtpHost,
      smtpPort,
      smtpUser,
      smtpPass,
      enableEmailNotify,
      senderName,
      // Custom menu nav
      menuHomeID,
      menuHomeEN,
      menuAboutID,
      menuAboutEN,
      menuPortfolioID,
      menuPortfolioEN,
      menuContactID,
      menuContactEN,
      menuHireMeID,
      menuHireMeEN,
      // Main headings & taglines
      aboutSectionTitleID,
      aboutSectionTitleEN,
      taglineID,
      taglineEN,
      aboutBioID,
      aboutBioEN,
      homeBioID,
      homeBioEN,
      // Section labels & buttons
      sectionAboutID,
      sectionAboutEN,
      btnViewWorkID,
      btnViewWorkEN,
      btnContactMeID,
      btnContactMeEN,
      sectionSkillsID,
      sectionSkillsEN,
      sectionEducationID,
      sectionEducationEN,
      sectionCareerID,
      sectionCareerEN,
      contactHubungiID,
      contactHubungiEN,
      contactFormTitleID,
      contactFormTitleEN,
      contactFormBtnID,
      contactFormBtnEN,

      // Layout management states
      showHeroSection,
      showAboutSection,
      showSkillsSection,
      showCertificatesSection,
      showEducationSection,
      showExperienceSection,
      showProjectsSection,
      homeCardHandle,
      homeCardStatusText,
      homeCardStatusColor,
      homeCardCreatorLabelID,
      homeCardCreatorLabelEN,
      aboutNameCapsuleBg,
      aboutRoleCapsuleBg,
      skillsMarqueeSpeed,
      skillsMarqueeDirection
    });

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
    }, 4000);
  };

  const handleReset = () => {
    const performReset = () => {
      onResetToDefaults();
      // Reload states with hard defaults
      setOwnerName('Fikri Yandi');
      setSiteTitle('Portofolio Fikrry');
      setMetaDescription('Saya adalah seorang profesional yang siap membantu menciptakan identitas digital impian bisnis Anda dengan hasil memukau.');
      setThemeMode('light');
      setMaintenanceMode(false);
      setContactEmail('fikrryandi@gmail.com');
      setWhatsappBusiness('+62 838-1774-5869');
      setLinkedinUrl('https://linkedin.com/in/fikri-yandi-18368529a');
      setResumeFileName('Fikri_Yandi_CV.pdf');
      setProfilePicUrl('https://lh3.googleusercontent.com/aida-public/AB6AXuBywFPLidaBKxly128lFry3QoA8KAiICg5Na3mCoPpupX45Ex1ICW44wyeRm1_Nc5B6f_X5X7ljd9YY5dZl1CqCkKCy59ATHLp_UIGHTfWPiF66DPqjUSaKD3UfD9OfeDyrFdap4IaL69NArW5LB_KlNo4A9XZ0nEYRGHyof8bdTFbGex9byhMcxrCw1dJlUL2izZKOuPgEhMNQ9tuMcbb8QIym6pMalXoDPBKQn3xPVibMVYnd1nLbZWEsk39LR3y8Ruwbw7J8_E8');
      setProfilePicUrlHome('https://lh3.googleusercontent.com/aida-public/AB6AXuCRunyS1hH39mF_PeCr2TBxB4pfPOmmx_9sXVgaVCkwt19ux2hOr7TZ7c2y7DihVjt6CEFJDusVDsuerlYj8Zs8q_HNrEh2VJ33_DlLZtK2cqyraJWKSBhkzlEkW8L09SsTU0rFhdNYgMHWGj3PBadhRfT2MSwFi66cQK55p1isc5rJo7C6eln1VKwx-2BSl7-3YImFSlYxG-UPO08CXrLzXfjK0AJbJEzROA6zHiJDmwCk7gqw5x8KzQILvXVmmap_1Te3dSQGWe8');
      setHomeJobTitle('Presiden Direktur PT Flexora Polymer');
      setHomeHeadingSubtitle('Hello Mate 👋');
      setHomeCardHandle('@dftvln');
      setHomeCardStatusText('Online');
      setHomeCardStatusColor('#10b981');
      setHomeCardCreatorLabelID('Kreator');
      setHomeCardCreatorLabelEN('Creator');
      setAdminUsername('admin');
      setAdminPassword('admin');
      setInstagramUrl('https://instagram.com/fikrry_andi');
      setGithubUrl('https://github.com/fikrryandi');
      setCvUrl('');
      setCvFileName('Fikri_Yandi_CV.pdf');
      setContactEmailIcon('');
      setWhatsappBusinessIcon('');
      setInstagramUrlIcon('');
      setLinkedinUrlIcon('');
      setGithubUrlIcon('');
      setMapEmbedUrl('https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.8562305886567!2d107.43981557454848!3d-6.5398284639434415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e690ee0b4c8033d%3A0xe76e33fd43987f2!2sPurwakarta%2C%20West%20Java!5e0!3m2!1sen!2sid!4v1716942100000!5m2!1sen!2sid');
      setMapOpenUrl('https://maps.google.com/?q=Purwakarta,West+Java,Indonesia');
      setSmtpHost('');
      setSmtpPort('465');
      setSmtpUser('');
      setSmtpPass('');
      setEnableEmailNotify(false);
      setSenderName('Fikri Portfolio Form');
      
      // Reset custom navigation states
      setMenuHomeID('HOME');
      setMenuHomeEN('HOME');
      setMenuAboutID('ABOUT');
      setMenuAboutEN('ABOUT');
      setMenuPortfolioID('PORTFOLIO');
      setMenuPortfolioEN('PORTFOLIO');
      setMenuContactID('CONTACT');
      setMenuContactEN('CONTACT');
      setMenuHireMeID('HIRE ME');
      setMenuHireMeEN('HIRE ME');

      // Reset main headings states
      setAboutSectionTitleID('Pengalaman Profesional di Bidang Digital');
      setAboutSectionTitleEN('Professional Experience in Digital Sphere');
      setTaglineID('GRAPHIC DESIGNER, WEB DEVELOPER & VIDEO EDITOR');
      setTaglineEN('GRAPHIC DESIGNER, WEB DEVELOPER & VIDEO EDITOR');
      setAboutBioID('Berawal dari ketertarikan pada seni visual, saya menemukan passion sejati di dunia UI/UX dan Web Development. Lebih dari 5 tahun pengalaman di dunia desain digital.');
      setAboutBioEN('Starting from an interest in visual arts, I found my true passion in UI/UX and Web Development. Over 5 years of digital design experience.');

      // Reset static labels states
      setSectionAboutID('TENTANG SAYA');
      setSectionAboutEN('ABOUT ME');
      setBtnViewWorkID('Lihat Portfolio');
      setBtnViewWorkEN('View Work');
      setBtnContactMeID('Hubungi Saya');
      setBtnContactMeEN('Contact Me');
      setSectionSkillsID('Matriks Skill');
      setSectionSkillsEN('Skill Matrix');
      setSectionEducationID('Riwayat Pendidikan');
      setSectionEducationEN('Education History');
      setSectionCareerID('Rekam Jejak Karier');
      setSectionCareerEN('Career Records');
      setContactHubungiID('Hubungi Studio Kami');
      setContactHubungiEN('Contact Our Studio');
      setContactFormTitleID('Hubungi Saya Sekarang');
      setContactFormTitleEN('Get In Touch Now');
      setContactFormBtnID('Kirim Pesan');
      setContactFormBtnEN('Send Message');
    };

    if (onAskConfirm) {
      onAskConfirm(
        'Setel Ulang Pengaturan',
        'Apakah Anda yakin ingin menyetel ulang semua pengaturan situs ke bawaan aslinya?',
        performReset
      );
    } else {
      if (confirm('Are you sure you want to reset all site configuration fields to defaults?')) {
        performReset();
      }
    }
  };

  return (
    <div className={`space-y-6 animate-[fade-in_0.3s_ease-out] max-w-4xl ${isDarkMode ? 'text-[#dce3f0]' : 'text-slate-700'}`}>
      <div>
        <h2 className={`text-2xl font-bold tracking-tight flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-[#0f172a]'}`}>
          <Settings className="text-[#adc6ff] w-6 h-6" />
          System & Brand Configurations
        </h2>
        <p className={`text-sm ${isDarkMode ? 'text-[#8c909f]' : 'text-slate-500'}`}>Configure metadata descriptors, site-wide landing accents, connection points, and resume links.</p>
      </div>

      <form onSubmit={handleSubmit} className={`border p-6 sm:p-8 space-y-6 rounded-xl text-left ${
        isDarkMode ? 'bg-[#111827]/75 border-[#2e353f]' : 'bg-white border-slate-200 shadow-sm shadow-slate-100/30'
      }`}>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className={`block text-[10px] font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-[#c2c6d6]' : 'text-slate-500'}`}>Owner Name (Landing Page Display)</label>
            <input 
              type="text" 
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              className={`w-full rounded px-3 py-2 text-sm outline-none transition-all ${
                isDarkMode 
                  ? 'bg-[#18202b] border border-[#2e353f] text-white focus:border-purple-500' 
                  : 'bg-slate-50 border border-slate-200 text-slate-800 focus:border-purple-500 focus:bg-white'
              }`} 
              placeholder="e.g. Alex Vance"
            />
          </div>

          <div>
            <label className={`block text-[10px] font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-[#c2c6d6]' : 'text-slate-500'}`}>Portfolio/Site Title Header</label>
            <input 
              type="text"  
              value={siteTitle}
              onChange={(e) => setSiteTitle(e.target.value)}
              className={`w-full rounded px-3 py-2 text-sm outline-none transition-all ${
                isDarkMode 
                  ? 'bg-[#18202b] border border-[#2e353f] text-white focus:border-purple-500' 
                  : 'bg-slate-50 border border-slate-200 text-slate-800 focus:border-purple-500 focus:bg-white'
              }`} 
            />
          </div>

          <div>
            <label className={`block text-[10px] font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-[#c2c6d6]' : 'text-slate-500'}`}>Resume File Link/Accents</label>
            <input 
              type="text" 
              value={resumeFileName}
              onChange={(e) => setResumeFileName(e.target.value)}
              className={`w-full rounded px-3 py-2 text-sm outline-none transition-all ${
                isDarkMode 
                  ? 'bg-[#18202b] border border-[#2e353f] text-white focus:border-purple-500' 
                  : 'bg-slate-50 border border-slate-200 text-slate-800 focus:border-purple-500 focus:bg-white'
              }`} 
            />
          </div>
        </div>

        <div>
          <label className={`block text-[10px] font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-[#c2c6d6]' : 'text-slate-500'}`}>Site Intro Description</label>
          <textarea 
            rows={3} 
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)}
            className={`w-full rounded px-3 py-2 text-sm outline-none resize-none transition-all ${
              isDarkMode 
                ? 'bg-[#18202b] border border-[#2e353f] text-white focus:border-purple-500' 
                : 'bg-slate-50 border border-slate-200 text-slate-800 focus:border-purple-500 focus:bg-white'
            }`} 
          ></textarea>
        </div>

        <div className={`h-px ${isDarkMode ? 'bg-[#2e353f]/50' : 'bg-slate-100'}`}></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={`block text-[10px] font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-[#c2c6d6]' : 'text-slate-500'}`}>Contact Link / Email Address</label>
            <input 
              type="email" 
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              className={`w-full rounded px-3 py-2 text-sm outline-none transition-all ${
                isDarkMode 
                  ? 'bg-[#18202b] border border-[#2e353f] text-white focus:border-purple-500' 
                  : 'bg-slate-50 border border-slate-200 text-slate-800 focus:border-purple-500 focus:bg-white'
              }`} 
            />
          </div>

          <div>
            <label className={`block text-[10px] font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-[#c2c6d6]' : 'text-slate-500'}`}>WhatsApp Business Hotline</label>
            <input 
              type="text" 
              value={whatsappBusiness}
              onChange={(e) => setWhatsappBusiness(e.target.value)}
              className={`w-full rounded px-3 py-2 text-sm outline-none transition-all ${
                isDarkMode 
                  ? 'bg-[#18202b] border border-[#2e353f] text-white focus:border-purple-500' 
                  : 'bg-slate-50 border border-slate-200 text-slate-800 focus:border-purple-500 focus:bg-white'
              }`} 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={`block text-[10px] font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-[#c2c6d6]' : 'text-slate-500'}`}>LinkedIn Resource URI</label>
            <input 
              type="text" 
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              className={`w-full rounded px-3 py-2 text-sm outline-none transition-all ${
                isDarkMode 
                  ? 'bg-[#18202b] border border-[#2e353f] text-white focus:border-purple-500' 
                  : 'bg-slate-50 border border-slate-200 text-slate-800 focus:border-purple-500 focus:bg-white'
              }`} 
            />
          </div>

          <div>
            <label className={`block text-[10px] font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-[#c2c6d6]' : 'text-slate-500'}`}>System Level Access / Status</label>
            <div className="text-left flex gap-4 pt-2">
              <label className={`flex items-center gap-2 cursor-pointer text-xs font-semibold ${isDarkMode ? 'text-[#c2c6d6]' : 'text-slate-650'}`}>
                <input 
                  type="checkbox" 
                  checked={maintenanceMode}
                  onChange={(e) => setMaintenanceMode(e.target.checked)}
                  className="accent-purple-500 w-4 h-4 rounded"
                /> Show Maintenance Banner
              </label>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={`block text-[10px] font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-[#c2c6d6]' : 'text-slate-500'}`}>Instagram Resource URL (Link IG)</label>
            <input 
              type="text" 
              value={instagramUrl}
              onChange={(e) => setInstagramUrl(e.target.value)}
              className={`w-full rounded px-3 py-2 text-sm outline-none transition-all ${
                isDarkMode 
                  ? 'bg-[#18202b] border border-[#2e353f] text-white focus:border-purple-500' 
                  : 'bg-slate-50 border border-slate-200 text-slate-800 focus:border-purple-500 focus:bg-white'
              }`} 
              placeholder="https://instagram.com/fikrry_andi"
            />
          </div>

          <div>
            <label className={`block text-[10px] font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-[#c2c6d6]' : 'text-slate-500'}`}>GitHub Resource URL (Link GitHub)</label>
            <input 
              type="text" 
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              className={`w-full rounded px-3 py-2 text-sm outline-none transition-all ${
                isDarkMode 
                  ? 'bg-[#18202b] border border-[#2e353f] text-white focus:border-purple-500' 
                  : 'bg-slate-50 border border-slate-200 text-slate-800 focus:border-purple-500 focus:bg-white'
              }`} 
              placeholder="https://github.com/fikrryandi"
            />
          </div>
        </div>

        <div className={`h-px ${isDarkMode ? 'bg-[#2e353f]/50' : 'bg-slate-100'}`}></div>

        {/* ✍️ CUSTOM TEXTS & TRANSLATIONS (CUSTOMISASI SETIAP TEKS & BAHASA) */}
        <div className="space-y-6">
          <div>
            <h3 className={`text-base font-extrabold uppercase tracking-wider mb-1 flex items-center gap-1.5 ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>
              ✍️ Custom Texts & Multi-language Translations
            </h3>
            <p className={`text-xs ${isDarkMode ? 'text-[#8c909f]' : 'text-slate-500'}`}>
              Sesuaikan setiap teks penting, label menu, sub-judul, tombol, dan biografi Anda untuk versi Bahasa Indonesia (ID) maupun Bahasa Inggris (EN).
            </p>
          </div>

          {/* Navigasi / Menu Labels Section */}
          <div className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-[#161d26]/40 border-[#2e353f]/30' : 'bg-slate-50/50 border-slate-100 shadow-sm'}`}>
            <h4 className={`text-xs font-extrabold uppercase tracking-widest text-[#00c2ff] mb-4`}>
              1. Menu Navigation Labels
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              {/* Home */}
              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${isDarkMode ? 'text-[#c2c6d6]' : 'text-slate-500'}`}>Menu HOME (ID)</label>
                <input type="text" value={menuHomeID} onChange={(e) => setMenuHomeID(e.target.value)} className={`w-full rounded px-3 py-2 text-sm outline-none transition-all ${isDarkMode ? 'bg-[#18202b] border border-[#2e353f] text-white focus:border-purple-500' : 'bg-slate-50 border border-slate-200 text-slate-800 focus:border-purple-500 focus:bg-white'}`} />
              </div>
              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${isDarkMode ? 'text-[#c2c6d6]' : 'text-slate-500'}`}>Menu HOME (EN)</label>
                <input type="text" value={menuHomeEN} onChange={(e) => setMenuHomeEN(e.target.value)} className={`w-full rounded px-3 py-2 text-sm outline-none transition-all ${isDarkMode ? 'bg-[#18202b] border border-[#2e353f] text-white focus:border-purple-500' : 'bg-slate-50 border border-slate-200 text-slate-800 focus:border-purple-500 focus:bg-white'}`} />
              </div>

              {/* About */}
              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${isDarkMode ? 'text-[#c2c6d6]' : 'text-slate-500'}`}>Menu ABOUT (ID)</label>
                <input type="text" value={menuAboutID} onChange={(e) => setMenuAboutID(e.target.value)} className={`w-full rounded px-3 py-2 text-sm outline-none transition-all ${isDarkMode ? 'bg-[#18202b] border border-[#2e353f] text-white focus:border-purple-500' : 'bg-slate-50 border border-slate-200 text-slate-800 focus:border-purple-500 focus:bg-white'}`} />
              </div>
              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${isDarkMode ? 'text-[#c2c6d6]' : 'text-slate-500'}`}>Menu ABOUT (EN)</label>
                <input type="text" value={menuAboutEN} onChange={(e) => setMenuAboutEN(e.target.value)} className={`w-full rounded px-3 py-2 text-sm outline-none transition-all ${isDarkMode ? 'bg-[#18202b] border border-[#2e353f] text-white focus:border-purple-500' : 'bg-slate-50 border border-slate-200 text-slate-800 focus:border-purple-500 focus:bg-white'}`} />
              </div>

              {/* Portfolio */}
              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${isDarkMode ? 'text-[#c2c6d6]' : 'text-slate-500'}`}>Menu PORTFOLIO (ID)</label>
                <input type="text" value={menuPortfolioID} onChange={(e) => setMenuPortfolioID(e.target.value)} className={`w-full rounded px-3 py-2 text-sm outline-none transition-all ${isDarkMode ? 'bg-[#18202b] border border-[#2e353f] text-white focus:border-purple-500' : 'bg-slate-50 border border-slate-200 text-slate-800 focus:border-purple-500 focus:bg-white'}`} />
              </div>
              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${isDarkMode ? 'text-[#c2c6d6]' : 'text-slate-500'}`}>Menu PORTFOLIO (EN)</label>
                <input type="text" value={menuPortfolioEN} onChange={(e) => setMenuPortfolioEN(e.target.value)} className={`w-full rounded px-3 py-2 text-sm outline-none transition-all ${isDarkMode ? 'bg-[#18202b] border border-[#2e353f] text-white focus:border-purple-500' : 'bg-slate-50 border border-slate-200 text-slate-800 focus:border-purple-500 focus:bg-white'}`} />
              </div>

              {/* Contact */}
              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${isDarkMode ? 'text-[#c2c6d6]' : 'text-slate-500'}`}>Menu CONTACT (ID)</label>
                <input type="text" value={menuContactID} onChange={(e) => setMenuContactID(e.target.value)} className={`w-full rounded px-3 py-2 text-sm outline-none transition-all ${isDarkMode ? 'bg-[#18202b] border border-[#2e353f] text-white focus:border-purple-500' : 'bg-slate-50 border border-slate-200 text-slate-800 focus:border-purple-500 focus:bg-white'}`} />
              </div>
              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${isDarkMode ? 'text-[#c2c6d6]' : 'text-slate-500'}`}>Menu CONTACT (EN)</label>
                <input type="text" value={menuContactEN} onChange={(e) => setMenuContactEN(e.target.value)} className={`w-full rounded px-3 py-2 text-sm outline-none transition-all ${isDarkMode ? 'bg-[#18202b] border border-[#2e353f] text-white focus:border-purple-500' : 'bg-slate-50 border border-slate-200 text-slate-800 focus:border-purple-500 focus:bg-white'}`} />
              </div>

              {/* Hire Me */}
              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${isDarkMode ? 'text-[#c2c6d6]' : 'text-slate-500'}`}>Menu Button HIRE ME (ID)</label>
                <input type="text" value={menuHireMeID} onChange={(e) => setMenuHireMeID(e.target.value)} className={`w-full rounded px-3 py-2 text-sm outline-none transition-all ${isDarkMode ? 'bg-[#18202b] border border-[#2e353f] text-white focus:border-purple-500' : 'bg-slate-50 border border-slate-200 text-slate-800 focus:border-purple-500 focus:bg-white'}`} />
              </div>
              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${isDarkMode ? 'text-[#c2c6d6]' : 'text-slate-500'}`}>Menu Button HIRE ME (EN)</label>
                <input type="text" value={menuHireMeEN} onChange={(e) => setMenuHireMeEN(e.target.value)} className={`w-full rounded px-3 py-2 text-sm outline-none transition-all ${isDarkMode ? 'bg-[#18202b] border border-[#2e353f] text-white focus:border-purple-500' : 'bg-slate-50 border border-slate-200 text-slate-800 focus:border-purple-500 focus:bg-white'}`} />
              </div>
            </div>
          </div>



          {/* Section labels & Buttons Details */}
          <div className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-[#161d26]/40 border-[#2e353f]/30' : 'bg-slate-50/50 border-slate-100 shadow-sm'}`}>
            <h4 className={`text-xs font-extrabold uppercase tracking-widest text-[#00c2ff] mb-4`}>
              3. Section Headers, Custom Labels & Action Buttons
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              {/* sectionAbout */}
              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${isDarkMode ? 'text-[#c2c6d6]' : 'text-slate-500'}`}>Section Header 'About Me/Tentang Saya' (ID)</label>
                <input type="text" value={sectionAboutID} onChange={(e) => setSectionAboutID(e.target.value)} className={`w-full rounded px-3 py-2 text-sm outline-none transition-all ${isDarkMode ? 'bg-[#18202b] border border-[#2e353f] text-white focus:border-purple-500' : 'bg-slate-50 border border-slate-200 text-slate-800 focus:border-purple-500 focus:bg-white'}`} />
              </div>
              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${isDarkMode ? 'text-[#c2c6d6]' : 'text-slate-500'}`}>Section Header 'About Me/Tentang Saya' (EN)</label>
                <input type="text" value={sectionAboutEN} onChange={(e) => setSectionAboutEN(e.target.value)} className={`w-full rounded px-3 py-2 text-sm outline-none transition-all ${isDarkMode ? 'bg-[#18202b] border border-[#2e353f] text-white focus:border-purple-500' : 'bg-slate-50 border border-slate-200 text-slate-800 focus:border-purple-500 focus:bg-white'}`} />
              </div>

              {/* btnViewWork */}
              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${isDarkMode ? 'text-[#c2c6d6]' : 'text-slate-500'}`}>Tombol 'Lihat Portfolio' (ID)</label>
                <input type="text" value={btnViewWorkID} onChange={(e) => setBtnViewWorkID(e.target.value)} className={`w-full rounded px-3 py-2 text-sm outline-none transition-all ${isDarkMode ? 'bg-[#18202b] border border-[#2e353f] text-white focus:border-purple-500' : 'bg-slate-50 border border-slate-200 text-slate-800 focus:border-purple-500 focus:bg-white'}`} />
              </div>
              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${isDarkMode ? 'text-[#c2c6d6]' : 'text-slate-500'}`}>Tombol 'Lihat Portfolio' (EN)</label>
                <input type="text" value={btnViewWorkEN} onChange={(e) => setBtnViewWorkEN(e.target.value)} className={`w-full rounded px-3 py-2 text-sm outline-none transition-all ${isDarkMode ? 'bg-[#18202b] border border-[#2e353f] text-white focus:border-purple-500' : 'bg-slate-50 border border-slate-200 text-slate-800 focus:border-purple-500 focus:bg-white'}`} />
              </div>

              {/* btnContactMe */}
              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${isDarkMode ? 'text-[#c2c6d6]' : 'text-slate-500'}`}>Tombol 'Hubungi Saya' (ID)</label>
                <input type="text" value={btnContactMeID} onChange={(e) => setBtnContactMeID(e.target.value)} className={`w-full rounded px-3 py-2 text-sm outline-none transition-all ${isDarkMode ? 'bg-[#18202b] border border-[#2e353f] text-white focus:border-purple-500' : 'bg-slate-50 border border-slate-200 text-slate-800 focus:border-purple-500 focus:bg-white'}`} />
              </div>
              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${isDarkMode ? 'text-[#c2c6d6]' : 'text-slate-500'}`}>Tombol 'Hubungi Saya' (EN)</label>
                <input type="text" value={btnContactMeEN} onChange={(e) => setBtnContactMeEN(e.target.value)} className={`w-full rounded px-3 py-2 text-sm outline-none transition-all ${isDarkMode ? 'bg-[#18202b] border border-[#2e353f] text-white focus:border-purple-500' : 'bg-slate-50 border border-slate-200 text-slate-800 focus:border-purple-500 focus:bg-white'}`} />
              </div>

              {/* sectionSkills */}
              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${isDarkMode ? 'text-[#c2c6d6]' : 'text-slate-500'}`}>Heading 'Matriks Skill' (ID)</label>
                <input type="text" value={sectionSkillsID} onChange={(e) => setSectionSkillsID(e.target.value)} className={`w-full rounded px-3 py-2 text-sm outline-none transition-all ${isDarkMode ? 'bg-[#18202b] border border-[#2e353f] text-white focus:border-purple-500' : 'bg-slate-50 border border-slate-200 text-slate-800 focus:border-purple-500 focus:bg-white'}`} />
              </div>
              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${isDarkMode ? 'text-[#c2c6d6]' : 'text-slate-500'}`}>Heading 'Matriks Skill' (EN)</label>
                <input type="text" value={sectionSkillsEN} onChange={(e) => setSectionSkillsEN(e.target.value)} className={`w-full rounded px-3 py-2 text-sm outline-none transition-all ${isDarkMode ? 'bg-[#18202b] border border-[#2e353f] text-white focus:border-purple-500' : 'bg-slate-50 border border-slate-200 text-slate-800 focus:border-purple-500 focus:bg-white'}`} />
              </div>

              {/* sectionEducation */}
              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${isDarkMode ? 'text-[#c2c6d6]' : 'text-slate-500'}`}>Heading 'Riwayat Pendidikan' (ID)</label>
                <input type="text" value={sectionEducationID} onChange={(e) => setSectionEducationID(e.target.value)} className={`w-full rounded px-3 py-2 text-sm outline-none transition-all ${isDarkMode ? 'bg-[#18202b] border border-[#2e353f] text-white focus:border-purple-500' : 'bg-slate-50 border border-slate-200 text-slate-800 focus:border-purple-500 focus:bg-white'}`} />
              </div>
              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${isDarkMode ? 'text-[#c2c6d6]' : 'text-slate-500'}`}>Heading 'Riwayat Pendidikan' (EN)</label>
                <input type="text" value={sectionEducationEN} onChange={(e) => setSectionEducationEN(e.target.value)} className={`w-full rounded px-3 py-2 text-sm outline-none transition-all ${isDarkMode ? 'bg-[#18202b] border border-[#2e353f] text-white focus:border-purple-500' : 'bg-slate-50 border border-slate-200 text-slate-800 focus:border-purple-500 focus:bg-white'}`} />
              </div>

              {/* sectionCareer */}
              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${isDarkMode ? 'text-[#c2c6d6]' : 'text-slate-500'}`}>Heading 'Rekam Jejak Karier' (ID)</label>
                <input type="text" value={sectionCareerID} onChange={(e) => setSectionCareerID(e.target.value)} className={`w-full rounded px-3 py-2 text-sm outline-none transition-all ${isDarkMode ? 'bg-[#18202b] border border-[#2e353f] text-white focus:border-purple-500' : 'bg-slate-50 border border-slate-200 text-slate-800 focus:border-purple-500 focus:bg-white'}`} />
              </div>
              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${isDarkMode ? 'text-[#c2c6d6]' : 'text-slate-500'}`}>Heading 'Rekam Jejak Karier' (EN)</label>
                <input type="text" value={sectionCareerEN} onChange={(e) => setSectionCareerEN(e.target.value)} className={`w-full rounded px-3 py-2 text-sm outline-none transition-all ${isDarkMode ? 'bg-[#18202b] border border-[#2e353f] text-white focus:border-purple-500' : 'bg-slate-50 border border-slate-200 text-slate-800 focus:border-purple-500 focus:bg-white'}`} />
              </div>

              {/* contactHubungi */}
              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${isDarkMode ? 'text-[#c2c6d6]' : 'text-slate-500'}`}>Header Contact 'Hubungi Studio Kami' (ID)</label>
                <input type="text" value={contactHubungiID} onChange={(e) => setContactHubungiID(e.target.value)} className={`w-full rounded px-3 py-2 text-sm outline-none transition-all ${isDarkMode ? 'bg-[#18202b] border border-[#2e353f] text-white focus:border-purple-500' : 'bg-slate-50 border border-slate-200 text-slate-800 focus:border-purple-500 focus:bg-white'}`} />
              </div>
              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${isDarkMode ? 'text-[#c2c6d6]' : 'text-slate-500'}`}>Header Contact 'Hubungi Studio Kami' (EN)</label>
                <input type="text" value={contactHubungiEN} onChange={(e) => setContactHubungiEN(e.target.value)} className={`w-full rounded px-3 py-2 text-sm outline-none transition-all ${isDarkMode ? 'bg-[#18202b] border border-[#2e353f] text-white focus:border-purple-500' : 'bg-slate-50 border border-slate-200 text-slate-800 focus:border-purple-500 focus:bg-white'}`} />
              </div>

              {/* contactFormTitle */}
              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${isDarkMode ? 'text-[#c2c6d6]' : 'text-slate-500'}`}>Judul Form 'Hubungi Saya Sekarang' (ID)</label>
                <input type="text" value={contactFormTitleID} onChange={(e) => setContactFormTitleID(e.target.value)} className={`w-full rounded px-3 py-2 text-sm outline-none transition-all ${isDarkMode ? 'bg-[#18202b] border border-[#2e353f] text-white focus:border-purple-500' : 'bg-slate-50 border border-slate-200 text-slate-800 focus:border-purple-500 focus:bg-white'}`} />
              </div>
              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${isDarkMode ? 'text-[#c2c6d6]' : 'text-slate-500'}`}>Judul Form 'Hubungi Saya Sekarang' (EN)</label>
                <input type="text" value={contactFormTitleEN} onChange={(e) => setContactFormTitleEN(e.target.value)} className={`w-full rounded px-3 py-2 text-sm outline-none transition-all ${isDarkMode ? 'bg-[#18202b] border border-[#2e353f] text-white focus:border-purple-500' : 'bg-slate-50 border border-slate-200 text-slate-800 focus:border-purple-500 focus:bg-white'}`} />
              </div>

              {/* contactFormBtn */}
              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${isDarkMode ? 'text-[#c2c6d6]' : 'text-slate-500'}`}>Tulisan Tombol Kirim Form (ID)</label>
                <input type="text" value={contactFormBtnID} onChange={(e) => setContactFormBtnID(e.target.value)} className={`w-full rounded px-3 py-2 text-sm outline-none transition-all ${isDarkMode ? 'bg-[#18202b] border border-[#2e353f] text-white focus:border-purple-500' : 'bg-slate-50 border border-slate-200 text-slate-800 focus:border-purple-500 focus:bg-white'}`} />
              </div>
              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${isDarkMode ? 'text-[#c2c6d6]' : 'text-slate-500'}`}>Tombol Kirim Form (EN)</label>
                <input type="text" value={contactFormBtnEN} onChange={(e) => setContactFormBtnEN(e.target.value)} className={`w-full rounded px-3 py-2 text-sm outline-none transition-all ${isDarkMode ? 'bg-[#18202b] border border-[#2e353f] text-white focus:border-purple-500' : 'bg-slate-50 border border-slate-200 text-slate-800 focus:border-purple-500 focus:bg-white'}`} />
              </div>
            </div>
          </div>
        </div>

        <div className={`h-px ${isDarkMode ? 'bg-[#2e353f]/50' : 'bg-slate-100'}`}></div>

        {/* 🗺️ MAPS & CONTACT CARDS CUSTOMIZATION */}
        <div className="space-y-6">
          <div>
            <h3 className={`text-base font-extrabold uppercase tracking-wider mb-1 flex items-center gap-1.5 ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>
              🗺️ Maps & Contact Icon Customization
            </h3>
            <p className={`text-xs ${isDarkMode ? 'text-[#8c909f]' : 'text-slate-500'}`}>
              Ubah lokasi Google Maps interaktif Anda serta ikon-ikon khusus yang tampil di bagian menu Contact.
            </p>
          </div>

          {/* Maps Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={`block text-[10px] font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-[#c2c6d6]' : 'text-slate-500'}`}>
                Google Maps Embed URL (Iframe Src)
              </label>
              <textarea
                rows={2}
                value={mapEmbedUrl}
                onChange={(e) => {
                  const val = e.target.value.trim();
                  // Automatically extract src if user pastes full iframe embed tag!
                  if (val.startsWith('<iframe') && val.includes('src="')) {
                    const match = val.match(/src="([^"]+)"/);
                    if (match && match[1]) {
                      setMapEmbedUrl(match[1]);
                      return;
                    }
                  }
                  setMapEmbedUrl(val);
                }}
                className={`w-full rounded px-3 py-2 text-xs font-mono outline-none resize-none transition-all ${
                  isDarkMode 
                    ? 'bg-[#18202b] border border-[#2e353f] text-white focus:border-purple-500' 
                    : 'bg-slate-50 border border-slate-200 text-slate-800 focus:border-purple-500 focus:bg-white'
                }`}
                placeholder="Paling praktis tempel salinan tag <iframe> penuh dari Google Maps di sini..."
              />
              <p className="text-[10px] font-medium text-slate-400 mt-1 leading-normal">
                💡 Cara: Buka Google Maps &gt; cari lokasi Anda &gt; klik "Bagikan" &gt; pilih tab "Sematkan peta" &gt; klik "Salin HTML" lalu tempel penuh di atas!
              </p>
            </div>

            <div>
              <label className={`block text-[10px] font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-[#c2c6d6]' : 'text-slate-500'}`}>
                Google Maps External Link (Tombol Buka Peta)
              </label>
              <input
                type="text"
                value={mapOpenUrl}
                onChange={(e) => setMapOpenUrl(e.target.value)}
                className={`w-full rounded px-3 py-2 text-sm outline-none transition-all ${
                  isDarkMode 
                    ? 'bg-[#18202b] border border-[#2e353f] text-white focus:border-purple-500' 
                    : 'bg-slate-50 border border-slate-200 text-slate-800 focus:border-purple-500 focus:bg-white'
                }`}
                placeholder="https://maps.google.com/?q=Lokasi+Saya"
              />
              <p className="text-[10px] font-medium text-slate-400 mt-1 leading-normal">
                Tautan luar ini akan terbuka ketika pengunjung mengeklik tombol "Buka di Peta" di halaman utama.
              </p>
            </div>
          </div>

          {/* Custom Icons Section */}
          <div className="space-y-3 pt-2">
            <span className={`block text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-[#c2c6d6]' : 'text-slate-500'}`}>
              Unggah Ikon Kustom Untuk Kontak (Format Gambar / PNG / JPG / SVG)
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
              
              {/* Email Icon */}
              <div className={`p-4 rounded-xl border flex flex-col items-center justify-between gap-2 h-full ${
                isDarkMode ? 'bg-[#18202b]/40 border-[#2e353f]' : 'bg-slate-50 border-slate-200'
              }`}>
                <span className="text-[11px] font-bold text-slate-400">Email Icon</span>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden border bg-white/5 shadow-inner">
                  {contactEmailIcon ? (
                    <img src={contactEmailIcon} alt="Email" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-[10px] text-slate-400 font-extrabold uppercase">Default</span>
                  )}
                </div>
                <input 
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const r = new FileReader();
                      r.onloadend = () => {
                        if (typeof r.result === 'string') {
                          compressIconImage(r.result).then(setContactEmailIcon);
                        }
                      };
                      r.readAsDataURL(file);
                    }
                  }}
                  id="up-email-icon"
                  className="hidden"
                />
                <div className="flex gap-1 w-full pt-1.5">
                  <label htmlFor="up-email-icon" className="flex-1 text-center font-black text-[10px] py-1 bg-purple-600 hover:bg-purple-500 text-white rounded cursor-pointer transition shadow">Set</label>
                  {contactEmailIcon && (
                    <button type="button" onClick={() => setContactEmailIcon('')} className="px-1.5 text-[10px] font-black bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded">Reset</button>
                  )}
                </div>
              </div>

              {/* WhatsApp Icon */}
              <div className={`p-4 rounded-xl border flex flex-col items-center justify-between gap-2 h-full ${
                isDarkMode ? 'bg-[#18202b]/40 border-[#2e353f]' : 'bg-slate-50 border-slate-200'
              }`}>
                <span className="text-[11px] font-bold text-slate-400">WhatsApp Icon</span>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden border bg-white/5 shadow-inner">
                  {whatsappBusinessIcon ? (
                    <img src={whatsappBusinessIcon} alt="WA" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-[10px] text-slate-400 font-extrabold uppercase">Default</span>
                  )}
                </div>
                <input 
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const r = new FileReader();
                      r.onloadend = () => {
                        if (typeof r.result === 'string') {
                          compressIconImage(r.result).then(setWhatsappBusinessIcon);
                        }
                      };
                      r.readAsDataURL(file);
                    }
                  }}
                  id="up-wa-icon"
                  className="hidden"
                />
                <div className="flex gap-1 w-full pt-1.5">
                  <label htmlFor="up-wa-icon" className="flex-1 text-center font-black text-[10px] py-1 bg-purple-600 hover:bg-purple-500 text-white rounded cursor-pointer transition shadow">Set</label>
                  {whatsappBusinessIcon && (
                    <button type="button" onClick={() => setWhatsappBusinessIcon('')} className="px-1.5 text-[10px] font-black bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded">Reset</button>
                  )}
                </div>
              </div>

              {/* Instagram Icon */}
              <div className={`p-4 rounded-xl border flex flex-col items-center justify-between gap-2 h-full ${
                isDarkMode ? 'bg-[#18202b]/40 border-[#2e353f]' : 'bg-slate-50 border-slate-200'
              }`}>
                <span className="text-[11px] font-bold text-slate-400">Instagram Icon</span>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden border bg-white/5 shadow-inner">
                  {instagramUrlIcon ? (
                    <img src={instagramUrlIcon} alt="Instagram" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-[10px] text-slate-400 font-extrabold uppercase">Default</span>
                  )}
                </div>
                <input 
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const r = new FileReader();
                      r.onloadend = () => {
                        if (typeof r.result === 'string') {
                          compressIconImage(r.result).then(setInstagramUrlIcon);
                        }
                      };
                      r.readAsDataURL(file);
                    }
                  }}
                  id="up-ig-icon"
                  className="hidden"
                />
                <div className="flex gap-1 w-full pt-1.5">
                  <label htmlFor="up-ig-icon" className="flex-1 text-center font-black text-[10px] py-1 bg-purple-600 hover:bg-purple-500 text-white rounded cursor-pointer transition shadow">Set</label>
                  {instagramUrlIcon && (
                    <button type="button" onClick={() => setInstagramUrlIcon('')} className="px-1.5 text-[10px] font-black bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded">Reset</button>
                  )}
                </div>
              </div>

              {/* LinkedIn Icon */}
              <div className={`p-4 rounded-xl border flex flex-col items-center justify-between gap-2 h-full ${
                isDarkMode ? 'bg-[#18202b]/40 border-[#2e353f]' : 'bg-slate-50 border-slate-200'
              }`}>
                <span className="text-[11px] font-bold text-slate-400">LinkedIn Icon</span>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden border bg-white/5 shadow-inner">
                  {linkedinUrlIcon ? (
                    <img src={linkedinUrlIcon} alt="LinkedIn" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-[10px] text-slate-400 font-extrabold uppercase">Default</span>
                  )}
                </div>
                <input 
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const r = new FileReader();
                      r.onloadend = () => {
                        if (typeof r.result === 'string') {
                          compressIconImage(r.result).then(setLinkedinUrlIcon);
                        }
                      };
                      r.readAsDataURL(file);
                    }
                  }}
                  id="up-li-icon"
                  className="hidden"
                />
                <div className="flex gap-1 w-full pt-1.5">
                  <label htmlFor="up-li-icon" className="flex-1 text-center font-black text-[10px] py-1 bg-purple-600 hover:bg-purple-500 text-white rounded cursor-pointer transition shadow">Set</label>
                  {linkedinUrlIcon && (
                    <button type="button" onClick={() => setLinkedinUrlIcon('')} className="px-1.5 text-[10px] font-black bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded">Reset</button>
                  )}
                </div>
              </div>

              {/* GitHub Icon */}
              <div className={`p-4 rounded-xl border flex flex-col items-center justify-between gap-2 h-full ${
                isDarkMode ? 'bg-[#18202b]/40 border-[#2e353f]' : 'bg-slate-50 border-slate-200'
              }`}>
                <span className="text-[11px] font-bold text-slate-400">GitHub Icon</span>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden border bg-white/5 shadow-inner">
                  {githubUrlIcon ? (
                    <img src={githubUrlIcon} alt="GitHub" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-[10px] text-slate-400 font-extrabold uppercase">Default</span>
                  )}
                </div>
                <input 
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const r = new FileReader();
                      r.onloadend = () => {
                        if (typeof r.result === 'string') {
                          compressIconImage(r.result).then(setGithubUrlIcon);
                        }
                      };
                      r.readAsDataURL(file);
                    }
                  }}
                  id="up-gh-icon"
                  className="hidden"
                />
                <div className="flex gap-1 w-full pt-1.5">
                  <label htmlFor="up-gh-icon" className="flex-1 text-center font-black text-[10px] py-1 bg-purple-600 hover:bg-purple-500 text-white rounded cursor-pointer transition shadow">Set</label>
                  {githubUrlIcon && (
                    <button type="button" onClick={() => setGithubUrlIcon('')} className="px-1.5 text-[10px] font-black bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded">Reset</button>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className={`h-px ${isDarkMode ? 'bg-[#2e353f]/50' : 'bg-slate-100'}`}></div>

        <div>
          <h3 className={`text-sm font-extrabold uppercase tracking-wider mb-2 flex items-center gap-1.5 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            ✉️ Notifikasi Pemberitahuan Pesan Kontak (Email SMTP)
          </h3>
          <p className={`text-xs mb-4 ${isDarkMode ? 'text-[#8c909f]' : 'text-slate-500'}`}>
            Aktifkan dan konfigurasi SMTP untuk mengirim pemberitahuan email secara otomatis setiap kali ada pengunjung yang mengirim pesan melalui formulir kontak.
          </p>

          <div className={`p-4 rounded-xl border mb-4 flex items-center justify-between ${
            isDarkMode ? 'bg-[#18202b]/60 border-[#2e353f]' : 'bg-slate-50/50 border-slate-200'
          }`}>
            <div className="space-y-0.5 max-w-[80%]">
              <span className={`text-xs font-bold block ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                Kirim Notifikasi Email Otomatis ke Kontak
              </span>
              <span className={`text-[10px] block ${isDarkMode ? 'text-[#8c909f]' : 'text-slate-500'}`}>
                Setiap pesan masuk akan diteruskan langsung ke email kontak Anda: <span className="font-semibold text-purple-500 underline">{contactEmail || 'fikrryandi@gmail.com'}</span>
              </span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={enableEmailNotify} 
                onChange={(e) => setEnableEmailNotify(e.target.checked)} 
                className="sr-only peer" 
              />
              <div className="w-9 h-5 bg-gray-300 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>

          {enableEmailNotify && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 rounded-xl border dark:bg-[#111827]/40 dark:border-[#2e353f] bg-white border-slate-200 animate-[fade-in_0.2s_ease-out]">
              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-[#c2c6d6]' : 'text-slate-500'}`}>SMTP Host</label>
                <input 
                  type="text" 
                  value={smtpHost}
                  onChange={(e) => setSmtpHost(e.target.value)}
                  className={`w-full rounded px-3 py-1.5 text-xs outline-none transition-all ${
                    isDarkMode 
                      ? 'bg-[#18202b] border border-[#2e353f] text-white focus:border-purple-500' 
                      : 'bg-slate-50 border border-slate-200 text-slate-800 focus:border-purple-500 focus:bg-white'
                  }`} 
                  placeholder="smtp.gmail.com"
                />
              </div>

              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-[#c2c6d6]' : 'text-slate-500'}`}>SMTP Port</label>
                <input 
                  type="text" 
                  value={smtpPort}
                  onChange={(e) => setSmtpPort(e.target.value)}
                  className={`w-full rounded px-3 py-1.5 text-xs outline-none transition-all ${
                    isDarkMode 
                      ? 'bg-[#18202b] border border-[#2e353f] text-white focus:border-purple-500' 
                      : 'bg-slate-50 border border-slate-200 text-slate-800 focus:border-purple-500 focus:bg-white'
                  }`} 
                  placeholder="465"
                />
              </div>

              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-[#c2c6d6]' : 'text-slate-500'}`}>Nama Pengirim Notifikasi</label>
                <input 
                  type="text" 
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className={`w-full rounded px-3 py-1.5 text-xs outline-none transition-all ${
                    isDarkMode 
                      ? 'bg-[#18202b] border border-[#2e353f] text-white focus:border-purple-500' 
                      : 'bg-slate-50 border border-slate-200 text-slate-800 focus:border-purple-500 focus:bg-white'
                  }`} 
                  placeholder="Fikri Portfolio Form"
                />
              </div>

              <div className="md:col-span-2 lg:col-span-1">
                <label className={`block text-[10px] font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-[#c2c6d6]' : 'text-slate-500'}`}>SMTP Username / Email</label>
                <input 
                  type="text" 
                  value={smtpUser}
                  onChange={(e) => setSmtpUser(e.target.value)}
                  className={`w-full rounded px-3 py-1.5 text-xs outline-none transition-all ${
                    isDarkMode 
                      ? 'bg-[#18202b] border border-[#2e353f] text-white focus:border-purple-500' 
                      : 'bg-slate-50 border border-slate-200 text-slate-800 focus:border-purple-500 focus:bg-white'
                  }`} 
                  placeholder="fikrryandi@gmail.com"
                />
              </div>

              <div className="md:col-span-2">
                <label className={`block text-[10px] font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-[#c2c6d6]' : 'text-slate-500'}`}>SMTP Password / Gmail App Password</label>
                <input 
                  type="password" 
                  value={smtpPass}
                  onChange={(e) => setSmtpPass(e.target.value)}
                  className={`w-full rounded px-3 py-1.5 text-xs outline-none transition-all ${
                    isDarkMode 
                      ? 'bg-[#18202b] border border-[#2e353f] text-white focus:border-purple-500' 
                      : 'bg-slate-50 border border-slate-200 text-slate-800 focus:border-purple-500 focus:bg-white'
                  }`} 
                  placeholder="••••••••••••••••"
                />
                <span className={`text-[10px] block mt-1 leading-normal ${isDarkMode ? 'text-[#8c909f]' : 'text-slate-400'}`}>
                  Petunjuk: Jika Anda menggunakan Gmail, silakan aktifkan Autentikasi 2 Langkah lalu buat <strong>Sandi Aplikasi (App Password)</strong> pada pengaturan keamanan Google Account Anda. Gunakan sandi 16 karakter tersebut di sini.
                </span>
              </div>
            </div>
          )}
        </div>

        <div className={`h-px ${isDarkMode ? 'bg-[#2e353f]/50' : 'bg-slate-100'}`}></div>

        {/* Brand New Section Visibility & Aesthetic Customization Panel */}
        <div className={`p-6 rounded-xl border ${isDarkMode ? 'bg-[#1e1c31]/30 border-[#2b254e]/50' : 'bg-purple-50/20 border-purple-100/50'}`}>
          <h3 className={`text-sm font-black uppercase tracking-wider mb-4 flex items-center gap-2 ${isDarkMode ? 'text-purple-300' : 'text-[#8b5cf6]'}`}>
            <Sliders className="w-4.5 h-4.5 animate-pulse" /> 🎛️ Homepage Section Manager & Styles (Fitur Tambahan)
          </h3>
          <p className="text-[11px] text-slate-400 mb-5 leading-relaxed">
            Aktifkan/nonaktifkan bagian-bagian halaman utama portfolio Anda secara instan atau sesuaikan gaya estetikanya untuk menyamakan tata letak.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Section Visibility Toggles (left) */}
            <div className="space-y-3.5">
              <span className={`block text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Tampilkan Bagian Halaman Utama (Homepage Sections):
              </span>

              <label className="flex items-center gap-3 cursor-pointer text-xs font-bold">
                <input 
                  type="checkbox" 
                  checked={showHeroSection} 
                  onChange={(e) => setShowHeroSection(e.target.checked)}
                  className="rounded text-[#8b5cf6] focus:ring-[#8b5cf6]"
                />
                <span>Tampilkan Hero Section (Banner Utama)</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer text-xs font-bold">
                <input 
                  type="checkbox" 
                  checked={showAboutSection} 
                  onChange={(e) => setShowAboutSection(e.target.checked)}
                  className="rounded text-[#8b5cf6] focus:ring-[#8b5cf6]"
                />
                <span>Tampilkan Tentang Saya (About Me)</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer text-xs font-bold">
                <input 
                  type="checkbox" 
                  checked={showSkillsSection} 
                  onChange={(e) => setShowSkillsSection(e.target.checked)}
                  className="rounded text-[#8b5cf6] focus:ring-[#8b5cf6]"
                />
                <span>Tampilkan Matriks Skill (Animasi Marquee Kereta)</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer text-xs font-bold">
                <input 
                  type="checkbox" 
                  checked={showCertificatesSection} 
                  onChange={(e) => setShowCertificatesSection(e.target.checked)}
                  className="rounded text-[#8b5cf6] focus:ring-[#8b5cf6]"
                />
                <span>Tampilkan Sertifikat & Award (Certificates)</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer text-xs font-bold">
                <input 
                  type="checkbox" 
                  checked={showEducationSection} 
                  onChange={(e) => setShowEducationSection(e.target.checked)}
                  className="rounded text-[#8b5cf6] focus:ring-[#8b5cf6]"
                />
                <span>Tampilkan Riwayat Pendidikan (Education)</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer text-xs font-bold">
                <input 
                  type="checkbox" 
                  checked={showExperienceSection} 
                  onChange={(e) => setShowExperienceSection(e.target.checked)}
                  className="rounded text-[#8b5cf6] focus:ring-[#8b5cf6]"
                />
                <span>Tampilkan Pengalaman Kerja (Experience)</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer text-xs font-bold">
                <input 
                  type="checkbox" 
                  checked={showProjectsSection} 
                  onChange={(e) => setShowProjectsSection(e.target.checked)}
                  className="rounded text-[#8b5cf6] focus:ring-[#8b5cf6]"
                />
                <span>Tampilkan Portofolio / Project Unggulan</span>
              </label>
            </div>

            {/* Aesthetic Visual Details Fields (right) */}
            <div className="space-y-4">
              <span className={`block text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Kustomisasi Detil Visual Estetis:
              </span>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9px] font-bold uppercase text-slate-400 mb-1">Kecepatan Animasi Marquee (Detik)</label>
                  <input 
                    type="number" 
                    value={skillsMarqueeSpeed}
                    onChange={(e) => setSkillsMarqueeSpeed(parseInt(e.target.value) || 30)}
                    min={5}
                    max={120}
                    className={`w-full rounded px-2.5 py-1.5 text-xs outline-none ${isDarkMode ? 'bg-[#0f0e1d] border border-[#222144] text-white' : 'bg-white border text-slate-800'}`}
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold uppercase text-slate-400 mb-1">Hubungi Whatsapp</label>
                  <span className="block text-[10px] text-[#8b5cf6] font-bold py-1.5">{whatsappBusiness || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`h-px ${isDarkMode ? 'bg-[#2e353f]/50' : 'bg-slate-100'}`}></div>

        <div>
          <h3 className={`text-sm font-extrabold uppercase tracking-wider mb-3 flex items-center gap-1.5 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            🔑 Administrator Authentication
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={`block text-[10px] font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-[#c2c6d6]' : 'text-slate-500'}`}>Admin Username (User)</label>
              <input 
                type="text" 
                value={adminUsername}
                onChange={(e) => setAdminUsername(e.target.value)}
                className={`w-full rounded px-3 py-2 text-sm font-semibold outline-none transition-all ${
                  isDarkMode 
                    ? 'bg-[#18202b] border border-[#2e353f] text-white focus:border-purple-500' 
                    : 'bg-slate-50 border border-slate-200 text-slate-800 focus:border-purple-500 focus:bg-white'
                }`} 
                placeholder="admin"
              />
            </div>

            <div>
              <label className={`block text-[10px] font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-[#c2c6d6]' : 'text-slate-500'}`}>Admin Password (Sandi)</label>
              <input 
                type="password" 
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className={`w-full rounded px-3 py-2 text-sm font-semibold outline-none transition-all ${
                  isDarkMode 
                    ? 'bg-[#18202b] border border-[#2e353f] text-white focus:border-purple-500' 
                    : 'bg-slate-50 border border-slate-200 text-slate-800 focus:border-purple-500 focus:bg-white'
                }`} 
                placeholder="sandi"
              />
            </div>
          </div>
        </div>

        {savedSuccess && (
          <div className="bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 p-4 rounded-xl text-xs font-semibold flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            Terupdate! Pengaturan berhasil disimpan secara permanen.
          </div>
        )}

        <div className={`flex flex-wrap justify-between items-center gap-4 pt-6 border-t ${isDarkMode ? 'border-[#2e353f]/50' : 'border-slate-150'}`}>
          <button 
            type="button" 
            onClick={handleReset}
            className="px-4 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 hover:text-red-400 font-bold text-xs rounded-xl border border-red-500/25 flex items-center gap-2 transition-all cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            Reset to Site Defaults
          </button>

          <button 
            type="submit" 
            className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-purple-600/15 flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            Persist Configuration
          </button>
        </div>

      </form>
    </div>
  );
}
