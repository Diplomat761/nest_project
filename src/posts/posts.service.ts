import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { GroupsService } from "src/groups/groups.service";
import { ImagesService } from "src/images/images.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { Post } from "./posts.model";

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post) private postRepository: typeof Post,
    private groupService: GroupsService,
    private imageService: ImagesService
  ) {}

  async create(dto: CreatePostDto) {
    const post = await this.postRepository.create(dto);
    const a = {
      tableName: "post",
      recordId: post.dataValues.id,
    };
    const c = {
      postId: post.dataValues.id,
      groupId: dto.groupId,
    };
    await this.groupService.createPostGroup(c);
    await this.imageService.updateImage(dto.imageId, a);
    return post;
  }

  async getAllPosts() {
    const posts = await this.postRepository.findAll({ include: { all: true } });
    return posts;
  }

  async getPostById(id: number) {
    const post = await this.postRepository.findOne({
      where: { id },
      include: { all: true },
    });
    return post;
  }

  async updatePost(id: number, dto: CreatePostDto) {
    const updatedPost = await this.postRepository.update(dto, {
      returning: true,
      where: { id },
    });

    return updatedPost;
  }

  async deletePost(id: number) {
    const post = await this.postRepository.findOne({ where: { id } });
    await post.destroy();
    return post;
  }

  async getUnique(name: string) {
    const unique = await this.postRepository.findOne({
      where: { uniqueName: name },
      include: { all: true },
    });
    return unique;
  }

  async fiendByGroup(groupId: number) {
    return await this.groupService.getPostByGroup(groupId);
  }
}
