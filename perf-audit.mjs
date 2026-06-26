import { chromium } from 'playwright';
import path from 'path';
import os from 'os';

// Auto-detect Chrome/Chromium path — works on any machine
const possiblePaths = [
  path.join(os.homedir(), '.cache/ms-playwright/chromium-1223/chrome-linux64/chrome'),
  path.join(os.homedir(), '.agent-browser/browsers/chrome-149.0.7827.115/chrome'),
  '/usr/bin/google-chrome',
  '/usr/bin/chromium-browser',
  '/usr/bin/chromium',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
];
const chromePath = possiblePaths.find(p => { try { return fs.existsSync(p); } catch { return false; } });

const browser = await chromium.launch({
  headless: true,
  executablePath: chromePath,
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-gpu',
    '--disable-web-security',
    '--disable-features=IsolateOrigins,site-per-process',
  ]
});

const context = await browser.newContext({
  viewport: { width: 1440, height: 900 }
});

const page = await context.newPage();

console.log("Navigating to http://127.0.0.1:4173/ ...");
await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle', timeout: 30000 });

// Wait for paint entries to populate
await page.waitForTimeout(3000);

const perfData = await page.evaluate(() => {
  const entries = performance.getEntriesByType('navigation')[0];
  const paintEntries = performance.getEntriesByType('paint');
  
  const result = {
    navigation: {
      ttfb: Math.round(entries.responseStart - entries.requestStart),
      download: Math.round(entries.responseEnd - entries.responseStart),
      domParsing: Math.round(entries.domInteractive - entries.responseEnd),
      domInteractive: Math.round(entries.domInteractive - entries.startTime),
      domComplete: Math.round(entries.domComplete - entries.startTime),
      loadComplete: Math.round(entries.loadEventEnd - entries.startTime),
    },
    paints: {},
  };
  
  paintEntries.forEach(p => { result.paints[p.name] = Math.round(p.startTime); });
  
  const fp = paintEntries.find(p => p.name === 'first-paint');
  const fcp = paintEntries.find(p => p.name === 'first-contentful-paint');
  result.bootstrapGap = fp && fcp ? Math.round(fcp.startTime - fp.startTime) : 'N/A';
  
  const resources = performance.getEntriesByType('resource');
  const byType = {};
  resources.forEach(r => {
    const type = r.initiatorType || 'other';
    if (!byType[type]) byType[type] = { count: 0, totalTransferKB: 0, totalDuration: 0 };
    byType[type].count++;
    byType[type].totalTransferKB += Math.round(r.transferSize / 1024);
    byType[type].totalDuration += r.duration;
  });
  result.resourceTypes = byType;
  
  const jsResources = resources
    .filter(r => r.name.includes('.js'))
    .map(r => ({ 
      name: r.name.split('/').pop().split('?')[0], 
      transferKB: Math.round(r.transferSize / 1024),
      decodedKB: Math.round(r.decodedBodySize / 1024),
      duration: Math.round(r.duration),
      startTime: Math.round(r.startTime)
    }))
    .sort((a, b) => a.startTime - b.startTime);
  result.jsFiles = jsResources;
  
  const totalTransfer = resources.reduce((sum, r) => sum + r.transferSize, 0);
  result.totalTransferKB = Math.round(totalTransfer / 1024);
  result.totalResources = resources.length;
  
  return result;
});

console.log("=== NAVIGATION TIMING ===");
console.log(JSON.stringify(perfData.navigation, null, 2));
console.log("\n=== PAINT TIMING ===");
console.log(JSON.stringify(perfData.paints, null, 2));
console.log(`Bootstrap Gap (FCP - FP): ${perfData.bootstrapGap}ms`);
console.log("\n=== RESOURCE TYPES ===");
console.log(JSON.stringify(perfData.resourceTypes, null, 2));
console.log("\n=== JS FILES (load order) ===");
console.log(JSON.stringify(perfData.jsFiles, null, 2));
console.log(`\n=== TOTAL PAYLOAD ===`);
console.log(`Total Transfer: ${perfData.totalTransferKB} KB`);
console.log(`Total Resources: ${perfData.totalResources}`);

// Measure LCP
const lcpData = await page.evaluate(() => {
  return new Promise(resolve => {
    const observer = new PerformanceObserver(list => {
      const entries = list.getEntries();
      const last = entries[entries.length - 1];
      resolve({
        lcp: Math.round(last.startTime),
        element: last.element?.tagName + (last.element?.id ? '#' + last.element.id : '') + (last.element?.className ? '.' + last.element.className.split(' ').slice(0,2).join('.') : ''),
        url: last.url || 'N/A',
        size: last.size
      });
    });
    observer.observe({ type: 'largest-contentful-paint', buffered: true });
    
    setTimeout(() => {
      observer.disconnect();
      const entries = performance.getEntriesByType('largest-contentful-paint');
      if (entries.length) {
        const last = entries[entries.length - 1];
        resolve({
          lcp: Math.round(last.startTime),
          element: last.element?.tagName + (last.element?.id ? '#' + last.element.id : ''),
          url: last.url || 'N/A',
          size: last.size
        });
      } else {
        resolve({ lcp: 'not captured', element: 'N/A', url: 'N/A', size: 0 });
      }
    }, 5000);
  });
});

console.log("\n=== LARGEST CONTENTFUL PAINT ===");
console.log(JSON.stringify(lcpData, null, 2));

// Measure CLS
const clsData = await page.evaluate(() => {
  return new Promise(resolve => {
    let clsValue = 0;
    const observer = new PerformanceObserver(list => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) clsValue += entry.value;
      }
    });
    observer.observe({ type: 'layout-shift', buffered: true });
    
    setTimeout(() => {
      observer.disconnect();
      const buffered = performance.getEntriesByType('layout-shift');
      let bufferedValue = 0;
      for (const entry of buffered) {
        if (!entry.hadRecentInput) bufferedValue += entry.value;
      }
      resolve({ cls: Math.round(bufferedValue * 10000) / 10000 });
    }, 5000);
  });
});

console.log("\n=== CUMULATIVE LAYOUT SHIFT ===");
console.log(JSON.stringify(clsData, null, 2));

// FID
const fidData = await page.evaluate(() => {
  return new Promise(resolve => {
    const observer = new PerformanceObserver(list => {
      const entries = list.getEntries();
      resolve({ fid: Math.round(entries[0].processingStart - entries[0].startTime) });
    });
    observer.observe({ type: 'first-input', buffered: true });
    setTimeout(() => {
      observer.disconnect();
      resolve({ fid: 'no interaction during test' });
    }, 5000);
  });
});

console.log("\n=== FIRST INPUT DELAY ===");
console.log(JSON.stringify(fidData, null, 2));

await browser.close();
