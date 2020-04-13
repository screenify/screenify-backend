require("dotenv").config();
const config = require("./config/config")
const multer = require('multer')
const redis = require("./db/index")
// const imageUploader = require("./cdn-uploader/imageUploader");
// const {
//   sendSMS
// } = require("./sms-sender/smsSender");
// const {
//   sendEmail
// } = require("./email-sended/emailSender");

const createCdnUploader = require('./cdnUploader/index.js');
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
// const auth = require("./is-auth");
var app = express();
app.disable('x-powered-by')
app.use(cors());
app.use(bodyParser.json({
  limit: '50mb'
}));
app.use(bodyParser.urlencoded({
  // HERE
  // changed to True
  extended: false,
  limit: '50mb'
}));

app.use(express.json({
  limit: '50mb'
}));
app.use(express.urlencoded({
  limit: '50mb'
}));
// const multerMid = multer({
//   storage: multer.memoryStorage(),
//   limits: {
//     fileSize: 5 * 1024 * 1024,
//   },
// })
// app.use(multerMid.single('file'))

// app.use(auth);


app.get("/", (req, res) => {
  res.send("Screenify");
});


app.use("/api/upload", async (req, res, next) => {
  // TODO:COMPLETE
  const {
    buffer
  } = req.body;
  try {
    const imageUrl = await upload(buffer, "google")
    res
      .status(200)
      .json({
        success: true,
        url: imageUrl
      })
  } catch (error) {
    next(error)
  }
});

function upload(serializeBlob, cdnType) {
  return new Promise((resolve, reject) => {
    const bytes = new Uint8Array(serializeBlob.split(','));
    const uploader = createCdnUploader(config, cdnType)
    uploader
      .upload(Buffer.from(bytes))
      .then(url => {
        // TODO: added the url to reddis database:
        redis.create({
          url: url,
          cdnType: cdnType,
          createdAt: new Date()
        })
        resolve(url)
      })
      .catch(e => {
        try {
          upload(buffer, cdnType == "google" ? "cloudinary" : "google")
        } catch (err) {
          reject(e)
        }
      });
  })
}


app.use(function (err, req, res, next) {
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
const PORT = 8080;
const HOST = '0.0.0.0';

const server = app.listen(
  // process.env.PORT, 
  PORT HOST,
  () => {
    console.log("🚀 Connected to port", server.address().port);
    console.log("Press Ctrl + C to stop the server ");
  });