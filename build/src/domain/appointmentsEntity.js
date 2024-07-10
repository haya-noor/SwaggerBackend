"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentEntity = void 0;
class AppointmentEntity {
    customer;
    pets;
    date;
    location;
    type;
    appointmentId;
    constructor(appointment) {
        this.customer = appointment.customer;
        this.pets = appointment.pets;
        this.appointmentId = appointment.appointmentId;
        this.date = appointment.date;
        this.location = appointment.location;
        this.type = appointment.type;
    }
    static createAppointment(appointment) {
        return new AppointmentEntity(appointment);
    }
}
exports.AppointmentEntity = AppointmentEntity;
