import cloudinary from "cloudinary";
import dotenv from "dotenv";
import streamifier from "streamifier";

dotenv.config();

cloudinary.v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

/**
 * Upload file to Cloudinary (supports Multer memoryStorage)
 */
export const uploadToCloud = async (file) => {
  if (!file) return null;

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "Congozi Images",
        use_filename: true,
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          reject(new Error("Failed to upload to Cloudinary"));
        } else {
          resolve(result);
        }
      }
    );

    // Send buffer to Cloudinary
    streamifier.createReadStream(file.buffer).pipe(uploadStream);
  });
};
