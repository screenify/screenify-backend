require("dotenv").config();

/**
 * Enfironment Varibales Config Interface
 */
module.exports = config = {
  googleProjectId: process.env.GOOGLE_PROJECT_ID,
  googleBucketName: process.env.GOOGLE_BUCKET_NAME,
};
