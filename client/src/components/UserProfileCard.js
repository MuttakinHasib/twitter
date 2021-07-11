import Moment from 'react-moment';

const UserProfileCard = ({ tweets, user }) => {
  return (
    <div className='border border-gray-200 py-5 px-10 mt-5'>
      <div className='flex items-center justify-between mb-5'>
        <div className='flex items-end gap-5 flex-wrap'>
          <div className='relative w-28 h-28 rounded-full group overflow-hidden transition duration-300'>
            <img
              src={user?.avatar}
              alt=''
              className='w-full h-full object-cover block'
            />
          </div>
          <div className='space-y-3'>
            <h3 className='text-xl text-gray-800 font-medium'>{user?.name}</h3>
            <a
              href={`mailto:${user?.email}`}
              className='text-lg text-gray-700 font-light hover:underline'
            >
              {user?.email}
            </a>
          </div>
        </div>
      </div>
      <div className='flex items-center gap-5 flex-wrap'>
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
            Joined <Moment fromNow>{user?.joined}</Moment>
          </p>
        </div>
        <h5 className='text-base text-gray-600'>
          <strong>{user?.following?.length}</strong> Following
        </h5>
        <h5 className='text-base text-gray-600'>
          <strong>{user?.followers?.length}</strong> Followers
        </h5>
        <h5 className='text-base text-gray-600'>
          <strong>{tweets}</strong> Tweets
        </h5>
      </div>
    </div>
  );
};

export default UserProfileCard;
