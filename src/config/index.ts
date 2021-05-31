import dotenv from "dotenv";
dotenv.config();

/**
 * Enfironment Varibales Config Interface
 */
export default {
  port: parseInt(process.env["PORT"] || "8000"),
  storage: {
    googleProjectId: process.env["GOOGLE_PROJECT_ID"] || "",
    googleBucketName: process.env["GOOGLE_BUCKET_NAME"] || "",
  },
};
