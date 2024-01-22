import { ChildEntity } from 'src/child/child.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @ManyToOne(() => ChildEntity, (child) => child.habitMap)
  @JoinColumn({
    name: 'child_id',
  })
  children: ChildEntity[];
}
