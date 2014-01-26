'use strict';

angular.module('testApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
