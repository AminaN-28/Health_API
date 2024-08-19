import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment } from './entities/appointment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AppointmentsService {

  constructor(@InjectRepository(Appointment) private appointmentRepository: Repository<Appointment>,){}
  create(createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentRepository.save(createAppointmentDto);
  }

  async findAll() : Promise<Appointment[]>{
    const appointments = await  this.appointmentRepository.find({relations : [ 'users' ]});
    return appointments;
  }

  async findOne(id: number): Promise<Appointment> {
    const appointmentId = await this.appointmentRepository.findOne({where: {id: id}});
    return appointmentId;
    // `This action returns a #${id} product`;
  }

  update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return `This action updates a #${id} appointment`;
  }

  remove(id: number) {
    return `This action removes a #${id} appointment`;
  }
}
