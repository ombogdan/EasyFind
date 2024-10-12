import { useState } from 'react';
import { useSelector } from 'react-redux';
import { deleteFollower } from 'shared/core/services/api/user/user';
import { userDataSelector } from 'shared/store/slices/user';
import { LoadingType } from 'shared/types';

interface Props {
  author_id: number;
  successCallback: (follower: number) => void;
}

const useDeleteFollower = () => {
  const currentUser = useSelector(userDataSelector);
  const [loading, setLoading] = useState(LoadingType.COMPLETE);

  const handleDeleteFollower = async (props: Props) => {
    if (!currentUser) return;
    setLoading(LoadingType.FETCH);
    try {
      await deleteFollower(currentUser.id, props.author_id);
      props?.successCallback(props.author_id);
      return props.author_id;
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(LoadingType.COMPLETE);
    }
  };
  return { loading, handleDeleteFollower };
};

export default useDeleteFollower;
