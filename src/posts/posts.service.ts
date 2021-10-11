import { Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from '../models/posts.entity';
import { Repository, Connection } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts) private postsRepository: Repository<Posts>,
    private connention: Connection,
  ) {}

  async getAllPosts() {
    return '';
  }

  async createPost(title: string, content: string) {
    const queryRunner = this.connention.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const post = await queryRunner.manager.getRepository(Posts).save({
        title,
        content,
        user_id: 1,
      });
      await queryRunner.commitTransaction();
      return post;
    } catch (e) {
      console.log('error : ', e);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
