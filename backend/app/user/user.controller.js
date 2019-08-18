const UserService = require('./user.service');
const ErrorHandler = require('../error/error-handler');

exports.login = async (req, res) => {
    console.log('*** User Controller login *** ')
    try {
        const user = await UserService.login(req.body.user)
        return res.status(201).json({user});
    } catch(error) {
        return ErrorHandler.handleError('AUTHENTICATION ERROR', res, error);
    }    
}

exports.register = async (req, res) => {
    console.log('*** User Controller register  *** ')
    try {
        const user = await UserService.register(req.body.user)
        return res.status(201).json({user});
    } catch(error) {
        return ErrorHandler.handleError('AUTHENTICATION ERROR', res, error);
    }    
}

exports.authenticate = async (req, res, next) => {
    console.log('*** User Controller authenticate  *** ')
    try {
        await UserService.authenticate(req, res, next)
        next();
    } catch(error) {
        return ErrorHandler.handleError('AUTHENTICATION ERROR', res, error);
    }    
}