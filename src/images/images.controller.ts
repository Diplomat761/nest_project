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
import { UpdateImageDto } from "./dto/update-image.dto";
import { ImagesService } from "./images.service";

@Controller("images")
export class ImagesController {
  constructor(private imageService: ImagesService) {}

  @Post()
  @UseInterceptors(FileInterceptor("image"))
  createPost(@Body() dto: CreateImageDto, @UploadedFile() image) {
    return this.imageService.create(dto, image);
  }
  @Get()
  getAll() {
    return this.imageService.getAllImages();
  }

  @Get(":id")
  getOneImage(@Param("id") id: number) {
    return this.imageService.getImageById(id);
  }

  @Put(":id")
  updateImage(@Param("id") id: number, @Body() dto: UpdateImageDto) {
    return this.imageService.updateImage(id, dto);
  }

  @Delete()
  deleteImage() {
    return this.imageService.deleteByTime();
  }

  @Delete("/unused")
  async deleteUnusedImages(): Promise<void> {
    await this.imageService.deleteUnusedImages();
  }
}
