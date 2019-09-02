const OrderService = require('./order.service');
const ErrorHandler = require('../error/error-handler');
const chalk = require('chalk');

exports.getCurrentOrder = async(req, res) => {
    console.log(chalk.blue('ORDER CONTROLLER getCurrentOrder'));

    try {
        const order = await OrderService.getCurrentOrder();
        res.status(200).json(order);
        return;
    } catch(error) {
        return ErrorHandler.handleError('setOrderStatus ERROR', res, error);
    }    
}

exports.placeOrder = async(req, res) => {
    console.log(chalk.blue('ORDER CONTROLLER PLACE ORDER'));

    try {
        const order = await OrderService.placeOrder(req.body);
        res.status(200).json(order);
        return;
    } catch(error) {
        return ErrorHandler.handleError('placeOrder ERROR', res, error);
    }    
}

exports.setOrderStatus = async(req, res) => {
    // console.log('order complete params', req.params);
    try {
        // await OrderService.setOrderStatus(req.params.id, req.params.status);
        await OrderService.setOrderStatus(req.body.order);
        res.status(201).json([])
    } catch(error) {
        return ErrorHandler.handleError('setOrderStatus ERROR', res, error);
    }    
}

exports.searchOrder = async (req, res) => {
    console.log('*** Order Controller SEARCH ***');
    console.log('req.query', req.query)

    try {
        const orders = await OrderService.searchOrder(req.query.searchCriteria);
        res.status(200).json(orders);
        return;
    } catch (error) {
        return ErrorHandler.handleError('ORDER SEARCH ERROR', res, error);
    }
}