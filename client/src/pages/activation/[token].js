import { attemptActivation } from '@features/auth/authActions';
import { withAuthRedirect } from '@hoc/withAuthRedirect';
import { useRouter } from 'next/dist/client/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const AccountActivationPage = () => {
  const dispatch = useDispatch();
  const { query, push } = useRouter();
  const { token } = query;

  useEffect(() => {
    if (token) {
      dispatch(attemptActivation(token));
      push('/');
    }
  }, [token]);

  return null;
};

export default withAuthRedirect(AccountActivationPage);
