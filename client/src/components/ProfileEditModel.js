import { Fragment } from 'react';
import moment from 'moment';
import { Dialog, Transition } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { attemptUpdateProfile } from '@features/user/userActions';

const ProfileEditModel = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      birthday: moment(user.birthday).format('YYYY-MM-DD'),
      name: user.name,
    },
  });

  const onSubmit = data => {
    dispatch(attemptUpdateProfile(data));
    setIsOpen(false);
  };

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as='div'
          className='fixed inset-0 z-10 overflow-y-auto bg-black/20 transition-colors duration-500'
          onClose={closeModal}
        >
          <div className='min-h-screen px-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Dialog.Overlay className='fixed inset-0' />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className='inline-block h-screen align-middle'
              aria-hidden='true'
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <div className='inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl'>
                <Dialog.Title
                  as='h3'
                  className='text-xl font-medium leading-6 text-gray-900'
                >
                  Edit Profile
                </Dialog.Title>
                <div className='mt-5'>
                  <form className='space-y-5' onSubmit={handleSubmit(onSubmit)}>
                    <div className='w-full flex flex-col space-y-2'>
                      <label htmlFor='name'>Name</label>
                      <input
                        id='name'
                        type='text'
                        required
                        autoFocus={false}
                        autoComplete='off'
                        className='py-2 px-4 border-2 border-gray-100 focus:border-primary/50 focus:outline-none focus:ring-0'
                        placeholder="What's your name?"
                        {...register('name', { required: true })}
                      />
                    </div>
                    <div className='w-full flex flex-col space-y-2'>
                      <label htmlFor='birthday'>Date of birth</label>
                      <input
                        id='birthday'
                        type='date'
                        required
                        className='py-2 px-4 border-2 border-gray-100 focus:border-primary/50 focus:outline-none focus:ring-0'
                        {...register('birthday', {
                          required: true,
                          // valueAsDate: true,
                        })}
                      />
                    </div>
                    <p className='pt-5 pb-2 text-lg text-gray-600 border-b border-gray-100'>
                      Change password
                    </p>
                    <div className='w-full flex flex-col space-y-2'>
                      <label htmlFor='password'>Current password</label>
                      <input
                        id='password'
                        type='password'
                        className='py-2 px-4 border-2 border-gray-100 focus:border-primary/50 focus:outline-none focus:ring-0'
                        placeholder='Password'
                        {...register('password')}
                      />
                      {errors.password && (
                        <span className='text-sm text-red-500'>
                          Password must be at least 6 characters
                        </span>
                      )}
                    </div>
                    <div className='w-full flex flex-col space-y-2'>
                      <label htmlFor='newPassword'>New password</label>
                      <input
                        id='newPassword'
                        type='password'
                        className='py-2 px-4 border-2 border-gray-100 focus:border-primary/50 focus:outline-none focus:ring-0'
                        placeholder='Enter new password'
                        {...register('newPassword')}
                      />
                      {errors.password && (
                        <span className='text-sm text-red-500'>
                          Password must be at least 6 characters
                        </span>
                      )}
                    </div>
                    <div className='flex items-center gap-3 flex-wrap'>
                      <button
                        type='button'
                        className='border-2 border-gray-200 py-2 px-10 text-center bg-white text-gray-800 rounded-md transition duration-300'
                        onClick={closeModal}
                      >
                        Cancel
                      </button>
                      <button
                        type='submit'
                        className='border-2 border-primary py-2 px-10 text-center bg-primary text-white rounded-md hover:bg-primary/90 transition duration-300'
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ProfileEditModel;
