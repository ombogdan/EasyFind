import { useState } from 'react';
import { useSelector } from 'react-redux';
import { createFollower } from 'shared/core/services/api/user/user';
import { userDataSelector } from 'shared/store/slices/user';
import { LoadingType } from 'shared/types';

interface Props {
  follower: number;
  successCallback: (follower: number) => void;
}

const useCreateFollower = () => {
  const currentUser = useSelector(userDataSelector);
  const [loading, setLoading] = useState(LoadingType.COMPLETE);

  const handleCreateFollower = async (props: Props) => {
    if (!currentUser) return;
    setLoading(LoadingType.FETCH);
    try {
      await createFollower(currentUser.id, {
        author: props.follower,
        follower: currentUser.id,
      });
      props?.successCallback(props.follower);
      return props.follower;
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(LoadingType.COMPLETE);
    }
  };
  return { loading, handleCreateFollower };
};

export default useCreateFollower;
