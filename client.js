const http = require('http');
const fs = require('fs');
const zlib = require('zlib');

const fileStream = fs.createReadStream('example.txt');
const compressedStream = fileStream.pipe(zlib.createGzip());

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/upload',
  method: 'POST',
  headers: {
    'Content-Type': 'application/octet-stream',
    'Content-Encoding': 'gzip'
  }
};

const req = http.request(options, (res) => {
  res.on('data', (chunk) => {
    console.log(chunk.toString());
  });
});

compressedStream.pipe(req);

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
});

req.end();
