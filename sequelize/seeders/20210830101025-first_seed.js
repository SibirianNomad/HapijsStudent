'use strict';
const { v4: uuidv4 } = require('uuid');
const faker = require('faker');
const { random } = require('faker');

var randomData = []
var sex = ['male','female']
var faculty = ['RTF', 'FTF', 'NIR', 'CT']
for(var i = 0;i<10;i++){
  randomData.push({
    id:uuidv4(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    sex:sex[Math.floor(Math.random() * 2)],
    phone: faker.phone.phoneNumber(),
    faculty: faculty[Math.floor(Math.random() * 3)],
    averageGrade: faker.datatype.float({min:2,max:10}),
    createdAt: new Date(),
    updatedAt: new Date()
  })
}
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('students', randomData);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
