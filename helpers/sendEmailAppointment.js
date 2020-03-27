require('dotenv').config

const nodemail = require('nodemailer')

var transporter = nodemail.createTransport({
    service: 'gmail',
    auth: {
      user: 'ldrmcc88@gmail.com',
      pass: 'ldr12345678'
    }
  });

function sendAppointment(title, date, time, object) {

    object[0].Users.forEach(el => { 
        console.log(el.email);
        
        var msg = {
            from: 'ldrmcc88@gmail.com',
            to: el.email,
            subject: 'Meeting',
            text: `Topic ${title}\n Time : ${date}, ${time} \n join video conference \n https://linkello.com/xvr3l2EKM`
          };

          transporter.sendMail(msg, (error, info) => {
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
    });
}

module.exports = sendAppointment;



