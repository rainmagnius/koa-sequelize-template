const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

/**
 * Инициализация моделей sequelize
 * @memberof Model
 *
 * @param {object} params
 * @param {string} params.db имя базы данных
 * @param {string} params.user имя пользователя
 * @param {string} params.pass пароль пользователя
 * @param {object} params.options объект опции sequelize
 * @param {boolean} params.force обнуление базы при запуске
 *
 * @returns {Promise<SequelizeObject>} объект Sequelize
 */
async function initSequelize(params) {
  const sequelize = new Sequelize(params.db, params.user, params.pass, params.options);

  fs.readdirSync(__dirname)
    .filter(f => f !== 'index.js' && f.slice(-3 === '.js'))
    .forEach((file) => {
      sequelize.import(path.join(__dirname, file));
    });

  Object.keys(sequelize.models).forEach((m) => {
    if ('associate' in sequelize.models[m]) sequelize.models[m].associate(sequelize.models);
  });

  await sequelize.sync({ force: params.force });

  const promises = [];
  Object.keys(sequelize.models).forEach((m) => {
    if ('createDefault' in sequelize.models[m]) promises.push(sequelize.models[m].createDefault(sequelize.models));
  });

  await Promise.all(promises);

  return sequelize;
}

module.exports = initSequelize;
