import { ChildEntity } from 'src/child/child.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { HabitChildMapEntity } from './habit_child_map.entity';

@Entity('habit')
export class HabitEntity {
  @PrimaryGeneratedColumn()
  habit_id: number;

  @Column()
  habit_name: string;

  @OneToMany(() => HabitChildMapEntity, (habitChildMap) => habitChildMap.habit)
  habitChildMap: HabitChildMapEntity[];
}
