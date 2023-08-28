import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateScheduleDto {
  @IsNotEmpty()
  @IsDateString()
  date: string;

  @IsString()
  @IsNotEmpty()
  classId: string;
}
