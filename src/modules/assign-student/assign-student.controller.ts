import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AssignStudentService } from './assign-student.service';
import { CreateAssignStudentDto } from './dto/create-assign-student.dto';
import { UpdateAssignStudentDto } from './dto/update-assign-student.dto';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/core/guard/role.guard';
import { Roles } from 'src/core/guard/roles.decorator';
import { User } from '../auth/entities/auth.entity';

@Controller('assignStudent')
export class AssignStudentController {
  constructor(private readonly assignStudentService: AssignStudentService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('teacher')
  @Post()
  create(
    @Body() createAssignStudentDto: CreateAssignStudentDto,
    @Req() req: Request,
  ) {
    const { id } = req.user as User;
    return this.assignStudentService.create(id, createAssignStudentDto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('teacher')
  @Get()
  findAll(@Req() req: Request) {
    const { id } = req.user as User;
    return this.assignStudentService.findAll(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assignStudentService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAssignStudentDto: UpdateAssignStudentDto,
  ) {
    return this.assignStudentService.update(+id, updateAssignStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assignStudentService.remove(+id);
  }
}
