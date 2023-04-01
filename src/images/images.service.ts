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
  // Создаем картинку
  async create(dto: CreateImageDto, image: any) {
    const fileName = await this.fileService.createFile(image);
    const img = await this.imageRepository.create({ ...dto, url: fileName });

    return fileName;
  }
  // Получаем все картинки
  async getAllImages() {
    const posts = await this.imageRepository.findAll({
      include: { all: true },
    });
    return posts;
  }
  // Получаем одну картинку
  async getImageById(id: number) {
    const image = await this.imageRepository.findOne({
      where: { id },
      include: { all: true },
    });
    return image;
  }
  // Добавляем картинку к посту
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
  // Удаляем картинку, которая висит дольше часа
  async deleteByTime() {
    try {
      const oneHourAgo = new Date(Date.now() - 3600 * 1000);
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
  // Удаляем неиспользованные картинки
  async deleteUnusedImages(): Promise<void> {
    await this.imageRepository.destroy({
      where: { recordId: null, tableName: null },
    });
  }
}
