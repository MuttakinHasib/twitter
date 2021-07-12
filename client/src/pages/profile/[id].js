import {
  EmptyData,
  Loader,
  UserPostCard,
  UserProfileCard,
} from '@components/index';
import { withAuthRoute } from '@hoc/withAuthRoute';
import { getUserById, getUserTweets } from '@utils/api';
import { useEffect, useState } from 'react';
import { useQueryClient, useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import Pagination from 'material-ui-flat-pagination';
import { useRouter } from 'next/router';

const UserProfilePage = () => {
  const { query } = useRouter();
  const { id } = query;
  const client = useQueryClient();
  const [offset, setOffset] = useState(0);
  const {
    user: { token },
  } = useSelector(state => state.auth);

  const { data: user, isLoading } = useQuery(['users', id], getUserById);
  const { data, isLoading: isTweetsLoading } = useQuery(
    ['tweets', id, offset, token],
    getUserTweets
  );

  useEffect(() => {
    if (id) {
      client.prefetchQuery(['users', id], getUserById);
    }
  }, [id, client]);

  // PreFetchQuery if has more page
  useEffect(() => {
    if (data?.hasMore) {
      client.prefetchQuery(['tweets', id, offset + 1, token], getUserTweets);
    }
  }, [data, offset, client]);

  const handleClick = async _offset => {
    setOffset(_offset);
  };

  if (isLoading || isTweetsLoading) return <Loader section />;

  return (
    <>
      {user && <UserProfileCard tweets={data?.pages} {...{ user }} />}
      {data?.tweets?.length > 0 ? (
        <div className='border border-gray-200 divide-y divide-gray-200 mt-5'>
          {data?.tweets?.map(tweet => (
            <UserPostCard key={tweet?._id} {...{ tweet }} />
          ))}
          <Pagination
            size='large'
            currentPageColor='inherit'
            className='mt-5 text-primary text-xl'
            limit={10}
            offset={offset}
            total={data?.pages}
            onClick={(e, offset) => handleClick(offset)}
          />
        </div>
      ) : (
        <EmptyData />
      )}
    </>
  );
};

export default withAuthRoute(UserProfilePage);
