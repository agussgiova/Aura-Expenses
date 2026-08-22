const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = 3000;
const APP_DIR = path.join(__dirname);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.json': 'application/json',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
};

const server = http.createServer((req, res) => {
  let urlPath = req.url.split('?')[0];
  if (urlPath === '/' || urlPath === '') urlPath = '/index.html';

  const filePath = path.join(APP_DIR, urlPath);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME[ext] || 'text/plain';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(302, { Location: '/index.html' });
        res.end();
      } else {
        res.writeHead(500);
        res.end('Server error: ' + err.code);
      }
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log('');
  console.log('  ✨ Aura Finance corriendo en:');
  console.log('  👉  http://localhost:' + PORT);
  console.log('');
  console.log('  Credenciales demo:');
  console.log('  📧  demo@aura.com');
  console.log('  🔑  demo1234');
  console.log('');
  console.log('  Ctrl+C para detener el servidor.');
  console.log('');
});
