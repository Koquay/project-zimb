const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const uniqueValidator = require('mongoose-unique-validator');



const DeliverySchema = new Schema({
    method: String,
    name: String,
    phone: String,
    address: String,
    city: String,
    country: String,
    instruction: String,
}, {_id: false});

const MenuItemSchema = new Schema({
    name: String,
    price: Number,
    quantity: Number,
    type: String,
}, {_id: false});

const OrderSchema = new Schema({    
    order_no: {
        type: Number,
        required: true,
        unique: true
    },
    discount: {
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
    card_id: {
        type: String,
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