const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const uniqueValidator = require('mongoose-unique-validator');

const MenuSchema = new Schema({
    item_no: {
        type: Number,
    },
    name: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    type: {
        type: String,
    },
    initial_menu: {
        type: Boolean,
    },
    list_price: {
        type: Number,
        required: true
    },
    created_on: {
        type:Date,
        default: Date.now
    }    
});

mongoose.model('Menu', MenuSchema, 'menus');