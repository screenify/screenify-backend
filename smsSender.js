require("dotenv").config();
const SmsService = require("sails-service-sms");
// console.log()
const sendSMS = SmsService("twilio", {
  sender: "+15089805276",
  provider: {
    accountSid: process.env.ACC_SID,
    authToken: process.env.AUTH_TOKEN
  }
});
//uncomment this to send sms
// twillo
//   .send({
//     recipient: ['+21654621974'],
//     message: 'this is for weslati'
//   })
//   .then(res => {
//     console.log(res)
//   })
//   .catch(res => {
//     console.log(res.negotiate)
//   });
module.exports = { sendSMS };
