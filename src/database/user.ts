import {
  AllowNull,
  Column,
  CreatedAt,
  DataType,
  Default,
  HasMany,
  Model,
  PrimaryKey,
  Scopes,
  Table,
  Unique,
  UpdatedAt
} from 'sequelize-typescript'
import * as uuid from 'uuid'
import { SessionModel } from './session'

/**
 * user data model
 */
export interface UserDto {
  id: string
  email: string
  password: string
  avatar: string
  createdAt: Date
  updatedAt: Date
}

/**
 * create user data model
 */
export type CreateUser = Omit<UserDto, 'id' | 'password' | 'avatar' | 'createdAt' | 'updatedAt'>

/**
 * update user data model
 */
export type UpdateUser = Partial<CreateUser>

@Scopes(() => ({
  defaultScope: {
    attributes: {
      exclude: ['password']
    }
  }
}))
@Table({
  tableName: 'users'
})
export class UserModel extends Model<UserDto, CreateUser> implements UserDto {
  @Column(DataType.STRING)
  @Default(uuid.v4())
  @PrimaryKey
  id: string

  @Column(DataType.STRING)
  @Unique
  @AllowNull(false)
  email: string

  @Column(DataType.STRING)
  @AllowNull(true)
  avatar: string

  @Column(DataType.STRING)
  @AllowNull(false)
  password: string

  @HasMany(() => SessionModel)
  sessions: SessionModel[]

  @CreatedAt
  createdAt: Date

  @UpdatedAt
  updatedAt: Date
}
