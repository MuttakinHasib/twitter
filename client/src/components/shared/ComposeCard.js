import { composeTweet, deleteTweetImage } from '@utils/api';
import { API_URL, successAlert } from '@utils/index';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Spinner from 'react-loader-spinner';
import { useQueryClient } from 'react-query';
import { useMutation } from 'react-query';
import { useSelector } from 'react-redux';

const ComposeCard = () => {
  const client = useQueryClient();
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState({});
  const { user } = useSelector(state => state.auth);
  const { handleSubmit, register, setValue } = useForm();
  const { mutateAsync, isLoading } = useMutation(composeTweet);

  const handleTweetImage = async e => {
    e.preventDefault();

    const formData = new FormData();
    const file = e.target.files[0];
    formData.append('tweet', file);

    try {
      setUploading(true);
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        `${API_URL}/api/upload/tweet`,
        formData,
        config
      );
      setImage(data);
      setUploading(false);
    } catch (err) {
      setUploading(false);
      console.error(err.message);
    }
  };

  const onSubmit = async data => {
    await mutateAsync({ token: user.token, ...{ ...data, image } });
    await client.invalidateQueries('tweets');
    setImage('');
    setValue('text', '');
  };
  const handleDeleteTweetImage = async () => {
    const message = await deleteTweetImage(user.token, image.public_id);
    if (message) {
      successAlert(message);
    }
    setImage({});
  };
  return (
    <div className='border border-gray-200 py-5 px-5 md:px-8 mt-5'>
      <div className='flex gap-3 flex-wrap'>
        <div className='w-14 h-14 rounded-[50%] overflow-hidden'>
          <img
            src={user?.avatar}
            alt=''
            className='w-full h-full object-cover'
          />
        </div>
        <form className='flex-1' onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className='border-0 border-b focus:border-gray-100 border-gray-100 mb-5'>
              <textarea
                required
                className='w-full max-h-[50vh] border-none resize-none focus:ring-0 text-lg mb-5'
                placeholder="What's happing?"
                {...register('text', { required: true })}
              />
              {image?.url && (
                <div
                  className='relative py-[25%] w-full border-2 rounded-md overflow-hidden bg-center bg-no-repeat bg-cover group transition-all duration-300'
                  style={{ backgroundImage: `url(${image?.url})` }}
                >
                  <div className='absolute inset-0 opacity-0 invisible bg-black/10 group-hover:opacity-100 group-hover:visible transition-all duration-300'></div>
                  <button
                    type='button'
                    className='hidden hover:bg-red-600 border border-red-500 bg-red-500 text-white absolute top-2 left-2 w-12 h-12 rounded-full group-hover:flex items-center justify-center transition-all duration-300'
                    onClick={handleDeleteTweetImage}
                  >
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
                        d='M6 18L18 6M6 6l12 12'
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>
            <div className='flex items-center justify-between flex-wrap gap-3'>
              <label
                htmlFor='tweet'
                className='group relative cursor-pointer w-12 h-12 rounded-full border border-gray-100 hover:bg-gray-100 flex items-center justify-center transition duration-300'
                title='media'
              >
                <div className='absolute inset-0'>
                  {uploading && (
                    <Spinner
                      type='TailSpin'
                      color='#1DA1F2'
                      height={50}
                      width={50}
                    />
                  )}
                </div>
                <input
                  type='file'
                  id='tweet'
                  name='tweet'
                  className='hidden'
                  onChange={handleTweetImage}
                />
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

export default ComposeCard;
