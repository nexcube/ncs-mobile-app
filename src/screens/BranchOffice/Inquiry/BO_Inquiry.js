import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import BorderedInput from '../../../components/BorderedInput';
import HeaderButton from '../../../components/HeaderButton';
import SelectionList from '../../../components/SelectionList';
import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';
import Attachments from '../../../components/Inquiry/Attachments';
import {SafeAreaView} from 'react-native-safe-area-context';
import InquiryBottomBar from '../../../components/Inquiry/InquiryBottomBar';
import {launchCamera} from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';

function BO_Inquiry() {
  const navigation = useNavigation();

  // 헤더 버튼 추가.
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderButton title="등록" onPress={onRegistration} />,
    });
  });

  function onRegistration() {
    console.log('onRegistration...');
  }

  const data = [
    {key: '1', value: '서초동'},
    {key: '2', value: '송파구 잠실동'},
    {key: '3', value: '인천시 수정구 '},
    {key: '4', value: '부산시 동래구', disabled: true},
    {key: '5', value: '강원도 춘천시'},
  ];
  const [selected, setSelected] = React.useState('');

  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [cameras, setCameras] = useState([]);

  const onDeleteImage = value => {
    const result = images.filter(item => item?.path && item?.path !== value?.path);
    setImages(result);
  };
  const onDeleteFile = value => {
    const result = files.filter(item => item?.uri && item?.uri !== value?.uri);
    setFiles(result);
  };

  const onDeleteCamera = value => {
    const result = cameras.filter(item => item?.uri && item?.uri !== value?.uri);
    setCameras(result);
  };

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
    <SafeAreaView edges={['bottom']} style={[{flex: 1}]}>
      <ScrollView style={[styles.container]}>
        <BorderedInput
          hasMarginBottom
          keyboardType="default"
          returnKeyType="next"
          autoCapitalize="none"
          placeholder=" 제목"
          // value={id}
          // onChangeText={setEmail}
        />
        <BorderedInput
          hasMarginBottom
          keyboardType="default"
          returnKeyType="next"
          autoCapitalize="none"
          placeholder=" 분류선택"
          editable={false}
        />
        <SelectionList hasMarginBottom data={data} setSelected={setSelected} />
        <BorderedInput
          hasMarginBottom
          textAlignVertical="top"
          multiline={true}
          height={300}
          keyboardType="default"
          returnKeyType="next"
          autoCapitalize="none"
          placeholder=" 내용 입력"
        />
        <Attachments
          images={images}
          files={files}
          cameras={cameras}
          onDeleteImage={onDeleteImage}
          onDeleteFile={onDeleteFile}
          onDeleteCamera={onDeleteCamera}
        />
      </ScrollView>
      <InquiryBottomBar onImage={onImage} onFile={onFile} onCamera={onCamera} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    paddingBottom: 12,
  },
  photo: {
    // backgroundColor: 'white',
    borderRadius: 64,
    width: 128,
    height: 128,
  },
});

export default BO_Inquiry;
