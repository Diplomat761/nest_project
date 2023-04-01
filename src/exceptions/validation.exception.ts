import { HttpException, HttpStatus } from "@nestjs/common";

export class ValidationException extends HttpException {
  messages;

  constructor(response) {
    // Вызов конструктора родительского класса с передачей сообщения об ошибке и статуса ошибки
    super(response, HttpStatus.BAD_REQUEST);
    // Присвоение полям объекта значения переданного аргумента response
    this.messages = response;
  }
}
