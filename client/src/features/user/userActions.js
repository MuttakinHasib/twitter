import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  API_URL,
  errorAlert,
  handleErrorMessage,
  successAlert,
} from '@utils/index';
import { updateAuthUser } from '@features/auth/authSlice';
import { client } from 'pages/_app';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const attemptPasswordResetRequest = createAsyncThunk(
  'user/attemptPasswordResetRequest',
  async email => {
    try {
      const { data } = await axios.post(
        `${API_URL}/api/user/forget-password`,
        email,
        config
      );
      successAlert(data.message);
    } catch (err) {
      errorAlert(handleErrorMessage(err));
      return handleErrorMessage(err);
    }
  }
);

export const attemptChangePassword = createAsyncThunk(
  'user/attemptChangePassword',
  async formData => {
    try {
      const { data } = await axios.post(
        `${API_URL}/api/user/change-password`,
        formData,
        config
      );
      successAlert(data.message);
    } catch (err) {
      errorAlert(handleErrorMessage(err));
      return handleErrorMessage(err);
    }
  }
);

export const attemptUpdateProfile = createAsyncThunk(
  'user/attemptUpdateProfile',
  async (updatedData, { dispatch, getState }) => {
    try {
      const { user } = getState().auth;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        `${API_URL}/api/user/profile`,
        updatedData,
        config
      );
      errorAlert(data.error);
      successAlert(data.message);
      dispatch(updateAuthUser(data.user));
      client.invalidateQueries('profile');
      return data;
    } catch (err) {
      errorAlert(handleErrorMessage(err));
      return handleErrorMessage(err);
    }
  }
);
