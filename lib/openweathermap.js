const https = require('https');
const qs = require('querystring');


module.exports = async function(apiKey, lat, lon) {
  const url = 'https://api.openweathermap.org/data/2.5/weather?' + qs.stringify({
    lat: lat,
    lon: lon,
    appid: apiKey,
    units: 'metric',
  });

  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let body = '';

      res.on('data', (data) => {
        body += data.toString();
      });

      res.on('end', () => resolve(JSON.parse(body)));
    }).on('error', reject);
  });
};
