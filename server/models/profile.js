var loopback = require('loopback');

module.exports = function (Profile) {
  Profile.get = function (cb) {
    var ctx = loopback.getCurrentContext();
    var req = ctx.active.http.req;
    cb(null, {
      name: req.get('sm_user') || req.get('smgov_userdisplayname') || 'my friend',
      headers: req.headers
    });
  }

  Profile.remoteMethod(
    'get',
    {
      returns: {arg: 'data', type: Profile.modelName, root: true},
      http: {path: '/', verb: 'get'}
    }
  );
};
