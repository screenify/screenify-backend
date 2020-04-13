require("dotenv").config();
const SmsService = require("sails-service-sms");
const sendSMS = SmsService("twilio", {
  sender: "",
  provider: {
    accountSid: process.env.ACC_SID,
    authToken: process.env.AUTH_TOKEN
  }
});
module.exports = {
  sendSMS
};