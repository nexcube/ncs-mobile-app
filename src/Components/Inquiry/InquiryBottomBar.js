import React from 'react';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import globalStyles from '../../styles/global';
import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';
import {permissionCheck} from '../../services/PermissionCheck';
import DocumentPicker from 'react-native-document-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const removeDuplicates = (first, second) => {
  const combined = [...first, ...second];
  const result = combined.filter((v, i, a) => a.findIndex(t => t.path === v.path) === i);
  return result;
};

const InquiryBottomBar = ({attachments, setAttachments}) => {
  const onImage = async () => {
    try {
      const result = await MultipleImagePicker.openPicker({
        isExportThumbnail: false,
        maxVideo: 1,
        usedCameraButton: false,
        doneTitle: '추가',
        cancelTitle: '취소',
      });

      console.log(result);

      const reformedResults = result.map(item => ({
        name: item.fileName,
        type: item.mime,
        path: item.path,
      }));
      // console.log(reformedResults);

      const finalResults = removeDuplicates(attachments, reformedResults);
      setAttachments([...finalResults]);
    } catch (e) {
      console.log(e.code, e.message);
    }
  };

  const onCamera = async () => {
    permissionCheck('카메라');
    try {
      const result = await launchCamera({
        mediaType: 'photo',
        cameraType: 'back',
      });
      if (result.didCancel) {
        return null;
      }
      console.log(result.assets[0]);
      const reformedResult = {
        name: '',
        type: result.assets[0].type,
        path: result.assets[0].uri,
      };
      console.log(reformedResult);
      setAttachments([...attachments, reformedResult]);
    } catch (err) {
      console.log(err);
    }
  };

  const onFile = async () => {
    try {
      const results = await DocumentPicker.pickMultiple({
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

      console.log(results);
      const reformedResults = results.map(item => ({
        name: item.name,
        type: item.type,
        path: item.uri,
      }));
      console.log(reformedResults);
      const finalResults = removeDuplicates(attachments, reformedResults);
      setAttachments([...finalResults]);
      // setFiles([...result]);
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
