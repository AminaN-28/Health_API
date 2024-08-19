import { Column } from "typeorm";

export class Appointment {

    @Column()
    appointmentObject: string;

    @Column()
    date: Date;
}
