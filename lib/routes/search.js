var search = require('../flickr/search');

module.exports = function (req, res) {
    var query = req.param('query');

    search
        .getRandom(query)
        .then(function (url) {
            res.status(200).send(url);
        }, function (err) {
            res.status(400).send(err);
        });
};
