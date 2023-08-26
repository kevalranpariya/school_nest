import { User } from 'src/modules/auth/entities/auth.entity';
import { Class } from 'src/modules/class/entities/class.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class AssignStudent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  classId: number;

  @Column()
  studentId: number;

  @ManyToOne(() => Class)
  @JoinColumn()
  class: Class;

  @OneToOne(() => User)
  @JoinColumn()
  student: User;
}
