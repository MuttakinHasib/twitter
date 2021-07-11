import express from 'express';
import { composeTweet, getTweets } from '../controllers/tweetController.js';
import { protect } from '../middlewares/protect.js';

const router = express.Router();

router.route('/').get(protect, getTweets).post(protect, composeTweet);

export default router;
