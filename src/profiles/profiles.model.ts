import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasOne,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "src/users/users.model";

interface ProfileCreationAttrs {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phoneNumber: number;
}
@Table({ tableName: "profiles" })
export class Profile extends Model<Profile, ProfileCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  firstName: string;

  @Column({ type: DataType.STRING, allowNull: false })
  lastName: string;

  @Column({ type: DataType.STRING, defaultValue: false })
  dateOfBirth: string;

  @Column({ type: DataType.INTEGER, allowNull: true })
  phoneNumber: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  author: User;
}
