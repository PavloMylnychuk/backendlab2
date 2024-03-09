const http = require('http');
const fs = require('fs');
const csv = require('csv-parser');
const zlib = require('zlib');
const through2 = require('through2');
const split2 = require('split2');

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    const readStream = fs.createReadStream('data.csv')
      .pipe(zlib.createGunzip())
      .pipe(split2())
      .pipe(through2.obj((line, encoding, callback) => {
        // Assume the first line contains column names
        const columns = line.toString().split(',');

        const objectStream = through2.obj();
        objectStream.push('[');

        req.on('end', () => {
          objectStream.push(']');
          objectStream.push(null);
        });

        const dataStream = fs.createReadStream('data.csv')
          .pipe(zlib.createGunzip())
          .pipe(csv({ headers: columns }))
          .pipe(through2.obj((data, enc, cb) => {
            objectStream.push(JSON.stringify(data) + ',');
            cb();
          }))
          .on('end', () => objectStream.end());

        objectStream.pipe(res);
        dataStream.pipe(objectStream);
      }));

    readStream.on('error', () => {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
