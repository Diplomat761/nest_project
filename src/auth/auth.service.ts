import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { createUserDto } from "src/users/dto/create-user.dto";
import { UsersService } from "src/users/users.service";
import * as bcrypt from "bcryptjs";
import { User } from "src/users/users.model";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtServise: JwtService
  ) {}
  // Входим в аккаунт
  async login(userDto: createUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async registration(userDto: createUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException(
        "Такой пользователь уже существует",
        HttpStatus.BAD_REQUEST
      );
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });

    // const profile = await this.profilesService.createProfile({
    //   firstName: userDto.firstName,
    //   lastName: userDto.lastName,
    //   age: userDto.age,
    //   phoneNumber: userDto.phoneNumber,
    // });
    return this.generateToken(user);
  }
  // Генерируем токен
  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    return {
      token: this.jwtServise.sign(payload),
    };
  }
  // Проверка пользователя по email и паролю
  private async validateUser(userDto: createUserDto) {
    // Получение пользователя из базы данных по email
    const user = await this.userService.getUserByEmail(userDto.email);
    // Проверка соответствия пароля пользователя в запросе и пароля в базе данных
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password
    );
    if (user && passwordEquals) {
      return user;
    }
    // Если пользователь не найден или пароль неверный, выбрасываем исключение
    throw new UnauthorizedException({
      message: "Некорректный email или пароль",
    });
  }
}
