import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Roles } from "src/auth/roles-auth.decorator";
import { RolesGuard } from "src/auth/roles.guard";
import { CreatePostDto } from "./dto/create-post.dto";
import { PostsService } from "./posts.service";

@Controller("posts")
export class PostsController {
  constructor(private postService: PostsService) {}

  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Post()
  @UseInterceptors(FileInterceptor("image"))
  createPost(@Body() dto: CreatePostDto) {
    return this.postService.create(dto);
  }

  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.postService.getAllPosts();
  }

  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Get(":id")
  getOneUser(@Param("id") id: number) {
    return this.postService.getPostById(id);
  }
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Put(":id")
  updatePost(@Param("id") id: number, @Body() dto: CreatePostDto) {
    return this.postService.updatePost(id, dto);
  }

  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Delete(":id")
  deletePost(@Param("id") id: number) {
    return this.postService.deletePost(id);
  }
}
