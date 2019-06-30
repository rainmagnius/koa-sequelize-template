const KoaRouter = require('koa-router');

module.exports = function (container) {
  const passport = container.get('passport');
  const router = new KoaRouter();

  router.get('/register', (ctx) => {
    return passport.authenticate('register', (err, user, info) => {
      if (err) {
        ctx.body = 'Registration error';
      } else if (user === false) {
        ctx.body = info.message;
      } else {
        ctx.body = 'OK';
        return ctx.login(user);
      }
    })(ctx);
  });

  router.get('/login', (ctx) => {
    return passport.authenticate('login', (err, user, info) => {
      if (err) {
        ctx.body = 'Login error';
      } else if (user === false) {
        ctx.body = info.message;
      } else {
        ctx.body = 'OK';
        return ctx.login(user);
      }
    })(ctx);
  });

  router.get('/logout', (ctx) => {
    if (ctx.isAuthenticated()) ctx.session = null;
    ctx.body = 'OK';
  });

  router.get('/check', (ctx) => {
    if (ctx.isAuthenticated()) ctx.body = 'Authenticated!';
    else ctx.body = 'Not authenticated';
  });

  return router;
};
