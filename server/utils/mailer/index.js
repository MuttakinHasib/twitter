import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import {
  activationTemplate,
  passwordResetTemplate,
} from './templates/index.js';

const { OAuth2 } = google.auth;
const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground';

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN } =
  process.env;

const oauth2Client = new OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REFRESH_TOKEN,
  OAUTH_PLAYGROUND
);

/**
 * @param  {String} name
 * @param  {String} email
 * @param  {String} url
 */

export const sendActivationEmail = (name, email, url) => {
  oauth2Client.setCredentials({
    refresh_token: GOOGLE_REFRESH_TOKEN,
  });

  const accessToken = oauth2Client.getAccessToken();
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.EMAIL_SERVER_USER,
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      refreshToken: GOOGLE_REFRESH_TOKEN,
      accessToken,
    },
  });

  const mailOptions = {
    from: `${process.env.SITE_NAME} < ${process.env.EMAIL_SERVER_USER}>`,
    to: email,
    subject: `Signup to ${process.env.CLIENT_URL}`,
    html: activationTemplate(name, url),
  };
  const result = transporter.sendMail(mailOptions);

  if (!result) {
    throw new Error('Something went wrong');
  }
};

/**
 * @param  {String} email
 * @param  {String} url
 */

export const sendPasswordResetEmail = (email, url) => {
  oauth2Client.setCredentials({
    refresh_token: GOOGLE_REFRESH_TOKEN,
  });

  const accessToken = oauth2Client.getAccessToken();
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.EMAIL_SERVER_USER,
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      refreshToken: GOOGLE_REFRESH_TOKEN,
      accessToken,
    },
  });

  const mailOptions = {
    from: `${process.env.SITE_NAME} < ${process.env.EMAIL_SERVER_USER}>`,
    to: email,
    subject: `Reset your Password for ${process.env.SITE_NAME}`,
    html: passwordResetTemplate(url),
  };

  const result = transporter.sendMail(mailOptions);

  if (!result) {
    throw new Error('Something went wrong');
  }
};
