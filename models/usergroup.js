'use strict';
module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize

  class UserGroup extends Model {}

  UserGroup.init({
    UserId: DataTypes.INTEGER,
    GroupId: DataTypes.INTEGER
  }, {
    sequelize
  })
 
  UserGroup.associate = function(models) {
    // associations can be defined here
  };
  return UserGroup;
};