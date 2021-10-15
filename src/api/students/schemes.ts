import * as Joi from 'joi'
import { Omit } from 'sequelize-typescript/dist/shared/types'
import { StudentDto } from '../../database/student'

interface Response<T> {
  ok: boolean
  result: T
}

export const ResponseSchema = <T>(): Joi.ObjectSchema<Response<T>> =>
  Joi.object<Response<T>>({
    ok: Joi.boolean(),
    result: Joi.object<T>()
  })

export const StudentSchema = (): Joi.ObjectSchema<StudentDto> =>
  Joi.object<Omit<StudentDto, 'createdAt' | 'updatedAt'>>({
    id: Joi.string().uuid(),
    firstName: Joi.string(),
    lastName: Joi.string(),
    sex: Joi.string(),
    phone: Joi.string(),
    facultyId: Joi.string().uuid()
  }).label('Student')

export const MinMaxAverageSchema = (): Joi.ObjectSchema<StudentDto> => Joi.object({
  facultyId: Joi.string().required(),
  sex: Joi.string().required()
}).label('MinMaxAverage')

export type AverageDto = Pick<StudentDto, 'facultyId' >
export type AverageMinMaxDto = Pick<StudentDto, 'facultyId' | 'sex' >
export type CreateStudentDto = Omit<StudentDto, 'id' |'createdAt' | 'updatedAt'>
export type UpdateStudentDto = Partial<CreateStudentDto>