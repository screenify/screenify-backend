require("dotenv").config();
const config = require("./config/config")
const multer = require('multer')

// const imageUploader = require("./cdn-uploader/imageUploader");
// const {
//   sendSMS
// } = require("./sms-sender/smsSender");
// const {
//   sendEmail
// } = require("./email-sended/emailSender");

const createCdnUploader = require('./CdnUploader/index.js');
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
// const auth = require("./is-auth");
var app = express();
app.disable('x-powered-by')
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));


const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
})
app.use(multerMid.single('file'))

// app.use(auth);


app.get("/", (req, res) => {
  res.send("Screenify");
});


app.use("/api/images", async (req, res, next) => {
  // TODO:COMPLETE
  const {
    file,
  } = req
  try {
    const imageUrl = await upload(file, "google")
    res
      .status(200)
      .json({
        message: "Upload was successful",
        data: imageUrl
      })
  } catch (error) {
    next(error)
  }
});

function upload(file, cdnType = "google") {
  return new Promise((resolve, reject) => {
    const {
      buffer
    } = file
    // TODO: complete
    const uploader = createCdnUploader(config, cdnType)
    uploader
      .upload(buffer)
      .then(url => {
        // TODO: added the url to reddis database:
        resolve(url)
      })
      .catch(e => {
        // cdn upload fail
        try {
          upload(buffer, cdnType == "google" ? "cloudinary" : "google")
        } catch (err) {
          if (err) reject(err)
        }
      });
  })
}





app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});















app.post("/sms", (req, res) => {
  const {
    reciever,
    text
  } = req.body;
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
      res.json({
        success: true,
        result
      }).status(301);
    })
    .catch(err => {
      console.log(err.negotiate);
      res.json({
        success: false,
        message: err.negotiate
      });
    });
});

app.post("/mail", (req, res) => {
  console.log(req.body);
  const {
    email,
    text
  } = req.body;
  sendEmail(email, text)
    .then(({
      result
    }) => {
      console.log("message sent", result);
      res.json({
        success: true,
        result
      });
    })
    .catch(err => {
      console.log(err);
      res.json({
        success: false,
        message: err
      });
    });
});

const server = app.listen(process.env.PORT, () => {
  console.log("🚀 Connected to port", server.address().port);
  console.log("Press Ctrl + C to stop the server ");
});