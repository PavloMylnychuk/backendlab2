const http = require('http');
const fs = require('fs');
const zlib = require('zlib');

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/upload') {
    const unzipStream = zlib.createGunzip();
    const fileWriteStream = fs.createWriteStream('uploaded_file.txt');

    req.pipe(unzipStream).pipe(fileWriteStream);

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('File uploaded and decompressed successfully');
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
