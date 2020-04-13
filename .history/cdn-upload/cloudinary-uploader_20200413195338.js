const cloudinary = require("cloudinary")

/**
 * Cloudinary Image Uploader
 * Where image is being uploaded to cloudinary cloud bucket.
 */
module.exports = class CloudinaryUploader {
    constructor(config) {
        let cloudName = config['cloudinaryName'] || '';
        let key = config['cloudinaryApiKey'] || '';
        let secret = config['cloudinarySecret'] || '';

        cloudinary.config({
            cloud_name: cloudName,
            api_key: key,
            api_secret: secret,
        });
    }

    /**
     * Uploads the image to cloudinary hosting
     * @param {Buffer} buffer 
     * @returns {Promise}
     */
    upload(buffer) {
        return new Promise((resolve, reject) => {
            let content = buffer.toString('base64');

            try {
                cloudinary.v2.uploader.upload(`data:image/png;base64,${content}`, {
                    fetch_format: 'auto',
                    quality: 'auto'
                }, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result.secure_url);
                    }
                });
            } catch (e) {
                reject(e)
            }
        });
    }
}