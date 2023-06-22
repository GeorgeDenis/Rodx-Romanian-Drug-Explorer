require("dotenv").config();
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const sharp = require("sharp");
const crypto = require("crypto");
const randomName = (bytes = 32) => crypto.randomBytes(bytes).toString("hex");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
let s3 = new S3Client({
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});
async function uploadImage(file) {
  if (file != null) {
    const buffer = await sharp(file.buffer)
      .resize({ height: 600, width: 600, fit: "cover" })
      .toBuffer();

    const imageName = randomName();

    const input = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: imageName,
      Body: buffer,
      ContentType: file.mimetype,
    };
    try {
      await s3.send(new PutObjectCommand(input));
      return imageName;
    } catch (err) {
      throw new Error(err);
    }
  } else {
    return null;
  }
}
async function getFile(fileName) {
  if (fileName != null) {
    const input = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
    };
    const command = new GetObjectCommand(input);
    try {
      const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
      return url;
    } catch (err) {
      throw new Error(err);
    }
  } else {
    return "";
  }
}
async function deleteImage(fileName) {
  if (fileName != null) {
    const input = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
    };
    try {
      await s3.send(new DeleteObjectCommand(input));
      return true;
    } catch (err) {
      throw new Error(err);
    }
  } else {
    return false;
  }
}
module.exports = { uploadImage, getFile, deleteImage };
