const fs = require('fs');

const dbPath = './portfolio_db.json';
const data = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

if (data.settings && data.settings.sectionCareerID === "Rekam Jejak Karier") {
  data.settings.sectionCareerID = "Pengalaman Kerja";
}

if (data.experiences && data.experiences.length > 0) {
  if (data.experiences[0].id === 'e1' && !data.experiences[0].location) {
    data.experiences[0].location = "Purwakarta, Indonesia";
  }
}

fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');
console.log('Database patched successfully');
