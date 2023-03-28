import {
  Body,
  Controller,
  Get,
  Param,
  Post,
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
}
