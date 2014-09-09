var search = require('../../flickr/search');

module.exports = function (req, res) {
    res.json(search.favorites());
};
