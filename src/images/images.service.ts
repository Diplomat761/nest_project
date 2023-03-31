import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Op } from "sequelize";
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

  async getAllImages() {
    const posts = await this.imageRepository.findAll({
      include: { all: true },
    });
    return posts;
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

  async deleteByTime() {
    try {
      const oneHourAgo = new Date();
      const images = await this.imageRepository.findAll({
        where: { createdAt: { [Op.lt]: oneHourAgo } },
      });

      for (const image of images) {
        await image.destroy({ force: true });
      }
      return images;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteUnusedImages(): Promise<void> {
    await this.imageRepository.destroy({
      where: { recordId: null, tableName: null },
    });
  }
}
