import express from 'express';
import {
  activeUser,
  followUser,
  getUserById,
  getUserProfile,
  getUsers,
  login,
  register,
  unFollowUser,
  updateUserProfile,
} from '../controllers/userController.js';
import { protect } from '../middlewares/protect.js';

const router = express.Router();

router.get('/', getUsers);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
  router.post('/register', register);
  router.post('/login', login);
  router.post('/active', activeUser);
  router.route('/follow').put(protect, followUser);
  router.route('/unfollow').post(protect, unFollowUser);
  router.get('/:id', getUserById);
  
export default router;
