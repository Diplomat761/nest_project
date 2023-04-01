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
  // Создаем группу
  async create(dto: CreateGroupsDto) {
    return await this.groupRepository.create(dto);
  }
  // Получаем все группы
  async getAllGroups() {
    const groups = await this.groupRepository.findAll({
      include: { all: true },
    });
    return groups;
  }
  // Получаем группу по id
  async getGroupById(id: number) {
    const group = await this.groupRepository.findOne({
      where: { id },
      include: { all: true },
    });
    return group;
  }
  // Удаляем группу
  async deleteGroup(id: number) {
    const group = await this.groupRepository.findOne({ where: { id } });
    await group.destroy();
    return group;
  }
  // Привязываем группу к посту (Добавляем данные в промежуточную таблицу)
  async createPostGroup(dto: CreatePostGroupsDto) {
    return await this.postGroupRepository.create(dto);
  }
  // Получаем все связанные посты и группы
  async getPostByGroup(groupId) {
    return this.postGroupRepository.findAll({
      where: { groupId },
      include: { all: true },
    });
  }
}
