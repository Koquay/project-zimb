require('./order.model')
const Order = require('mongoose').model('Order');
const moment = require('moment-timezone');
const stripe = require('stripe')('sk_test_ybjdse51Sh1sgPPanyxXQANL007sdrs1D3');
const Email = require('../email/email.service');

exports.getCurrentOrder = async () => {
    try {
        // throw new Error();
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

        var a = moment.tz("2019-09-14 03:04", "America/Toronto").format('YYYY-MM-DD hh:mm A');;
        var b = moment.tz("2019-09-14 03:04", "Africa/Johannesburg").format('YYYY-MM-DD hh:mm A');

        console.log('toronto date', a)
        console.log('zimb date', b)

        let hour = newOrder.delivery_time.hour.toString();
        let minute = newOrder.delivery_time.minute.toString();
        console.log('hour + length', hour, hour.length)
        console.log('minute + length', minute, minute.length)

        if (hour.length == 1) {
            hour = "0" + hour;
        }

        if (minute.length == 1) {
            minute = "0" + minute;
        }


        let time = hour + ":" + minute;

        console.log('adding minutes to date', newOrder.delivery_date + " " + time)
        let delivery_date = newOrder.delivery_date + " " + time

        newOrder.delivery_date = moment.tz(delivery_date, 'America/Toronto').format('YYYY-MM-DD hh:mm A');
        console.log('newOrder.delivery_date', newOrder.delivery_date)
        newOrder.created_on = moment.tz('America/Toronto').format('YYYY-MM-DD');
        newOrder.zim_created_on = moment.tz('Africa/Johannesburg').format('YYYY-MM-DD');
        newOrder.zim_delivery_date = moment.tz(newOrder.delivery_date, 'Africa/Johannesburg');
        newOrder.created_time = moment.tz('America/Toronto').format('YYYY-MM-DD hh:mm A');
        console.log('newOrder', newOrder)

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
            description: 'Wannet Global - Order Number: ' + newOrder.order_no,
            source: newOrder.card_token,
            receipt_email: newOrder.buyer.email,
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
        if(status == 'Delivered') {
            Email.sendBuyerEmail();
        }
        
        return;
    } catch (error) {
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
    return { $sort: { created_on: -1 } };
}