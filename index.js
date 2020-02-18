require("dotenv").config();
const imageUploader = require("./imageUploader");
const { sendSMS } = require("./smsSender");
const { sendEmail } = require("./emailSender");
const bodyParser = require("body-parser");
const express = require("express");
const { parser } = require("./imageUploader");
const cors = require("cors");
var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const auth = require("./is-auth");
app.use(auth);
const server = app.listen(process.env.PORT, () => {
  console.log("🚀 Connected to port", server.address().port);
  console.log("Press Ctrl + C to stop the server ");
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
      c;
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
app.use("/api/images", parser.single("file"), (req, res) => {
  const image = {};
  image.url = req.file.url;
  image.id = req.file.public_id;
  res.json({
    image
  });
});
app.use(function(err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
