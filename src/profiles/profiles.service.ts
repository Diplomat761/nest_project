import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { createProfileDto } from "./dto/create-profile.dto";
import { Profile } from "./profiles.model";

@Injectable()
export class ProfilesService {
  constructor(
    @InjectModel(Profile) private profileRepository: typeof Profile
  ) {}

  async createProfile(dto: createProfileDto) {
    console.log(dto);

    const profile = await this.profileRepository.create(dto);

    return profile;
  }
  // Получаем все профили
  async getAllProfiles() {
    const profiles = await this.profileRepository.findAll({
      include: { all: true },
    });
    return profiles;
  }
  // Получаем один профиль
  async getProfileById(id: number) {
    const profile = await this.profileRepository.findOne({
      where: { id },
      include: { all: true },
    });
    return profile;
  }
  // Редактируем профиль
  async updateProfile(id: number, dto: createProfileDto) {
    const updatedProfile = await this.profileRepository.update(dto, {
      returning: true,
      where: { id },
    });

    return updatedProfile;
  }
  // Удаляем профиль
  async deleteProfile(id: number) {
    const profile = await this.profileRepository.findOne({ where: { id } });
    await profile.destroy();
    return profile;
  }
}
