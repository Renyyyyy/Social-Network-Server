import { forwardRef, Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersModule } from "src/users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { ProfileModule } from "src/profile/profile.module";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => ProfileModule),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || "SECRET",
      signOptions: { expiresIn: "15min" },
    }),
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
