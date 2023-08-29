import { Attendance } from 'src/modules/attendance/entities/attendance.entity';
import { User } from 'src/modules/auth/entities/auth.entity';
import { Class } from 'src/modules/class/entities/class.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class AssignStudent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  studentId: number;

  @Column()
  classId: number;

  @ManyToOne(() => Class, { onDelete: 'CASCADE' })
  @JoinColumn()
  class: Class;

  @OneToOne(() => User)
  @JoinColumn()
  student: User;

  @OneToMany(() => Attendance, (col) => col.student)
  attendance: Attendance[];
}
