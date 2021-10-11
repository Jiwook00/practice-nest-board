import { Column, Entity, ManyToOne, JoinColumn, Index } from 'typeorm';
import { BaseColumn } from './base.entity';
import { Users } from './users.entity';

@Index('posts_pkey', ['id'], { unique: true })
@Entity({ name: 'posts' })
export class Posts extends BaseColumn {
  @Column('varchar', { name: 'title' })
  title: string;

  @Column('varchar', { name: 'content' })
  content: string;

  @ManyToOne(() => Users, (users) => users.posts)
  users: Users;

  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;
}
