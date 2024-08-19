import { User } from "src/users/entities/user.entity";
import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export class Appointment {

    @PrimaryGeneratedColumn()
    id: any ;
    
    @Column()
    appointmentObject: string;

    @Column()
    date: Date;

    @Column()
    userId: string;


    @ManyToOne(() => User, user => user.appointed)
    user: User;
}
