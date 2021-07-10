import { useDispatch, useSelector } from 'react-redux';

const PostCard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  return (
    <div className='border border-gray-200 py-5 px-5 md:px-10 mt-5'>
      <div className='flex gap-5 flex-wrap'>
        <div className='w-14 h-14 rounded-[50%] overflow-hidden'>
          <img
            src={user.avatar}
            alt=''
            className='w-full h-full object-cover'
          />
        </div>

        <form className='flex-1'>
          <div>
            <textarea
              className='w-full resize-none focus:ring-0 text-lg border-0 border-b focus:border-gray-100 border-gray-100 mb-5'
              name='tweet'
              rows='2'
              placeholder="What's happing?"
            />
            <div className='flex items-center justify-between flex-wrap gap-3'>
              <label
                htmlFor='image'
                className='group cursor-pointer w-10 h-10 rounded-full border border-gray-100 hover:bg-gray-100 flex items-center justify-center transition duration-300'
                title='media'
              >
                <input type='file' id='image' className='hidden' />
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-7 w-7 text-primary'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={1.5}
                    d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                  />
                </svg>
              </label>
              <input
                type='submit'
                className='text-white bg-primary py-2 px-10 rounded-3xl cursor-pointer hover:bg-primary/90 transition duration-300'
                value='Tweet'
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostCard;
