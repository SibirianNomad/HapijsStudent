import * as Joi from 'joi'
import { UserDto } from '../../database/user'

interface Response<T> {
  ok: boolean
  result: T
}

export const ResponseSchema = <T>(): Joi.ObjectSchema<Response<T>> =>
  Joi.object<Response<T>>({
    ok: Joi.boolean(),
    result: Joi.object<T>()
  })

export const UserSchema = (): Joi.ObjectSchema<UserDto> =>
  Joi.object<Omit<UserDto, 'password'>>({
    id: Joi.string().uuid(),
    email: Joi.string().email(),
    avatar: Joi.string(),
    createdAt: Joi.date(),
    updatedAt: Joi.date()
  })

export type LoginDto = Pick<UserDto, 'email' | 'password'>

export const LoginSchema = (): Joi.ObjectSchema<LoginDto> => Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
})

export type Register = Exclude<Pick<UserDto, 'email' | 'password'>, 'confirmPassword'>
