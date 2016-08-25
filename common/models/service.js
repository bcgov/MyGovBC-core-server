module.exports = function (Service) {
  Service.disableRemoteMethod('findOne', true)
  Service.disableRemoteMethod('findById', true)
  Service.disableRemoteMethod('createChangeStream', true)
  Service.disableRemoteMethod('exists', true)
  Service.disableRemoteMethod('updateAll', true)
  Service.disableRemoteMethod('count', true)
  Service.disableRemoteMethod('upsert', true)

  Service.beforeRemote('**', function () {
    var ctx = arguments[0]
    var next = arguments[arguments.length - 1]
    var u = ctx.req.get('sm_user') || ctx.req.get('smgov_userdisplayname')
    var error
    if (u && ctx.method.accessType === 'WRITE') {
      error = new Error('Unauthorized')
      error.status = 401
    }
    next(error)
  })
}
