'use strict';
module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize

  class Group extends Model {}

  Group.init({
    name: DataTypes.STRING
  }, {
    sequelize
  })

  Group.associate = function(models) {
    Group.belongsToMany(models.User, { through : 'UserGroup'} )
  };
  return Group;
};