import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateRoleDto } from "./dto/create-role.dto";
import { Role } from "./roles.model";
import { RolesService } from "./roles.service";

@ApiTags("Роли")
@Controller("roles")
export class RolesController {
  constructor(private roleService: RolesService) {}

  @ApiOperation({ summary: "Добавление роли" })
  @ApiResponse({ status: 200, type: Role })
  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.roleService.createRole(dto);
  }

  @ApiOperation({ summary: "Получение одной роли" })
  @ApiResponse({ status: 200 })
  @Get("/:value")
  getByValue(@Param("value") value: string) {
    return this.roleService.getRoleByValue(value);
  }

  @ApiOperation({ summary: "Удаление роли" })
  @ApiResponse({ status: 200 })
  @Delete(":id")
  deleteRole(@Param("id") id: number) {
    return this.roleService.deleteRole(id);
  }
}
