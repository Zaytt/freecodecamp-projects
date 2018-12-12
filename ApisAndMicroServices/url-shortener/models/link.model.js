const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let LinkSchema = new Schema({
    original_url: {type: String, required: true},
    short_url: {type: String, required: true}
});


// Export the model
module.exports = mongoose.model('Link', LinkSchema);