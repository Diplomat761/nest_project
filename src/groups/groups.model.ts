import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";
import { Posts } from "src/posts/posts.model";
import { PostGroups } from "./post-groups.model";

interface GroupCreationAttrs {
  keyword: string;
}
@Table({ tableName: "groups" })
export class Group extends Model<Group, GroupCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  keyword: string;

  @BelongsToMany(() => Posts, () => PostGroups)
  posts: Posts[];
}
