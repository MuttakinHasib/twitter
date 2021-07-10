import express from 'express';
import { activeUser, register } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', register);
router.post('/active', activeUser);

export default router;
