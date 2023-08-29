import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/core/guard/role.guard';
import { Roles } from 'src/core/decorator/roles.decorator';
import { UserId } from 'src/core/decorator/user.decorator';

@Controller('schedule')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post()
  @Roles('teacher')
  create(@Body() createScheduleDto: CreateScheduleDto) {
    return this.scheduleService.create(createScheduleDto);
  }

  @Get()
  @Roles('teacher')
  findAll(@UserId() id: number) {
    return this.scheduleService.findAll(id);
  }

  @Get(':scheduleId')
  @Roles('teacher')
  findOne(
    @Param('scheduleId', ParseIntPipe) scheduleId: number,
    @UserId() id: number,
  ) {
    return this.scheduleService.findOne(id, scheduleId);
  }

  @Put(':scheduleId')
  @Roles('teacher')
  update(
    @Param('scheduleId') scheduleId: number,
    @Body() updateScheduleDto: UpdateScheduleDto,
    @UserId() id: number,
  ) {
    return this.scheduleService.update(id, scheduleId, updateScheduleDto);
  }

  @Delete(':scheduleId')
  @Roles('teacher')
  remove(
    @Param('scheduleId', ParseIntPipe) scheduleId: number,
    @UserId() id: number,
  ) {
    return this.scheduleService.remove(id, scheduleId);
  }
}
