var config = require('../config'),
    Flickr = require("flickrapi"),
    _      = require('lodash'),
    q      = require('q');

/**
 * Function which deep-searches into an object, using dot notation, and returns
 * the desired value. If no such value exists, then it will return undefined. Ex:
 *
 *      deepPluck({foo: {bar: 42}}, 'foo.bar'); // returns 42
 *
 * @param {{}}     object
 * @param {string} search
 * @returns {*|undefined}
 */
function deepPluck (object, search) {
    if (!_.isArray(search)) {
        search = search.split('.');
    }

    var value = object[search.shift()];
    if (typeof value === 'undefined' || search.length === 0) {
        return value;
    }

    return deepPluck(value, search);
}

function FlickrWrapper () {
    /**
     * Wrapper function for the Flickr API, to ensure that we authenticate correctly
     * prior to attempting any requests. Really wish libraries did this automatically,
     * but meh.
     *
     * @type {FlickrWrapper}
     */
    var self = this,
        queue = [],
        flickr = null;

    /**
     * Runs an action against the flickr API. It is queued, to be run if we're not
     * yet authenticated. Returns a promise.
     *
     * @param {string} action
     * @param {{}=} options
     * @returns {Q.promise}
     */
    self.run = function (action, options) {
        var deferred = q.defer();
        queue.push({
            action: action,
            options: options || {},
            deferred: deferred
        });

        runQueue();

        return deferred.promise;
    };

    /**
     * Attempts to run the built-up queue. If we aren't yet ready, it will
     * simply return false. Otherwise, runs and returns true.
     *
     * @returns {bool}
     */
    function runQueue () {
        if (!flickr) {
            return false;
        }

        for (var i = 0, l = queue.length; i < l; i++) {
            // (we have to run it in an IIFE so that the item is the same in the callback)
            (function (item) {
                deepPluck(flickr, item.action)(item.options, function (err, result) {
                    if (err) {
                        item.deferred.reject(err);
                    } else {
                        item.deferred.resolve(result);
                    }
                });
            })(queue[i]);
        }

        return true;
    }

    // Now, let's actually try to authenticate!
    Flickr.tokenOnly(config.flickr, function (err, apiInstance) {
        if (err) {
            throw err;
        }

        flickr = apiInstance;
        runQueue();
    });
}

/**
 * Export a basic singleton implementation. When invoked, returns a single
 * instance of FlickrWrapper, or use the class property to manually
 * create or examine it.
 */
module.exports = (function () {
    var instance;

    function factory () {
        if (!instance) {
            instance = new FlickrWrapper;
        }

        return instance;
    }

    factory.class = FlickrWrapper;

    return factory;
})();

