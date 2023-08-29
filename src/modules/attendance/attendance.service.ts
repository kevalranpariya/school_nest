import { Injectable } from '@nestjs/common';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendance } from './entities/attendance.entity';
import { Repository } from 'typeorm';
import { Class } from '../class/entities/class.entity';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private readonly attendanceRepository: Repository<Attendance>,
    @InjectRepository(Class) private classRepository: Repository<Class>,
  ) {}
  create(createAttendanceDto: CreateAttendanceDto) {
    const createAttendance =
      this.attendanceRepository.create(createAttendanceDto);
    return this.attendanceRepository.save(createAttendance);
  }

  async findAll(id: number) {
    return await this.classRepository.find({
      where: {
        teacherId: id,
      },
      relations: ['assignStudent', 'assignStudent.attendance'],
    });
  }

  async findOne(id: number, studentId: number) {
    return await this.classRepository.findOne({
      where: {
        teacherId: id,
        assignStudent: {
          id: studentId,
        },
      },
      relations: ['assignStudent', 'assignStudent.attendance'],
    });
  }

  async update(
    id: number,
    attendanceId: number,
    updateAttendanceDto: UpdateAttendanceDto,
  ) {
    const findAttendance = await this.classRepository.findOne({
      where: {
        teacherId: id,
        assignStudent: {
          attendance: {
            id: attendanceId,
          },
        },
      },
    });
    return !findAttendance
      ? null
      : await this.attendanceRepository.update(
          attendanceId,
          updateAttendanceDto,
        );
  }

  async remove(id: number, attendanceId: number) {
    const findAttendance = await this.classRepository.findOne({
      where: {
        teacherId: id,
        assignStudent: {
          attendance: {
            id: attendanceId,
          },
        },
      },
    });
    return !findAttendance
      ? null
      : await this.attendanceRepository.delete(attendanceId);
  }
}
