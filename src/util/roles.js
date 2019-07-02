const Roles = require('koa-roles');

module.exports = function () {
  const roles = new Roles();

  roles.use('user', (ctx) => {
    return !!ctx.state.user;
  });

  return roles;
};
