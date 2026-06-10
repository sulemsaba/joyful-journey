import http from 'http';
import fs from 'fs';
import path from 'path';

const DIST = '/home/z/my-project/dist';
const PORT = 3000;

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.map': 'application/json',
};

const server = http.createServer((req, res) => {
  let urlPath = req.url.split('?')[0];
  let filePath = path.join(DIST, urlPath === '/' ? 'index.html' : urlPath);
  const ext = path.extname(filePath).toLowerCase();
  
  fs.readFile(filePath, (err, data) => {
    if (err) {
      fs.readFile(path.join(DIST, 'index.html'), (e2, d2) => {
        if (e2) { res.writeHead(404); res.end('Not Found'); return; }
        res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
        res.end(d2);
      });
      return;
    }
    const contentType = mimeTypes[ext] || 'application/octet-stream';
    res.writeHead(200, {'Content-Type': contentType});
    res.end(data);
  });
});

// Log signals to file
['SIGHUP', 'SIGINT', 'SIGTERM', 'SIGQUIT'].forEach(sig => {
  process.on(sig, () => {
    fs.appendFileSync('/tmp/server-signals.log', `${new Date().toISOString()} Received ${sig}\n`);
    process.exit(0);
  });
});
process.on('exit', (code) => {
  fs.appendFileSync('/tmp/server-signals.log', `${new Date().toISOString()} Exit code=${code}\n`);
});

server.listen(PORT, '0.0.0.0', () => {
  fs.writeFileSync('/tmp/server-signals.log', `${new Date().toISOString()} Server on port ${PORT}\n`);
  console.log(`Server on port ${PORT}`);
});
