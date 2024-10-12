import { useState } from 'react';
import { AppUserRoutes, useAppRoute } from 'shared/navigation/app-user';
import { useCreateReport } from 'shared/hooks/api';
import { goBack } from 'shared/navigation/root-navigator.config';
import { LoadingType, ReportType } from 'shared/types';
import { showToast } from 'shared/utils/show-toast';
import { OPTION_LIST } from './report.types';

const useReport = () => {
  const { params } = useAppRoute<AppUserRoutes.Report>();
  const [option, setOption] = useState(OPTION_LIST[0].key);
  const [message, setMessage] = useState('');
  const { loading, handleCreateReport } = useCreateReport();

  const onPressOption = (key: ReportType) => () => {
    setOption(key);
  };

  const onPressSave = () => {
    handleCreateReport({
      message,
      review: params.review_id,
      type: option,
      successCallback: () => {
        showToast({
          type: 'success',
          text1: 'Thanks for Reporting This Review'
        });
        goBack();
      },
    });
  };

  return {
    option,
    message,
    setMessage,
    isLoading: loading === LoadingType.FETCH,
    onPressOption,
    onPressSave,
  };
};

export default useReport;
