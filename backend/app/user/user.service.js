require('./user.model');
const User = require('mongoose').model('User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const chalk = require('chalk');

exports.register = async (user) => {
    try {
        let newUser = new User(user);
        newUser.password = bcrypt.hashSync(user.password, 10);
        console.log('newUser', newUser)
        await newUser.save();
        delete user.password;
        user.token = jwt.sign({ email: user.email }, process.env.SECRET, { expiresIn: 3600 });
        console.log('user', user)
        return user;

    } catch (errorX) {
        console.log('errorX', errorX)
        let error = new Error()
        error.message = 'Registration failure! Please try again with correct credentials.'
        error.status = 401;
        throw error
    }
};

exports.login = async (user) => {
    try {
        let existingUser = await User.findOne({ email: user.email });

        if (existingUser == null) {
            let error = new Error()
            error.message = 'Login failed. Please try again with correct credentials.'
            error.status = 401;
            throw error;
        }

        if (await bcrypt.compare(user.password, existingUser.password) == false) {
            let error = new Error()
            error.message = 'Login failed. Please try again with correct credentials.'
            error.status = 401;
            throw error
        }


        user.token = await jwt.sign({ email: user.email }, process.env.SECRET, { expiresIn: 14400000 });
        delete user.password;
        console.log('user service user ', user)
        return user;
    } catch (errorX) {
        let error = new Error()
        error.message = 'Login failed. Please try again with correct credentials.'
        error.status = 401;
        throw error
    }
}

exports.authenticate = async (req, res, next) => {
    let bearer;
    let token;

    try {
        bearer = JSON.parse(req.headers.authorization.substr(7));
        token = bearer.user.token;
    } catch (errorx) {
        console.log('errorx', errorx)
        let error = new Error();
        error.message = 'There is a problem. Please log in to proceed.';
        error.status = '500';
        throw error;
    }

    // const token = null;;
    console.log('bearer.token', token)

    if (token) {
        try {
            console.log('SECRET', process.env.SECRET)
            await jwt.verify(token, process.env.SECRET);
            console.log(chalk.blue('TOKEN VERIFIED'));
            return;
        } catch (errorx) {
            let error = new Error();
            error.message = 'There is a problem. Please log in to proceed.';
            error.status = '500';
            throw error;
        }
    } else {
        let error = new Error();
        error.message = 'There is a problem. Please log in to proceed.';
        error.status = '500';
        throw error;
    }
}

