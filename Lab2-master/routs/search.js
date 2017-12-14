const tmdb = require('../lib/tmdb.js')
const render = require('../lib/render.js');
const url = require('url');


function search(req, res) {
    const parsedUrl = url.parse(req.url, true);
    const title = parsedUrl.query.title;

    tmdb.get(title, (error, movie) => {
          if (error) {
            render('error.html', { error: error.message }, (error, html) => {
                  if (error) {
                     res.writeHead(500, { 'Content-Type': 'text/plain' });
                     return res.end(error.message);

                  }

                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'text/html');
                  res.end(html);
            });
          }

          render('movie.html', movie, (error, html) => {
                if (error) {
                   res.writeHead(500, { 'Content-Type': 'text/plain' });
                   return res.end(error.message);

                }

                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                res.end(html);
          });
    });
}

module.exports = search;
