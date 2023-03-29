import { Body, Controller, Post } from "@nestjs/common";
import { CreateGroupsDto } from "./dto/create-group.dto";
import { GroupsService } from "./groups.service";

@Controller("groups")
export class GroupsController {
  constructor(private groupService: GroupsService) {}
  @Post()
  createPost(@Body() dto: CreateGroupsDto) {
    return this.groupService.create(dto);
  }
}
