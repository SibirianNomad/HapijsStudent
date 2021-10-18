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

export const StudentsSchema = (): Joi.ObjectSchema<StudentDto> =>
  Joi.object<Omit<StudentDto, 'createdAt' | 'updatedAt'>>({
    id: Joi.string().uuid(),
    firstName: Joi.string(),
    lastName: Joi.string(),
    sex: Joi.string(),
    phone: Joi.string(),
    facultyId: Joi.string().uuid()
  }).label('Students')

export const MinMaxAverageSchema = (): Joi.ObjectSchema<StudentDto> => Joi.object({
  facultyId: Joi.string().required().example('823a05a7-df0a-4ebc-8fee-c91f8ae93a63'),
  sex: Joi.string().valid('male', 'female').required().example('male')
}).label('MinMaxAverage')

export const StudentSchema =
Joi.object({
  id: Joi.string().uuid().required().example('823a05a7-df0a-4ebc-8fee-c91f8ae93a63')
}).label('Student')

export type AverageDto = Pick<StudentDto, 'facultyId' >
export type AverageMinMaxDto = Pick<StudentDto, 'facultyId' | 'sex' >
export type CreateStudentDto = Omit<StudentDto, 'id' |'createdAt' | 'updatedAt'>
export type UpdateStudentDto = Partial<CreateStudentDto>
