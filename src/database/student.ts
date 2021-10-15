import {
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Scopes,
  Table,
  UpdatedAt,
  BelongsTo,
  ForeignKey,
  CreatedAt
} from 'sequelize-typescript'
import * as uuid from 'uuid'
import { FacultyModel, FacultyDto } from './faculty'

/**
 * student data model
 */
export interface StudentDto {
  id: string
  firstName:string,
  lastName:string,
  sex:string,
  phone:string,
  facultyId:string,
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
  tableName: 'Students'
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

  @ForeignKey(() => FacultyModel)
  @Column(DataType.STRING)
  facultyId: string

  @Column(DataType.FLOAT)
  averageGrade: Float32Array

  @CreatedAt
  createdAt: Date

  @UpdatedAt
  updatedAt: Date

  @BelongsTo(() => FacultyModel, 'facultyId') faculty: FacultyModel;
}
const Op = require('sequelize').Op

export const getStudents = async (facultyId?: Pick<StudentDto, 'facultyId'>): Promise<StudentDto[]> => {
  return await StudentModel.findAll({
    order: [
      ['averageGrade', 'DESC']
    ],
    where: {
      facultyId: facultyId || { [Op.ne]: null }
    },
    include: {
      model: FacultyModel
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

export const getAverageFaculty = async (facultyId: Pick<StudentDto, 'facultyId'>):Promise<Object> => {
  const numberStudents:number = await StudentModel.count({
    where: {
      facultyId: facultyId
    }
  })
  const sum:number = await StudentModel.sum('averageGrade', {
    where: {
      facultyId: facultyId
    }
  })

  return {
    averageGrade_by_faculty: (sum / numberStudents).toFixed(2)
  }
}

export const getMinMaxAverageGrade = async (facultyId: Pick<StudentDto, 'facultyId'>, sex: Pick<StudentDto, 'sex'>, faculty: Pick<FacultyDto, 'id' | 'name'>):Promise<Object> => {
  const minAverageGrade:number = await StudentModel.min('averageGrade', {
    where: {
      facultyId: facultyId,
      sex: sex
    }
  })
  const maxAverageGrade:number = await StudentModel.max('averageGrade', {
    where: {
      facultyId: facultyId,
      sex: sex
    }
  })

  return {
    faculty: faculty.name,
    sex: sex,
    min_averageGrade: minAverageGrade,
    max_averageGrade: maxAverageGrade
  }
}

export const editStudent = async (id: Pick<StudentDto, 'id'>, dataStudent: Omit<StudentDto, 'id'>):Promise<Object> => {
  const result = await StudentModel.update(
    dataStudent,
    { where: { id: id } }
  )
  return result
}
