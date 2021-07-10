import axios from 'axios';
import { API_URL, errorAlert, handleErrorMessage } from '@utils/index.js';

/**
 * @param  {String} token
 */
export const getProfile = async token => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const { data } = await axios.get(`${API_URL}/api/user/profile`, config);
    return data.user;
  } catch (err) {
    errorAlert(handleErrorMessage(err));
  }
};

/**
 * @param  {String} token
 * @param  {object} userData
 */
export const updateProfile = async ({ token, ...userData }) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const { data } = await axios.put(
      `${API_URL}/api/user/profile`,
      userData,
      config
    );
    return data.user;
  } catch (err) {
    errorAlert(handleErrorMessage(err));
  }
};

// Get all users
export const getUsers = async () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const { data } = await axios.get(`${API_URL}/api/user`, config);
    return data.users;
  } catch (err) {
    errorAlert(handleErrorMessage(err));
  }
};
