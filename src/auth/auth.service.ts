import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Payload } from 'src/interfaces/payload';
import { comparePassword } from 'src/utils/bcrypt';
import passport from 'passport';
const jwt = require("jsonwebtoken");

@Injectable()
export class AuthService {


  constructor (private userService : UsersService, private jwtService: JwtService){}


  async signPayload(payload: Payload) {
    const signOptions = {
      algorithm: process.env.ALG,
    };
    return jwt.sign(
      { email : payload.email, exp: Math.floor(Date.now() / 1000) + 260 * 60 * 2 }, //expire in 2 hour
      process.env.PRIVATE_KEY,
      signOptions
    );
  }




  async login(authLoginDto: CreateAuthDto) {
    const user = await this.validateUser(authLoginDto);

    const payload = {
      userId: user.uuid,
      email: user.email,
      password: user.password, 
      phone: user.phone,
      age: user.age,
      dateOfBirth: user.dateOfBirth,
      role: user.role,
      gender: user.gender,
      address: user.address

    };

    return {
      email: payload.email,
      role : payload.role,
      password: payload.password,
      phone : payload.phone,
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(authLoginDto: CreateAuthDto): Promise<User> {
    const { email, password } = authLoginDto;

    const user = await this.userService.findByEmail(authLoginDto.email);
    if(user){
      const matchedMdp =  comparePassword(authLoginDto.password, user.password)
      if (matchedMdp){
        console.log('USER VALIDATION SUCCESS'); 
        return user;
      }
      else{
        console.log('PASSWORD NOT MATCHED '); 
        return null;
      }
    }
   
  }

  async validateUsser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    console.log(user);
    if (user && (await comparePassword(user.password, password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

}
