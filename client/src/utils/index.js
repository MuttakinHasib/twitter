import toast from 'react-hot-toast';

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Handle Error messages
export const handleErrorMessage = err =>
  err.response && (err.response.data.message || err.response.data.error)
    ? err.response.data.message || err.response.data.error
    : err.message || err.error;
// Success Alert
export const successAlert = message => message && toast.success(message);
// Error Alert
export const errorAlert = error => error && toast.error(error);
