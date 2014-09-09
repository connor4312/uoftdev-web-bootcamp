var search = require('../../flickr/search');

module.exports = function (req, res) {
    search.favorite(req.param('query'), parseInt(req.param('id')));
    res.status(200).end();
};
