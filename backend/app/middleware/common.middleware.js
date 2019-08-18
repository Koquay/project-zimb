const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const chalk = require('chalk');

process.env.DIST = path.join(__dirname, '../../../dist/project-zimb');
process.env.INDEX = path.join(process.env.DIST, '/index.html');

module.exports = (app) => {
    console.log(chalk.blue('*** common.middleware called ***'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(morgan('common'));
    app.use(cors());
    app.use(helmet());
    app.use(express.static(process.env.DIST));
}
