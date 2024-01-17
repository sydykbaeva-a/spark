import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}