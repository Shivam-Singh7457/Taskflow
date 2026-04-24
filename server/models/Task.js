const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  return sequelize.define('Task', {
    id:          { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    title:       { 
      type: DataTypes.STRING, 
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Title cannot be empty' },
        len: [3, 100]
      }
    },
    description: { type: DataTypes.TEXT, defaultValue: '' },
    status:      { type: DataTypes.ENUM('pending','completed'), defaultValue: 'pending' },
    priority:    { type: DataTypes.ENUM('low','medium','high'), defaultValue: 'medium' },
    userId:      { type: DataTypes.UUID, allowNull: false }
  }, { 
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['title', 'userId'],
        name: 'unique_task_title_per_user'
      }
    ]
  });
};
