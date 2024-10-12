import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  useCreateCustomMusic,
  useDeleteCustomMusic,
  useFetchCustomMusicById,
  useUpdateCustomMusic,
  useUpdateCustomMusicTracks,
} from 'shared/hooks/api';
import { AppUserRoutes, useAppRoute } from 'shared/navigation/app-user';
import { goBack, navigate } from 'shared/navigation/root-navigator.config';
import { useTypedDispatch } from 'shared/store';
import {
  profileActions,
  profileSelectedMusicSelector,
} from 'shared/store/slices/profile';
import { LoadingType } from 'shared/types';

const useListForm = () => {
  const { params } = useAppRoute<AppUserRoutes.ListForm>();
  const dispatch = useTypedDispatch();
  const selected_music = useSelector(profileSelectedMusicSelector);
  // api hooks
  const { loading, addMusicList } = useCreateCustomMusic();
  const { loading: loadingDelete, removeCustomMusic } = useDeleteCustomMusic();
  const { loading: loadingTracks, setCustomTracks } =
    useUpdateCustomMusicTracks();
  const { loading: loadingEdit, editMusicList } = useUpdateCustomMusic();
  const { fetchCustomMusicById } = useFetchCustomMusicById();
  // local state
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [name, setName] = useState('');
  const [describe, setDescribe] = useState('');
  const [checkbox, setCheckbox] = useState({
    make_public: false,
    pinned: false,
  });
  const [validation, setValidation] = useState({
    title: true,
  })

  // set initial data
  useEffect(() => {
    if (params?.item) {
      setName(params.item.name);
      setDescribe(params.item.describe);
      setCheckbox({
        make_public: params.item.make_public,
        pinned: params.item.pinned,
      });
      dispatch(profileActions.setSelectedMusicList(params?.item.list_music));
      dispatch(profileActions.setCustomListUpdateId(null));
      fetchCustomMusicById({id: params.item.id, successCallback: (data) => dispatch(profileActions.setSelectedMusicList(data.list_music))})
    } else {
      dispatch(profileActions.cleanSelectedMusic());
    }
  }, [params]);

  const isLoading =
    loadingTracks === LoadingType.FETCH ||
    loadingEdit === LoadingType.FETCH ||
    loading === LoadingType.FETCH;

  const onPressCreate = async () => {
    const data = {
      name,
      describe,
      make_public: checkbox.make_public,
      pinned: checkbox.pinned,
    };
    const response = await addMusicList({ props: data });
    // SET MUSIC LIST
    setCustomTracks({
      successCallback: goBack,
      id: response.id,
      props: selected_music,
    });
  };

  const onOpenDeleteModal = () => setVisibleDelete(true);

  const onCloseDeleteModal = () => setVisibleDelete(false);

  const handleDeleteCustomMusic = () => {
    onCloseDeleteModal();
    if (!params?.item) return;
    removeCustomMusic({ successCallback: goBack, id: params?.item.id });
  };

  const onPressUpdate = async () => {
    if (!params?.item) return;
    const data = {
      name,
      describe,
      make_public: checkbox.make_public,
      pinned: checkbox.pinned,
    };
    const response = await editMusicList({
      props: data,
      id: params?.item.id,
    });
    // SET MUSIC LIST
    setCustomTracks({
      successCallback: goBack,
      id: response.id,
      props: selected_music,
    });
  };

  const handleIsValid = () => {
    setValidation({
      title: name.trim().length > 1,
    })
    return name.trim().length > 1;
  }

  const onPressSave = () => {
    if (isLoading) return;
    if (!handleIsValid()) return;
    if (params?.item) {
      onPressUpdate();
    } else {
      onPressCreate();
    }
  };

  const onPressCheckbox = (key: 'make_public' | 'pinned') => () => {
    setCheckbox({
      ...checkbox,
      [key]: !checkbox[key],
    });
  };

  const onPressSearchMusic = () => {
    navigate(AppUserRoutes.SearchMusic);
  };

  const goToMusicList = () => {
    navigate(AppUserRoutes.CustomListMusic);
  };

  const onChangeName = (text: string) => {
    setValidation({
      ...validation,
      title: true,
    })
    setName(text);
  }

  return {
    onPressCheckbox,
    checkbox,
    name,
    onChangeName,
    describe,
    setDescribe,
    onPressCreate,
    isLoading,
    onPressUpdate,
    isCreate: !params?.item,
    handleDeleteCustomMusic,
    onOpenDeleteModal,
    onCloseDeleteModal,
    visibleDelete,
    onPressSave,
    selected_music,
    onPressSearchMusic,
    goToMusicList,
    validation,
  };
};

export default useListForm;
