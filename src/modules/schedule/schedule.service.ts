import { Injectable } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from './entities/schedule.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
  ) {}
  async create(createScheduleDto: CreateScheduleDto) {
    const addSchedule = await this.scheduleRepository.create(createScheduleDto);
    return await this.scheduleRepository.save(addSchedule);
  }

  async findAll(id: number) {
    return await this.scheduleRepository.find({
      where: {
        class: {
          teacherId: id,
        },
      },
    });
  }

  async findOne(id: number, scheduleId: number) {
    return await this.scheduleRepository.find({
      where: {
        id: scheduleId,
        class: {
          teacherId: id,
        },
      },
    });
  }

  async update(
    id: number,
    scheduleId: number,
    updateScheduleDto: UpdateScheduleDto,
  ) {
    const findSchedule = await this.scheduleRepository.findOne({
      where: {
        id: scheduleId,
        class: {
          teacherId: id,
        },
      },
    });
    return !findSchedule
      ? null
      : await this.scheduleRepository.update(scheduleId, updateScheduleDto);
  }

  async remove(id: number, scheduleId: number) {
    const findSchedule = await this.scheduleRepository.findOne({
      where: {
        id: scheduleId,
        class: {
          teacherId: id,
        },
      },
    });
    return !findSchedule
      ? null
      : await this.scheduleRepository.delete(scheduleId);
  }
}
