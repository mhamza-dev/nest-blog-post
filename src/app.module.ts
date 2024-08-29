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
import { RepliesModule } from './replies/replies.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [PostsModule, UsersModule, CommentsModule, RepliesModule, CategoriesModule],
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
        { path: '/replies', method: RequestMethod.GET },
        { path: '/replies/comment/:postId', method: RequestMethod.GET },
        '/categories'
      )
      .forRoutes('/posts', '/comments', 'replies');
  }
}
