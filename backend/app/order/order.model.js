const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const uniqueValidator = require('mongoose-unique-validator');



const DeliverySchema = new Schema({
    method: String,
    name: String,
    phone: String,
    address: String,
    city: String,
    instruction: String,
}, {_id: false});

const MenuItemSchema = new Schema({
    name: String,
    price: Number,
    quantity: Number,
    type: String,
}, {_id: false});

const OrderSchema = new Schema({    
    discount: {
        type: Number,
    },
    tax: {
        type: Number,
    },
    subtotal: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    special_instructions: {
        type: String,
    },
    status: {
        type:String,
        default: "Pending"
    },
    delivery: DeliverySchema,
    menuItems: [MenuItemSchema],

    created_on: {
        type:Date
    },
    created_time: {
        type:Date,
    }       
});

mongoose.model('Order', OrderSchema);