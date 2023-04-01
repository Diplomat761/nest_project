import { ApiProperty } from "@nestjs/swagger";

export class CreatePostDto {
  @ApiProperty({
    example: "main-hero-text",
    description: "Уникальное название для поиска",
  })
  readonly uniqueName: string;

  @ApiProperty({ example: "Привет мир!", description: "Заголовок" })
  readonly title: string;

  @ApiProperty({
    example: "Это мой первый пост!",
    description: "Текстовый блок",
  })
  readonly content: string;

  @ApiProperty({ example: "1", description: "Автор поста" })
  readonly userId: number;

  @ApiProperty({ example: "2", description: "Картинка поста" })
  readonly imageId: number;

  @ApiProperty({ example: "2", description: "Группа поста" })
  readonly groupId: number;
}
