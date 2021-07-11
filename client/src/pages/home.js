import Head from 'next/head';
import { ComposeCard, PostCard } from '@components/index';
import { withAuthRoute } from '@hoc/withAuthRoute';
import { useQuery, useQueryClient } from 'react-query';
import { getTweets } from '@utils/api';
import { useSelector } from 'react-redux';
import Pagination from 'material-ui-flat-pagination';
import { useEffect, useState } from 'react';

const HomePage = () => {
  const client = useQueryClient();
  const [offset, setOffset] = useState(0);
  const {
    user: { token },
  } = useSelector(state => state.auth);

  const { data, isLoading } = useQuery(['tweets', token, offset], getTweets);

  // PreFetchQuery if has more page
  useEffect(() => {
    if (data?.hasMore) {
      client.prefetchQuery(['tweets', token, offset + 1], getTweets);
    }
  }, [data, offset, client]);

  const handleClick = async _offset => {
    setOffset(_offset);
  };

  if (isLoading) return 'Loading...';

  return (
    <>
      <Head>
        <title>Home - Twitter</title>
      </Head>
      <ComposeCard />
      {data?.tweets?.length > 0 && (
        <>
          <div className='border border-gray-200 divide-y divide-gray-200 mt-5'>
            {data?.tweets?.map(tweet => (
              <PostCard key={tweet?._id} {...{ tweet }} />
            ))}
          </div>
          <Pagination
            size='large'
            currentPageColor='inherit'
            className='mt-5 text-primary text-xl'
            limit={1}
            offset={offset}
            total={data?.pages}
            onClick={(e, offset) => handleClick(offset)}
          />
        </>
      )}
    </>
  );
};

export default withAuthRoute(HomePage);
