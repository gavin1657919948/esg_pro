module.exports = function(Organization) {
  Organization.list = async function(id, cb) {
    let organizations = await Organization.find({ where: { systemUserId: id } })
    return organizations
  }

  Organization.remoteMethod('list', {
    description: 'return organizationlist of the user',
    accepts: {
      arg: 'id',
      type: 'any',
      http: ctx => ctx.req.accessToken && ctx.req.accessToken.userId,
    },
    returns: { arg: 'organziationLists', type: 'any' },
    http: {
      verb: 'get',
      path: '/list',
    },
  })
}
