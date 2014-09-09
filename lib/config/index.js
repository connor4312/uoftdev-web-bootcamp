var config = __dirname + '/../../config.json';

if (!require('fs').existsSync(config)) {
    throw new Error(' Config not found. Please copy the config.example.json' +
        ' to the config.json and fill in your details!');
}

module.exports = require(config);
