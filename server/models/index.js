const { Sequelize } = require('sequelize');
const config = require('../config/db');

const sequelize = new Sequelize(config.url, {
  dialect: 'postgres',
  logging: false,
  ...(config.url && config.url.includes('supabase.co') ? {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  } : {})
});

const User = require('./User')(sequelize);
const Task = require('./Task')(sequelize);

User.hasMany(Task, { foreignKey: 'userId', onDelete: 'CASCADE' });
Task.belongsTo(User, { foreignKey: 'userId' });

module.exports = { sequelize, User, Task };
