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
export const getProfile = async ({ queryKey }) => {
  const [_key, token] = queryKey;

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
 */
export const getUserById = async ({ queryKey }) => {
  const [_key, id] = queryKey;
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    if (id) {
      const { data } = await axios.get(`${API_URL}/api/user/${id}`, config);
      return data.user;
    }
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
export const getUsers = async ({ queryKey }) => {
  const [_key, offset] = queryKey;
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const { data } = await axios.get(
      `${API_URL}/api/user?skip=${offset}`,
      config
    );
    return data;
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

/**
 * @param  {String} {token
 * @param  {object} ...tweetData}
 */
export const composeTweet = async ({ token, ...tweetData }) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const { data } = await axios.post(
      `${API_URL}/api/tweet`,
      { ...tweetData },
      config
    );
    successAlert(data.message);
  } catch (err) {
    errorAlert(handleErrorMessage(err));
  }
};

/**
 * @param  {String} token
 * @description Get All Tweets
 */
export const getTweets = async ({ queryKey }) => {
  const [_key, token, offset] = queryKey;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const { data } = await axios.get(
      `${API_URL}/api/tweet?skip=${offset}`,
      config
    );
    return data;
  } catch (err) {
    errorAlert(handleErrorMessage(err));
  }
};

/**
 * @param  {String} {token
 * @param  {String} id}
 * @description Delete tweet by ID
 */
export const getUserTweets = async ({ queryKey }) => {
  const [_key, id, offset, token] = queryKey;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    if (id) {
      const { data } = await axios.get(
        `${API_URL}/api/tweet/${id}/?skip=${offset}`,
        config
      );
      return data;
    }
  } catch (err) {
    errorAlert(handleErrorMessage(err));
  }
};

/**
 * @param  {String} {token
 * @param  {String} id}
 * @description Delete tweet by ID
 */
export const deleteTweet = async ({ token, id }) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const { data } = await axios.delete(`${API_URL}/api/tweet/${id}`, config);
    successAlert(data.message);
  } catch (err) {
    errorAlert(handleErrorMessage(err));
  }
};

/**
 * @param  {String} {token
 * @param  {String} tweet_id}
 * @description Like tweet
 */
export const likeTweet = async ({ token, id }) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const { data } = await axios.put(
      `${API_URL}/api/tweet/like`,
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
 * @param  {String} tweet_id}
 * @description Unlike tweet
 */
export const unlikeTweet = async ({ token, id }) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const { data } = await axios.post(
      `${API_URL}/api/tweet/unlike`,
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
 * @param  {String} public_id}
 * @description Delete tweet image
 */

export const deleteTweetImage = async (token, public_id) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const { data } = await axios.post(
      `${API_URL}/api/upload/delete`,
      { public_id },
      config
    );
    return data.message;
  } catch (err) {
    errorAlert(handleErrorMessage(err));
  }
};
