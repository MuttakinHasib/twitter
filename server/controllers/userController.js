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
  const { name, email, password, birthday } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const activationToken = generateActivationToken({
    name,
    email,
    password,
    birthday,
  });
  const url = `${process.env.CLIENT_URL}/activation/${activationToken}`;
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

  const { name, email, password, birthday } = decode;

  // Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({ error: 'User already exists' });
  }

  // Create new user
  const user = await User.create({ name, email, password, birthday });

  if (user) {
    res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        birthday: user.birthday,
        joined: user.joined,
        following: user.following,
        followers: user.followers,
        token: generateIdToken(user._id),
      },
      message: `Your account has been successfully activated!`,
    });
  }
});

// User Login

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  if (user && (await user.matchPassword(password))) {
    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        birthday: user.birthday,
        joined: user.joined,
        following: user.following,
        followers: user.followers,
        token: generateIdToken(user._id),
      },
      message: `Welcome back ${user.name}!`,
    });
  } else {
    res.status(401);
    throw new Error('Password is incorrect');
  }
});

// Get User Profile
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        birthday: user.birthday,
        joined: user.joined,
        following: user.following,
        followers: user.followers,
        token: generateIdToken(user._id),
      },
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// Get user by ID
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        birthday: user.birthday,
        joined: user.joined,
        following: user.following,
        followers: user.followers,
        token: generateIdToken(user._id),
      },
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// Get all user
export const getUsers = asyncHandler(async (_req, res) => {
  const users = await User.find({}).select('-password');

  if (users) {
    res.json({ users });
  }
});

export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  console.log(req.body);
  if (user) {
    user.name = req.body.name || user.name;
    user.birthday = req.body.birthday || user.birthday;
    if (req.body.avatar) {
      user.avatar = req.body.avatar;
    }
    if (req.body.newPassword) {
      if (await user.matchPassword(req.body.password)) {
        user.password = req.body.newPassword;
      } else {
        res.status(400);
        throw new Error('Current password is incorrect');
      }
    }

    const updateUser = await user.save();

    res.json({
      user: {
        _id: updateUser._id,
        name: updateUser.name,
        email: updateUser.email,
        avatar: updateUser.avatar,
        birthday: updateUser.birthday,
        joined: updateUser.joined,
        following: updateUser.following,
        followers: updateUser.followers,
        token: generateIdToken(updateUser._id),
      },
      message: 'Updated successfully',
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// Follow user

export const followUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user._id, {
    $addToSet: { following: req.body.id },
  });
  const user_2 = await User.findByIdAndUpdate(req.body.id, {
    $addToSet: { followers: req.user._id },
  });

  const following = await user.save();
  const followers = await user_2.save();

  if (following && followers) {
    res.json({ message: 'Following' });
  }
});

// Unfollow user

export const unFollowUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const user = await User.findByIdAndUpdate(req.user._id, {
    $pull: { following: req.body.id },
  });
  const user_2 = await User.findByIdAndUpdate(req.body.id, {
    $pull: { followers: req.user._id },
  });

  const following = await user.save();
  const followers = await user_2.save();

  if (following && followers) {
    res.json({ message: 'Unfollow' });
  }
});
