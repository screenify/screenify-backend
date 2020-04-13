const CloudinaryUploader = require('./cloudinary-uploader');
const GoogleUploader = require("./google-uploader")

/**
 * CDN selector
 * where it selects the uploading service provider
 */

module.exports = function createCdnUploader(config, type) {
    switch (type) {
        case 'google':
            return new GoogleUploader(config);

        case 'cloudinary':
            return new CloudinaryUploader(config);

        default:
            return null;
    }
}