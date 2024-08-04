const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Score extends Model {}

  Score.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: "nextval(\"Scores_id_seq\"::regclass)",
      comment: null,
      primaryKey: true,
      field: "id",
      autoIncrement: false
    },
    user_id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "user_id",
      autoIncrement: false,
      references: {
        key: "id",
        model: "Users"
      }
    },
    quiz_id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "quiz_id",
      autoIncrement: false,
      references: {
        key: "id",
        model: "Quizzes"
      }
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "score",
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
    modelName: 'Score',
    paranoid: true,
  });
  return Score;
};