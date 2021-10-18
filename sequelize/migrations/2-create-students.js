'use strict';
const DataTypes = require('sequelize').DataTypes;
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Students', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
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
        type: Sequelize.STRING,
        allowNull: false
      },
      phone:{
        type: Sequelize.STRING
      },
      facultyId:{
        type: Sequelize.UUID,
        allowNull: false
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
    await queryInterface.addConstraint('Students', {
      type: 'FOREIGN KEY',
      name: 'Students_facultyId_fkey',
      fields: ['facultyId'],
      references: {
          table: 'Faculties',
          field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Students', 'Students_facultyId_fkey');
    return queryInterface.dropTable('Students')
  }
};
