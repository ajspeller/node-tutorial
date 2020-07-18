const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  console.log('request made', req.url, req.method);
  // set header content type
  // res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Type', 'text/html');
  // res.write('<p>our universe<p>');
  // res.write('<p>milky way galaxy<p>');
  // res.end();

  let path = './views/';

  switch (req.url) {
    case '/':
      path += 'index.html';
      res.statusCode = 200;
      break;
    case '/index.html':
      path += 'index.html';
      res.statusCode = 200;
      break;
    case '/about':
      path += 'about.html';
      res.statusCode = 200;
      break;
    case '/about-me':
      res.statusCode = 301;
      res.setHeader('Location', '/about'); // redirect
      res.end();
      return;
    default:
      path += '404.html';
      res.statusCode = 404;
      break;
  }

  // send an html file
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log('error: ', err);
      return res.end();
    }
    console.log('success');
    // res.write(data);
    res.end(data);
  });
});

server.listen(3000, 'localhost', () => {
  console.log('listening ...');
});
