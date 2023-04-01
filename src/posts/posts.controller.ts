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
import { PostsService } from "./posts.service";

@ApiTags("Посты")
@Controller("posts")
export class PostsController {
  constructor(private postService: PostsService) {}

  @ApiOperation({ summary: "Создание поста" })
  @ApiResponse({ status: 200, type: Post })
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
  @Get("/id/:id")
  getOnePost(@Param("id") id: number) {
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

  @Get("unique")
  getUnique(@Query() { name }: { name: string }) {
    console.log(name);

    return this.postService.getUnique(name);
  }
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Get("groups")
  fiendByGroup(@Query() { groupId }: { groupId: number }) {
    return this.postService.fiendByGroup(groupId);
  }
}
