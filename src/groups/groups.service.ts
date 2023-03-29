import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateGroupsDto } from "./dto/create-group.dto";
import { CreatePostGroupsDto } from "./dto/createPostGroups.dto";
import { Group } from "./groups.model";
import { PostGroups } from "./post-groups.model";

@Injectable()
export class GroupsService {
  constructor(
    @InjectModel(Group) private groupRepository: typeof Group,
    @InjectModel(PostGroups) private postGroupRepository: typeof PostGroups
  ) {}
  async create(dto: CreateGroupsDto) {
    return await this.groupRepository.create(dto);
  }

  async createPostGroup(dto: CreatePostGroupsDto) {
    return await this.postGroupRepository.create(dto);
  }

  async getPostByGroup(groupId) {
    return this.postGroupRepository.findAll({
      where: { groupId },
      include: { all: true },
    });
  }
}
