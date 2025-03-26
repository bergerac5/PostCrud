'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Correct references to models from `models`
      User.hasOne(models.Profile, { // Correct reference to models.Profile
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });

      User.hasMany(models.Post, { // Correct reference to models.Post
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
    }
  }

  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};
