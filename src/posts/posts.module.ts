import { forwardRef, Module } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { PostsController } from "./posts.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Post } from "./posts.model";
import { User } from "src/users/users.model";
import { FilesModule } from "src/files/files.module";
import { GroupsModule } from "src/groups/groups.module";
import { Group } from "src/groups/groups.model";
import { PostGroups } from "src/groups/post-groups.model";
import { Image } from "src/images/images.model";
import { AuthModule } from "src/auth/auth.module";

@Module({
  providers: [PostsService],
  controllers: [PostsController],
  imports: [
    SequelizeModule.forFeature([User, Post, Group, PostGroups, Image]),
    FilesModule,
    GroupsModule,
    forwardRef(() => AuthModule),
  ],
})
export class PostsModule {}
