'use strict';

angular.module('testApp')
    .controller('ItemsCtrl', function ($scope, $http) {
        $scope.message = '';
        $scope.newItem = { name: '', toggle: true };
        $scope.items = [];

        $http.get('/api/items').success(function (items) {

            $scope.items = items;
        });

        $scope.toggle = function(item){
            $scope.message = '';

            item.toggle = !item.toggle;
            var data = { toggle: item.toggle };

            $http.put('/api/items/' + item._id, data)
                .success(function(updatedItem){
                })
                .error(function(err){
                    $scope.message = 'Failed to save changes.';
                });

        };

        $scope.save = function(){
            $scope.message = '';

            $http.post('/api/items/', $scope.newItem)
                .success(function(createdItem){
                    $scope.items.push(createdItem);
                    $scope.newItem.name = '';
                })
                .error(function(err){
                    $scope.message = err;
                });

        };

        $scope.toggleAll = function(){
            $scope.message = '';

            angular.forEach($scope.items, function(item){
                item.toggle = !item.toggle;
            });

            $http.post('/api/updateItems', { items: $scope.items})
                .success(function(success){
                })
                .error(function(err){
                    $scope.message = err;
                });
        };

    });

