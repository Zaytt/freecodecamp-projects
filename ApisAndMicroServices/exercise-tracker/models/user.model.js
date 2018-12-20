const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
  username:{type: String, required: true, max: 30}
});

module.exports = mongoose.model('User', UserSchema);