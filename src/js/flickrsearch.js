var angular = require('angular');

module.exports = angular.module('flickrsearch', [])
    .controller('Controller', require('./controller'));
