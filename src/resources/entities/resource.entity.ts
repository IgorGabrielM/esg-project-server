import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Resource {
  @PrimaryGeneratedColumn()
  idResource: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  link: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  image_url: string;

  @ManyToOne(() => Resource, (resource) => resource.children, {
    nullable: true,
  })
  parent: Resource;

  @OneToMany(() => Resource, (resource) => resource.parent)
  children: Resource[];
}
