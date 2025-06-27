const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Classroom = new Schema({
  name: String,
  floor: Number,
  capacity: Number,
  date: Date
});

module.exports = mongoose.model('classrooms', Classroom);
