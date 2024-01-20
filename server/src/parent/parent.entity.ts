import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('parent')
export class ParentEntity {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  fist_name: string;

  @Column()
  last_name: string;
}
