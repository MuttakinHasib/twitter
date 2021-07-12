import { followUser, unFollowUser } from '@utils/api';
import Link from 'next/link';
import Moment from 'react-moment';
import { useMutation, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';

const ConnectCard = ({ user }) => {
  const client = useQueryClient();
  const {
    user: { _id, token },
  } = useSelector(state => state.auth);
  const following = user.followers.find(id => id === _id);
  const { mutateAsync: follow, isLoading: isFollowing } =
    useMutation(followUser);

  const { mutateAsync: unfollow, isLoading: isUnFollowing } =
    useMutation(unFollowUser);

  const handleFollow = async id => {
    await follow({ token, id });
    await client.invalidateQueries('users');
  };

  const handleUnFollow = async id => {
    await unfollow({ token, id });
    await client.invalidateQueries('users');
  };

  return (
    <div className='px-5 py-6 flex flex-col sm:flex-row flex-wrap gap-3 hover:bg-gray-100 transition duration-300 relative'>
      <img src={user.avatar} alt='' className='w-16 h-16 rounded-full' />
      <div className='flex-1'>
        <div className='flex justify-between'>
          <div>
            <Link href={`/profile/${user._id}`}>
              <a className='text-lg font-medium text-gray-800 hover:underline'>
                {user.name}
              </a>
            </Link>
            <a
              href={`mailto:${user.email}`}
              className='block text-lg text-gray-700 font-light hover:underline'
            >
              {user.email}
            </a>
          </div>
          {user._id !== _id && (
            <>
              {following ? (
                <button
                  className='absolute top-3 right-3 sm:static border-2 border-primary text-white bg-primary py-2 h-11 px-8 rounded-3xl cursor-pointer hover:bg-red-500 hover:border-red-500 transition duration-300'
                  onClick={() => handleUnFollow(user._id)}
                >
                  Following
                </button>
              ) : (
                <button
                  className='absolute top-3 right-3 sm:static border-2 border-primary text-primary bg-white py-2 h-11 px-8 rounded-3xl cursor-pointer hover:bg-primary/10 transition duration-300'
                  onClick={() => handleFollow(user._id)}
                >
                  Follow
                </button>
              )}
            </>
          )}
        </div>
        <div className='flex items-center gap-3 md:gap-5 flex-wrap mt-3'>
          <div className='flex items-center space-x-3'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
              />
            </svg>
            <p className='text-base text-gray-600'>
              Joined <Moment fromNow>{'1999-09-28'}</Moment>
            </p>
          </div>
          <h5 className='text-base text-gray-600'>
            <strong>{user.following.length}</strong> Following
          </h5>
          <h5 className='text-base text-gray-600'>
            <strong>{user.followers.length}</strong> Followers
          </h5>
        </div>
      </div>
    </div>
  );
};

export default ConnectCard;
