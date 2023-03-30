import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { createProfileDto } from "./dto/create-profile.dto";
import { ProfilesService } from "./profiles.service";

@Controller("profiles")
export class ProfilesController {
  constructor(private profileService: ProfilesService) {}
  @Post()
  create(@Body() dto: createProfileDto) {
    return this.profileService.createProfile(dto);
  }

  @Get()
  getAll() {
    return this.profileService.getAllProfiles();
  }

  @Get(":id")
  getOnePost(@Param("id") id: number) {
    return this.profileService.getProfileById(id);
  }

  @Put(":id")
  updateProfile(@Param("id") id: number, @Body() dto: createProfileDto) {
    return this.profileService.updateProfile(id, dto);
  }

  @Delete(":id")
  deletePost(@Param("id") id: number) {
    return this.profileService.deleteProfile(id);
  }
}
