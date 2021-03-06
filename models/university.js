'use strict';
module.exports = (sequelize, DataTypes) => {
  const university = sequelize.define('university', {
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    Name: DataTypes.STRING
  }, {
    freezeTableName: true,
    timestamp: false,
    omitNull: true,
  });
  university.associate = function (models) {
    university.hasMany(models.user, {
      foreignKey: 'Universities_ID'
    });
  };
  return university;
};