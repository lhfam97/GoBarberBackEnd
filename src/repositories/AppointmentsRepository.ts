// import { isEqual } from 'date-fns';
import { EntityRepository, Repository } from 'typeorm';
import Appointment from '../models/Appointments';

// interface CreateAppointmentDTO {
//   provider: string;
//   date: Date;
// }

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  // private appointments: Appointment[];

  // constructor() {
  //   this.appointments = [];
  // }

  // public all(): Appointment[] {
  //   return this.appointments;
  // }

  public async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointment = await this.findOne({
      where: {
        date,
      },
    });

    // const findAppointment = this.appointments.find(appointment =>
    //   isEqual(date, appointment.date),
    // );
    return findAppointment || null;
  }
  // provider: string, dat

  // public create({ provider, date }: CreateAppointmentDTO): Appointment {
  //   const appointment = new Appointment({ provider, date });
  //   this.appointments.push(appointment);
  //   return appointment;
  // }
}
export default AppointmentsRepository;
