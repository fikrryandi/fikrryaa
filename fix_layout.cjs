const fs = require('fs');
const file = 'src/components/PublicPortfolio.tsx';
let content = fs.readFileSync(file, 'utf8');

const s1 = '{/* 5. EXPERIENCE TIMELINE (Full Width) */}';
const s2 = '{/* Left Column: Education */}';
const s3 = '{/* Right Column: Experience */}';
const s4 = '{/* Right Column: Portfolio */}';
const s5 = '              </div>\n            )}\n\n            {/* VIEW 2: ABOUT PANEL';

let p1 = content.indexOf(s1);
let p2 = content.indexOf(s2);
let p3 = content.indexOf(s3);
let p4 = content.indexOf(s4);
let p5 = content.indexOf(s5);

if (p1 === -1 || p2 === -1 || p3 === -1 || p4 === -1 || p5 === -1) {
    console.log("Could not find all markers");
    console.log({p1, p2, p3, p4, p5});
    process.exit(1);
}

// Prefix is everything up to the 5. EXPERIENCE TIMELINE marker.
let prefix = content.substring(0, p1);

// Education Block
let eduBlock = content.substring(p2, p3);

// Experience Block
// Let's get the string from p3 to p4
let expStr = content.substring(p3, p4);
// The last '</div>' in expStr is the orphaned closing tag from the old grid layout.
let lastDiv = expStr.lastIndexOf('</div>');
if (lastDiv === -1) {
    console.log("Could not find orphaned </div>");
    process.exit(1);
}
let expBlock = expStr.substring(0, lastDiv).trim() + '\n';

// Portfolio Block
let portBlock = content.substring(p4, p5);

// Suffix
let suffix = content.substring(p5);

// Let's put it together:
// Experience first, then Education and Portfolio in a grid.
let newContent = prefix + 
    expBlock + '\n' +
    '                {/* 6. EDUCATION & PORTFOLIO - Side by side */}\n' +
    '                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">\n' +
    eduBlock + '\n' +
    portBlock + '\n' +
    '                </div>\n\n' +
    suffix;

fs.writeFileSync(file, newContent);
console.log("Fixed layout");
