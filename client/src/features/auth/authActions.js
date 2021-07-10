import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  API_URL,
  errorAlert,
  handleErrorMessage,
  successAlert,
} from '@utils/index';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const attemptSignup = createAsyncThunk(
  'auth/attemptSignup',
  async signupData => {
    try {
      const { data } = await axios.post(
        `${API_URL}/api/user/register`,
        signupData,
        config
      );
      errorAlert(data.error);
      successAlert(data.message);
    } catch (err) {
      errorAlert(handleErrorMessage(err));
      return handleErrorMessage(err);
    }
  }
);

export const attemptActivation = createAsyncThunk(
  'auth/attemptActivation',
  async token => {
    try {
      const { data } = await axios.post(
        `${API_URL}/api/user/active`,
        { token },
        config
      );
      successAlert(data.message);
      errorAlert(data.error);
      return data;
    } catch (err) {
      errorAlert(handleErrorMessage(err));
      return handleErrorMessage(err);
    }
  }
);

export const attemptLogin = createAsyncThunk(
  'auth/attemptLogin',
  async loginData => {
    try {
      const { data } = await axios.post(
        `${API_URL}/api/user/login`,
        loginData,
        config
      );
      successAlert(data.message);
      errorAlert(data.error);

      return data;
    } catch (err) {
      errorAlert(handleErrorMessage(err));
      return handleErrorMessage(err);
    }
  }
);
