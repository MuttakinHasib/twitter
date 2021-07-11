import axios from 'axios';
import {
  API_URL,
  errorAlert,
  handleErrorMessage,
  successAlert,
} from '@utils/index.js';

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

/**
 * @param  {String} {token
 * @param  {String} userId}
 * @description follow user
 */
export const followUser = async ({ token, id }) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const { data } = await axios.put(
      `${API_URL}/api/user/follow`,
      { id },
      config
    );
    successAlert(data.message);
  } catch (err) {
    errorAlert(handleErrorMessage(err));
  }
};

/**
 * @param  {String} {token
 * @param  {String} id}
 * @description unfollow user
 */
export const unFollowUser = async ({ token, id }) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const { data } = await axios.post(
      `${API_URL}/api/user/unfollow`,
      { id },
      config
    );
    successAlert(data.message);
  } catch (err) {
    errorAlert(handleErrorMessage(err));
  }
};
