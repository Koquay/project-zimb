const sgMail = require('@sendgrid/mail');

exports.sendBuyerEmail = () => {
    console.log('***** sendBuyerEmail called')    
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
        to: 'kkwilson27@hotmail.com',
        from: 'cat_man_shadow@hotmail.com',
        subject: 'Your WANNET GLOBAL Order was delivered',
        text: 'We wish to inform you that your order for ___ was successfully delivered',
        // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    sgMail.send(msg);
}