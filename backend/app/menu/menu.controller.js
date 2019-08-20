const MenuService = require('./menu.service');
const chalk = require('chalk');
const ErrorHandler = require('../error/error-handler');

exports.getMenu = async(req, res) => {
    console.log(chalk.blue('MENU CONTROLLER GETMENU'));
    console.log('req.params.business', req.params.business)

    try {
        const menu = await MenuService.getMenu(req.params.business);
        res.status(200).json(menu);
        return;
    } catch(error) {
        return ErrorHandler.handleError('setOrderStatus ERROR', res, error);
    }
    
}