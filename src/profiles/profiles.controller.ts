import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Roles } from "src/auth/roles-auth.decorator";
import { RolesGuard } from "src/auth/roles.guard";
import { createProfileDto } from "./dto/create-profile.dto";
import { ProfilesService } from "./profiles.service";

@ApiTags("Профили")
@Controller("profiles")
export class ProfilesController {
  constructor(private profileService: ProfilesService) {}

  @ApiOperation({ summary: "Создание профиля" })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() dto: createProfileDto) {
    return this.profileService.createProfile(dto);
  }

  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.profileService.getAllProfiles();
  }

  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Get(":id")
  getOnePost(@Param("id") id: number) {
    return this.profileService.getProfileById(id);
  }

  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Put(":id")
  updateProfile(@Param("id") id: number, @Body() dto: createProfileDto) {
    return this.profileService.updateProfile(id, dto);
  }

  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Delete(":id")
  deletePost(@Param("id") id: number) {
    return this.profileService.deleteProfile(id);
  }
}
