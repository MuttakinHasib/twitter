import Link from 'next/link';
import { likeTweet, unlikeTweet } from '@utils/api';
import { useMutation, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const UserPostCard = ({ tweet }) => {
  const client = useQueryClient();
  const {
    user: { _id, token },
  } = useSelector(state => state.auth);

  const { mutateAsync: attemptLikeTweet } = useMutation(likeTweet);
  const { mutateAsync: attemptUnlikeTweet } = useMutation(unlikeTweet);

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
          </div>
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

export default UserPostCard;
