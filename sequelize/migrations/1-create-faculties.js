'use strict';
const DataTypes = require('sequelize').DataTypes;
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Faculties', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Faculties')
  }
};
