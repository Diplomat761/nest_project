import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { GroupsService } from "src/groups/groups.service";
import { ImagesService } from "src/images/images.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { Posts } from "./posts.model";

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Posts) private postRepository: typeof Posts,
    private groupService: GroupsService,
    private imageService: ImagesService
  ) {}
  // Создаем пост, добавляем к нему картинку и группу
  async create(dto: CreatePostDto) {
    const post = await this.postRepository.create(dto);
    const addImage = {
      tableName: "post",
      recordId: post.dataValues.id,
    };
    const addGroup = {
      postId: post.dataValues.id,
      groupId: dto.groupId,
    };
    await this.groupService.createPostGroup(addGroup);
    await this.imageService.updateImage(dto.imageId, addImage);
    return post;
  }
  // Получаем все посты
  async getAllPosts() {
    const posts = await this.postRepository.findAll({ include: { all: true } });
    return posts;
  }
  // Получаем один пост
  async getPostById(id: any) {
    const post = await this.postRepository.findOne({
      where: { id },
      include: { all: true },
    });
    return post;
  }
  // Редактируем пост
  async updatePost(id: number, dto: CreatePostDto) {
    const updatedPost = await this.postRepository.update(dto, {
      returning: true,
      where: { id },
    });

    return updatedPost;
  }
  // Удаляем пост
  async deletePost(id: number) {
    const post = await this.postRepository.findOne({ where: { id } });
    await post.destroy();
    return post;
  }
  // Ищем и получаем пост по уникальному названию
  async getUnique(name: string) {
    const unique = await this.postRepository.findOne({
      where: { uniqueName: name },
      include: { all: true },
    });
    return unique;
  }
  // Получем пост по конкреной группе
  async fiendByGroup(groupId: number) {
    return await this.groupService.getPostByGroup(groupId);
  }
}
