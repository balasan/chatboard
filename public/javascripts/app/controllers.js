'use strict';

/* Controllers */
var app = angular.module('myApp.controllers', [])


app.controller('usersCtrl', [ '$scope',"socket", function ($scope,socket) {


  socket.on('updateUsers', function(users){
    $scope.users = users;
  })

  $scope.$watch('user.name',function(newV, oldV){
    if(newV != oldV){
      socket.emit('setName', $scope.user.name, function(err){
        if (err)
          console.log(err);
        else
          console.log('updated user')
      })
    }
  })

}])






app.controller('AppCtrl', function ($scope, $http) {
  $http({
    method: 'GET',
    url: '/api/name'
  }).
  success(function (data, status, headers, config) {
    $scope.name = data.name;
  }).
  error(function (data, status, headers, config) {
    $scope.name = 'Error!';
  });

})

app.controller('MyCtrl1', function ($scope) {
  // write Ctrl here

})

app.controller('MyCtrl2', function ($scope) {
  // write Ctrl here
});
