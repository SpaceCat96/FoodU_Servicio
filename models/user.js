'use strict';
module.exports = (sequelize, DataTypes) => {
  const student = sequelize.define('user', {
    ID:{
      type:DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey:true
    },
    Name: DataTypes.STRING,
    LastName: DataTypes.STRING,
    Email: DataTypes.STRING,
    Password: DataTypes.STRING,
    Roles_ID:{
      type: DataTypes.STRING,
        references: {
          model: "roles",
          key: "ID"
        }
    },
    Universities_ID: {
      type: DataTypes.STRING,
        references: {
          model: "university",
          key: "ID"
        }
    }
  }, {});
  student.associate = function(models) {
    student.belongsTo(models.university,{
      foreignKey:'Universities_ID'
    }),
    student.belongsTo(models.roles,{
      foreignKey:'Roles_ID'
    });
  };  
  return student;
};