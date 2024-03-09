const http = require('http');
const cookie = require('cookie');

const server = http.createServer((req, res) => {
  const cookies = cookie.parse(req.headers.cookie || '');

  if (cookies.user_info === 'user1') {
    const userInfo = {
      id: 1,
      firstName: 'Leanne',
      lastName: 'Graham'
    };

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(userInfo));
  } else {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end('{}');
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
