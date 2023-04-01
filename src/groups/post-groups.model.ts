import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { Posts } from "src/posts/posts.model";
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

  @ForeignKey(() => Posts)
  @Column({ type: DataType.INTEGER })
  postId: number;

  @BelongsTo(() => Posts)
  posts: Posts[];

  @BelongsTo(() => Group)
  groups: Group[];
}
