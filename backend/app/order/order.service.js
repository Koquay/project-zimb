require('./order.model')
const Order = require('mongoose').model('Order');
const moment = require('moment-timezone');
const stripe = require('stripe')('sk_test_ybjdse51Sh1sgPPanyxXQANL007sdrs1D3');

exports.getCurrentOrder = async () => {
    try {
        // throw new Error();
        let date = moment.tz('America/Toronto').format('YYYY-MM-DD');
        const order = await Order.find({ created_on: date })
        console.log('order', order)
        return order;
    } catch (error) {
        error.message = 'Problem getting pending orders.';
        error.status = '500';
        throw error;
    }
}

exports.placeOrder = async (newOrder) => {
    console.log('newOrder', newOrder)
    const card_id = await chargeCard(newOrder);
    console.log('card_id', card_id)
    newOrder.card_id = card_id;

    try {
        // throw new Error();       
        newOrder.created_on = moment.tz('America/Toronto').format('YYYY-MM-DD');
        newOrder.created_time = moment.tz('America/Toronto').format('YYYY-MM-DD hh:mm A');
        const order = new Order(newOrder);
        console.log('order', order)
        order.save();
        return order;
    } catch (error) {
        console.log('errorX placeOrder', error);
        error.message = 'Problem placing order, please try again.';
        error.status = '500';
        throw error;
    }
}

const chargeCard = async (newOrder) => {
    try {
        console.log("############### card_token", newOrder.card_token)
        const result = await stripe.charges.create({
            amount: Math.round(newOrder.total) * 100,
            currency: 'cad',
            description: 'Order Number: ' + newOrder.order_no,
            source: newOrder.card_token,
            // receipt_email: newOrder.customer.shipping_address.email,
        });

        console.log('result', result);

        if (!result.paid) {
            let creditCardError = new Error();
            creditCardError.message = '2. There is a problem charging your credit card. Please enter correct information';
            creditCardError.status = '500';
            throw creditCardError;
        }

        return result.id;
    } catch (error) {
        console.log('errorX chargeCard', error)
        error.message = '1. There is a problem charging your credit card. Please enter correct information';
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