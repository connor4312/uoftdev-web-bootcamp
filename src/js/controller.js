var _ = require('lodash');

function Controller ($http) {
    var vm = this;

    vm.favorites = [];
    vm.alert = null;
    vm.query = {query: ''};
    vm.loading = false;
    vm.image = null;

    vm.search = search;
    vm.favorite = favorite;
    vm.unfavorite = unfavorite;

    $http
        .get('/favorites')
        .success(function (data) {
            vm.favorites = data;
        })
        .error(function (err) {
            vm.alert = err;
        });

    function search () {
        vm.loading = true;

        $http
            .get('/search', {params: vm.query})
            .success(function (data) {
                vm.image = data;
            })
            .error(function (err) {
                vm.alert = err;
            });
    }

    function favorite (image) {
        if (_.find(vm.favorites, {id: image.id})) {
            vm.alert = 'You already favorited this!';
            return;
        }

        vm.favorites.push(image);

        $http
            .post('/favorites', {query: image.query, id: image.id})
            .error(function (err) {
                vm.alert = err;
            });
    }

    function unfavorite (image) {
        vm.favorites = _.reject(vm.favorites, {id: image.id});

        $http
            .delete('/favorites', {params: {query: image.query, id: image.id}})
            .error(function (err) {
                vm.alert = err;
            });
    }
}

Controller.$inject = ['$http'];

module.exports = Controller;
