
const Koa = require('koa');
const config = require('config');
const session = require('koa-session');
const Router = require('./src/routes');
const Sequelize = require('./src/model');
const Passport = require('./src/util/passport');
const Roles = require('./src/util/roles');
const resultHandler = require('./src/middleware/resultHandler');
const httpLogger = require('./src/middleware/httpLogger');

async function main() {
  const app = new Koa();

  const container = new Map();

  const sequelize = await Sequelize(config.sequelize);
  container.set('sequelize', sequelize);

  const passport = Passport(container);
  container.set('passport', passport);

  const roles = Roles();
  container.set('roles', roles);

  app.use(resultHandler());

  app.use(httpLogger());

  app.keys = config.secretKeys;

  app.use(session({}, app));

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(roles.middleware());

  const router = await Router(container);
  app.use(router.routes());
  app.use(router.allowedMethods());

  return app;
}

main().then((app) => {
  app.listen(3000);
}).catch(console.error);

module.exports = main;
