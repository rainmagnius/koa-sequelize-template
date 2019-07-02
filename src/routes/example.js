const KoaRouter = require('koa-router');

module.exports = (container) => {
  const roles = container.get('roles');

  const router = new KoaRouter({
    prefix: '/example',
  });

  router.get('/', (ctx) => {
    ctx.body = 'Hello World!';
  });

  router.get('/private', roles.is('user'), (ctx) => {
    ctx.body = { message: 'You have private access!' };
  });

  return router;
};
