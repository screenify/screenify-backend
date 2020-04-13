require("dotenv").config();
const config = require("./config/config"),
  redis = require("./db/index"),
  createCdnUploader = require('./cdn-upload/index.js.js'),
  bodyParser = require("body-parser"),
  express = require("express"),
  cors = require("cors");


/**
 * Express App
 */
let app = express();

/**
 * Disapling x-powered-by message
 */
app.disable('x-powered-by')

/**
 * Handling Cross Origin Source
 */
app.use(cors());

app.use(bodyParser.json({
  limit: '50mb'
}));
app.use(bodyParser.urlencoded({
  extended: false,
}));

app.use(express.json({
  limit: '50mb'
}));
app.use(express.urlencoded({
  limit: '50mb'
}));


app.get("/", (req, res) => {
  res.send("Screenify");
});

/**
 * Upload Api endpoint 
 */
app.use("/api/upload", async (req, res, next) => {
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

/**
 * Uploading function returns the url of the uploaded picture.
 * @param {blob} serializeBlob 
 * @param {string} cdnType 
 */
function upload(serializeBlob, cdnType) {
  return new Promise((resolve, reject) => {
    const bytes = new Uint8Array(serializeBlob.split(','));
    const uploader = createCdnUploader(config, cdnType)
    uploader
      .upload(Buffer.from(bytes))
      .then(url => {
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


/**
 * Server Starter
 */
const PORT = process.env.PORT || 8080

const server = app.listen(PORT, () => {
  console.log("🚀 Connected to port", server.address().port);
  console.log("Press Ctrl + C to stop the server ");
});