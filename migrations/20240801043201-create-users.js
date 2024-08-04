module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      typeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'UserTypes', key: 'id' },
      },
      roleId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Roles', key: 'id' },
      },
      other: {
        type: Sequelize.JSON,
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
  async down(queryInterface) {
    await queryInterface.dropTable('Users');
  },
};
