import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  MaxLength,
  Min,
} from "class-validator";

export class loginUserDto {
  @ApiProperty({ example: "user@mail.com", description: "Почтовый адрес" })
  @IsString({ message: "Только строчные символы" })
  @IsEmail({}, { message: "Некорректный Email" })
  readonly email: string;

  @IsString({ message: "Только строчные символы" })
  @Length(4, 16, {
    message: "Парольдолжны быть не менее 4 и не более 16 символов",
  })
  @ApiProperty({ example: "root123", description: "Пароль" })
  readonly password: string;
}
