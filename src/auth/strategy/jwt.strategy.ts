import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt,Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";
import { User } from "src/users/entities/user.entity";
;
// import {  } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(@InjectRepository(User) private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'test'
    });
  }


  async validate(payload: any) {
    return { id: payload.sub, username: payload.username };
  }
}