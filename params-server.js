const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  const queryParams = url.parse(req.url, true).query;
  const name = queryParams.name;

  if (name) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Hello ${name}`);
  } else {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('You should provide name parameter');
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
