import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { FilesService } from "src/files/files.service";
import { CreateImageDto } from "./dto/create-image.dto";
import { Image } from "./images.model";

@Injectable()
export class ImagesService {
  constructor(
    @InjectModel(Image) private imageRepository: typeof Image,
    private fileService: FilesService
  ) {}

  async create(dto: CreateImageDto, image: any) {
    const fileName = await this.fileService.createFile(image);
    const post = await this.imageRepository.create({ ...dto, url: fileName });
    return post;
  }

  async getImageById(id: number) {
    const image = await this.imageRepository.findOne({
      where: { id },
      include: { all: true },
    });
    return image;
  }
}
