import { Modal, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useStyles } from './account-delete-modal.styles';

interface Props {
  isShowDeleteModal: boolean;
  onCloseModal: () => void;
  handleConfirmDelete: () => void;
}

const AccountDeleteModal = ({
  isShowDeleteModal,
  onCloseModal,
  handleConfirmDelete,
}: Props) => {
  const styles = useStyles();

  return (
    <Modal
      animationType="slide"
      transparent
      visible={isShowDeleteModal}
      onRequestClose={onCloseModal}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            Are you sure you want to delete your account?
          </Text>
          <Text style={styles.permanentText}>
            All data related to your personal information, your review, lists,
            and interactions will be deleted.
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonCancel}
              onPress={handleConfirmDelete}
            >
              <Text style={styles.modalButtonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonDone}
              onPress={onCloseModal}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AccountDeleteModal;
