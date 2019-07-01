const KoaRouter = require('koa-router');

module.exports = function (container) {
  const passport = container.get('passport');
  const router = new KoaRouter();

  router.get('/register', async (ctx) => {
    return passport.authenticate('register', async (err, user, info) => {
      if (err) {
        throw err;
      } else if (user === false) {
        throw {
          code: 401,
          message: info.message,
        };
      } else {
        await ctx.login(user);
        ctx.body = {
          message: 'Signed up!',
        };
      }
    })(ctx);
  });

  router.get('/login', async (ctx) => {
    return passport.authenticate('login', async (err, user, info) => {
      if (err) {
        throw err;
      } else if (user === false) {
        throw {
          code: 401,
          message: info.message,
        };
      } else {
        await ctx.login(user);
        ctx.body = {
          message: 'Logged in!',
        };
      }
    })(ctx);
  });

  router.get('/logout', (ctx) => {
    if (ctx.isAuthenticated()) ctx.session = null;
    ctx.body = { message: 'Logged out' };
  });

  router.get('/check', (ctx) => {
    ctx.body = { message: ctx.isAuthenticated() ? 'Authenticated!' : 'Not authenticated.' };
  });

  return router;
};
