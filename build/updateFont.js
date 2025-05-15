const webfont = require('webfont');
const fs = require('fs');
const path = require('path');

// const svgs = [
//   "explorer.svg",
//   "extensions.svg",
//   "git.svg",
// ].map(name => path.join(__dirname, '..', 'pet', name));

// 获取 pet 目录下所有的 SVG 文件
const petDir = path.join(__dirname, '..', 'icons');
const svgs = fs.readdirSync(petDir)
  .filter(file => path.extname(file).toLowerCase() === '.svg')
  .map(file => path.join(petDir, file));

async function generateFont() {

  try {
    const result = await webfont.webfont({
      files: svgs,
      formats: ['woff'],
      startUnicode: 0xE000,
      verbose: true,
      normalize: true,
      sort: false
    });
    const dest = path.join(__dirname, '..', 'theme', 'vscode-10.woff')
    fs.writeFileSync(dest, result.woff, 'binary');
    console.log(`Font created at ${dest}`);
  } catch (e) {
    console.error('Font creation failed.', e);
  }
}

generateFont();


