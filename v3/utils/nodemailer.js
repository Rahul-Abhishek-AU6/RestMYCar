const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    //secure: true,
    auth: {
        type: 'OAuth2',
        user: process.env.GMAIL,
        pass: process.env.PASSWORD
    }
})
transport.verify().then((res) => console.log(res))



function sendMailToUser(user, email, activationToken){
    transport.sendMail({
        from:process.env.GMAIL,
        to: email,
        subject: 'Email verification required for authenticating your Registration on rentMeCar.com',
        html: `Click on this link to activate your account on <b>Rent Me Car</b> https://rentmecar.heroku.com/api/accountactivation/${activationToken}?user=${user}`,
    }).then((response)=> {
        console.log(response);
    }).catch((err)=> console.log(err.message))
}

// isAccepterMailToOwner

// isAccepterMailToCustomer

// Forgotpassword

module.exports = {sendMailToUser};