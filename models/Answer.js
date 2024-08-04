const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {}

  Answer.init ({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: "nextval(\"Answers_id_seq\"::regclass)",
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
        model: "Quiz"
      }
    },
    questionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "questionId",
      autoIncrement: false,
      references: {
        key: "id",
        model: "Question"
      }
    },
    answer: {
      type: DataTypes.CHAR(255),
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "answer",
      autoIncrement: false
    },
    isCorrect: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "isCorrect",
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
    modelName: 'Answer',
    paranoid: true,
  });
  return Answer;
};