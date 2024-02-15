import { HabitChildMapEntity } from '../habit/habit_child_map.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('child')
export class ChildEntity {
  @PrimaryGeneratedColumn()
  child_id: number;

  @Column()
  child_name: string;

  @Column()
  user_id: number;

  @Column()
  number_of_activateItems: number;

  @OneToMany(() => HabitChildMapEntity, (habitChildMap) => habitChildMap.child)
  habitChildMap: HabitChildMapEntity[];
}
