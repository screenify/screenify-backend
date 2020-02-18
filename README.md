![CircleCI](https://img.shields.io/circleci/build/github/AdamMomen/blocks-backend/master)

# Utility Services 🏢🏗️

## Email Service 📧

To use the email service :

### API End Point 📡

`POST` `/api/email`

### Email Example Request

```json
{
  "email": "test@test.com",
  "text": "Hello World"
}
```

## SMS Service 📧

### API End Point 📡

Usage :

`POST` `/api/sms`

### SMS Example Request

```json
{
  "receiver": "+21856481323",
  "text": "Hello World"
}
```

## Image Uploader Service 🖼️

### API End Point 📡

Usage :

`POST` `/api/sms`

### Image Uploading Example Request

```json
{
  "file": "catImage.png"
}
```

### Allowed Image formats

```js
let options = {
  allowedFormats: ["jpg", "jpeg", "png"]
};
```