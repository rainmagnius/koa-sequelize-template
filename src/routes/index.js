const fs = require('fs');
const path = require('path');
const KoaRouter = require('koa-router');

/**
 * Инициализация koa-router
 * @memberof Model
 *
 * @param {Map<string, object>} container
 *
 * @returns {Promise<KoaRouter>}
 */
async function initRouter(container) {
  const Router = new KoaRouter();

  fs.readdirSync(__dirname)
    .filter(f => f !== 'index.js' && f.slice(-3 === '.js'))
    .forEach((file) => {
      // eslint-disable-next-line
      const nestedRouter = require(path.join(__dirname, file))(container);
      Router.use(nestedRouter.routes(), nestedRouter.allowedMethods());
    });

  return Router;
}

module.exports = initRouter;
