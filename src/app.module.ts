import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { VerifyUser } from './middlewares/verify_user.middleware';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [PostsModule, UsersModule, CommentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(VerifyUser)
      .exclude(
        { path: '/posts', method: RequestMethod.GET },
        { path: '/posts/user/:userId', method: RequestMethod.GET },
        { path: '/comments', method: RequestMethod.GET },
        { path: '/comments/post/:postId', method: RequestMethod.GET },
      )
      .forRoutes('/posts');
  }
}
