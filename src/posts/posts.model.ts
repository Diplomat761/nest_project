import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Group } from "src/groups/groups.model";
import { PostGroups } from "src/groups/post-groups.model";
import { Image } from "src/images/images.model";
import { User } from "src/users/users.model";

interface PostCreationAttrs {
  uniqueName: string;
  title: string;
  content: string;
  userId: number;
  imageId: number;
}
@Table({ tableName: "posts" })
export class Post extends Model<Post, PostCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  uniqueName: string;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.STRING, allowNull: false })
  content: string;

  @ForeignKey(() => Image)
  @Column({ type: DataType.INTEGER })
  imageId: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  author: User;

  @BelongsToMany(() => Group, () => PostGroups)
  groups: Group[];

  @BelongsTo(() => Image)
  image: Image;
}
