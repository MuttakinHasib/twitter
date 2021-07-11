import ConnectCard from '@components/ConnectCard';
import { withAuthRoute } from '@hoc/withAuthRoute';
import Pagination from 'material-ui-flat-pagination';
import { getUsers } from '@utils/api';
import { useQuery, useQueryClient } from 'react-query';
import { useEffect, useState } from 'react';

const ConnectPage = () => {
  const client = useQueryClient();
  const [offset, setOffset] = useState(0);
  const { data, isLoading } = useQuery(['users', offset], getUsers);

  useEffect(() => {
    if (data?.hasMore) {
      client.prefetchQuery(['users', offset + 1], getUsers);
    }
  }, [data, offset, client]);

  const handleClick = async _offset => {
    setOffset(_offset);
  };

  if (isLoading) return 'Loading...';

  return (
    <div className='max-w-3xl w-full mx-auto border border-t-0 border-gray-200 divide-y divide-gray-200'>
      <h1 className='text-3xl text-gray-800 py-3 px-5 font-semibold'>
        Who to follow
      </h1>
      {data?.users?.map(user => (
        <ConnectCard key={user?._id} {...{ user }} />
      ))}
      {data?.users?.length > 0 && (
        <Pagination
          size='large'
          currentPageColor='inherit'
          className='mt-5 text-primary text-xl'
          limit={10}
          offset={offset}
          total={data?.pages}
          onClick={(e, offset) => handleClick(offset)}
        />
      )}
    </div>
  );
};

export default withAuthRoute(ConnectPage);
