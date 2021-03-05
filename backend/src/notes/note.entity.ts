import { Tag } from "src/tags/tag.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

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

  // Many to many relation with note
  // @see https://typeorm.io/#/many-to-many-relations
  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];
}