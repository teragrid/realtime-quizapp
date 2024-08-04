const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Question extends Model {}

  Question.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: "nextval(\"Questions_id_seq\"::regclass)",
      comment: null,
      primaryKey: true,
      field: "id",
      autoIncrement: false
    },
    quizId: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "quizId",
      autoIncrement: false,
      references: {
        key: "id",
        model: "Quizzes"
      }
    },
    question: {
      type: DataTypes.CHAR(255),
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "question",
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
    modelName: 'Question',
    paranoid: true,
  });
  return Question;
};