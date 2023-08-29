import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAssignStudentDto {
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  classId: number;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  studentId: number;
}
