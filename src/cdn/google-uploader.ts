import { Storage } from "@google-cloud/storage";
import path from "path";
const serviceKey = path.join(__dirname, "../../service-account.json");
import randomstring from "randomstring";
import { format } from "util";
import config from "../config";

class GoogleUploader {
  static storage: Storage = new Storage({
    keyFilename: serviceKey,
    projectId: config.storage.googleProjectId,
  });

  static bucketName: string = config.storage.googleBucketName || "";

  constructor() {}
  /**
   *
   * @param { buffer } buffer image data buffer
   * @description - This function does the following
   * - It uploads a file to the image bucket on Google Cloud
   * - It accepts a buffer as an argument
   */
  static async upload(buffer: Buffer) {
    const bucket = this.storage.bucket(this.bucketName);

    return new Promise((resolve, reject) => {
      // generates a random filename
      console.log("bucket name : ");

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
          console.log("publicUrl", publicUrl);
          resolve(publicUrl);
        })
        .on("error", (error) => {
          console.error("error ", error);
          reject(error.message);
        })
        .end(buffer);
    });
  }
}
export default GoogleUploader;
