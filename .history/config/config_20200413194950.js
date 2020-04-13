require("dotenv").config()


/**
 * Enfironment Varibales Config Interface
 */
module.exports = config = {
    "cloudinaryName": process.env.CLOUDINARY_CLOUD_NAME,
    "cloudinarySecret": process.env.CLOUDINARY_SECRET,
    "cloudinaryApiKey": process.env.CLOUDINARY_API_KEY,
    "cloudinaryFolder": process.env.CLOUDINARY_FOLDER,
    "googleProjectId": process.env.GOOGLE_PROJECT_ID,
    "googleBucketName": process.env.GOOGLE_BUCKET_NAME,
    "dataBase_Url": process.env.DATABASE_URL,
    "dataBase_Pass": process.env.DATABASE_PASS,
}