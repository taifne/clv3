import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, DeleteDateColumn, OneToMany, CreateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { Post } from '@/modules/post/post.entity';
import { User } from '@/modules/user/user.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column({ nullable: true })
  parentId: number;

  @Column()
  post: number;


  @Column({ nullable: true })
  user: number;


  @OneToMany(() => Comment, comment => comment.parentId)
  replies: Comment[];

  @Column('simple-array', { nullable: true })
  likes: number[];


  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date;
}
