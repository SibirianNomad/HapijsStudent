import {
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
  HasMany
} from 'sequelize-typescript'
import * as uuid from 'uuid'
import { StudentModel } from './student'

/**
 * student data model
 */
export interface FacultyDto {
  id: string
  name:string
}

@Table({
  tableName: 'Faculties',
  timestamps: false
})
export class FacultyModel extends Model<FacultyDto> implements FacultyDto {
  @Default(uuid.v4())
  @PrimaryKey
  @Column(DataType.STRING)
  id: string

  @Column(DataType.STRING)
  name: string

  @HasMany(() => StudentModel)
  student: StudentModel[];
}

export const getFaculty = async (id: Pick<FacultyModel, 'id'>):Promise<FacultyDto> => {
  return await FacultyModel.findOne({
    where: {
      id: id
    }
  })
}
