import {
  Table, BelongsTo, Column, DataType, ForeignKey, Model
} from 'sequelize-typescript'
import { UserModel } from './user'
import * as uuid from 'uuid'

export interface Session {
  id: string;
  userId: string
}

@Table
export class SessionModel extends Model<Session> {
  @Column({
    primaryKey: true,
    type: DataType.STRING,
    defaultValue: uuid.v4()
  })
  id: string;

  @ForeignKey(() => UserModel)
  @Column(DataType.STRING)
  userId: string;

  @BelongsTo(() => UserModel)
  user: UserModel;
}
