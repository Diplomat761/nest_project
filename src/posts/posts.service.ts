import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreatePostDto } from "./dto/create-post.dto";
import { Post } from "./posts.model";

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post) private postRepository: typeof Post) {}

  async create(dto: CreatePostDto) {
    const post = await this.postRepository.create(dto);
    return post;
  }

  async getAllPosts() {
    const posts = await this.postRepository.findAll({ include: { all: true } });
    return posts;
  }

  async getPostById(id: number) {
    const user = await this.postRepository.findOne({
      where: { id },
      include: { all: true },
    });
    return user;
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
}
