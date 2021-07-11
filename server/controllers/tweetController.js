import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import Tweet from '../models/Tweet.js';
import User from '../models/User.js';

// Compose New tweet
export const composeTweet = asyncHandler(async (req, res) => {
  const tweet = await new Tweet({
    user: req.user._id,
    ...req.body,
  });

  await tweet.save();

  if (tweet) {
    res.status(201).json({ message: 'Tweeted successfully' });
  } else {
    res.status(400);
    throw new Error('Something went wrong');
  }
});

// Compose New tweet
export const getTweets = asyncHandler(async (req, res) => {
  const { following } = await User.findById(req.user._id).select('following');
  const tweets = await Tweet.find({
    user: { $in: [req.user._id, ...following] },
  })
    .sort([['_id', 'desc']])
    .populate('user', '-password');

  if (tweets) {
    res.status(201).json({ tweets });
  }
});
