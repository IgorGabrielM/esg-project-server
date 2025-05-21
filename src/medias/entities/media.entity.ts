import { MediaUser } from 'src/media-user/entities/media-user.entity';
import { Interest } from '../../interests/entities/interest.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Media {
  @PrimaryGeneratedColumn()
  idMedia: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  type: string;

  @Column()
  institution?: string;

  @Column({ nullable: true, length: 500 })
  link: string;

  @Column({ nullable: true, length: 500 })
  imageUrl: string;

  @ManyToMany((type) => Interest, (interest) => interest.medias)
  @JoinTable({
    name: 'interest_media',
    joinColumn: { name: 'idMedia', referencedColumnName: 'idMedia' },
    inverseJoinColumn: {
      name: 'idInterest',
      referencedColumnName: 'idInterest',
    },
  })
  interests: Interest[];

  @OneToMany(() => MediaUser, (mediaUser) => mediaUser.media)
  users: MediaUser[];
}
