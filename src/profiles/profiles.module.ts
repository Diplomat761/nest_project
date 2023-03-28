import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { ProfilesController } from "./profiles.controller";
import { Profile } from "./profiles.model";
import { ProfilesService } from "./profiles.service";

@Module({
  controllers: [ProfilesController],
  providers: [ProfilesService],
  imports: [SequelizeModule.forFeature([Profile])],
})
export class ProfilesModule {}