const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Cars = new Schema({
    name: {type : String},
    color: {type : String},
    price: {type : Number},
    status: {type : Number},
    image: {type : Array},
    description: {type : String},
},{
    timestamps: true,
})

module.exports = mongoose.model('cars', Cars);