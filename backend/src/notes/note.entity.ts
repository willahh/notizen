import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: true})
  name: string;

  @Column({nullable: true})
  content: string;

  @Column({type: 'timestamp'})
  createDate: Date;

  @Column({type: 'timestamp'})
  updateDate: Date;

}
