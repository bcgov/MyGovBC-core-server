module.exports = function (Registration) {
  Registration.disableRemoteMethod('findOne', true)
  Registration.disableRemoteMethod('findById', true)
  Registration.disableRemoteMethod('createChangeStream', true)
  Registration.disableRemoteMethod('exists', true)
  Registration.disableRemoteMethod('updateAll', true)
  Registration.disableRemoteMethod('count', true)
  Registration.disableRemoteMethod('upsert', true)
  Registration.disableRemoteMethod('deleteById', true)
  Registration.disableRemoteMethod('__create__services', false)
  Registration.disableRemoteMethod('__updateById__services', false)
  Registration.disableRemoteMethod('__delete__services', false)
  Registration.disableRemoteMethod('__destroyById__services', false)
  Registration.disableRemoteMethod('__unlink__services', false)
  Registration.disableRemoteMethod('__link__services', false)
  Registration.disableRemoteMethod('__exists__services', false)
  Registration.disableRemoteMethod('__findById__services', false)
  Registration.disableRemoteMethod('__count__services', false)

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
}
