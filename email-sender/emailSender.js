require("dotenv").config();
const send = require("gmail-send")({
  user: process.env.gmail_sender,
  pass: process.env.gmail_password
});

function sendEmail(
  to,
  // username,
  text
) {
  // check the email before before sending
  var msg = {
    to: `${to}`,
    subject: "test messge",
    text: `${text}`,
    html: `
       <div><h1>Hello ADAM</h1><br/>
       <strong><h2>Thanks for the hard effort you give</h2></strong><br/>
       <h5>This is your test meassage :</h5><br/>
       </div>`
  };
  return send(msg);
}
// sendEmail().then(({ result }) => {
//   console.log("message sent", result);
// });
module.exports = {
  sendEmail
};
/*`
       <div><h1>Hello ${username}</h1><br/>
       <strong><h2>Thanks for registering to our website</h2></strong><br/>
       <h5>This is your vertification code :</h5><br/>
       <strong><h1>${code}</h1></strong>
       </div>`
 */
