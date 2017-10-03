import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from "typeorm";
import {Post} from "./post";

@Entity('author')
export class Author {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({nullable: true})
    birthdate: string;

    @OneToMany(type => Post, post => post.author)
    posts: Post[];
}
