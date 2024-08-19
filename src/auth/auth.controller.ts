import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Session } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from 'src/users/users.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './strategy/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService) {}
    @Post('login')
    // @UseGuards(AuthGuard('local'))
    async login(@Body() authLoginDto: CreateAuthDto) {
      // console.log(authLoginDto);
        return this.authService.login(authLoginDto);
    }

  
    @Get('')
    async getAuthSession(@Session() session: Record<string , any>){
      console.log(session);
      console.log(session.id);
      session.authenticated = true;
      return session;
    }
 
  
    @UseGuards(JwtAuthGuard)
    @Get()
    async test() {
      return 'Success!';
    }


  }
