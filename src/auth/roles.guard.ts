import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "./roles-auth.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}
  // Метод, который определяет, имеет ли пользователь достаточные права для выполнения запроса
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      // Получение списка необходимых ролей из метаданных
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()]
      );
      // Если необходимых ролей нет, то доступ разрешен
      if (!requiredRoles) {
        return true;
      }
      // Получение объекта запроса из ExecutionContext
      const req = context.switchToHttp().getRequest();
      // Получение заголовка авторизации
      const authHeader = req.headers.authorization;
      // Проверка формата заголовка авторизации и наличия токена
      const bearer = authHeader.split(" ")[0];
      const token = authHeader.split(" ")[1];

      if (bearer !== "Bearer" || !token) {
        throw new UnauthorizedException({
          message: "Пользователь не авторизован",
        });
      }
      // Проверка токена и получение информации о пользователе
      const user = this.jwtService.verify(token);
      req.user = user;
      // Проверка наличия необходимых ролей у пользователя
      return user.roles.some((role) => requiredRoles.includes(role.value));
    } catch (e) {
      // Обработка ошибок и выброс исключения
      throw new HttpException("Нет доступа", HttpStatus.FORBIDDEN);
    }
  }
}
