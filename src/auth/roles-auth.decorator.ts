import { SetMetadata } from "@nestjs/common";
// Ключ для хранения ролей в метаданных
export const ROLES_KEY = "roles";
// Декоратор, который принимает список ролей и устанавливает его в метаданные класса или метода
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
