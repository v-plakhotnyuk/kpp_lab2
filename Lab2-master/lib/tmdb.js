const http = require('http');
const https = require('https');

function get(title, done) {
     const req = https.get(`https://api.themoviedb.org/3/movie/${title}?api_key=898ef5f7d0e066c09b28f4cc76b6b1f9`, res => {
           if (res.statusCode !== 200) {
               done (new Error(`Помилка: ${res.statusMessage} (${res.statusCode})`));
               res.resume();
               return;
           }
           res.setEncoding('utf-8');

           let body = '';

           res.on('data', data => body += data);

           res.on('end', () => {
               let result;

               try {
                  result = JSON.parse(body);
               } catch(error) {
                  done(error);
                 }
              if (result.Response === 'False') return done(new Error('Фільм не знайдено'));

                 done(null, result);
           }
     );
  });
     req.on('error', error => done(error));
}

module.exports = {
        get
};
