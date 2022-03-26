const { Sequelize } = require('sequelize');

module.exports = new Sequelize('testTelega', 'root', 'root', {
  host: '95.213.208.61',
  port: '6432',
  dialect: 'postgres',
});
