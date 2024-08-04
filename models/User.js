const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {}

  User.init({
    id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: true,
      field: "id",
      autoIncrement: false
    },
    username: {
      type: DataTypes.CHAR(255),
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "username",
      autoIncrement: false
    },
    typeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "typeId",
      autoIncrement: false,
      references: {
        key: "id",
        model: "UserTypes"
      }
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "roleId",
      autoIncrement: false,
      references: {
        key: "id",
        model: "Roles"
      }
    },
    other: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "other",
      autoIncrement: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "createdAt",
      autoIncrement: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "updatedAt",
      autoIncrement: false
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "deletedAt",
      autoIncrement: false
    }
  },
  {
    sequelize,
    modelName: 'User',
    paranoid: true,
  });
  return User;
};