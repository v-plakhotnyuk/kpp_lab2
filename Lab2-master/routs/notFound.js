const render = require('../lib/render.js');

function notFound(req, res) {
  render('error.html', { error: 'Not found' }, (error, html) => {
        if (error) {
           res.writeHead(500, { 'Content-Type': 'text/plain' });
           return res.end(error.message);

        }

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(html);
  });
}

module.exports = notFound;
