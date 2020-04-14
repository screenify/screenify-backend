# Screenify Backend 📸⚙️

![CircleCI](https://img.shields.io/circleci/build/github/AdamMomen/blocks-backend/master)

This uploading service built for distributed fail safe system where the host is built for screenify-vscode extension.
<!-- ![Demo](d) -->

## Getting Started

```js
npm install

npm start
```

## CDN Uploader Service 🖼️

Cloud Service providers:

- [x] Google Cloud Storage.
- [x] Cloudinary.
- [ ] AWS.

### API End Point 📡

Usage :

`POST` `/api/upload`

### Image Uploading Example Request

```json
{
  "buffer": "89 82 36 ..."
}
```

Successful Reponse Example:

```json
{
  "success": true,
  "url": "https://storage.googleapis.com/screenify_bucket/RGaipM.png"
}
```
