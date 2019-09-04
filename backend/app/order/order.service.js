require('./order.model')
const Order = require('mongoose').model('Order');
const moment = require('moment-timezone');
const stripe = require('stripe')('sk_test_ybjdse51Sh1sgPPanyxXQANL007sdrs1D3');
const email = require('../email/email.service');

exports.getCurrentOrder = async () => {
    try {
        // throw new Error();
        // await Order.updateMany({}, {$set: {'status': 'Pending'}})
        let date = moment.tz('America/Toronto').format('YYYY-MM-DD');
        const orders = await Order.find({ status: 'Pending' })
        // console.log('order', order)
        return orders;
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

        let hour = newOrder.delivery_time.hour.toString();
        let minute = newOrder.delivery_time.minute.toString();

        if (hour.length == 1) {
            hour = "0" + hour;
        }

        if (minute.length == 1) {
            minute = "0" + minute;
        }

        let time = hour + ":" + minute;

        let delivery_date = newOrder.delivery_date + " " + time
        console.log('newOrder.delivery_date after construction', delivery_date)
       
        newOrder.delivery_date = moment(delivery_date).tz('America/Toronto').format('YYYY-MM-DD hh:mm A');
        newOrder.zim_delivery_date = moment(delivery_date).tz('Africa/Johannesburg').format('YYYY-MM-DD hh:mm A');
        console.log('newOrder.delivery_date zimb', newOrder.zim_delivery_date)
        console.log('newOrder.delivery_date toro', newOrder.delivery_date)

        newOrder.created_on = moment.tz('America/Toronto').format('YYYY-MM-DD');
        newOrder.zim_created_on = moment.tz('Africa/Johannesburg').format('YYYY-MM-DD');        
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
        const result = await stripe.charges.create({
            amount: Math.round(newOrder.total) * 100,
            currency: 'cad',
            description: 'Wannet Global - Order Number: ' + newOrder.order_no,
            source: newOrder.card_token,
            receipt_email: newOrder.buyer.email,
        });

        // console.log('result', result);

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

exports.setOrderStatus = async (order) => {
    try {
        // throw new Error();
        await Order.updateOne({ _id: order._id }, { $set: { status: order.status } });
        if (order.status == 'Delivered') {
            email.sendBuyerEmail(order);
        }

        return;
    } catch (error) {
        console.log('ERRORx', error)
        error.message = 'Problem updating order status. If problem persitss, please contact Keith.';
        error.status = '500';
        throw error;
    }
}


exports.searchOrder = async (searchCriteria) => {
    let searchParams = JSON.parse(searchCriteria);

    let aggregatePipeline = buildAggregatePipeline(searchParams);
    console.log('aggregatePipeline', aggregatePipeline)

    try {
        const orders = await Order.aggregate(aggregatePipeline);
        console.log('orders', orders)
        return orders;
    } catch (errorx) {
        let error = new Error();
        error.message = 'There is a problem searching for orders. Please try again or contact IT Department.';
        error.status = '500';
        throw error;
    }
}

const buildAggregatePipeline = (searchParams) => {
    let { order_no, phone } = searchParams;
    console.log('order_no', order_no)

    let aggregatePipeline = [];

    let orderNoMatch = buildOrderNoMatch(order_no);
    if (orderNoMatch) {
        aggregatePipeline.push(orderNoMatch);
    }

    let phoneMatch = buildPhoneMatch(phone);
    if (phoneMatch) {
        aggregatePipeline.push(phoneMatch);
    }

    aggregatePipeline.push(buildSortMatch());
    checkForEmptyAggregate(aggregatePipeline);

    return aggregatePipeline;
}

function checkForEmptyAggregate(aggregatePipeline) {
    if (aggregatePipeline.length == 0) {
        aggregatePipeline.push({ $match: { order_no: { $ne: null } } });
    }
}

const buildOrderNoMatch = (orderNo) => {
    if (orderNo && orderNo.trim().length) {
        return { $match: { order_no: { $eq: +orderNo.trim() } } }
    }

    return null;
}

const buildPhoneMatch = (phone) => {
    if (phone && phone.trim().length) {
        let match = { $match: { "buyer.phone": { $eq: phone.trim() } } }
        console.log('phone match', match)
        return match;
    }

    return null;
}

const buildFirstNameMatch = (firstName) => {
    if (firstName.length) {
        return { $match: { first_name: firstName } }
    }

    return null;
}

function buildSortMatch() {
    return { $sort: { created_time: -1 } };
}