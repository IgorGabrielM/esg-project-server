import { Role } from 'src/roles/entities/role.entity';
import { Post } from '../../posts/entities/post.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { PostComment } from 'src/post-comments/entities/post-comment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  idUser: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: 0 })
  points: number;

  @OneToMany(() => Post, post => post.user)
  posts: Post[];

  @ManyToMany((type) => Post, (post) => post.likes)
  @JoinTable({
    name: 'post_like',
    joinColumn: { name: 'idUser', referencedColumnName: 'idUser' },
    inverseJoinColumn: { name: 'idPost', referencedColumnName: 'idPost' },
  })
  likes: Post[];

  @OneToMany(() => PostComment, postComment => postComment.user)
  comments: PostComment[];

  @OneToMany(() => Role, role => role.users)
  roles: Role;
}


