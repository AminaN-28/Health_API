import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    // constructor(private authService: AuthService) {
    //     super({
    //         emailField: 'email',
    //         mdpField: 'mdp',
    //       });
    //   }
    //   async validate(authLogin : AuthLoginDto): Promise<any> {
    //     const user = await this.authService.validateUser(authLogin);
    //     if (!user) {
    //       throw new UnauthorizedException();
    //     }
    //     return user;
    //   }



      constructor(private readonly authService: AuthService) {
        super();
      }
    
      async validate(email: string, password: string): Promise<any> {
        const user = await this.authService.validateUsser(email, password);
        if (!user) {
          throw new UnauthorizedException();
        }
        return user;
      }
}