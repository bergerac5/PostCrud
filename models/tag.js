'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    static associate(models) {
      Tag.belongsToMany(models.Post, { 
        through: 'PostTags',  // This specifies the join table
        foreignKey: 'tagId',
        otherKey: 'postId',  // Ensure `otherKey` is set
      });
    }
  }

  Tag.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Tag',
  });

  return Tag;
};
