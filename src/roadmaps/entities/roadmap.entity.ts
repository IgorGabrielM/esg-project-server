import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('diagrams')
export class Roadmap {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  imgURL: string;

  @Column('json')
  nodeDataArray: { key: number; text: string; color: string }[];

  @Column('json')
  linkDataArray: { from: number; to: number }[];
}
