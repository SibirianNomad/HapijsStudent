'use strict';
const { v4: uuidv4 } = require('uuid');
const faker = require('faker');

var facultiesId = [
  {'id': '0eb0a851-dc95-4863-a893-d8121d436293'},
  {'id': '10baf6a0-c9ce-42df-9f68-233f55e824e6'},
  {'id': '1a9605bc-b6fb-4f1d-9437-f935abb231aa'},
  {'id': '1ea7e618-5cd2-418c-9b47-d25853086e9a'},
  {'id': '29781f7b-6ced-4dfe-8659-3de1af88e2de'},
]
var randomData = []
var sex = ['male','female']

 for(var i = 0;i<10;i++){
        randomData.push({
          id:uuidv4(),
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          sex:sex[Math.floor(Math.random() * 2)],
          phone: faker.phone.phoneNumber(),
          facultyId: facultiesId[Math.floor(Math.random() * 5)].id,
          averageGrade: faker.datatype.float({min:2,max:10}),
          createdAt: new Date(),
          updatedAt: new Date()
        })
      }

module.exports = {

  up: async (queryInterface, Sequelize) => {
    console.log(this.faculty)
    return queryInterface.bulkInsert('Students', randomData);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Students');
  }
};
