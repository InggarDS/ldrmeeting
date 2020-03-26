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
        from: 'inggards94@gmail.com',
        to: emailTo,
        subject: 'Welcome to LDR Meeting',
        text: 'That was easy!'
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



