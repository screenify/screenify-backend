const config = require("./config/config"),
  createCdnUploader = require("./cdn-upload/index.js"),
  bodyParser = require("body-parser"),
  express = require("express"),
  cors = require("cors");

/**
 * Express App
 */
let app = express();

/**
 * Middleware for disapling x - powered - by message
 */
app.disable("x-powered-by");

/**
 * Cross Origin Sources middleware
 */
app.use(cors());

/**
 * Bodyparser middleware image buffer size to 50mb limit
 */
app.use(
  bodyParser.json({
    limit: "50mb",
  })
);

/**
 * Bodyparser middleware urlencoded not extended
 */
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

/**
 * @GET
 * static Api endpoint
 */
app.get("/", (_, res) => {
  //TODO: Add beter interface to show case screenify
  res.send("Screenify");
});

/**
 * @POST
 * /upload Api endpoint
 */
app.use("/api/upload", async (req, res, next) => {
  const { buffer } = req.body;
  try {
    const imageUrl = await upload(buffer, "google");
    res.status(200).json({
      success: true,
      url: imageUrl,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * Uploading function returns the url of the uploaded picture.
 * @param {blob} serializeBlob
 * @param {string} cdnType
 */
function upload(serializeBlob, cdnType) {
  return new Promise((resolve, reject) => {
    const bytes = serializeBlob; // new Uint8Array(serializeBlob.split(","));
    const uploader = createCdnUploader(config, cdnType);
    uploader
      .upload(
        // Buffer.from(
        bytes
        // )
      )

      .then((url) => {
        resolve(url);
      })
      .catch((e) => {
        try {
          upload(buffer, "google");
        } catch (err) {
          reject(e);
        }
      });
  });
}

/**
 * Error Handler middleware
 */
app.use(function (err, req, res) {
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

/**
 * Server Starter 🚀
 */
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  console.log("🚀 Connected to port", server.address().port);
  console.log("Press Ctrl + C to stop the server ");
});
