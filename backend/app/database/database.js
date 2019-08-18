const chalk = require('chalk');
const mongoose = require('mongoose');

module.exports = async(app) => {
    try {        
        await mongoose.connect(process.env.DB, {
            useCreateIndex: true,
            useNewUrlParser: true
        })
        console.log(chalk.blue('*** DATABASE CONNECTION MADE'));
    } catch(error) {
        console.log(chalk.blue('*** FAILED TO MAKE DATABASE CONNECTION'));
        throw error;
    }
}