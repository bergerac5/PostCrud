'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.belongsTo(models.User, { 
        foreignKey: 'userId',
      });

      Post.belongsToMany(models.Tag, { 
        through: 'PostTags',  // This specifies the join table
        foreignKey: 'postId',
        otherKey: 'tagId',  // Ensure `otherKey` is set
        onDelete: 'CASCADE',
      });
    }
  }

  Post.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Post',
  });

  return Post;
};
