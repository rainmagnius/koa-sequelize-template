const KoaRouter = require('koa-router');

module.exports = () => {
  const router = new KoaRouter({
    prefix: '/example',
  });

  router.get('/', (ctx) => {
    ctx.body = 'Hello World!';
  });

  return router;
};
