const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes)  => {
  class Profile extends Model {}
  
  Profile.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: "nextval(\"Profiles_id_seq\"::regclass)",
      comment: null,
      primaryKey: true,
      field: "id",
      autoIncrement: false
    },
    userId: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "userId",
      autoIncrement: false,
      references: {
        key: "id",
        model: "Users"
      }
    },
    firstName: {
      type: DataTypes.CHAR(255),
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "firstName",
      autoIncrement: false
    },
    lastName: {
      type: DataTypes.CHAR(255),
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "lastName",
      autoIncrement: false
    },
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "birthday",
      autoIncrement: false
    },
    email: {
      type: DataTypes.CHAR(255),
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "email",
      autoIncrement: false
    },
    phoneNumber: {
      type: DataTypes.CHAR(255),
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "phoneNumber",
      autoIncrement: false
    },
    country: {
      type: DataTypes.CHAR(255),
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "country",
      autoIncrement: false
    },
    avatar: {
      type: DataTypes.CHAR(255),
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "avatar",
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
    modelName: 'Profile',
    paranoid: true,
  });
  return Profile;
};