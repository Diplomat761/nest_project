import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  // Метод, который проверяет наличие и правильность токена авторизации в запросе
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      // Получение заголовка авторизации и проверка его формата и наличия токена
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(" ")[0];
      const token = authHeader.split(" ")[1];

      if (bearer !== "Bearer" || !token) {
        throw new UnauthorizedException({
          message: "Пользователь не авторизован",
        });
      }
      // Проверка токена и установка информации о пользователе в объект запроса
      const user = this.jwtService.verify(token);
      req.user = user;
      return true;
    } catch (e) {
      // Обработка ошибок и выброс исключения
      throw new UnauthorizedException({
        message: "Пользователь не авторизован",
      });
    }
  }
}
