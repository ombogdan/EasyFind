import { useState } from 'react';
import { createReport } from 'shared/core/services/api/user/user';
import { LoadingType, ReportType } from 'shared/types';

interface Params {
  successCallback?: () => void;
  review: number,
  message: string,
  type: ReportType,
}

const useCreateReport = () => {
  const [loading, setLoading] = useState(LoadingType.COMPLETE);

  const handleCreateReport = async ({ successCallback, ...props }: Params) => {
    setLoading(LoadingType.FETCH);
    try {
      const { data } = await createReport(props);
      if (successCallback) {
        successCallback();
      }
      return data;
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(LoadingType.COMPLETE);
    }
  };

  return { loading, handleCreateReport };
};

export default useCreateReport;
