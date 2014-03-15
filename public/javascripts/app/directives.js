'use strict';

/* Directives */

var app=angular.module('myApp.directives', [])

// app.directive('users', function (version) {
//     return function(scope, elm, attrs) {
//       elm.text(version);
//     };
// });

app.directive('appVersion', function (version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
});
