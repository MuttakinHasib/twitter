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

// Get all tweet
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

// Delete tweet by id
export const deleteTweet = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const tweet = await Tweet.findById(id);
  
  if (String(req.user._id) === String(tweet.user)) {
    const deleted = await tweet.remove();
    if (deleted) {
      res.status(200).json({ message: 'Tweet deleted successfully' });
    } else {
      res.status(400);
      throw new Error('Something went wrong');
    }
  } else {
    res.status(401);
    throw new Error('Not authorize to delete this post');
  }
});
