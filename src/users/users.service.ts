import { ConflictException, HttpException, HttpStatus, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Payload } from 'src/interfaces/payload';
import { UserRoles } from './enums/user.enum';
import { CreateAuthDto } from 'src/auth/dto/create-auth.dto';
import { encodePassword } from 'src/utils/bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
const bcrypt = require("bcrypt");

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

 
  async create(createUserDto : any) {
    const hashedMdp = encodePassword(createUserDto.password);
    // console.log(hashedMdp); 
    // pour hash du mdp de confirmation
    // const hashedMdp = encodePassword(createUserDto.confirm);
    const user = this.usersRepository.create({...createUserDto });
     
    return await this.usersRepository.save(user);
    // return 'This action adds a new user';
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }


  async findOneByRole(role: string): Promise<User> {
    role = UserRoles.PATIENT;
    const userId =  await this.usersRepository.findOneBy({role: role});
    return userId;
  }
 

  async findByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email: email,});
  }
  

  async findByPayload(payload: Payload) {
    const { email } = payload;
    return await this.usersRepository.findOne({ where: { email } });
  }

  async findByLogin(UserDTO: CreateAuthDto) {
    const { email, password } = UserDTO;
    const user = await this.usersRepository.findOne({ where: { email: email } });
    if (!user) {
      throw new HttpException('user doesnt exists', HttpStatus.BAD_REQUEST);
    }
    if (await bcrypt.compare(password, user.password)) {
      return this.sanitizeUser(user)
    } else {
      throw new HttpException('invalid credential', HttpStatus.BAD_REQUEST);
    }
  }

  sanitizeUser(user: any) {
    const sanitized = user.toObject();
    delete sanitized['password'];
    return sanitized;
  }

  // async fetchRole(){
  //     return await this.usersRepository.createQueryBuilder("users")
  //     .where("users.role = :role", {role: UserRoles.DOCTOR})
  //     .getRawMany();
  // }
}
