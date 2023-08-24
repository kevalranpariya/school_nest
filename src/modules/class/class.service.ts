import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Class } from './entities/class.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(Class) private classRepository: Repository<Class>,
  ) {}
  async create(createClassDto: CreateClassDto) {
    const findTeacher = await this.classRepository.findOne({
      where: { teacherId: createClassDto.teacherId },
    });
    if (findTeacher) {
      throw new BadRequestException('teacher alrady assigned');
    }
    const createClass = await this.classRepository.create(createClassDto);
    return await this.classRepository.save(createClass);
  }

  findAll() {
    return `This action returns all class`;
  }

  findOne(id: number) {
    return `This action returns a #${id} class`;
  }

  update(id: number, updateClassDto: UpdateClassDto) {
    return `This action updates a #${id} class`;
  }

  remove(id: number) {
    return `This action removes a #${id} class`;
  }
}
