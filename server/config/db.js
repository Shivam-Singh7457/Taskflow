require('dotenv').config();

module.exports = {
  url: process.env.DATABASE_URL || 'postgres://user:password@localhost:5432/taskmanager'
};
