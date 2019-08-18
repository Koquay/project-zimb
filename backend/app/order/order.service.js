require('./order.model')
const Order = require('mongoose').model('Order');
const moment = require('moment-timezone');

exports.getCurrentOrder = async () => {
    try {
        // throw new Error();
        let date = moment.tz('America/Toronto').format('YYYY-MM-DD');
        const order = await Order.find({created_on: date})
        console.log('order', order)
        return order;
    } catch (error) {
        error.message = 'Problem getting pending orders.';
        error.status = '500';
        throw error;
    }
}

exports.placeOrder = async (newOrder) => {
    try {
        // throw new Error();
        newOrder.created_on = moment.tz('America/Toronto').format('YYYY-MM-DD');
        newOrder.created_time = moment.tz('America/Toronto').format('YYYY-MM-DD hh:mm A');
        const order = new Order(newOrder);
        console.log('order', order)
        order.save();
        return order;
    } catch (error) {
        error.message = 'Problem placing order, please try again.';
        error.status = '500';
        throw error;
    }
}

exports.setOrderStatus = async (id, status) => {
    console.log('statusOrder ', id, status);
    try {
        // throw new Error();
        await Order.updateOne({ _id: id }, { $set: { status: status } });
        return;
    } catch (error) {
        error.message = 'Problem updating order status. Please contact Keith.';
        error.status = '500';
        throw error;
    }
}