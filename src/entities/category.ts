import {BaseEntity, Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity('category')
export class Category extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

}
