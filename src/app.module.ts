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
import { ConfigModule } from '@nestjs/config';
import { UserService } from './app/services/user.service';
import { AdminController } from './app/controllers/admin.controller';
import { AdminService } from './app/services/admin.service';
import { PostSchema } from './app/models/post.schema';
import { JwtAuthGuard } from './app/guards/jwt.guard';
import { NotificationGateway } from './app/services/notification.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.DB_LINK,
      }),
    }),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Post', schema: PostSchema },
    ]),
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  controllers: [AppController, UserController, AdminController],
  providers: [AppService, JwtService, UserService, AdminService, JwtAuthGuard, NotificationGateway],
  exports: [JwtAuthGuard],
})
export class AppModule {}
