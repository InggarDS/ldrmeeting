'use strict';
module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize

  class User extends Model {}
  
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize
  })

  User.associate = function(models) {
    User.belongsToMany(models.Group,{ through: 'UserGroup'})
  };
  return User;
};