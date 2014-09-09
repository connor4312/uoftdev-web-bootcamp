var flickr = require('./index'),
    util   = require('util'),
    q      = require('q'),
    _      = require('lodash');

function Search () {
    var self = this,
        cached = {};

    /**
     * Returns a list of all URLs for the given search term.
     *
     * @param {string} query
     * @param {func} callback
     */
    function findUrlsForTerm(query, callback) {
        flickr()
            .run('photos.search', {text: query})
            .then(function (results) {
                var photos = results.photos.photo,
                    i      = 0;

                cached[query] = photos.map(function(item) {
                    return {
                        url: util.format('https://farm%s.staticflickr.com/%s/%s_%s.jpg',
                            item.farm,
                            item.server,
                            item.id,
                            item.secret),
                        favorite: false,
                        id: i++
                    }
                });
                callback();
            }, callback);
    }

    /**
     * Returns an array of all favorited images.
     *
     * @returns {Array}
     */
    self.favorites = function () {
        var favorites = [];
        for (var key in cached) {
            favorites = favorites.concat(_.where(cached[key], {favorite: true}));
        }

        return favorites
    };

    /**
     * Favorites a photo of a given ID from the collection.
     *
     * @param {string} query
     * @param {number} id
     */
    self.favorite = function (query, id) {
        _.find(cached[query], {id: id}).favorite = true;
    };

    /**
     * Unfavorites a photo of a given ID from the collection.
     *
     * @param {string} query
     * @param {number} id
     */
    self.unfavorite = function (query, id) {
        _.find(cached[query], {id: id}).favorite = false;
    };

    /**
     * Returns one random result for the query term.
     *
     * @param {string} query
     * @returns {string}
     */
    self.getRandom = function (query) {
        var defer = q.defer();

        if (typeof cached[query] !== 'undefined') {
            defer.resolve(_.sample(cached[query]));
            return defer.promise;
        }

        findUrlsForTerm(query, function (err) {
            if (err) {
                defer.reject(err);
            } else {
                defer.resolve(_.sample(cached[query]));
            }
        });


        return defer.promise;
    }
}

module.exports = new Search;
