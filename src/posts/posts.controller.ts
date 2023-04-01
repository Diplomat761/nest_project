import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Roles } from "src/auth/roles-auth.decorator";
import { RolesGuard } from "src/auth/roles.guard";
import { CreatePostDto } from "./dto/create-post.dto";
import { Posts } from "./posts.model";
import { PostsService } from "./posts.service";

@ApiTags("Посты")
@Controller("posts")
export class PostsController {
  constructor(private postService: PostsService) {}

  @ApiOperation({ summary: "Создание поста" })
  @ApiResponse({ status: 200, type: Posts })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Post()
  @UseInterceptors(FileInterceptor("image"))
  createPost(@Body() dto: CreatePostDto) {
    return this.postService.create(dto);
  }

  @ApiOperation({ summary: "Получить все посты" })
  @ApiResponse({ status: 200, type: [Posts] })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.postService.getAllPosts();
  }

  @ApiOperation({ summary: "Получить один пост" })
  @ApiResponse({ status: 200, type: Posts })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Get("/id/:id")
  getOnePost(@Param("id") id: number) {
    return this.postService.getPostById(id);
  }

  @ApiOperation({ summary: "Редактировать пост" })
  @ApiResponse({ status: 200, type: Posts })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Put(":id")
  updatePost(@Param("id") id: number, @Body() dto: CreatePostDto) {
    return this.postService.updatePost(id, dto);
  }

  @ApiOperation({ summary: "Удалить один пост" })
  @ApiResponse({ status: 200, type: Posts })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Delete(":id")
  deletePost(@Param("id") id: number) {
    return this.postService.deletePost(id);
  }

  @ApiOperation({ summary: "Найти уникальное имя поста" })
  @ApiResponse({ status: 200 })
  @Get("unique")
  getUnique(@Query() { name }: { name: string }) {
    return this.postService.getUnique(name);
  }

  @ApiOperation({ summary: "Найти группу поста" })
  @ApiResponse({ status: 200 })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Get("groups")
  fiendByGroup(@Query() { groupId }: { groupId: number }) {
    return this.postService.fiendByGroup(groupId);
  }
}
