import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '@/database/Config/database.config';
import { UserModule } from '@/modules/user/user.module';
import { PostModule } from '@/modules/post/post.module';
import { CommentsModule } from '@/modules/comment/comment.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from '@/interceptor/logging.interceptor';
import { ConfigModule } from '@nestjs/config';
import appConfig from '@/config/app.config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        appConfig,
      ],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRoot({
      ...typeOrmConfig,
      autoLoadEntities: true,
    }),
    CommentsModule
  ],

  providers: [{
    provide: APP_INTERCEPTOR,
    useClass: LoggingInterceptor,

  },],
})
export class AppModule {

}