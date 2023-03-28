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
    const profile = await this.profileRepository.create(dto);
    return profile;
  }
}
