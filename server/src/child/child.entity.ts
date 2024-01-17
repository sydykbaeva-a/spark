import { HabitEntity } from "src/habit/habit.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('child')

export class ChildEntity {
    @PrimaryGeneratedColumn()
    child_id: number;

    @Column()
    child_name: string;

    @Column()
    user_id: number;

    // @Column()
    // habit_child_map_id: number;

    @ManyToMany(() => HabitEntity, habit => habit.children)
    habits: HabitEntity[];

}