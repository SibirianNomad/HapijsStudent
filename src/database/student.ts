import {
  Column,
  CreatedAt,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Scopes,
  Table,
  UpdatedAt
} from 'sequelize-typescript'
import * as uuid from 'uuid'

/**
 * student data model
 */
export interface StudentDto {
  id: string
  firstName:string,
  lastName:string,
  sex:string,
  phone:string,
  faculty:string,
  averageGrade:Float32Array,
  createdAt: Date
  updatedAt: Date
}

@Scopes(() => ({
  defaultScope: {
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    }
  }
}))

@Table({
  tableName: 'students'
})
export class StudentModel extends Model<StudentDto> implements StudentDto {
  @Default(uuid.v4())
  @PrimaryKey
  @Column(DataType.STRING)
  id: string

  @Column(DataType.STRING)
  firstName: string

  @Column(DataType.STRING)
  lastName: string

  @Column(DataType.STRING)
  sex: string

  @Column(DataType.STRING)
  phone: string

  @Column(DataType.STRING)
  faculty: string

  @Column(DataType.FLOAT)
  averageGrade: Float32Array

  @CreatedAt
  createdAt: Date

  @UpdatedAt
  updatedAt: Date
}
const Op = require('sequelize').Op

export const getStudents = async (faculty?: Pick<StudentDto, 'faculty'>) => {
  return await StudentModel.findAll({
    order: [
      ['averageGrade', 'DESC']
    ],
    where: {
      faculty: faculty || { [Op.ne]: null }
    }
  })
}

export const getStudent = async (id: Pick<StudentDto, 'id'>): Promise<StudentDto | null> => {
  return await StudentModel.findOne({
    where: {
      id: id
    }
  })
}

export const getAverageFaculty = async (faculty: Pick<StudentDto, 'faculty'>) => {
  const numberStudents:number = await StudentModel.count({
    where: {
      faculty: faculty
    }
  })
  const sum:number = await StudentModel.sum('averageGrade', {
    where: {
      faculty: faculty
    }
  })
  return (sum / numberStudents).toFixed(2)
}

export const getMinMaxAverageGrade = async (faculty: Pick<StudentDto, 'faculty'>, sex: Pick<StudentDto, 'sex'>) => {
  const minAverageGrade:number = await StudentModel.min('averageGrade', {
    where: {
      faculty: faculty,
      sex: sex
    }
  })
  const maxAverageGrade:number = await StudentModel.max('averageGrade', {
    where: {
      faculty: faculty,
      sex: sex
    }
  })

  return {
    min: minAverageGrade,
    max: maxAverageGrade
  }
}

export const editStudent = async (id: Pick<StudentDto, 'id'>, dataStudent: Omit<StudentDto, 'id'>) => {
  const result = await StudentModel.update(
    dataStudent,
    { where: { id: id } }
  )
  return result
}
