'use strict';

var faculties = [
  {'id': '0eb0a851-dc95-4863-a893-d8121d436293', 'name':'Tomsk Polytechnic University'},
  {'id': '10baf6a0-c9ce-42df-9f68-233f55e824e6', 'name':'Tomsk State University of Control Systems and Radioelectronics'},
  {'id': '1a9605bc-b6fb-4f1d-9437-f935abb231aa', 'name':'Tomsk Goverment University'},
  {'id': '1ea7e618-5cd2-418c-9b47-d25853086e9a', 'name':'California Institute of Technology'},
  {'id': '29781f7b-6ced-4dfe-8659-3de1af88e2de', 'name':'Sharaga'},
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Faculties', faculties);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Faculties');
  }
};
