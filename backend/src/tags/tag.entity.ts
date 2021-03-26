import { TagIcon } from 'src/notes/note-enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TagColor } from './tag-enum';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @Column({
    type: 'enum',
    enum: TagIcon,
    default: TagIcon.TAG,
  })
  icon: TagIcon;

  @Column({
    type: 'enum',
    enum: TagColor,
    default: TagColor.GRAY,
  })
  color: TagColor;
}

// npx typeorm migration:generate -n alterNoteTableAddColorAndIsFavColumns