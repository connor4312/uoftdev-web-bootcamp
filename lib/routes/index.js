var path = require('path');

/**
 * Sends the index.html to the browser.
 *
 * @param {express.request}  req
 * @param {express.response} res
 */
function index (req, res) {
    res.sendFile(path.resolve(__dirname, '../../static/index.html'));
}

module.exports = index;
