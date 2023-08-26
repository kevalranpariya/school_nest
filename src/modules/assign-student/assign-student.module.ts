import { Module } from '@nestjs/common';
import { AssignStudentService } from './assign-student.service';
import { AssignStudentController } from './assign-student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssignStudent } from './entities/assign-student.entity';
import { Class } from '../class/entities/class.entity';
import { User } from '../auth/entities/auth.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AssignStudent, Class, User])],
  controllers: [AssignStudentController],
  providers: [AssignStudentService],
})
export class AssignStudentModule {}
