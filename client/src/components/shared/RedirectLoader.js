import Spinner from 'react-loader-spinner';

const RedirectLoader = ({ to }) => {
  return (
    <div className='w-full h-[50vh] flex flex-col items-center justify-center'>
      <Spinner type='Oval' color='#1DA1F2' height={60} width={60} />
      <h3 className='mt-5 text-gray-800'>
        Redirecting to {to} page, Please Wait...
      </h3>
    </div>
  );
};

export default RedirectLoader;
