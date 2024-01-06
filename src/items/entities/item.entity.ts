import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Listing } from './listing.entity';
import { Comment } from './comment.entity';
import { Tag } from './tag.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: true })
  public: boolean;

  @OneToOne(() => Listing, { cascade: true })
  @JoinColumn()
  listing: Listing;

  // virtual property
  @OneToMany(() => Comment, (comment) => comment.item, { cascade: true })
  comments: Comment[];

  // table name is item_tags_tag
  @ManyToMany(() => Tag, { cascade: true })
  @JoinTable()
  tags: Tag[];

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  constructor(item: Partial<Item>) {
    Object.assign(this, item);
  }
}
