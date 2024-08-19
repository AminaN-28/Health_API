import { Column, PrimaryGeneratedColumn } from "typeorm";

export class User {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;


    @Column()
    password: string;

    @Column({ unique: true })
    email: string;


    @Column()
    age: string;

    @Column()
    gender: string;

    @Column()
    dateOfBirth: string;
    
    
    @Column()
    phone: string;
    
    @Column()
    address: string;

    role: string;

}
