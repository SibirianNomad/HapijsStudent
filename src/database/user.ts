import {
  Column, DataType, Model, Scopes, Table
} from 'sequelize-typescript'
import * as uuid from 'uuid'

/**
 * user data model
 */
export interface UserDto {
  id: string
  email: string
  password: string
  avatar: string
}

/**
 * create user data model
 */
export type CreateUser = Omit<UserDto, 'id' | 'password'>

/**
 * update user data model
 */
export type UpdateUser = Partial<CreateUser>

@Scopes(() => ({
  defaultScope: {
    attributes: {
      exclude: ['password']
    }
  },
  withPassword: {
    attributes: {
      include: ['password']
    }
  }
}))
@Table({
  tableName: 'users'
})
export class UserModel extends Model<UserDto, CreateUser> implements UserDto {
  @Column({
    primaryKey: true,
    type: DataType.STRING,
    defaultValue: uuid.v4()
  })
  id: string;

  @Column({
    type: DataType.STRING,
    unique: true
  })
  email: string;

  @Column({
    type: DataType.STRING
  })
  avatar: string;

  @Column({
    type: DataType.STRING
  })
  password: string;
}
