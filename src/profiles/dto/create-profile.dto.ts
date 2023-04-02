import { ApiProperty } from "@nestjs/swagger";
import {
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  Min,
} from "class-validator";

export class createProfileDto {
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

  readonly userId: number;
}
