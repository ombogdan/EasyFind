import { Modal, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useStyles } from './custom-list-delete-modal.styles';

interface Props {
  isShowDeleteModal: boolean;
  onCloseModal: () => void;
  handleConfirmDelete: () => void;
}

const CustomListDeleteModal = ({ isShowDeleteModal, onCloseModal, handleConfirmDelete}: Props) => {
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
            Are you sure you want to delete a list?
          </Text>
          <Text style={styles.permanentText}>This action is permanent.</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonCancel}
              onPress={onCloseModal}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonDone}
              onPress={handleConfirmDelete}
            >
              <Text style={styles.modalButtonText}>Yes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomListDeleteModal;
