import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('child')

export class ChildEntity {
    @PrimaryGeneratedColumn()
    child_id: number;

    @Column()
    child_name: string;

    @Column()
    user_id: number;
    
    @Column()
    habit_child_map_id: number;

}