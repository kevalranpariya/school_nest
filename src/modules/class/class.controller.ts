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
import { ClassService } from './class.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/core/guard/role.guard';
import { Roles } from 'src/core/decorator/roles.decorator';

@Controller('class')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Roles('principal')
  @Post()
  async create(
    @Body()
    createClassDto: CreateClassDto,
  ) {
    return this.classService.create(createClassDto);
  }

  @Roles('principal')
  @Get()
  findAll() {
    return this.classService.findAll();
  }

  @Roles('principal')
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.classService.findOne(id);
  }

  @Roles('principal')
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateClassDto: UpdateClassDto,
  ) {
    return this.classService.update(id, updateClassDto);
  }

  @Roles('principal')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.classService.remove(id);
  }
}
