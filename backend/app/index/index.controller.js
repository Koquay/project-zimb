const chalk = require('chalk');

exports.get = (req,res) => {
    console.log(chalk.blue('*** INDEX CONTROLLER GET ***'));
    res.sendFile(process.env.INDEX);
}