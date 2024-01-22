import { ChildEntity } from 'src/child/child.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('habit')
export class HabitEntity {
  @PrimaryGeneratedColumn()
  habit_id: number;

  @Column()
  habit_name: string;

  @ManyToMany(() => ChildEntity, (child) => child.habitMap)
  @JoinTable({
    name: 'habit_child_map',
    joinColumn: { name: 'habit_id' },
    inverseJoinColumn: { name: 'child_id' },
  })
  children: ChildEntity[];
}
