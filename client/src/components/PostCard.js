import { Fragment } from 'react';
import Link from 'next/link';
import { Menu, Transition } from '@headlessui/react';
import { deleteTweet, unFollowUser } from '@utils/api';
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

  const handleUnfollow = async id => {
    await attemptUnfollow({ token, id });
    await client.invalidateQueries('users');
    await client.invalidateQueries('tweets');
  };

  const handleDelete = async id => {
    await attemptDeleteTweet({ token, id });
    await client.invalidateQueries('tweets');
  };

  return (
    <div className=' py-5 px-5 md:px-8 flex flex-wrap gap-3 hover:bg-gray-50  transition duration-300'>
      <img
        src={tweet?.user?.avatar}
        alt=''
        className='w-14 h-14 rounded-full'
      />
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
                  </Menu.Items>
                </Transition>
              </>
            )}
          </Menu>
        </div>
        <div className='space-y-5'>
          <p className='text-base text-gray-700'>{tweet?.text}</p>
          {tweet?.image && (
            <div
              className='py-[30%] w-full border-2 rounded-md overflow-hidden bg-center bg-no-repeat bg-cover'
              style={{ backgroundImage: `url(${tweet?.image})` }}
            />
          )}
        </div>
        {/* <div className='flex items-center gap-3 md:gap-5 flex-wrap mt-3'>
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
          <h5 className='text-base text-gray-600'>
            <strong>{user?.tweets?.length}</strong> Tweets
          </h5>
        </div> */}
      </div>
    </div>
  );
};

export default PostCard;
