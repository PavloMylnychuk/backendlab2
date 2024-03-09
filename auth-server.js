const http = require('http');

const server = http.createServer((req, res) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader === 'Bearer ekV5Rk4wMlgvYVpCbmp5WUh5bHVPMktwMzktY05QeDRjT3FlWlNiUTJhbVpraHc5d3Y5a3YtU2pM') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Authorized');
  } else {
    res.writeHead(401, { 'Content-Type': 'text/plain' });
    res.end('Unauthorized');
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
