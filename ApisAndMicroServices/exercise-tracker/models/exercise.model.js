const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ExerciseSchema = new Schema({
  userId:{type: String, required: true},
  description:{type: String, required: true},
  duration: {type: String, required: true},
  date: {type: Date, required: false}
});

module.exports = mongoose.model('Exercise', ExerciseSchema);

//userId(_id), description, duration, and optionally date