import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/auth.entity';
import { BcryptService } from './services/bcrypt.service';
import { JwtAuthService } from './services/jwt.service';
import { JwtModule } from '@nestjs/jwt';
import { EmailService } from 'src/shared/email/email.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'justLogin',
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [JwtAuthService, AuthService, BcryptService, EmailService],
})
export class AuthModule {}
