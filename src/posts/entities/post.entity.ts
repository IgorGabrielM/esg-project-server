import { PostComment } from "../../post-comments/entities/post-comment.entity";
import { User } from "../../users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    idPost: number;

    @Column({ length: 100 })
    title: string;

    @Column('text')
    text: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(type => User, user => user.posts, { nullable: false })
    @JoinColumn({ name: 'idUser' })
    user: User;

    @OneToMany(type => PostComment, postComment => postComment.post)
    comments: PostComment[];
}
