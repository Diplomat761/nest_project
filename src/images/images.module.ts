import { Module } from "@nestjs/common";
import { ImagesService } from "./images.service";
import { ImagesController } from "./images.controller";
import { FilesModule } from "src/files/files.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { Image } from "./images.model";

@Module({
  providers: [ImagesService],
  controllers: [ImagesController],
  imports: [SequelizeModule.forFeature([Image]), FilesModule],
})
export class ImagesModule {}
