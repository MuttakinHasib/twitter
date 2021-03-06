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
  const { skip } = req.query;
  const pageSize = 10;
  const count = await Tweet.estimatedDocumentCount();

  const { following } = await User.findById(req.user._id).select('following');
  const tweets = await Tweet.find({
    user: { $in: [req.user._id, ...following] },
  })
    .sort([['_id', 'desc']])
    .populate('user', '-password')
    .limit(pageSize)
    .skip(Number(skip));

  if (tweets) {
    res
      .status(200)
      .json({ tweets, pages: count, hasMore: count > Number(skip) + 1 });
  } else {
    res.status(404);
    throw new Error('Tweets not found');
  }
});

// GET user tweets by user id
export const getUserTweets = asyncHandler(async (req, res) => {
  const { skip } = req.query;
  const pageSize = 10;
  const count = await Tweet.countDocuments({ user: req.params.id });

  const tweets = await Tweet.find({ user: req.params.id })
    .sort([['_id', 'desc']])
    .populate('user')
    .limit(pageSize)
    .skip(Number(skip));

  if (tweets) {
    res
      .status(200)
      .json({ tweets, pages: count, hasMore: count > Number(skip) + 1 });
  } else {
    res.status(404);
    throw new Error('Tweets not found');
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

// Like tweet

export const likeTweet = asyncHandler(async (req, res) => {
  const tweet = await Tweet.findByIdAndUpdate(req.body.id, {
    $addToSet: { likes: req.user._id },
  });
  const liked = await tweet.save();

  if (liked) {
    res.json({ message: 'Liked' });
  } else {
    res.status(400);
    throw new Error('Something went wrong');
  }
});

// Unfollow user

export const unlikeTweet = asyncHandler(async (req, res) => {
  const tweet = await Tweet.findByIdAndUpdate(req.body.id, {
    $pull: { likes: req.user._id },
  });

  const unLiked = await tweet.save();

  if (unLiked) {
    res.json({ message: 'Unliked' });
  } else {
    res.status(400);
    throw new Error('Something went wrong');
  }
});
