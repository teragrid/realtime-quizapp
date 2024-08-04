const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserType extends Model {}

  UserType.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: "nextval(\"UserTypes_id_seq\"::regclass)",
      comment: null,
      primaryKey: true,
      field: "id",
      autoIncrement: false
    },
    name: {
      type: DataTypes.CHAR(255),
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "name",
      autoIncrement: false
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
    modelName: 'UserType',
    paranoid: true,
  });
  return UserType;
};