import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import BorderedInput from '../../../components/BorderedInput';

import HeaderButton from '../../../components/HeaderButton';
import SelectionList from '../../../components/SelectionList';
import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';
import MultiImagePicker from '../../../components/MultiImagePicker';
import {SafeAreaView} from 'react-native-safe-area-context';
import InquiryBottomBar from '../../../components/Inquiry/InquiryBottomBar';
import {launchCamera} from 'react-native-image-picker';

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
  const onDelete = value => {
    const result = images.filter(
      item => item?.localIdentifier && item?.localIdentifier !== value?.localIdentifier,
    );
    setImages(result);
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
      console.log('response: ', response);
      setImages(response);
    } catch (e) {
      console.log(e.code, e.message);
    }
  };
  const onCamera = async () => {
    try {
      const result = await launchCamera({
        // mediaType: 'photo',
        // cameraType: 'back',
        // saveToPhotos: true,
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      });
      if (result.didCancel) {
        return null;
      }
      // const localUri = result.assets[0].uri;
      // const uriPath = localUri.split('//').pop();
      // const imageName = localUri.split('/').pop();
      console.log(result.assets[0]);
      setImages([...images, result.assets[0]]);
    } catch (err) {
      console.log(err);
    }
  };

  const onFile = async () => console.log('onFile');

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
        <MultiImagePicker images={images} setImages={setImages} onDelete={onDelete} />
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
