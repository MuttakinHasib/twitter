import express from 'express';
import { uploadAvatar, uploadTweet } from '../controllers/uploadController.js';
import { protect } from '../middlewares/protect.js';
import { uploader } from '../middlewares/upload.js';

const router = express.Router();

router.route('/avatar').post(protect, uploader, uploadAvatar);
router.route('/tweet').post(protect, uploader, uploadTweet);

export default router;
