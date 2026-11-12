const fs = require('fs');

const files = fs.readdirSync('./frontend/dist/assets');
const cssFile = files.find(f => f.endsWith('.css'));
const css = fs.readFileSync(`./frontend/dist/assets/${cssFile}`, 'utf8');

// Search for 0b0f19 case-insensitive
let index = 0;
while (true) {
  const found = css.toLowerCase().indexOf('0b0f19', index);
  if (found === -1) break;
  const start = Math.max(0, found - 100);
  const end = Math.min(css.length, found + 100);
  console.log('--- FOUND AT', found, '---');
  console.log(css.substring(start, end));
  index = found + 6;
}

