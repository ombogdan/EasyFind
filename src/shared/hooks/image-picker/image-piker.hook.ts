import ImageCropPicker from 'react-native-image-crop-picker';

const useImagePicker = () => {
  const pickImage = async () => {
    try {
      const result = await ImageCropPicker.openPicker({
        mediaType: 'photo',
        width: 300,
        cropping: true,
        cropperCircleOverlay: true,
      });
      if ('path' in result) {
        return result;
      }
      return null;
    } catch (error) {
      return null;
    }
  };

  return { pickImage };
};

export default useImagePicker;
