const { sendMail } = require("./email");

exports.sendVerificationMail = async(password, receiver_email) => {

    const email_body = `Dear user, please login to your account. The password is ${password} . The dashboard link ${process.env.FRONTEND_SERVER_URL}/scrutiny `;

    try {
        await sendMail(receiver_email, 'Verification for Buet Job Portal Scrutiny', email_body);
        return true;
    } catch (err) {
        return false;
    }
}

exports.verificationSuccessEmail = (receiver_email) => {

    const email_body = 'Your account is verified!';
    try {
        sendMail(receiver_email, 'Verification Successful!!!', email_body);
        return true;
    } catch (err) {
        return false;
    }
}

exports.forgotPasswordEmail = (code, receiver_email) => {}