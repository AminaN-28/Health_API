import { ConflictException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(username: string, password: string): Promise<User> {
    try {
      console.log('----CREATE A USER SERVICE INIT----')

      const user = new User();
      user.fullName = username;
      user.password = password;
  
      return this.usersRepository.save(user);
    } catch (error) {
      console.log('----CREATE A USER SERVICE ERROR INIT----', error)
      return error;
    }
   
  }

  findByUsername(username: string): Promise<User> {
    try {
      console.log('----FIND BY USERNAME SERVICE INIT----')
      // const user = new User();
    // user.fullName = username;
    return this.usersRepository.findOneBy({fullName: username});
    } catch (error) {
      console.log('----FIND BY USERNAME SERVICE ERROR INIT----', error)
    }
  }


  async register(username: string, password: string): Promise<User> {
    try {
      console.log('----REGISTER AN USER SERVICE INIT----')
      const existingUser = await this.findByUsername(username);

      if (existingUser) {
        throw new ConflictException('Username already exists');
      }
  
      const user = new User();
      user.fullName = username;
      user.password = password; // In a real application, make sure to hash the password before storing it
  
      return this.usersRepository.save(user);
    } catch (error) {
      console.log('----REGISTER AN USER SERVICE ERROR INIT----', error)
    }
  
  }

  async validateUser(username: string, password: string): Promise<User> {
    try {
      console.log('----VALIDATEUSER SERVICE INIT----')

      const user = await this.findByUsername(username);
  
      if (!user || user.password !== password) { // In a real application, make sure to hash the password and compare the hashed values
        throw new UnauthorizedException('Invalid credentials');
      }
  
      return user;
    } catch (error) {
      console.log('----VALIDATEUSER SERVICE ERROR INIT----', error)

    }
   
  }
  
  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
