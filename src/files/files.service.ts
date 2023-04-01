import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as path from "path";
import * as fs from "fs";
import * as uuid from "uuid";

@Injectable()
export class FilesService {
  async createFile(file): Promise<string> {
    try {
      // Генерация уникального имени файла
      const fileName = uuid.v4() + ".jpg";
      // Получение пути к директории, в которой будет сохранён файл
      const filePath = path.resolve(__dirname, "..", "static");
      // Если директория не существует, то создаём её рекурсивно
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      // Запись файла в директорию
      fs.writeFileSync(path.join(filePath, fileName), file.buffer);
      // Возвращение пути к файлу
      return path.join(filePath, fileName);
    } catch (e) {
      // Обработка ошибки и выброс исключения
      throw new HttpException(
        "Произошла ошибка при записи файла",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
