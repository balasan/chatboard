'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var app=angular.module('myApp.services', []);
  

app.factory("socket", function($rootScope) {
  
  var socket;
  socket = io.connect('/', {
    'sync disconnect on unload': true
  });

  return {
    on: function(eventName, callback) {
      return socket.on(eventName, function() {
        var args;
        args = arguments;
        return $rootScope.$apply(function() {
          return callback.apply(socket, args);
        });
      });
    },

    emit: function(eventName, data, callback) {
      return socket.emit(eventName, data, function() {
        var args;
        args = arguments;
        return $rootScope.$apply(function() {
          if (callback) {
            return callback.apply(socket, args);
          }
        });
      });
    }
    
  };
});