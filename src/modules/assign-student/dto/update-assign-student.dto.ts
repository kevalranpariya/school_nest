import { PartialType } from '@nestjs/mapped-types';
import { CreateAssignStudentDto } from './create-assign-student.dto';

export class UpdateAssignStudentDto extends PartialType(
  CreateAssignStudentDto,
) {}
