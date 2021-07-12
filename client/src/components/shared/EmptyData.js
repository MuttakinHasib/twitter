const EmptyData = () => {
  return (
    <div className='space-y-5'>
      <img src='/empty.svg' alt='' className='w-44 mx-auto mt-10' />
      <h3 className='text-3xl text-center text-gray-700 font-medium'>
        No Data found
      </h3>
    </div>
  );
};

export default EmptyData;
