import { Class } from 'src/modules/class/entities/class.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;

  @Column()
  classId: string;

  @ManyToOne(() => Class)
  @JoinColumn()
  class: Class;
}
