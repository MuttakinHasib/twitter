import express from 'express';
import { activeUser, login, register } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/active', activeUser);

export default router;
