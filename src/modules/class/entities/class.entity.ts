import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { User } from 'src/modules/auth/entities/auth.entity';
import { AssignStudent } from 'src/modules/assign-student/entities/assign-student.entity';

@Entity()
export class Class {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  grade: string;

  @Column()
  teacherId: number;

  @OneToOne(() => User)
  @JoinColumn()
  teacher: User;

  @OneToMany(() => AssignStudent, (aas) => aas.class)
  assignStudent: AssignStudent[];
}
