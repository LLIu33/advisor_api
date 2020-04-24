const dbConfig = require('../../config/mysql');
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const db = {};

const config = dbConfig[process.env.NODE_ENV || 'development'];
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  operatorsAliases: '0',
  dialectOptions: {
    charset: 'utf8mb4',
  },
  define: {
    freezeTableName: true,
    syncOnAssociation: true,
  },
});

fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
  })
  .forEach((file) => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// console.log('================START SYNC=======================');
// sequelize.sync({ force: true });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
