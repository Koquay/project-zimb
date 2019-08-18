const chalk = require('chalk');

exports.handleError = (location, res, error) => {
    console.log(chalk.red('ERROR HANDLER:'));
    console.log(chalk.red('Error Location:', location));
    console.log('Error:', error);
    return res.status(error.status).json(error);
}