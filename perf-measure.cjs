const puppeteer = require('puppeteer-core');
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

// Auto-detect Chrome/Chromium path — works on any machine
const possiblePaths = [
  path.join(os.homedir(), '.agent-browser/browsers/chrome-149.0.7827.115/chrome'),
  path.join(os.homedir(), '.cache/ms-playwright/chromium-1223/chrome-linux64/chrome'),
  '/usr/bin/google-chrome',
  '/usr/bin/chromium-browser',
  '/usr/bin/chromium',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
];
const CHROME_PATH = possiblePaths.find(p => { try { return fs.existsSync(p); } catch { return false; } });
const BASE_URL = 'http://127.0.0.1:4173';

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function measure() {
  // Verify server
  console.log('Checking server...');
  const testHtml = await fetchUrl(BASE_URL + '/');
  console.log('Server OK. HTML length:', testHtml.length);

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--disable-setuid-sandbox',
    ],
  });

  // ============================================================
  // STEP 1: Homepage Load Performance
  // ============================================================
  console.log('\n=== STEP 1: Homepage Load Performance ===\n');

  const page = await browser.newPage();
  await page.setCacheEnabled(false);

  const loadStart = Date.now();
  await page.goto(BASE_URL + '/', {
    waitUntil: 'load',
    timeout: 30000,
  });
  const wallClockLoad = Date.now() - loadStart;

  // Wait for paint entries
  await page.waitForFunction(() => {
    const paints = performance.getEntriesByType('paint');
    return paints.length >= 2;
  }, { timeout: 10000 });

  const mainMetrics = await page.evaluate(() => {
    const entries = performance.getEntriesByType('navigation')[0];
    const paintEntries = performance.getEntriesByType('paint');

    const result = {
      wallClockLoadMs: null, // set from outside
      navigation: {
        ttfb: Math.round(entries.responseStart - entries.requestStart),
        download: Math.round(entries.responseEnd - entries.responseStart),
        domParsing: Math.round(entries.domInteractive - entries.responseEnd),
        domComplete: Math.round(entries.domComplete - entries.responseEnd),
        domInteractive: Math.round(entries.domInteractive - entries.startTime),
        domContentLoaded: Math.round(entries.domContentLoadedEventEnd - entries.startTime),
        loadComplete: Math.round(entries.loadEventEnd - entries.startTime),
      },
      paints: {},
    };

    paintEntries.forEach(p => { result.paints[p.name] = Math.round(p.startTime); });

    // Resource summary
    const resources = performance.getEntriesByType('resource');
    const byType = {};
    let totalTransferSize = 0;
    resources.forEach(r => {
      totalTransferSize += r.transferSize || 0;
      const type = r.initiatorType || 'other';
      if (!byType[type]) byType[type] = { count: 0, totalSize: 0 };
      byType[type].count++;
      byType[type].totalSize += r.transferSize || 0;
    });

    const jsResources = resources
      .filter(r => r.name.includes('.js'))
      .map(r => ({
        name: r.name.split('/').pop().split('?')[0],
        transferKB: Math.round((r.transferSize || 0) / 1024),
        decodedKB: Math.round((r.decodedBodySize || 0) / 1024),
        duration: Math.round(r.duration),
        startTime: Math.round(r.startTime)
      }))
      .sort((a, b) => a.startTime - b.startTime);

    const cssResources = resources
      .filter(r => r.name.includes('.css'))
      .map(r => ({
        name: r.name.split('/').pop().split('?')[0],
        transferKB: Math.round((r.transferSize || 0) / 1024),
        decodedKB: Math.round((r.decodedBodySize || 0) / 1024),
        duration: Math.round(r.duration)
      }));

    result.totalResources = resources.length;
    result.totalTransferKB = Math.round(totalTransferSize / 1024);
    result.resourceTypes = byType;
    result.jsResources = jsResources;
    result.cssResources = cssResources;

    const fp = paintEntries.find(p => p.name === 'first-paint');
    const fcp = paintEntries.find(p => p.name === 'first-contentful-paint');
    result.gap = {
      firstPaint: fp ? Math.round(fp.startTime) : null,
      firstContentfulPaint: fcp ? Math.round(fcp.startTime) : null,
      bootstrapDelay: fp && fcp ? Math.round(fcp.startTime - fp.startTime) : null,
    };

    return result;
  });

  mainMetrics.wallClockLoadMs = wallClockLoad;
  console.log(JSON.stringify(mainMetrics, null, 2));

  // ============================================================
  // STEP 2: Route-to-Route Navigation (/ → /services)
  // ============================================================
  console.log('\n=== STEP 2: Route-to-Route Navigation (/ → /services) ===\n');

  // Set the navigation start marker
  await page.evaluate(() => {
    window.__navStart = performance.now();
  });

  // Click the Services nav link
  const navResult = await page.evaluate(() => {
    const start = performance.now();
    const links = document.querySelectorAll('a');
    let servicesLink = null;
    for (const link of links) {
      const href = link.getAttribute('href');
      const text = link.textContent.trim();
      if (href === '/services' || text === 'Services') {
        servicesLink = link;
        break;
      }
    }
    if (servicesLink) {
      servicesLink.click();
      return { clicked: true, start, href: servicesLink.getAttribute('href') };
    }
    return { clicked: false, start, allLinks: Array.from(links).slice(0, 20).map(l => ({ href: l.getAttribute('href'), text: l.textContent.trim().substring(0, 30) })) };
  });

  if (navResult.clicked) {
    console.log('Clicked Services link, href:', navResult.href);
    
    // Wait for navigation
    await page.waitForNavigation({ waitUntil: 'load', timeout: 15000 }).catch(() => {
      console.log('waitForNavigation timed out, continuing...');
    });
    
    // Wait for paint
    await page.waitForFunction(() => {
      const paints = performance.getEntriesByType('paint');
      return paints.length >= 2;
    }, { timeout: 10000 }).catch(() => {});
    
    await new Promise(r => setTimeout(r, 500));

    const routeTiming = await page.evaluate((navStart) => {
      const elapsed = performance.now() - navStart;
      const paintEntries = performance.getEntriesByType('paint');
      const fp = paintEntries.find(p => p.name === 'first-paint');
      const fcp = paintEntries.find(p => p.name === 'first-contentful-paint');
      const lcpEntries = performance.getEntriesByType('largest-contentful-paint');
      const lcp = lcpEntries[lcpEntries.length - 1];

      return {
        routeNavigationMs: Math.round(elapsed),
        currentUrl: window.location.href,
        paintTiming: {
          fp: fp ? Math.round(fp.startTime) + 'ms' : 'N/A',
          fcp: fcp ? Math.round(fcp.startTime) + 'ms' : 'N/A',
          lcp: lcp ? Math.round(lcp.startTime) + 'ms' : 'N/A',
          lcpElement: lcp ? lcp.element?.tagName + (lcp.element?.textContent?.substring(0, 50) || '') : 'N/A',
        },
      };
    }, navResult.start);

    console.log(JSON.stringify(routeTiming, null, 2));
  } else {
    console.log('Could not find Services link. Links found:');
    console.log(JSON.stringify(navResult.allLinks, null, 2));
    console.log('Trying direct navigation to /services...');

    // Direct navigation
    const directStart = Date.now();
    await page.goto(BASE_URL + '/services', { waitUntil: 'load', timeout: 15000 });
    const directElapsed = Date.now() - directStart;

    await page.waitForFunction(() => {
      const paints = performance.getEntriesByType('paint');
      return paints.length >= 2;
    }, { timeout: 10000 }).catch(() => {});

    await new Promise(r => setTimeout(r, 500));

    const routeTiming = await page.evaluate(() => {
      const paintEntries = performance.getEntriesByType('paint');
      const fp = paintEntries.find(p => p.name === 'first-paint');
      const fcp = paintEntries.find(p => p.name === 'first-contentful-paint');
      const lcpEntries = performance.getEntriesByType('largest-contentful-paint');
      const lcp = lcpEntries[lcpEntries.length - 1];
      const navEntries = performance.getEntriesByType('navigation');
      const lastNav = navEntries[navEntries.length - 1];

      return {
        directLoadMs: undefined, // set outside
        currentUrl: window.location.href,
        paintTiming: {
          fp: fp ? Math.round(fp.startTime) + 'ms' : 'N/A',
          fcp: fcp ? Math.round(fcp.startTime) + 'ms' : 'N/A',
          lcp: lcp ? Math.round(lcp.startTime) + 'ms' : 'N/A',
          lcpElement: lcp ? lcp.element?.tagName + (lcp.element?.textContent?.substring(0, 50) || '') : 'N/A',
        },
        navigationEntry: lastNav ? {
          ttfb: Math.round(lastNav.responseStart - lastNav.requestStart),
          download: Math.round(lastNav.responseEnd - lastNav.responseStart),
          domParsing: Math.round(lastNav.domInteractive - lastNav.responseEnd),
          domInteractive: Math.round(lastNav.domInteractive - lastNav.startTime),
          domContentLoaded: Math.round(lastNav.domContentLoadedEventEnd - lastNav.startTime),
          loadComplete: Math.round(lastNav.loadEventEnd - lastNav.startTime),
        } : null,
      };
    });

    routeTiming.directLoadMs = directElapsed;
    console.log(JSON.stringify(routeTiming, null, 2));
  }

  // ============================================================
  // STEP 3: LCP and detailed paint metrics on /services
  // ============================================================
  console.log('\n=== STEP 3: Detailed Paint/LCP Metrics on /services ===\n');

  // Make sure we're on /services
  const currentUrl = page.url();
  if (!currentUrl.includes('/services')) {
    await page.goto(BASE_URL + '/services', { waitUntil: 'load', timeout: 15000 });
  }

  // Wait for LCP
  await new Promise(r => setTimeout(r, 2500));

  const lcpMetrics = await page.evaluate(() => {
    const paintEntries = performance.getEntriesByType('paint');
    const fp = paintEntries.find(p => p.name === 'first-paint');
    const fcp = paintEntries.find(p => p.name === 'first-contentful-paint');
    const lcpEntries = performance.getEntriesByType('largest-contentful-paint');
    const lcp = lcpEntries[lcpEntries.length - 1];

    const resources = performance.getEntriesByType('resource');
    let totalTransferSize = 0;
    resources.forEach(r => { totalTransferSize += r.transferSize || 0; });

    const jsResources = resources
      .filter(r => r.name.includes('.js'))
      .map(r => ({
        name: r.name.split('/').pop().split('?')[0],
        transferKB: Math.round((r.transferSize || 0) / 1024),
      }));

    const cssResources = resources
      .filter(r => r.name.includes('.css'))
      .map(r => ({
        name: r.name.split('/').pop().split('?')[0],
        transferKB: Math.round((r.transferSize || 0) / 1024),
      }));

    return {
      fp: fp ? Math.round(fp.startTime) + 'ms' : 'N/A',
      fcp: fcp ? Math.round(fcp.startTime) + 'ms' : 'N/A',
      lcp: lcp ? Math.round(lcp.startTime) + 'ms' : 'N/A',
      lcpElement: lcp ? (lcp.element?.tagName || '') + (lcp.element?.id ? '#' + lcp.element.id : '') + (lcp.element?.className ? '.' + String(lcp.element.className).split(' ').slice(0, 3).join('.') : '') : 'N/A',
      lcpSize: lcp ? Math.round(lcp.size) : 'N/A',
      lcpUrl: lcp ? (lcp.url || 'N/A') : 'N/A',
      totalResources: resources.length,
      totalTransferKB: Math.round(totalTransferSize / 1024),
      jsResources,
      cssResources,
    };
  });

  console.log(JSON.stringify(lcpMetrics, null, 2));

  // ============================================================
  // STEP 4: Cold Load Measurement (fresh page, no cache)
  // ============================================================
  console.log('\n=== STEP 4: Cold Load Measurement (fresh context) ===\n');

  const freshPage = await browser.newPage();
  await freshPage.setCacheEnabled(false);

  const coldStart = Date.now();
  await freshPage.goto(BASE_URL + '/', { waitUntil: 'load', timeout: 30000 });
  const coldLoadMs = Date.now() - coldStart;

  await freshPage.waitForFunction(() => {
    const paints = performance.getEntriesByType('paint');
    return paints.length >= 2;
  }, { timeout: 10000 }).catch(() => {});

  await new Promise(r => setTimeout(r, 500));

  const coldMetrics = await freshPage.evaluate(() => {
    const paintEntries = performance.getEntriesByType('paint');
    const fp = paintEntries.find(p => p.name === 'first-paint');
    const fcp = paintEntries.find(p => p.name === 'first-contentful-paint');

    const resources = performance.getEntriesByType('resource');
    let totalTransferSize = 0;
    resources.forEach(r => { totalTransferSize += r.transferSize || 0; });

    return {
      totalLoadMs: undefined, // set outside
      fp: fp ? Math.round(fp.startTime) : null,
      fcp: fcp ? Math.round(fcp.startTime) : null,
      gap: fp && fcp ? Math.round(fcp.startTime - fp.startTime) : null,
      totalResources: resources.length,
      totalTransferKB: Math.round(totalTransferSize / 1024),
    };
  });

  coldMetrics.totalLoadMs = coldLoadMs;
  console.log(JSON.stringify(coldMetrics, null, 2));

  // ============================================================
  // STEP 5: Production Bundle Size Analysis
  // ============================================================
  console.log('\n=== STEP 5: Production Bundle Size Analysis ===\n');

  // Analyze dist directory
  const distDir = path.resolve(__dirname, 'dist');
  const assetsDir = path.join(distDir, 'assets');

  function getDirSize(dir) {
    let totalSize = 0;
    const files = [];
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isFile()) {
          const stat = fs.statSync(fullPath);
          totalSize += stat.size;
          files.push({ name: entry.name, sizeKB: Math.round(stat.size / 1024) });
        } else if (entry.isDirectory()) {
          const sub = getDirSize(fullPath);
          totalSize += sub.totalSize;
          files.push(...sub.files.map(f => ({ ...f, name: entry.name + '/' + f.name })));
        }
      }
    } catch (e) {}
    return { totalSize, files };
  }

  const assetsInfo = getDirSize(assetsDir);
  const jsFiles = assetsInfo.files.filter(f => f.name.endsWith('.js')).sort((a, b) => b.sizeKB - a.sizeKB);
  const cssFiles = assetsInfo.files.filter(f => f.name.endsWith('.css')).sort((a, b) => b.sizeKB - a.sizeKB);

  const bundleAnalysis = {
    totalAssetsKB: Math.round(assetsInfo.totalSize / 1024),
    jsFiles: jsFiles,
    cssFiles: cssFiles,
    totalJsKB: jsFiles.reduce((sum, f) => sum + f.sizeKB, 0),
    totalCssKB: cssFiles.reduce((sum, f) => sum + f.sizeKB, 0),
  };

  console.log(JSON.stringify(bundleAnalysis, null, 2));

  await freshPage.close();
  await page.close();
  await browser.close();

  console.log('\n=== ALL MEASUREMENTS COMPLETE ===');
}

measure().catch(err => {
  console.error('Error:', err.message);
  console.error(err.stack);
  process.exit(1);
});
