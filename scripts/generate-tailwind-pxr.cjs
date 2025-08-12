const fs = require('fs');
const path = require('path');

const prefixes = ['spacing', 'text', 'radius'];

const createCss = (text, size) => `  --${text}-${size}pxr: ${size / 16}rem;`;

const generateCss = (prefixes, sizes) => {
  return (
    '@theme {\n' +
    prefixes.map((text) => sizes.map((size) => createCss(text, size)).join('\n')).join('\n\n') +
    '\n}'
  );
};

const output = generateCss(
  prefixes,
  Array.from({ length: 1024 }, (_, i) => i + 1),
);
const rootDir = path.resolve(__dirname, '..');
const outputPath = path.join(rootDir, 'src/app/styles/token/pxrs.css');

fs.writeFileSync(outputPath, output, 'utf8');
console.log(`CSS variables written to ${outputPath}`);
