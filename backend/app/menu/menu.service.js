require('./menu.model')
const Menu = require('mongoose').model('Menu');

exports.getMenu = async (business) => {
    try {
        // throw new Error();
        // await Menu.updateMany({}, {$set: {"business": "nandos"}})

        const menu = await Menu.find({"business": business}).sort({item_no: 1});
        console.log('menu', menu)
        return menu;
    } catch(error) {
        console.log('error', error)
        error.message = 'Problem getting menu items.';
        error.status = '500';
        throw error;
    }
}