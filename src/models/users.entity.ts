import { Column, Entity, OneToMany, Index } from 'typeorm';
import { BaseColumn } from './base.entity';
import { Posts } from './posts.entity';

@Index('users_pkey', ['id'], { unique: true })
@Entity({ name: 'users' })
export class Users extends BaseColumn {
  @Column('varchar', {
    name: 'email',
    unique: true,
    nullable: false,
    length: 30,
  })
  email: string;

  @Column('varchar', {
    name: 'password',
    length: 100,
    nullable: false,
    select: false,
  }) // select: false
  password: string;

  @OneToMany(() => Posts, (posts) => posts.users)
  posts: Posts[];
}
