import { PostCard, ProfileCard } from '@components/index';
import { withAuthRoute } from '@hoc/withAuthRoute';

const ProfilePage = () => {
  return (
    <>
      <ProfileCard />
      <PostCard />
    </>
  );
};

export default withAuthRoute(ProfilePage);
