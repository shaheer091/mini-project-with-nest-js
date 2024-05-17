import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './app/controllers/user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './app/models/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from './jwt.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserService } from './app/services/user.service';
import { AdminController } from './app/controllers/admin.controller';
import { AdminService } from './app/services/admin.service';
import { PostSchema } from './app/models/post.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DB_LINK'),
      }),
    }),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Post', schema: PostSchema },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  controllers: [AppController, UserController, AdminController],
  providers: [AppService, JwtService, UserService, AdminService],
})
export class AppModule {}
