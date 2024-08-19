import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from 'src/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports:[ConfigModule,
    TypeOrmModule.forFeature([User]),
    UsersModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '7d' },
      }),
      inject: [ConfigService],
    
  }),],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide : 'AUTH_SERVICE',
      useClass : AuthService
    },
    {
      provide : 'USER_SERVICE',
      useClass :  UsersService
    },
    JwtStrategy
    ],
})
export class AuthModule {}
