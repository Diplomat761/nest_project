import { forwardRef, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { SequelizeModule } from "@nestjs/sequelize";
import { Profile } from "src/profiles/profiles.model";
import { ProfilesModule } from "src/profiles/profiles.module";
import { ProfilesService } from "src/profiles/profiles.service";
import { UsersModule } from "src/users/users.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  controllers: [AuthController],
  providers: [AuthService, ProfilesService],
  imports: [
    SequelizeModule.forFeature([Profile]),
    forwardRef(() => UsersModule),
    ProfilesModule,
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || "SECRET",
      signOptions: {
        expiresIn: "24h",
      },
    }),
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
