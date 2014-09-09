var app    = require('./lib/app'),
    config = require('./lib/config');

console.log('The flickr recommended package feels the need to cache methods...');
console.log('so please wait a moment while it does its thing.');
require('./lib/flickr')();

app.listen(config.http.port, config.http.host);
console.log('Listening on ' + [config.http.host, config.http.port].join(':'));
