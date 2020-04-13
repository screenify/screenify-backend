const cloudinary = require("cloudinary")

module.exports = class CloudinaryUploader {
    constructor(config) {
        let cloudName = config['cloudinaryName'] || '';
        let key = config['cloudinaryApiKey'] || '';
        let secret = config['cloudinarySecret'] || '';
        let folder = config['cloudinaryFolder'] || '';

        cloudinary.config({
            cloud_name: cloudName,
            api_key: key,
            api_secret: secret,
            // folder: folder,
            // transformation: [{
            //     width: 1024,
            //     height: 1024,
            // }]
        });
    }
    upload(buffer) {
        return new Promise((resolve, reject) => {
            let content = buffer.toString('base64');

            try {
                cloudinary.v2.uploader.upload(`data:image/png;base64,${content}`, {
                    // folder: '/screenfiy/',
                    fetch_format: 'auto',
                    quality: 'auto'
                }, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        console.log(result);
                        resolve(result.secure_url);
                    }
                });
            } catch (e) {
                reject(e)
            }
        });
    }
}