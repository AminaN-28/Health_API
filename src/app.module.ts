import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PassportModule } from '@nestjs/passport';
import { AppointmentsModule } from './appointments/appointments.module';
import { DATABASE_HOST, DATABASE_PASSWORD, DATABASE_USER } from './config/constant';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        database:'health_handler_new',
        host: configService.get<string>(DATABASE_HOST),
        username: configService.get(DATABASE_USER),
        password: configService.get(DATABASE_PASSWORD),
        // database: configService.get<string>(DATABASE_NAME),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    
    UsersModule,
    PassportModule.register({defaultStrategy: 'jwt', session : true}),
    AppointmentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [TypeOrmModule,PassportModule],

})
export class AppModule {}
