var _ = require('lodash')
module.exports = function (Profile) {
  Profile.disableRemoteMethod('findOne', true)
  Profile.disableRemoteMethod('findById', true)
  Profile.disableRemoteMethod('createChangeStream', true)
  Profile.disableRemoteMethod('exists', true)
  Profile.disableRemoteMethod('updateAll', true)
  Profile.disableRemoteMethod('count', true)
  Profile.disableRemoteMethod('upsert', true)
  Profile.disableRemoteMethod('deleteById', true)
  Profile.disableRemoteMethod('create', true)

  Profile.afterRemote('find', function (ctx, res, next) {
    var u = ctx.req.get('sm_user') || ctx.req.get('smgov_userdisplayname') || 'unknown'
    if (res.length === 0) {
      Profile.create({userId: u, registeredServices: []}, function (err, instance) {
        res.push(instance)
        next()
      })
    }
    else {
      next()
    }
  })

  Profile.observe('access', function (ctx, next) {
    var httpCtx = require('loopback').getCurrentContext()
    ctx.query.where = ctx.query.where || {}
    var u = httpCtx.active.http.req.get('sm_user') || httpCtx.active.http.req.get('smgov_userdisplayname')
    if (u) {
      ctx.query.where = ctx.query.where || {}
      ctx.query.where.userId = u
    }
    next()
  })

  Profile.beforeRemote('prototype.updateAttributes', function (ctx, instance, next) {
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

  Profile.services = function (ctx, service, callback) {
    var u = ctx.req.get('sm_user') || ctx.req.get('smgov_userdisplayname') || 'unknown'
    service.operation = ctx.req.method
    Profile.findOrCreate({where: {userId: u}}, {userId: u, registeredServices: []}, function (err, instance, created) {
      if (err) {
        return callback(err, null)
      }
      Profile.app.models.Service.findOne({where: {name: service.name}}, function (err, data) {
        if (err) {
          return callback(err, null)
        }
        if (!data) {
          return callback('invalid serivce name', null)
        }

        switch (service.operation) {
          case 'POST':
            if (instance.registeredServices.indexOf(data.id.toString()) < 0) {
              instance.registeredServices.push(data.id)
            }
            break
          case 'DELETE':
            _.remove(instance.registeredServices, function (e, i) {
              return e == data.id
            })
            break
        }
        instance.save(function (err, data) {
          callback(err, data)
        })
      })
    })
  }
}
