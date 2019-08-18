const IndexRoutes = require('../index/index.routes');
const MenuRoutes = require('../menu/menu.routes');
const OrderRoutes = require('../order/order.routes');
const UserRoutes = require('../user/user.routes')

module.exports = (app) => {
    app.use('/api/order', OrderRoutes);
    app.use('/api/menu', MenuRoutes);
    app.use('/api/user', UserRoutes);
    app.use('/*', IndexRoutes);
}