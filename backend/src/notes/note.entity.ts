import { IsEnum } from 'class-validator';
import { Tag } from 'src/tags/tag.entity';
import {
  Column,
  Entity,
  Generated,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { NoteColor } from './note-enum';

@Entity()
export class Note {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  content: string;

  @Column({ type: 'timestamp' })
  createDate: Date;

  @Column({ type: 'timestamp' })
  updateDate: Date;

  @Column({ default: false })
  isFav: boolean;

  @Column({
    type: 'enum',
    enum: NoteColor,
    default: NoteColor.GRAY,
  })
  color: NoteColor;

  // Many to many relation with note
  // @see https://typeorm.io/#/many-to-many-relations
  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];
}
