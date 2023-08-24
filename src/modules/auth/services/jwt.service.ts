// src/auth/jwt.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/auth.entity';

@Injectable()
export class JwtAuthService {
  constructor(private readonly jwtService: JwtService) {}

  async signPayload(payload: Partial<User>) {
    return this.jwtService.sign({ ...payload });
  }

  async verifyToken(token: string): Promise<any> {
    return this.jwtService.verify(token);
  }
}
