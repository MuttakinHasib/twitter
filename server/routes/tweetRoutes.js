import express from 'express';
import {
  composeTweet,
  deleteTweet,
  getTweets,
} from '../controllers/tweetController.js';
import { protect } from '../middlewares/protect.js';

const router = express.Router();

router.route('/').get(protect, getTweets).post(protect, composeTweet);
router.route('/:id').delete(protect, deleteTweet);

export default router;
