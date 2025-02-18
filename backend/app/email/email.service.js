const sgMail = require('@sendgrid/mail');
const moment = require('moment-timezone');

exports.sendBuyerEmail = (order) => {
    console.log('***** sendBuyerEmail called')    
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    if(!order.buyer.email) return

    const msg = {
        to: 'kkwilson27@hotmail.com',
        from: 'cat_man_shadow@hotmail.com',
        subject: 'Your Wannet Global Order No. ' + order.order_no, 
        text: 'Dear ' + order.buyer.name + ', \n\n' +
        'We are pleased to inform you that your order for ' + order.receiver.name +  
        ' placed on ' + moment.tz(order.created_on, 'America/Toronto').format('MM-DD-YYYY') + 
        ' was successfully delivered.\n We look forward to serving you again soon.\n\n Kind regards,\n\n Wannet Global, Inc.',
        // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    try {
        sgMail.send(msg);    
    } catch(error) {
        console.log('errorX sendBuyerEmail', error);
        error.message = 'Problem sending buyer confirmation email`.';
        error.status = '500';
        throw error;
    }
    
}