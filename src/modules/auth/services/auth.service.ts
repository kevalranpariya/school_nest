import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAuthDto } from '../dto/create-auth.dto';
import { User } from '../entities/auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BcryptService } from './bcrypt.service';
import { JwtAuthService } from './jwt.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private authRepository: Repository<User>,
    private bcryptService: BcryptService,
    private jwtAuthService: JwtAuthService,
  ) {}
  async create(createUser: CreateAuthDto) {
    const isUniqueEmailUsername = await this.authRepository.findOne({
      where: [{ email: createUser.email }, { username: createUser.username }],
    });
    if (isUniqueEmailUsername) {
      throw new BadRequestException('Email OR Username is already exits');
    }
    createUser.password = await this.bcryptService.hashPassword(
      createUser.password,
    );
    const users = this.authRepository.create(createUser);
    return await this.authRepository.save(users);
  }

  async login(loginUser: Partial<CreateAuthDto>) {
    const findUser = await this.authRepository.findOne({
      where: { email: loginUser.email },
    });
    if (!findUser) {
      throw new NotFoundException('User not found');
    }
    const passCheck = await this.bcryptService.comparePasswords(
      loginUser.password,
      findUser?.password,
    );
    if (!passCheck) {
      throw new BadRequestException('Email and Password not match');
    }
    delete findUser.password;
    return await this.jwtAuthService.signPayload(findUser);
  }
}
