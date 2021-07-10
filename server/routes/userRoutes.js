import express from 'express';
import {
  activeUser,
  getUserProfile,
  getUsers,
  login,
  register,
  updateUserProfile,
} from '../controllers/userController.js';
import { protect } from '../middlewares/protect.js';

const router = express.Router();

router.get('/', getUsers);
router.post('/register', register);
router.post('/login', login);
router.post('/active', activeUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
