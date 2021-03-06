import { EmptyData, Loader, PostCard, ProfileCard } from '@components/index';
import { withAuthRoute } from '@hoc/withAuthRoute';
import { getProfile, getUserTweets } from '@utils/api';
import { useEffect, useState } from 'react';
import { useQueryClient, useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import Pagination from 'material-ui-flat-pagination';
import Head from 'next/head';

const ProfilePage = () => {
  const client = useQueryClient();
  const [offset, setOffset] = useState(0);
  const {
    user: { _id, token },
  } = useSelector(state => state.auth);

  const { data: profile, isLoading } = useQuery(['profile', token], getProfile);

  const { data, isLoading: isTweetsLoading } = useQuery(
    ['tweets', _id, offset, token],
    getUserTweets
  );

  // PreFetchQuery if has more page
  useEffect(() => {
    if (data?.hasMore) {
      client.prefetchQuery(['tweets', _id, offset + 1, token], getUserTweets);
    }
  }, [data, offset, client]);

  const handleClick = async _offset => {
    setOffset(_offset);
  };

  if (isLoading || isTweetsLoading) return <Loader section />;
  return (
    <>
      <Head>
        <title>{profile?.name ? profile?.name : 'Profile'} - Twitter</title>
      </Head>
      <ProfileCard tweets={data?.pages} {...{ profile }} />
      {data?.tweets?.length > 0 ? (
        <div className='border border-gray-200 divide-y divide-gray-200 mt-5'>
          {data?.tweets?.map(tweet => (
            <PostCard key={tweet?._id} {...{ tweet }} />
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

export default withAuthRoute(ProfilePage);
