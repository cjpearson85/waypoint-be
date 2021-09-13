const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const routesSchema = new Schema({
    title: {
        type: 'string',
        required: true,
    },
    description: {
        type: 'string', required: false, maxLength: 150
    },
    username: { type: 'string', required: true, unique: true, maxLength: 15 },
    coords: { type: 'array', required: true },
    start_time_date: { type: 'date', required: true },


}, { timestamps: true });

const User = mongoose.model('User', routesSchema);
module.exports = User;