import { Injectable, ForbiddenException } from '@nestjs/common';
//import { SignupRequestDto } from './dto/signin.request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../models/users.entity';
import { Repository, Connection } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    private connection: Connection,
  ) {}

  async findByEmail(email: string) {
    return this.usersRepository.findOne({
      where: { email },
      select: ['id', 'email'],
    });
  }

  async signup(email: string, password: string) {
    console.log('email 여기', email);

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const user = await queryRunner.manager
      .getRepository(Users)
      .findOne({ where: { email } });

    if (user) {
      throw new ForbiddenException('이미 존재하는 사용자입니다.');
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    try {
      await queryRunner.manager.getRepository(Users).save({
        email,
        password: hashedPassword,
      });
      await queryRunner.commitTransaction();
      return true;
    } catch (e) {
      console.log('error : ', e);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
