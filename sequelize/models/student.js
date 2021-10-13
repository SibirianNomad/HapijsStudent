'use strict';
import * as uuid from 'uuid'
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Student.init({
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue:uuid.v4()
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    sex: DataTypes.STRING,
    phone: DataTypes.STRING,
    faculty: DataTypes.STRING,
    averageGrade: DataTypes.FLOAT,
  }, {
    sequelize,
    modelName: 'Student',
  });
  return Student;
};