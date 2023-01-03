import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView, Platform} from 'react-native';
import CustomInput from '../../../components/common/CustomInput';
import HeaderButton from '../../../components/common/HeaderButton';
import SelectionList from '../../../components/common/SelectionList';
import Attachments from '../../../components/BranchOffice/Inquiry/Attachments';
import {SafeAreaView} from 'react-native-safe-area-context';
import InquiryBottomBar from '../../../components/BranchOffice/Inquiry/InquiryBottomBar';
import BottomSheet, {InquiryAction} from '../../../components/common/bottomsheet/BottomSheet';
import HeaderBackButton from '../../../components/common/HeaderBackButton';
import CustomToast, {Toast} from '../../../components/common/CustomToast';
import globalStyles from '../../../styles/globalStyles';
import SelectionButton from '../../../components/common/SelectionButton';

import produce from 'immer';
import userData from '../../../services/storage/DeviceStorage';
import apiInquiryRegister from '../../../services/api/inquiry/register';
import apiInquiryCategory from '../../../services/api/inquiry/category';

const initialBranch = {name: '', cMain: false, facilityCode: ''};
const initialClassify = {name: ' 분류선택', index: -1, mainName: '', mainIndex: -1};

function BO_Inquiry({navigation, route}) {
  const branchList = route.params?.branchList;

  // 헤더 버튼 추가.
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderButton title="등록" onPress={() => onRegistration()} />,
      headerBackVisible: false,
      headerLeft: () => <HeaderBackButton onPress={() => onBack()} />,
    });
  });

  //분류선택 페이지에서 온 파라미터 처리
  useEffect(() => {
    if (route.params?.selection) {
      setClassify(route.params.selection);
    }
  }, [route.params]);

  // status ////////////////////////////////////////////////////////////////////////////////////////
  // 제목
  const [title, setTitle] = useState('');
  // 분류선택
  const [classify, setClassify] = useState(initialClassify);
  // 관련 지점
  const [branch, setBranch] = useState(initialBranch);
  // 내용
  const [content, setContent] = useState('');
  // 첨부파일
  const [attachments, setAttachments] = useState([]);
  // BottomSheet visible 설정.
  const [visibleBS, setVisibleBS] = useState({
    visible: false,
    format: InquiryAction.Registration,
  });

  function onRegistration() {
    if (title.length < 1) {
      displayToast('제목을 입력하세요');
      return;
    }
    if (classify === initialClassify) {
      displayToast('분류선택을 지정해 주세요');
      return;
    }
    if (branch.name === '') {
      displayToast('관련지점을 선택해 주세요');
      return;
    }
    if (content.length < 1) {
      displayToast('내용을 입력해 주세요');
      return;
    }

    const newBSConfig = produce(visibleBS, draft => {
      draft.visible = true;
      draft.format = InquiryAction.Registration;
    });
    setVisibleBS(newBSConfig);
  }

  // 앱바 백 버튼 처리
  function onBack() {
    if (title.length > 0 || content.length > 0) {
      const newSheetStatus = produce(visibleBS, draft => {
        draft.visible = true;
        draft.format = InquiryAction.CancelInquiry;
      });
      setVisibleBS(newSheetStatus);
    } else {
      navigation.pop();
    }
  }

  async function onBSConfirm() {
    const newSheetStatus = produce(visibleBS, draft => {
      draft.visible = false;
    });
    setVisibleBS(newSheetStatus);

    switch (visibleBS.format) {
      case InquiryAction.Registration:
        const staffId = await userData.getStaffId();

        const uploadFiles = attachments.map(file => ({
          name: file.name,
          uri: Platform.OS === 'android' ? file.path : file.path.replace('file://', ''),
          type: file.type,
        }));

        // console.log(JSON.stringify(uploadFiles, null, '\t'));

        const formData = new FormData();
        // formData.append('images', uploadFiles);
        uploadFiles.map(item => formData.append('image', item));
        formData.append('title', title);
        formData.append('content', content);
        formData.append('categoryIndex', classify.index);
        formData.append('facilityCode', branch.facilityCode);
        formData.append('staffId', staffId);
        formData.append('status', 'NEW');

        await apiInquiryRegister(formData, onSuccessRegister(navigation));

        break;
      case InquiryAction.CancelInquiry:
        navigation.goBack();
        break;
      case InquiryAction.Error:
        break;
    }
  }

  const onSuccessRegister = nav => () => {
    nav.goBack();
  };

  // 바텀시티 continue 클릭시
  function onBSContinue() {
    const newSheetStatus = produce(visibleBS, draft => {
      draft.visible = false;
    });
    setVisibleBS(newSheetStatus);
  }

  const onInquiryClassify = async () => {
    await apiInquiryCategory(onSuccessQnaCategory(navigation));
  };

  const onSuccessQnaCategory = nav => data => {
    nav.navigate('BO_Inquiry_Classify', {
      returnRouteName: 'BO_Inquiry',
      qnaCategory: data,
    });
  };

  const displayToast = message => {
    Toast.show({
      type: 'errorMsg',
      visibilityTime: 3000,
      position: 'bottom',
      props: {
        message: message,
      },
    });
  };

  return (
    <SafeAreaView edges={['bottom']} style={[styles.fullscreen]}>
      <ScrollView style={[styles.container]}>
        <CustomInput
          maxLength={100}
          hasMarginBottom
          keyboardType="default"
          returnKeyType="next"
          autoCapitalize="none"
          placeholder=" 제목"
          value={title}
          onChangeText={setTitle}
        />
        <SelectionButton
          title={
            classify.mainName.length > 1 ? classify.mainName + ' > ' + classify.name : classify.name
          }
          style={classify.name !== initialClassify.name ? {color: globalStyles.color.text} : {}}
          hasMarginBottom
          onPress={() => onInquiryClassify()}
        />

        <SelectionList hasMarginBottom data={branchList} setSelected={setBranch} />
        <CustomInput
          hasMarginBottom
          textAlignVertical="top"
          multiline={true}
          height={300}
          keyboardType="default"
          returnKeyType="next"
          autoCapitalize="none"
          placeholder=" 내용 입력"
          onChangeText={setContent}
        />
        <Attachments attachments={attachments} setAttachments={setAttachments} />
      </ScrollView>

      <InquiryBottomBar attachments={attachments} setAttachments={setAttachments} />
      <BottomSheet
        sheetStatus={visibleBS}
        onOk={() => onBSConfirm()}
        onCancel={() => onBSContinue()}
      />
      <CustomToast />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
    backgroundColor: globalStyles.color.white,
  },
  container: {
    flex: 1,
    padding: 12,
    paddingBottom: 12,
    backgroundColor: globalStyles.color.background,
  },
  photo: {
    borderRadius: 64,
    width: 128,
    height: 128,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
});

export default BO_Inquiry;
