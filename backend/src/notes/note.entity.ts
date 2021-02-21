import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  content: string;

  @Column({type: 'timestamp'})
  createDate: Date;

  @Column({type: 'timestamp'})
  updateDate: Date;

}
