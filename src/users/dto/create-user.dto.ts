import { ApiProperty } from "@nestjs/swagger";

export class createUserDto {
  @ApiProperty({ example: "user@mail.com", description: "Почтовый адрес" })
  readonly email: string;

  @ApiProperty({ example: "root123", description: "Пароль" })
  readonly password: string;
}
