// Generated by CoffeeScript 1.7.1
(function() {
  var erpServices;

  erpServices = angular.module('erpServices', ['ngCookies']);

  erpServices.factory('security', [
    '$cookies', '$http', function($cookies, $http) {
      return {
        setHttpHeader: function(header) {
          return $http.defaults.headers.common.Authorization = "Token " + header.Authorization;
        },
        saveCookie: function() {
          return $cookies.test = "test";
        },
        getCookie: function() {
          return {
            token: $cookies.test
          };
        },
        getCSRF: function() {
          return $cookies.csrftoken;
        }
      };
    }
  ]);

}).call(this);
