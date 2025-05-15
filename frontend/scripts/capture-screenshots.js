const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const screenshotsDir = path.join(__dirname, '../public/screenshots');

const pages = [
  { url: 'http://localhost:3000/demo', file: 'demo-main.png', caption: 'Main Demo Flow' },
  { url: 'http://localhost:3000/demo/token-swap', file: 'demo-token-swap.png', caption: 'Token Swap Demo' },
  { url: 'http://localhost:3000/demo/tipping', file: 'demo-tipping.png', caption: 'Tipping Demo' },
];

(async () => {
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  for (const { url, file } of pages) {
    await page.goto(url, { waitUntil: 'networkidle0' });
    await page.screenshot({ path: path.join(screenshotsDir, file), fullPage: true });
    console.log(`Captured ${file}`);
  }

  await browser.close();
})(); 