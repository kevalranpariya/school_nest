import { Injectable } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Class } from './entities/class.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(Class) private classRepository: Repository<Class>,
  ) {}
  async create(createClassDto: CreateClassDto) {
    const createClass = await this.classRepository.create(createClassDto);
    return await this.classRepository.save(createClass);
  }

  async findAll(): Promise<Class[]> {
    return await this.classRepository.find({
      relations: ['teacher'],
    });
  }

  async findOne(id: number): Promise<Class> {
    return await this.classRepository.findOne({
      where: { id },
      relations: ['teacher'],
    });
  }

  async update(
    id: number,
    updateClassDto: UpdateClassDto,
  ): Promise<UpdateResult> {
    const findClass = await this.findOne(id);
    return !findClass
      ? null
      : await this.classRepository.update(id, updateClassDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    const findClass = await this.findOne(id);
    return !findClass ? null : await this.classRepository.delete(id);
  }
}
