import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from '../models/posts.entity';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Users } from '../models/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Posts, Users])],
  providers: [PostsService],
  controllers: [PostsController],
  exports: [],
})
export class PostsModule {}
