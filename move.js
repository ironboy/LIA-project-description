const fs = require('fs');
const path = require('path');

let downloadedFiles = fs.readdirSync('/Users/thomasfrank/Downloads')
  .filter(x => x.startsWith('lia') && x.endsWith('.html'));
downloadedFiles.sort((a, b) => {
  let aNo = a.match(/\d{1,}/);
  let bNo = b.match(/\d{1,}/);
  aNo = +((aNo ? aNo : 1) + '');
  bNo = +((bNo ? bNo : 1) + '');
  return aNo > bNo ? -1 : 1;
});
let file = '/Users/thomasfrank/Downloads/' + downloadedFiles[0];
let contents = fs.readFileSync(file, 'utf-8');
contents = contents.replaceAll(
  '  <link rel="stylesheet" href="https://stackedit.io/style.css" />',
  `  <link rel="stylesheet" href="stackedit.css" />\n` +
  `  <link rel="stylesheet" href="main.css" />`
);

fs.rmSync(path.join(__dirname, 'docs', 'index.html'));
fs.writeFileSync(path.join(__dirname, 'docs', 'index.html'), contents, 'utf-8');