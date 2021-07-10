import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import { sendActivationEmail } from '../utils/mailer/index.js';
import {
  generateActivationToken,
  generateIdToken,
} from '../utils/token/index.js';

// Register New User

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const activationToken = generateActivationToken({ name, email, password });
  const url = `${process.env.CLIENT_URL}/user/active/${activationToken}`;
  await sendActivationEmail(name, email, url);
  res.json({ message: `Account activation email has sent to ${email}` });
});

// Active User

export const activeUser = asyncHandler(async (req, res) => {
  const { token } = req.body;

  // Decode token
  const decode = jwt.verify(token, process.env.JWT_SECRET);
  // Check if token is not valid
  if (!decode) {
    res.status(401).json({ error: 'Activation token expired' });
  }

  const { name, email, password } = decode;

  // Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({ error: 'User already exists' });
  }

  // Create new user
  const user = await User.create({ name, email, password });

  if (user) {
    res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        token: generateIdToken(user._id),
      },
      message: `Your account has been successfully activated!`,
    });
  }
});
