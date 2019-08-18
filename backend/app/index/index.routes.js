const express = require('express');
const router = express.Router();
const IndexController = require('./index.controller');
const chalk = require('chalk');

console.log(chalk.blue('*** INDEX ROUTES ***'));

router.get('/',IndexController.get);

module.exports = router;