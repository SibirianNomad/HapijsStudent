'use strict';
const DataTypes = require('sequelize').DataTypes;
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('students', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: true
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      sex:{
        type: Sequelize.STRING
      },
      phone:{
        type: Sequelize.STRING
      },
      faculty:{
        type: Sequelize.STRING
      },
      averageGrade:{
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
