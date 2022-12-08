import React from 'react';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import globalStyles from '../../styles/global';
import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';
import {permissionCheck} from '../../services/PermissionCheck';
import DocumentPicker from 'react-native-document-picker';
import {launchCamera} from 'react-native-image-picker';

const InquiryBottomBar = ({images, setImages, files, setFiles, cameras, setCameras}) => {
  const onImage = async () => {
    try {
      const response = await MultipleImagePicker.openPicker({
        selectedAssets: images,
        isExportThumbnail: false,
        maxVideo: 1,
        usedCameraButton: false,
        doneTitle: '추가',
        cancelTitle: '취소',
      });

      const dupResult = [...images, ...response];
      const result = dupResult.filter((v, i, a) => a.findIndex(t => t.path === v.path) === i);

      setImages([...result]);
    } catch (e) {
      console.log(e.code, e.message);
    }
  };

  const onCamera = async () => {
    permissionCheck('카메라');
    try {
      const response = await launchCamera({
        mediaType: 'photo',
        cameraType: 'back',
        // saveToPhotos: true,
      });
      if (response.didCancel) {
        return null;
      }

      setCameras([...cameras, response.assets[0]]);
    } catch (err) {
      console.log(err);
    }
  };

  const onFile = async () => {
    try {
      const response = await DocumentPicker.pickMultiple({
        type: [
          DocumentPicker.types.audio,
          DocumentPicker.types.csv,
          DocumentPicker.types.docx,
          DocumentPicker.types.pdf,
          DocumentPicker.types.plainText,
          DocumentPicker.types.ppt,
          DocumentPicker.types.pptx,
          DocumentPicker.types.xls,
          DocumentPicker.types.xlsx,
          DocumentPicker.types.zip,
        ],
      });

      const dupResult = [...files, ...response];
      const result = dupResult.filter((v, i, a) => a.findIndex(t => t.uri === v.uri) === i);

      setFiles([...result]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('Canceled from single doc picker');
      } else {
        console.log('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  return (
    <View style={[styles.bottomBar]}>
      <Icon
        name="image"
        size={20}
        color={globalStyles.color.gray}
        style={[styles.icon]}
        onPress={onImage}
      />
      <Icon
        name="file"
        size={20}
        color={globalStyles.color.gray}
        style={[styles.icon]}
        onPress={onFile}
      />
      <Icon
        name="camera"
        size={20}
        color={globalStyles.color.gray}
        style={[styles.icon]}
        onPress={onCamera}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    width: '100%',
    backgroundColor: globalStyles.color.white,
  },
  icon: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
});

export default InquiryBottomBar;
