// filename: models/Appointment.js

const mongoose = require('mongoose');

const AppSchema = new mongoose.Schema({
  clinic: String,
  doctor: String,
  date: String,
  time: String,
  patient: String,
  contactNumber: String,
  insuranceId:  String,
  reason: String,
  status: String
})


const AppointmentsModel = mongoose.model('appointments', AppSchema);
module.exports = AppointmentsModel;
