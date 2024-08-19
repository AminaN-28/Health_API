import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {


  constructor(private jwtService: JwtService,private userService: UsersService,
  ) {}

  async login(user: User) {
    const payload = { fullName: user.fullName, sub: user.uuid };
    return {
      access_token: this.jwtService.sign(payload),
    };
  } 

  async validateUser(payload: any): Promise<User> {
    return this.userService.findByUsername(payload.fullName);
  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
