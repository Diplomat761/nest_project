import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Post } from "src/posts/posts.model";

interface ImageCreationAttrs {
  url: string;
  tableName: string;
  recordId: number;
}
@Table({ tableName: "images" })
export class Image extends Model<Image, ImageCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  url: string;

  @Column({ type: DataType.STRING, allowNull: true })
  tableName: string;

  @Column({ type: DataType.INTEGER, allowNull: true })
  recordId: number;

  @HasMany(() => Post)
  posts: Post[];
}
