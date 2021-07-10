import { useDispatch, useSelector } from 'react-redux';

const PostCard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  return (
    <div className='border border-t-0 border-gray-200 p-5'>
      <div className='flex gap-5'>
        <img src={user.avatar} alt='' className='w-1 h-20 rounded-full' />
      </div>
    </div>
  );
};

export default PostCard;
