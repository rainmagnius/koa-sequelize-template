
const Koa = require('koa');
const config = require('config');
const Router = require('./src/routes');
const Sequelize = require('./src/model');

async function main() {
  const app = new Koa();

  const container = new Map();

  const sequelize = await Sequelize(config.sequelize);
  container.set('sequelize', sequelize);

  const router = await Router(container);
  app.use(router.routes());
  app.use(router.allowedMethods());

  return app;
}

main().then((app) => {
  app.listen(3000);
}).catch(console.error);

module.exports = main;
