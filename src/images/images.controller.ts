import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateImageDto } from "./dto/create-image.dto";
import { ImagesService } from "./images.service";

@Controller("images")
export class ImagesController {
  constructor(private imageService: ImagesService) {}

  @Post()
  @UseInterceptors(FileInterceptor("image"))
  createPost(@Body() dto: CreateImageDto, @UploadedFile() image) {
    return this.imageService.create(dto, image);
  }

  @Get(":id")
  getOneImage(@Param("id") id: number) {
    return this.imageService.getImageById(id);
  }

  @Put(":id")
  updatePost(@Param("id") id: number, @Body() dto: CreateImageDto) {
    return this.imageService.updateImage(id, dto);
  }

  // @Delete()
  // deleteImage() {
  //   return this.imageService.deleteByTime();
  // }
}
