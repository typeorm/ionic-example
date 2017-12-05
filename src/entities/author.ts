import {BaseEntity, Entity, Column, PrimaryGeneratedColumn, OneToMany} from "typeorm";
import {Post} from "./post";

@Entity('author')
export class Author extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({nullable: true})
    birthdate: string;

    @OneToMany(type => Post, post => post.author)
    posts: Post[];
}
