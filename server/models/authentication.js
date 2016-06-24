module.exports = function(Authentication) {
  Authentication.post = function (data, cb) {
    var socketio = require('../socketio')
    var socket = socketio.sockets[data.sid]
    if(socket){
      socket.emit('auth',data)
    }
    cb(null, data)
  }

  Authentication.remoteMethod(
    'post',
    {
      accepts: {arg: 'data', type: 'object', http: {source: 'body'}},
      returns: {arg: 'data', type: Authentication.modelName, root: true},
      http: {path: '/', verb: 'post'}
    }
  );

};
