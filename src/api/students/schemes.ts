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

export const UpdateStudentSchema = (): Joi.ObjectSchema<StudentDto> =>
  Joi.object<Omit<StudentDto, 'createdAt' | 'updatedAt'>>({
    id: Joi.string().uuid().example('00c83791-7b78-4e9e-a7c3-84823cdc6b1c'),
    firstName: Joi.string().example('firstName'),
    lastName: Joi.string().example('lastName'),
    sex: Joi.string().example('male'),
    phone: Joi.string().example('89234290849'),
    facultyId: Joi.string().uuid().example('1ea7e618-5cd2-418c-9b47-d25853086e9a')
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
