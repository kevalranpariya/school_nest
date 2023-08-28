import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './core/database/database-config';
import { JwtService } from '@nestjs/jwt';
import { ClassModule } from './modules/class/class.module';
import { AttendanceModule } from './modules/attendance/attendance.module';
import { AssignStudentModule } from './modules/assign-student/assign-student.module';
import { ScheduleModule } from './modules/schedule/schedule.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    ClassModule,
    AttendanceModule,
    AssignStudentModule,
    ScheduleModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtService],
})
export class AppModule {}
