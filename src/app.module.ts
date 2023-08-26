import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './core/database/database-config';
import { JwtService } from '@nestjs/jwt';
import { ClassModule } from './modules/class/class.module';
import { AttendanceModule } from './modules/attendance/attendance.module';

@Module({
  imports: [AuthModule, DatabaseModule, ClassModule, AttendanceModule],
  controllers: [AppController],
  providers: [AppService, JwtService],
})
export class AppModule {}
