const GoogleUploader = require("./google-uploader");

/**
 * CDN selector
 * where it selects the uploading service provider
 */

module.exports = function createCdnUploader(config, type) {
  switch (type) {
    case "google":
      return new GoogleUploader(config);
    default:
      return null;
  }
};
