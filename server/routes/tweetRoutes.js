import express from 'express';
import {
  composeTweet,
  deleteTweet,
  getTweets,
  getUserTweets,
  likeTweet,
  unlikeTweet,
} from '../controllers/tweetController.js';
import { protect } from '../middlewares/protect.js';

const router = express.Router();

router.route('/').get(protect, getTweets).post(protect, composeTweet);
router.route('/:id').get(protect, getUserTweets).delete(protect, deleteTweet);
router.route('/like').put(protect, likeTweet);
router.route('/unlike').post(protect, unlikeTweet);

export default router;
