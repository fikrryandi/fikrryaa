const fs = require('fs');
const file = 'src/components/PublicPortfolio.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Replace Building2 Icon with CompanyLogo
const iconBoxRegex = /({\/\*\s*Icon box\s*\*\/}\s*)<div className={`w-12 h-12 flex items-center justify-center rounded-\[14px\] shrink-0 \${isDarkMode \? 'bg-slate-800\/80 text-slate-300' : 'bg-slate-100 text-slate-500'}`}>(\s*)<Building2 className="w-6 h-6" \/>(\s*)<\/div>/g;

content = content.replace(iconBoxRegex, (match, p1, p2, p3) => {
  return `${p1}{exp.companyLogo ? (
  <div className={\`w-12 h-12 flex items-center justify-center rounded-[14px] shrink-0 bg-white border overflow-hidden \${isDarkMode ? 'border-slate-700' : 'border-slate-200'}\`}>
    <img src={exp.companyLogo} alt={exp.company} className="w-full h-full object-contain p-1" />
  </div>
) : (
  <div className={\`w-12 h-12 flex items-center justify-center rounded-[14px] shrink-0 \${isDarkMode ? 'bg-slate-800/80 text-slate-300' : 'bg-slate-100 text-slate-500'}\`}>
    <Building2 className="w-6 h-6" />
  </div>
)}`;
});

// 2. Remove Education section from Home
// We'll replace the block from "6. EDUCATION & PORTFOLIO - Side by side" up to the end of Education.
// Let's find the exact block.
const eduHomeStartMarker = "{/* 6. EDUCATION & PORTFOLIO - Side by side */}";
const portfolioMarker = "{/* Right Column: Portfolio */}";

const p1 = content.indexOf(eduHomeStartMarker);
const p2 = content.indexOf(portfolioMarker, p1);

if (p1 !== -1 && p2 !== -1) {
  const before = content.substring(0, p1);
  const after = content.substring(p2);
  
  // Create new section header for Portfolio
  const newHeader = "                {/* 6. PORTFOLIO */}\n                <div className=\"w-full\">\n                  ";
  
  content = before + newHeader + after;
} else {
  console.log("Could not find Home Education section");
  process.exit(1);
}

// 3. Make Portfolio grid responsive (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)
content = content.replace(
  '<div className="grid grid-cols-1 gap-6 mb-6 flex-grow">',
  '<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 flex-grow">'
);

fs.writeFileSync(file, content);
console.log("Updated PublicPortfolio");
