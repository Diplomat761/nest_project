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

export class createUserDto {
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

  @IsNotEmpty()
  @MaxLength(50)
  readonly firstName: string;

  @IsNotEmpty()
  @MaxLength(50)
  readonly lastName: string;

  @IsInt()
  @Min(1)
  readonly age: number;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[0-9]{11}$/)
  readonly phoneNumber: string;
}
