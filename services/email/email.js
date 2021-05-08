const nodemailer = require('nodemailer')
exports.sendMail = (RECEIVER_EMAIL, subject, body, links) => {
    let mailConfig;
    const SENDER_EMAIL = "sairayeasminsa@gmail.com";
    // if (process.env.NODE_ENV === 'DEV') {

    // testing with gmail account

    mailConfig = {
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: SENDER_EMAIL,
            pass: ""
        }
    };
    // } else {
    //     // all emails are catched by yourdomain
    //     mailConfig = {
    //         host: 'smtp.yourdomain.email',
    //         port: 587,
    //         auth: {
    //             user: 'mail_id',
    //             pass: 'mail_pass'
    //         }
    //     };
    // }

    const transporter = nodemailer.createTransport(mailConfig);

    transporter.sendMail({
        from: SENDER_EMAIL,
        to: "sairayeasminsa@gmail.com",
        subject: subject,
        text: body
    }, (err, info) => {
        if (info)
            console.log('Successful!!!');
        if (err)
            console.log(err)
    })
}