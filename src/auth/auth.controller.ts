import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { loginUserDto } from "src/users/dto/login-user.dto";
import { createUserDto } from "src/users/dto/create-user.dto";
import { AuthService } from "./auth.service";

@ApiTags("Авторизация")
@Controller("auth")
export class AuthController {
  constructor(private authServise: AuthService) {}

  @Post("/login")
  login(@Body() userDto: loginUserDto) {
    return this.authServise.login(userDto);
  }

  @Post("/registration")
  registration(@Body() userDto: createUserDto) {
    return this.authServise.registration(userDto);
  }
}
