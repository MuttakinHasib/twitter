import fs from 'fs';
import asyncHandler from 'express-async-handler';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const removeTemp = path => {
  fs.unlink(path, err => {
    console.log(err);
  });
};

// Upload Avatar
export const uploadAvatar = asyncHandler(async (req, res) => {
  const file = req.files.avatar;

  const result = await cloudinary.uploader.upload(file.tempFilePath, {
    folder: 'twitter/avatar',
  });

  if (result) {
    removeTemp(file.tempFilePath);
    res.json({ url: result.secure_url });
  } else {
    res.status(400);
    throw new Error('Something went wrong');
  }
});

// Upload Tweet
export const uploadTweet = asyncHandler(async (req, res) => {
  const file = req.files.tweet;

  const result = await cloudinary.uploader.upload(file.tempFilePath, {
    folder: 'twitter/tweets',
  });

  if (result) {
    removeTemp(file.tempFilePath);
    res.json({ public_id: result.public_id, url: result.secure_url });
  } else {
    res.status(400);
    throw new Error('Something went wrong');
  }
});

// Delete tweet image
export const deleteTweetImage = asyncHandler(async (req, res) => {
  const { public_id } = req.body;

  const result = await cloudinary.uploader.destroy(public_id);

  if (result) {
    res.json({ message: 'Image removed' });
  } else {
    res.status(400);
    throw new Error('Something went wrong');
  }
});
