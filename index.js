require("dotenv").config();
const imageUploader = require("./imageUploader");
const { sendSMS } = require("./smsSender");
const { sendEmail } = require("./emailSender");
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.listen(process.env.PORT, () => {
  console.log("listening on port", process.env.PORT);
});
app.get("/", (req, res) => {
  res.send("HELLO THIS IS THE BLOCKS UTILIY END POINT");
});
app.post("/sms", (req, res) => {
  const { reciever, text } = req.body;
  console.log(reciever, text);
  sendSMS
    .send({
      recipient: [reciever],
      //   ["+21654621974"],
      message: text
    })
    .then(result => {
      console.log(result);
      res.json({ success: true, result }).status(301);
    })
    .catch(err => {
      console.log(err.negotiate);
      res.json({ success: false, message: err.negotiate });
    });
});

app.post("/mail", (req, res) => {
  console.log(req.body);
  const { email, text } = req.body;
  sendEmail(email, text)
    .then(({ result }) => {
      console.log("message sent", result);
      res.json({ success: true, result });
    })
    .catch(err => {
      console.log(err);
      res.json({ success: false, message: err });
    });
});
// app.post("/image", (req, res, res) => {
//   console.log(req.body);
//   const { email, text } = req.body;
//   sendEmail(email, text)
//     .then(({ result }) => {
//       console.log("message sent", result);
//       res.json({ success: true, result });
//     })
//     .catch(err => {
//       console.log(err);
//       res.json({ success: false, message: err });
//     });
// });
