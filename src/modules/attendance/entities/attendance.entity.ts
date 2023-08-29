import { AssignStudent } from 'src/modules/assign-student/entities/assign-student.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['date', 'studentId'])
export class Attendance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;

  @Column()
  status: string;

  @Column()
  studentId: string;

  @ManyToOne(() => AssignStudent)
  @JoinColumn()
  student: AssignStudent;
}
