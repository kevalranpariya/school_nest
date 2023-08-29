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
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/core/guard/role.guard';
import { Roles } from 'src/core/decorator/roles.decorator';
import { UserId } from 'src/core/decorator/user.decorator';

@Controller('attendance')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  @Roles('teacher')
  async create(@Body() createAttendanceDto: CreateAttendanceDto) {
    return await this.attendanceService.create(createAttendanceDto);
  }

  @Get()
  async findAll(@UserId() id: number) {
    return await this.attendanceService.findAll(id);
  }

  @Get(':studentId')
  @Roles('teacher')
  findOne(
    @Param('studentId', ParseIntPipe) studentId: number,
    @UserId() id: number,
  ) {
    return this.attendanceService.findOne(id, studentId);
  }

  @Put(':attendanceId')
  @Roles('teacher')
  update(
    @Param('attendanceId', ParseIntPipe) attendanceId: number,
    @Body() updateAttendanceDto: UpdateAttendanceDto,
    @UserId() id: number,
  ) {
    return this.attendanceService.update(id, attendanceId, updateAttendanceDto);
  }

  @Delete(':attendanceId')
  @Roles('teacher')
  remove(
    @Param('attendanceId', ParseIntPipe) attendanceId: number,
    @UserId() id: number,
  ) {
    return this.attendanceService.remove(id, attendanceId);
  }
}
