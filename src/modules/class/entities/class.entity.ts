import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { User } from 'src/modules/auth/entities/auth.entity';

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
  @JoinColumn() // Specify the join column
  teacher: User; // Now you can navigate to the associated teacher
}
