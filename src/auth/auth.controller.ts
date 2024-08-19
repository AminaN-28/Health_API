import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from 'src/users/users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService) {}

    @Post('login')
  async login(@Body('fullName') fullName: string, @Body('password') password: string) {
    const user = await this.userService.validateUser(fullName, password);
    return this.authService.login(user);
  }


  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Req() req) {
    try {
      console.log('----GET PROFILE OF AN USER SERVICE INIT---')
      return this.authService.validateUser(req.user);
    } catch (error) {
      console.log('----GET PROFILE OF AN USER SERVICE ERROR INIT---', error)
    }
  }
  // @Post('logOut')
  // logout() {
  //   localStorage.removeItem('access_token');
  // }

  @Post('logout')
  logout() {
    localStorage.removeItem('access_token');
    return { message: 'Your JWT has been successfully deleted' };
  }

  
  @Post()
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
