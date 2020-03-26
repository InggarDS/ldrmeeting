require('dotenv').config

const nodemail = require('nodemailer')

var transporter = nodemail.createTransport({
    service: 'gmail',
    auth: {
      user: 'ldrmcc88@gmail.com',
      pass: 'ldr12345678'
    }
  });

function sendEmail(emailTo) {

      var msg = {
        from: 'ldrmcc88@gmail.com',
        to: emailTo,
        subject: 'Welcome to LDR Meeting',
        text: 'Thank you for signing up !!!'
      };
      
      transporter.sendMail(msg, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

}

module.exports = sendEmail;



