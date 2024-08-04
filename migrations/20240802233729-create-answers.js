module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Answers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      quizId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: { model: 'Quizzes', key: 'id' },
      },
      questionId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Questions', key: 'id' },
      },
      answer: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      isCorrect: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Scores');
  },
};
