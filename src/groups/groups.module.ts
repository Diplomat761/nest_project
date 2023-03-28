import { Module } from "@nestjs/common";
import { GroupsService } from "./groups.service";
import { GroupsController } from "./groups.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Group } from "./groups.model";
import { Post } from "src/posts/posts.model";
import { PostGroups } from "./post-groups.model";

@Module({
  providers: [GroupsService],
  controllers: [GroupsController],
  imports: [SequelizeModule.forFeature([Group, Post, PostGroups])],
  exports: [GroupsService],
})
export class GroupsModule {}
