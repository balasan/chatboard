
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');


var app = express();

var server = http.createServer(app)
var io = require('socket.io').listen(server, {log: false});


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


io.sockets.on('connection', function(socket) {

  var getUsers = function(){
    var clients = io.sockets.clients();
    var names = []
    clients.forEach(function(client) {
        names.push({name: client.username});
    }); 
    return names;
  }
  socket.emit('updateUsers', getUsers())

  socket.on('setName', function(name, callback) {
    socket.username = name;    
    io.sockets.emit('updateUsers', getUsers());
  });



});



