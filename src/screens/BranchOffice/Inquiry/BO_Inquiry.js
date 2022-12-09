import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import CustomInput from '../../../components/common/CustomInput';
import HeaderButton from '../../../components/common/HeaderButton';
import SelectionList from '../../../components/common/SelectionList';
import Attachments from '../../../components/Inquiry/Attachments';
import {SafeAreaView} from 'react-native-safe-area-context';
import InquiryBottomBar from '../../../components/Inquiry/InquiryBottomBar';
import BottomSheet, {InquiryAction} from '../../../components/common/bottomsheet/BottomSheet';
import HeaderBackButton from '../../../components/common/HeaderBackButton';
import produce from 'immer';
import CustomToast, {Toast} from '../../../components/common/CustomToast';
import globalStyles from '../../../styles/global';
import SelectionButton from '../../../components/common/SelectionButton';
import axios from 'axios';
import userData from '../../../services/DeviceStorage';

function BO_Inquiry({navigation, route}) {
  // 헤더 버튼 추가.
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderButton title="등록" onPress={onRegistration} />,
      headerBackVisible: false,
      headerLeft: () => <HeaderBackButton t onPress={onBack} />,
    });
  });

  useEffect(() => {
    if (route.params) {
      const {selectionChoice, selectionItem, name} = route.params;
      console.log('choice:', selectionChoice);
      console.log('item:', selectionItem);
      console.log('name:', name);
      setClassSelection(name);
    }
  }, [route.params]);

  useEffect(() => {
    getBranchOfficeList();
  });

  async function getBranchOfficeList() {
    const staffId = await userData.getStaffId();
    const jwt = await userData.getJWT();
    const token = `${jwt}`;
    axios
      .get('/inquiry/branchOfficeList', {
        headers: {authorization: token},
        params: {id: staffId},
      })
      .then(res => console.log(res.data))
      .catch(error => console.error(error));
  }

  const [title, setTitle] = useState('');
  const [classSelection, setClassSelection] = useState(' 분류선택');
  const [branchSelection, setBranchSelection] = useState(-1);
  const [contents, setContents] = useState('');

  const data = [
    {key: '1', value: '서초동'},
    {key: '2', value: '송파구 잠실동'},
    {key: '3', value: '인천시 수정구 '},
    {key: '4', value: '부산시 동래구', disabled: true},
    {key: '5', value: '강원도 춘천시'},
  ];

  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [cameras, setCameras] = useState([]);

  const [sheetStatus, setSheetStatus] = useState({
    visible: false,
    format: InquiryAction.Registration,
  });

  const onInquiryClassify = () => {
    navigation.navigate('BO_Inquiry_Classify');
  };

  function onRegistration() {
    if (title.length < 1) {
      Toast.show({
        type: 'errorMsg',
        visibilityTime: 3000,
        position: 'bottom',
        props: {
          message: '제목을 입력하세요',
        },
      });
      return;
    }

    const newSheetStatus = produce(sheetStatus, draft => {
      draft.visible = true;
      draft.format = InquiryAction.Registration;
    });
    setSheetStatus(newSheetStatus);
  }

  function onBack() {
    const newSheetStatus = produce(sheetStatus, draft => {
      draft.visible = true;
      draft.format = InquiryAction.CancelInquiry;
    });
    setSheetStatus(newSheetStatus);
  }

  function onBSConfirm() {
    const newSheetStatus = produce(sheetStatus, draft => {
      draft.visible = false;
    });
    setSheetStatus(newSheetStatus);

    switch (sheetStatus.format) {
      case InquiryAction.Registration:
        break;
      case InquiryAction.CancelInquiry:
        navigation.goBack();
        break;
      case InquiryAction.Error:
        break;
    }
  }

  function onBSContinue() {
    const newSheetStatus = produce(sheetStatus, draft => {
      draft.visible = false;
    });
    setSheetStatus(newSheetStatus);
  }

  return (
    <SafeAreaView edges={['bottom']} style={[styles.fullscreen]}>
      <ScrollView style={[styles.container]}>
        <CustomInput
          hasMarginBottom
          keyboardType="default"
          returnKeyType="next"
          autoCapitalize="none"
          placeholder=" 제목"
          value={title}
          onChangeText={setTitle}
        />
        <SelectionButton
          title={classSelection}
          style={classSelection !== ' 분류선택' ? {color: globalStyles.color.text} : {}}
          hasMarginBottom
          onPress={onInquiryClassify}
        />

        <SelectionList hasMarginBottom data={data} setSelected={setBranchSelection} />
        <CustomInput
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
          setImages={setImages}
          files={files}
          setFiles={setFiles}
          cameras={cameras}
          setCameras={setCameras}
        />
      </ScrollView>

      <InquiryBottomBar
        images={images}
        setImages={setImages}
        files={files}
        setFiles={setFiles}
        cameras={cameras}
        setCameras={setCameras}
      />
      <BottomSheet sheetStatus={sheetStatus} onOk={onBSConfirm} onCancel={onBSContinue} />
      <CustomToast />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
  },
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
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default BO_Inquiry;
