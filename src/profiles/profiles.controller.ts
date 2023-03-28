import { Body, Controller, Post } from "@nestjs/common";
import { createProfileDto } from "./dto/create-profile.dto";
import { ProfilesService } from "./profiles.service";

@Controller("profiles")
export class ProfilesController {
  constructor(private profileServicce: ProfilesService) {}
  @Post()
  create(@Body() dto: createProfileDto) {
    return this.profileServicce.createProfile(dto);
  }
}
