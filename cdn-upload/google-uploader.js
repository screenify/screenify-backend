const { Storage } = require("@google-cloud/storage");
const path = require("path");
const serviceKey = path.join(__dirname, "./keys.json");
const randomstring = require("randomstring");
const { format } = require("util");

module.exports = class GoogleUploader {
  constructor(config) {
    this.storage = new Storage({
      keyFilename: serviceKey,
      projectId: config["googleProjectId"],
    });
    this.bucketName = config["googleBucketName"];
  }
  /**
   *
   * @param { buffer } buffer image data buffer
   * @description - This function does the following
   * - It uploads a file to the image bucket on Google Cloud
   * - It accepts a buffer as an argument
   */
  upload(buffer) {
    let bucket = this.storage.bucket("screenify_bucket");

    return new Promise((resolve, reject) => {
      // generates a random filename
      const filename = `${randomstring.generate(6)}.png`;
      const blob = bucket.file(filename);
      const blobStream = blob.createWriteStream({
        metadata: {
          contentType: "image/png",
          cacheControl: "public, max-age=6000",
        },
        public: true,
        resumable: false,
      });
      blobStream
        .on("finish", () => {
          const publicUrl = format(
            `https://storage.googleapis.com/${bucket.name}/${blob.name}`
          );
          resolve(publicUrl);
        })
        .on("error", (error) => {
          reject(error.message);
        })
        .end(buffer);
    });
  }
};
