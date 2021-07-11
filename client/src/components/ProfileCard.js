import { API_URL } from '@utils/index';
import { getProfile } from '@utils/api';
import axios from 'axios';
import { useState } from 'react';
import Moment from 'react-moment';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'react-loader-spinner';
import { attemptUpdateProfile } from '@features/user/userActions';
import ProfileEditModel from './ProfileEditModel';

const ProfileCard = () => {
  const dispatch = useDispatch();
  const [uploading, setUploading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector(state => state.auth);
  const { data: profile, isLoading } = useQuery('profile', () =>
    getProfile(user.token)
  );

  const handleAvatar = async e => {
    e.preventDefault();

    const formData = new FormData();
    const file = e.target.files[0];
    formData.append('avatar', file);

    try {
      setUploading(true);
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        `${API_URL}/api/upload/avatar`,
        formData,
        config
      );

      dispatch(attemptUpdateProfile({ avatar: data.url }));

      setUploading(false);
    } catch (err) {
      setUploading(false);
      console.error(err.message);
    }
  };

  if (isLoading) return 'Loading...';

  return (
    <div className='border border-gray-200 py-5 px-10 mt-5'>
      <div className='flex items-center justify-between mb-5'>
        <div className='flex items-end gap-5 flex-wrap'>
          <div className='relative w-28 h-28 rounded-full group overflow-hidden transition duration-300'>
            <div className='absolute inset-0'>
              {uploading && (
                <Spinner
                  type='TailSpin'
                  color='#1DA1F2'
                  height={114}
                  width={114}
                />
              )}
            </div>
            <div className='absolute top-0 left-0 w-full h-full group-hover:bg-black/5 transition duration-300' />
            <img
              src={profile?.avatar}
              alt=''
              className='w-full h-full object-cover block'
            />
            <label
              htmlFor='upload-avatar'
              className='w-full absolute left-1/2 group-hover:translate-y-0 translate-y-10 bottom-0 text-center pt-1 -translate-x-1/2 text-white h-1/3  bg-gray-900 bg-opacity-40 cursor-pointer transition-all duration-300 text-sm'
              title='Change profile picture'
            >
              change
              <input
                type='file'
                id='upload-avatar'
                name='avatar'
                className='hidden'
                onChange={handleAvatar}
              />
            </label>
          </div>
          <div className='space-y-3'>
            <h3 className='text-xl text-gray-800 font-medium'>
              {profile.name}
            </h3>
            <a
              href={`mailto:${profile.email}`}
              className='text-lg text-gray-700 font-light hover:underline'
            >
              {profile.email}
            </a>
          </div>
        </div>

        <button
          className='border-2 border-primary text-primary bg-white py-2 px-10 rounded-3xl cursor-pointer hover:text-white hover:bg-primary/90 transition duration-300 focus:outline-none'
          onClick={() => setIsOpen(true)}
        >
          Edit profile
        </button>
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
            Joined <Moment fromNow>{profile.joined}</Moment>
          </p>
        </div>
        <h5 className='text-base text-gray-600'>
          <strong>{profile.following.length}</strong> Following
        </h5>
        <h5 className='text-base text-gray-600'>
          <strong>{profile.followers.length}</strong> Followers
        </h5>
        <h5 className='text-base text-gray-600'>
          <strong>{0}</strong> Tweets
        </h5>
      </div>
      <ProfileEditModel {...{ isOpen, setIsOpen }} />
    </div>
  );
};

export default ProfileCard;
