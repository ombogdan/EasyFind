import React, { useMemo } from 'react';

import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import { Header } from 'components/header';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { AppIcon } from 'assets/index';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Box } from 'ui-kit/box';
import { LoadingType } from 'shared/types';
import Lottie from 'lottie-react-native';
import { LOTTIE_BLACK_LOADER, SIZE } from 'constants/index';
import CustomInput from 'ui-kit/custom-input/custom-input.component';
import { useScale } from 'hooks/useScale';
import { CommentItem } from './components/comment-item';
import { useStyles } from './custom-list-details.styles';
import { CommentDeleteModal } from './components/comment-delete-modal';
import CustomListInfo from './components/custom-list-info';
import useCustomListDetails from './custom-list-details.hook';

const CustomListDetails = () => {
  const {
    handleUpdateComment,
    handleDeleteComment,
    handlePressEditComment,
    handlePressReply,
    handleSendMessage,
    handleSheetChanges,
    handleDelete,
    handleConfirmDelete,
    fetchMoreComments,
    isLoading,
    onPressEdit,
    handleOpenSheet,
    commentList,
    loadingComments,
    onChangeComment,
    newComment,
    totalComments,
    isBottomSheetOpen,
    bottomSheetModalRef,
    user,
    item_name,
    onCloseDeleteModal,
    isShowDeleteModal,
    inputRef,
  } = useCustomListDetails();
  const insets = useSafeAreaInsets();
  const styles = useStyles({ insets });
  const scale = useScale();
  const snapPoints = useMemo(() => ['25%', '25%'], []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? -scale(25) : 0}
    >
      <SafeAreaView style={styles.container}>
        <Header
          name={`List "${item_name}"`}
          backButton
          leftIcon="dots"
          onPressLeftButton={handleOpenSheet}
        />
        <ScrollView keyboardShouldPersistTaps="handled">
          <Box pl={SIZE.md} pr={SIZE.md} pt={SIZE.md}>
            {/* CUSTOM LIST INFO */}
            <CustomListInfo />
            {/* COMMENT LIST */}
            <Box mt={SIZE.lg}>
              {loadingComments === LoadingType.FETCH && (
                <View style={styles.loaderContainer}>
                  <Lottie
                    style={styles.loader}
                    source={LOTTIE_BLACK_LOADER}
                    autoPlay
                    loop
                  />
                </View>
              )}
              {commentList.map((comment) => (
                <CommentItem
                  key={comment.id}
                  deleteCommentCallback={handleDeleteComment}
                  user={user}
                  comment={comment}
                  handleUpdateComment={handleUpdateComment}
                  onPressReply={handlePressReply}
                  onPressEditComment={handlePressEditComment}
                />
              ))}
              {commentList.length < totalComments && (
                <Box pb={SIZE.md}>
                  <TouchableOpacity
                    style={styles.viewAllCommentContainer}
                    activeOpacity={0.5}
                    disabled={loadingComments === LoadingType.FETCH_MORE}
                    onPress={fetchMoreComments}
                  >
                    <Text style={styles.viewAllComment}>
                      View more comments
                    </Text>
                    {loadingComments === LoadingType.FETCH_MORE && (
                      <View style={styles.loadMoreContainer}>
                        <Lottie
                          style={styles.loadMore}
                          source={LOTTIE_BLACK_LOADER}
                          autoPlay
                          loop
                        />
                      </View>
                    )}
                  </TouchableOpacity>
                </Box>
              )}
            </Box>
          </Box>
        </ScrollView>
        {/* MORE MENU */}
        <BottomSheetModalProvider>
          <Pressable
            onPress={() => {
              bottomSheetModalRef.current?.close();
            }}
            style={[
              styles.containerBottomSheet,
              isBottomSheetOpen ? styles.dimBackground : null,
            ]}
          >
            <BottomSheetModal
              ref={bottomSheetModalRef}
              index={1}
              snapPoints={snapPoints}
              onChange={handleSheetChanges}
            >
              <BottomSheetView style={styles.contentContainer}>
                <TouchableOpacity
                  onPress={onPressEdit}
                  style={styles.sheetItemContainer}
                >
                  <Text style={styles.sheetButtonText}>Edit List</Text>
                  <AppIcon name="editButton" size={28} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleDelete}
                  style={styles.sheetItemContainer}
                >
                  <Text style={styles.sheetButtonText}>Delete List</Text>
                  <AppIcon name="delete" size={28} />
                </TouchableOpacity>
              </BottomSheetView>
            </BottomSheetModal>
          </Pressable>
        </BottomSheetModalProvider>
        {/* DELETE MODAL */}
        <CommentDeleteModal
          variant="list"
          isShowDeleteModal={isShowDeleteModal}
          onCloseModal={onCloseDeleteModal}
          handleConfirmDelete={handleConfirmDelete}
        />
      </SafeAreaView>
      {/* ADD COMMENT */}
      {isBottomSheetOpen && (
        <View style={styles.inputContainer}>
          <Box flex={1}>
            {isLoading && (
              <View style={styles.addCommentLoadContainer}>
                <Lottie
                  style={styles.addCommentLoad}
                  source={LOTTIE_BLACK_LOADER}
                  autoPlay
                  loop
                />
              </View>
            )}
            <CustomInput
              ref={inputRef}
              value={newComment}
              onChangeValue={onChangeComment}
              styleInput={styles.styleInput}
              maxLength={1024}
              placeholder="Add comment"
            />
          </Box>
          <TouchableOpacity
            disabled={isLoading}
            style={styles.sendTextContainer}
            onPress={handleSendMessage}
          >
            {newComment && <Text style={styles.sendText}>Send</Text>}
          </TouchableOpacity>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default CustomListDetails;
