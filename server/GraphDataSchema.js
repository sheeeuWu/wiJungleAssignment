const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GraphDataSchema = new Schema({
    labels: { 
        type: [String], // Change to array of strings if you have multiple labels
        required: true
    },
    values: {
        type: [Number],
        required: true
    }
});

module.exports = mongoose.model('GraphData', GraphDataSchema);
