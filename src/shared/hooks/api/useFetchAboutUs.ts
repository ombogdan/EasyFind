import { useState } from 'react';
import { getAboutUs } from 'shared/core/services/api/user/user';
import { LoadingType } from 'shared/types';

const useFetchAboutUs = () => {
  const [loading, setLoading] = useState(LoadingType.COMPLETE);
  const [content, setContent] = useState('');

  const fetchAboutUs = async () => {
    setLoading(LoadingType.FETCH);
    try {
      const { data } = await getAboutUs();
      setContent(data.text);
      return data.text;
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(LoadingType.COMPLETE);
    }
  };

  return { loading, fetchAboutUs, content };
};

export default useFetchAboutUs;
