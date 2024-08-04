const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Role = require('./role')(sequelize, Sequelize);
db.Group = require('./group')(sequelize, Sequelize);

db.Role.hasMany(db.User, { foreignKey: 'role_id' });
db.User.belongsTo(db.Role, { foreignKey: 'role_id' });

db.Group.belongsTo(db.Role, { foreignKey: 'role_id' });
db.Group.belongsTo(db.User, { foreignKey: 'user_id' });

module.exports = db;
