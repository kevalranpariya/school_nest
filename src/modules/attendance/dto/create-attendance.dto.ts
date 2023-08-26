import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { AttendanceStatus } from 'src/common/enums/attendance.status';

export class CreateAttendanceDto {
  @IsDateString()
  date: Date;

  @IsNotEmpty()
  @IsString()
  @IsEnum(AttendanceStatus)
  status: AttendanceStatus;

  @IsNotEmpty()
  @IsString()
  student_id: string;
}
