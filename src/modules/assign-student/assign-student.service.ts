import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAssignStudentDto } from './dto/create-assign-student.dto';
import { UpdateAssignStudentDto } from './dto/update-assign-student.dto';
import { Repository } from 'typeorm';
import { AssignStudent } from './entities/assign-student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Class } from '../class/entities/class.entity';
import { User } from '../auth/entities/auth.entity';
import { UserRole } from 'src/common/enums/roles';

@Injectable()
export class AssignStudentService {
  constructor(
    @InjectRepository(AssignStudent)
    private assignStudentRepository: Repository<AssignStudent>,
    @InjectRepository(Class) private classRepository: Repository<Class>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async create(id: number, createAssignStudentDto: CreateAssignStudentDto) {
    const findStudent = await this.userRepository.findOne({
      where: { id: createAssignStudentDto.studentId, role: UserRole.STUDENT },
    });
    if (!findStudent) {
      throw new BadRequestException('Student not found');
    }
    const findTeacher = await this.classRepository.findOne({
      where: { id: createAssignStudentDto.classId, teacherId: id },
    });
    if (!findTeacher) {
      throw new BadRequestException('not access this class');
    }
    const addStudent = await this.assignStudentRepository.create(
      createAssignStudentDto,
    );
    return await this.assignStudentRepository.save(addStudent);
  }

  async findAll(id: number) {
    return await this.classRepository.find({
      where: {
        teacherId: id,
      },
      relations: ['assignStudent', 'assignStudent.student'],
    });
  }

  async findOne(id: number, studentId: number) {
    return await this.assignStudentRepository.findOne({
      where: {
        id: studentId,
        class: {
          teacherId: id,
        },
      },
      relations: ['class'],
    });
  }

  async update(
    id: number,
    studentId: number,
    updateAssignStudentDto: UpdateAssignStudentDto,
  ) {
    const findAssignStudent = await this.assignStudentRepository.findOne({
      where: {
        id: studentId,
        class: {
          teacherId: id,
        },
      },
    });
    return !findAssignStudent
      ? null
      : await this.assignStudentRepository.update(
          studentId,
          updateAssignStudentDto,
        );
  }

  async remove(id: number, studentId: number) {
    const findAssignStudent = await this.assignStudentRepository.findOne({
      where: {
        id: studentId,
        class: {
          teacherId: id,
        },
      },
    });
    return !findAssignStudent
      ? null
      : await this.assignStudentRepository.delete(studentId);
  }
}
