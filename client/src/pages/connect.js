import ConnectCard from '@components/ConnectCard';
import { withAuthRoute } from '@hoc/withAuthRoute';
import { getUsers } from '@utils/api';

import { useQuery } from 'react-query';

const ConnectPage = () => {
  const { data: users, isLoading } = useQuery('users', getUsers);

  if (isLoading) return 'Loading...';

  return (
    <div className='max-w-3xl w-full mx-auto border border-t-0 border-gray-200 divide-y divide-gray-200'>
      {users.map(user => (
        <ConnectCard key={user._id} {...{ user }} />
      ))}
    </div>
  );
};

export default withAuthRoute(ConnectPage);
