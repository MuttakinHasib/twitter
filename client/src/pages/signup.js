import { Loader } from '@components/shared';
import { attemptSignup } from '@features/auth/authActions';
import { withAuthRedirect } from '@hoc/withAuthRedirect';
import Head from 'next/head';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

const SignupPage = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.auth);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    dispatch(attemptSignup(data));
  };

  return (
    <div className='min-h-[80vh] flex items-center justify-center'>
      {loading && <Loader />}
      <Head>
        <title>Signup - Twitter</title>
      </Head>
      <div className='max-w-md w-full mx-auto border border-gray-200 p-5 rounded-md'>
        <div className='text-primary'>
          <svg
            viewBox='0 0 24 24'
            aria-hidden='true'
            fill='currentColor'
            className='w-20 h-20 mx-auto'
          >
            <g>
              <path d='M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z'></path>
            </g>
          </svg>
        </div>
        <h1 className='text-2xl font-semibold tracking-wide text-gray-800 my-5'>
          Create your account
        </h1>
        <form className='space-y-5' onSubmit={handleSubmit(onSubmit)}>
          <div className='w-full flex flex-col space-y-2'>
            <label htmlFor='name'>Name</label>
            <input
              id='name'
              type='text'
              required
              className='py-2 px-4 border-2 border-gray-100 focus:border-primary/50 focus:outline-none focus:ring-0'
              placeholder="What's your name?"
              {...register('name', { required: true })}
            />
          </div>
          <div className='w-full flex flex-col space-y-2'>
            <label htmlFor='email'>Email</label>
            <input
              id='email'
              type='email'
              required
              className='py-2 px-4 border-2 border-gray-100 focus:border-primary/50 focus:outline-none focus:ring-0'
              placeholder="What's your email"
              {...register('email', { required: true })}
            />
          </div>
          <div className='w-full flex flex-col space-y-2'>
            <label htmlFor='password'>Password</label>
            <input
              id='password'
              type='password'
              required
              className='py-2 px-4 border-2 border-gray-100 focus:border-primary/50 focus:outline-none focus:ring-0'
              placeholder='Password'
              {...register('password', {
                required: true,
                minLength: 6,
              })}
            />
            {errors.password && (
              <span className='text-sm text-red-500'>
                Password must be at least 6 characters
              </span>
            )}
          </div>
          <div className='w-full flex flex-col space-y-2'>
            <label htmlFor='birthday'>Date of birth</label>
            <input
              id='birthday'
              type='date'
              required
              className='py-2 px-4 border-2 border-gray-100 focus:border-primary/50 focus:outline-none focus:ring-0'
              {...register('birthday', { required: true })}
            />
          </div>
          <button
            type='submit'
            className='border border-primary py-2 px-10 text-center bg-primary text-white rounded-md hover:bg-primary/90 transition duration-300'
          >
            Sign up
          </button>
        </form>
        <div className='mt-5'>
          <p className='text-sm text-gray-600'>
            Already have an account?{' '}
            <Link href='/login'>
              <a className='text-primary hover:underline'>Login here</a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default withAuthRedirect(SignupPage);
