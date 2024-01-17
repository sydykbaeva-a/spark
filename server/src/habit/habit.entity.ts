import { ChildEntity } from "src/child/child.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('habit')

export class HabitEntity {
    @PrimaryGeneratedColumn()
    habit_id: number;

    @Column()
    habit_name: string;

    @Column()
    habit_child_map_id: number;

    @ManyToMany(() => ChildEntity, child => child.habits)
    @JoinTable({ name: 'habit_child_map', joinColumn: { name: 'habit_id' }, inverseJoinColumn: { name: 'child_id' } })
    children: ChildEntity[];

}