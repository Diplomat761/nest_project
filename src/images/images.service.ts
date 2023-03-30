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
    const img = await this.imageRepository.create({ ...dto, url: fileName });
    return image;
  }

  async getImageById(id: number) {
    const image = await this.imageRepository.findOne({
      where: { id },
      include: { all: true },
    });
    return image;
  }

  async updateImage(id: number, { tableName, recordId }) {
    const updatedImage = await this.imageRepository.update(
      { tableName, recordId },
      {
        returning: true,
        where: { id },
      }
    );
    return updatedImage;
  }

  // async deleteByTime() {
  //   const todayData = new Date();
  //   const image = await this.imageRepository.findAll({ where: { id } });
  //   await image.destroy();
  // }
}
