import { ChildEntity } from '../child/child.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { HabitEntity } from './habit.entity';

@Entity('habit_child_map')
export class HabitChildMapEntity {
  @PrimaryGeneratedColumn()
  habit_child_map_id: number;

  @Column()
  child_id: number;

  @Column()
  habit_id: number;

  @Column()
  habit_status: boolean;

  @ManyToOne(() => HabitEntity, (habit) => habit.habitChildMap)
  @JoinColumn({ name: 'habit_id' })
  habit: HabitEntity;

  @ManyToOne(() => ChildEntity, (child) => child.habitChildMap)
  @JoinColumn({ name: 'child_id' })
  child: ChildEntity;
}
