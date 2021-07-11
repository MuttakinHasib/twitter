import { Fragment } from 'react';
import Link from 'next/link';
import { Menu, Transition } from '@headlessui/react';
import {
  deleteTweet,
  deleteTweetImage,
  likeTweet,
  unFollowUser,
  unlikeTweet,
} from '@utils/api';
import { useMutation, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const PostCard = ({ tweet }) => {
  const client = useQueryClient();
  const {
    user: { _id, token },
  } = useSelector(state => state.auth);
  const { mutateAsync: attemptDeleteTweet } = useMutation(deleteTweet);
  const { mutateAsync: attemptUnfollow } = useMutation(unFollowUser);
  const { mutateAsync: attemptLikeTweet } = useMutation(likeTweet);
  const { mutateAsync: attemptUnlikeTweet } = useMutation(unlikeTweet);

  /**
   * @param  {String} id - User ID
   */
  const handleUnfollow = async id => {
    await attemptUnfollow({ token, id });
    // Refetch users
    await client.invalidateQueries('users');
    // Refetch tweets
    await client.invalidateQueries('tweets');
  };

  /**
   * @param  {String} id - tweet ID
   */
  const handleDelete = async id => {
    await attemptDeleteTweet({ token, id });
    await client.invalidateQueries('tweets');
    // Also delete tweet image
    await deleteTweetImage(token, tweet.image.public_id);
  };

  /**
   * @param  {String} id - tweet ID
   */
  const handleLike = async id => {
    await attemptLikeTweet({ token, id });
    // Refetch tweets
    await client.invalidateQueries('tweets');
  };

  /**
   * @param  {String} id - tweet ID
   */
  const handleUnlike = async id => {
    await attemptUnlikeTweet({ token, id });
    await client.invalidateQueries('tweets');
  };

  const isLiked = tweet.likes.find(id => id === _id);

  return (
    <div className=' py-5 px-5 md:px-8 flex flex-wrap gap-3 hover:bg-gray-50  transition duration-300'>
      <div className='border-2 border-gray-100 w-14 h-14 rounded-full overflow-hidden'>
        <img
          src={tweet?.user?.avatar}
          alt=''
          className='w-full h-full object-cover'
        />
      </div>
      <div className='flex-1'>
        <div className='flex justify-between'>
          <div>
            <Link href={`/profile/${tweet?.user?._id}`}>
              <a className='text-lg font-medium text-gray-800 hover:underline'>
                {tweet?.user?.name}
              </a>
            </Link>
            {/* <a
              href={`mailto:${tweet?.user?.email}`}
              className='block text-lg text-gray-700 font-light hover:underline'
            >
              {tweet?.user?.email}
            </a> */}
          </div>
          <Menu as='div' className='relative'>
            {({ open }) => (
              <>
                <div>
                  <Menu.Button
                    className='h-11 w-11 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/10 transition duration-300'
                    title='more'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-8 w-8'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={1.5}
                        d='M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z'
                      />
                    </svg>
                  </Menu.Button>
                </div>
                <Transition
                  show={open}
                  as={Fragment}
                  enter='transition ease-out duration-100'
                  enterFrom='transform opacity-0 scale-95'
                  enterTo='transform opacity-100 scale-100'
                  leave='transition ease-in duration-75'
                  leaveFrom='transform opacity-100 scale-100'
                  leaveTo='transform opacity-0 scale-95'
                >
                  <Menu.Items
                    static
                    className='origin-top-right z-50 absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'
                  >
                    {tweet?.user?._id !== _id && (
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href='#'
                            onClick={() => handleUnfollow(tweet?.user?._id)}
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}
                          >
                            Unfollow
                          </a>
                        )}
                      </Menu.Item>
                    )}
                    {tweet?.user?._id === _id && (
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href='#'
                            onClick={() => handleDelete(tweet?._id)}
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-red-700'
                            )}
                          >
                            Delete
                          </a>
                        )}
                      </Menu.Item>
                    )}
                  </Menu.Items>
                </Transition>
              </>
            )}
          </Menu>
        </div>
        <div className='space-y-5'>
          <p className='text-base text-gray-700'>{tweet?.text}</p>
          {tweet?.image?.url && (
            <div
              className='py-[30%] w-full border-2 rounded-md overflow-hidden bg-center bg-no-repeat bg-cover'
              style={{ backgroundImage: `url(${tweet?.image?.url})` }}
            />
          )}
        </div>
        {!isLiked ? (
          <div className='flex items-center gap-3 md:gap-5 flex-wrap mt-3'>
            <button
              className='border border-red-100 w-10 h-10 rounded-full hover:bg-red-200 flex items-center justify-center'
              onClick={() => handleLike(String(tweet?._id))}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6 text-red-600'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={1.5}
                  d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                />
              </svg>
            </button>
            {tweet?.likes?.length > 0 && (
              <span className='text-base text-gray-600'>
                {tweet?.likes?.length > 0 && tweet?.likes?.length}{' '}
                {tweet?.likes?.length > 1 ? 'Likes' : 'Like'}
              </span>
            )}
          </div>
        ) : (
          <div className='flex items-center gap-3 md:gap-5 flex-wrap mt-3'>
            <button
              className='border border-red-100 w-10 h-10 rounded-full hover:bg-red-200 flex items-center justify-center'
              onClick={() => handleUnlike(String(tweet?._id))}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5 text-red-600'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
            {tweet?.likes?.length > 0 && (
              <span className='text-base text-gray-600'>
                {tweet?.likes?.length > 0 && tweet?.likes?.length}{' '}
                {tweet?.likes?.length > 1 ? 'Likes' : 'Like'}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
