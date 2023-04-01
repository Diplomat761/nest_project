import { ApiProperty } from "@nestjs/swagger";
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
export class Posts extends Model<Posts, PostCreationAttrs> {
  @ApiProperty({ example: "1", description: "Уникальный id" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: "main-hero-text",
    description: "Уникальное название для поиска",
  })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  uniqueName: string;

  @ApiProperty({ example: "Привет мир!", description: "Заголовок" })
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @ApiProperty({
    example: "Это мой первый пост!",
    description: "Текстовый блок",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  content: string;

  @ApiProperty({ example: "1", description: "Автор поста" })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @ApiProperty({ example: "2", description: "Картинка поста" })
  @ForeignKey(() => Image)
  @Column({ type: DataType.INTEGER })
  imageId: number;

  @BelongsTo(() => User)
  author: User;

  @BelongsToMany(() => Group, () => PostGroups)
  groups: Group[];

  @BelongsTo(() => Image)
  image: Image;
}
