import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
  UseGuards,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { AssignStudentService } from './assign-student.service';
import { CreateAssignStudentDto } from './dto/create-assign-student.dto';
import { UpdateAssignStudentDto } from './dto/update-assign-student.dto';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/core/guard/role.guard';
import { Roles } from 'src/core/decorator/roles.decorator';
import { User } from '../auth/entities/auth.entity';

@Controller('assignStudent')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class AssignStudentController {
  constructor(private readonly assignStudentService: AssignStudentService) {}

  @Roles('teacher')
  @Post()
  create(
    @Body() createAssignStudentDto: CreateAssignStudentDto,
    @Req() req: Request,
  ) {
    const { id } = req.user as User;
    return this.assignStudentService.create(id, createAssignStudentDto);
  }

  @Roles('teacher')
  @Get()
  findAll(@Req() req: Request) {
    const { id } = req.user as User;
    return this.assignStudentService.findAll(id);
  }

  @Roles('teacher')
  @Get(':studentId')
  findOne(
    @Param('studentId', ParseIntPipe) studentId: number,
    @Req() req: Request,
  ) {
    const { id } = req.user as User;
    return this.assignStudentService.findOne(id, studentId);
  }

  @Roles('teacher')
  @Put(':studentId')
  update(
    @Param('studentId', ParseIntPipe) studentId: number,
    @Body() updateAssignStudentDto: UpdateAssignStudentDto,
    @Req() req: Request,
  ) {
    const { id } = req.user as User;
    return this.assignStudentService.update(
      id,
      studentId,
      updateAssignStudentDto,
    );
  }

  @Roles('teacher')
  @Delete(':studentId')
  remove(
    @Param('studentId', ParseIntPipe) studentId: number,
    @Req() req: Request,
  ) {
    const { id } = req.user as User;
    return this.assignStudentService.remove(id, studentId);
  }
}
