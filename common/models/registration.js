module.exports = function (Registration) {
  Registration.disableRemoteMethod('findOne', true)
  Registration.disableRemoteMethod('findById', true)
  Registration.disableRemoteMethod('createChangeStream', true)
  Registration.disableRemoteMethod('exists', true)
  Registration.disableRemoteMethod('updateAll', true)
  Registration.disableRemoteMethod('count', true)
  Registration.disableRemoteMethod('upsert', true)
  Registration.disableRemoteMethod('deleteById', true)
  Registration.disableRemoteMethod('create', true)

  Registration.afterRemote('find', function (ctx, res, next) {
    var u = ctx.req.get('sm_user') || ctx.req.get('smgov_userdisplayname') || 'unknown'
    if (res.length === 0) {
      Registration.create({userId: u, serviceIds: []}, function (err, instance) {
        res.push(instance)
        next()
      })
    }
    else {
      next()
    }
  })

  Registration.observe('access', function (ctx, next) {
    var httpCtx = require('loopback').getCurrentContext();
    ctx.query.where = ctx.query.where || {}
    var u = httpCtx.active.http.req.get('sm_user') || httpCtx.active.http.req.get('smgov_userdisplayname')
    if (u) {
      ctx.query.where = ctx.query.where || {}
      ctx.query.where.userId = u
    }
    next()
  })

  Registration.beforeRemote('prototype.updateAttributes', function (ctx, instance, next) {
    var u = ctx.req.get('sm_user') || ctx.req.get('smgov_userdisplayname') || 'unknown'
    ctx.args.data.userId = u
    if (u !== ctx.instance.userId) {
      var error = new Error('Unauthorized')
      error.status = 401
      next(error)
    }
    else {
      next()
    }
  })
}
