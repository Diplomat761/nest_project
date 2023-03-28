import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Post } from "src/posts/posts.model";
import { Group } from "./groups.model";

@Table({ tableName: "post_groups", createdAt: false, updatedAt: false })
export class PostGroups extends Model<PostGroups> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Group)
  @Column({ type: DataType.INTEGER })
  groupId: number;

  @ForeignKey(() => Post)
  @Column({ type: DataType.INTEGER })
  postId: number;
}
