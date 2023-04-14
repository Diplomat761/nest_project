import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateGroupsDto } from "./dto/create-group.dto";
import { GroupsService } from "./groups.service";

@ApiTags("Группы")
@Controller("groups")
export class GroupsController {
  constructor(private groupService: GroupsService) {}
  @Post()
  createGroup(@Body() dto: CreateGroupsDto) {
    return this.groupService.create(dto);
  }

  @Get()
  getAll() {
    return this.groupService.getAllGroups();
  }

  @Get(":id")
  getOneGroup(@Param("id") id: number) {
    return this.groupService.getGroupById(id);
  }

  @Delete(":id")
  deleteGroup(@Param("id") id: number) {
    return this.groupService.deleteGroup(id);
  }
}
