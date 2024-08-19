import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res, HttpException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('createUser')
  async create(@Body() createUserDto: CreateUserDto) {
    console.log("CREATE USER");
    return await this.usersService.create(createUserDto);
  }
  
  @Get('findAllUsers')
  async findAll() {
    return  await this.usersService.findAll();
  }


  @Get(':role')
  async findOne(@Param('role') role: string, @Res() res): Promise<Response> {
    let user = await this.usersService.findOneByRole(role)
    if(user) return res.status(HttpStatus.OK).json(user)
    else {
      throw HttpException;
    }
    // return res.status(HttpStatus.NOT_FOUND).json({"error" : "This resource  no longer exist or has been removed"})
  }

  @Get(':email')
  async findOneById(@Param('email') email, @Res() res): Promise<Response> {
    let user = await this.usersService.findByEmail(email)
    if(user) return res.status(HttpStatus.OK).json(user)
    else {
      throw HttpException;
    }
    // return res.status(HttpStatus.NOT_FOUND).json({"error" : "This resource  no longer exist or has been removed"})
  }
  



  
}
