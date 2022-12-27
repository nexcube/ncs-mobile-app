import React, {useState} from 'react';
import {Platform, ScrollView, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useEffect} from 'react/cjs/react.development';
import CustomInput from '../../../../components/common/CustomInput';
import HeaderButton from '../../../../components/common/HeaderButton';
import SelectionButton from '../../../../components/common/SelectionButton';
import SelectionList from '../../../../components/common/SelectionList';
import userData from '../../../../services/DeviceStorage';
import globalStyles from '../../../../styles/global';
import InquiryBottomBar from '../../../../components/Inquiry/InquiryBottomBar';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import CustomToast from '../../../../components/common/CustomToast';
import HeaderBackButton from '../../../../components/common/HeaderBackButton';
import produce from 'immer';
import BottomSheet, {InquiryAction} from '../../../../components/common/bottomsheet/BottomSheet';
import apiInquiryQnaCategory from '../../../../services/api/inquiryQnaCategory';
import apiInquiryUpdate from '../../../../services/api/inquiryUpdate';
import Attachments from '../../../../components/Inquiry/Attachments';
import apiDeleteFiles from '../../../../services/api/deleteFiles';

function BO_DetailModify({navigation, route}) {
  // 라우터 파라미터 처리
  const inquiryItem = route.params.inquiryItem;
  const branchList = route.params.branchList;

  //분류선택 페이지에서 온 파라미터 처리
  useEffect(() => {
    if (route.params?.selection) {
      //{"index": 9, "mainIndex": 8, "mainName": "가맹관리", "name": "재계약가맹문의"}
      setClassify(route.params.selection);
    }
  }, [route.params]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderButton title="등록" onPress={onPressRegister} />,
      headerBackVisible: false,
      headerLeft: () => <HeaderBackButton onPress={() => onPressBack()} />,
    });
  });

  // Status ///////////////////////////////////////////////////////////////////////////////////////
  //제목
  const [title, setTitle] = useState(inquiryItem.title);
  // 내용
  const [content, setContent] = useState(inquiryItem.content);
  // 분류선택
  const [classify, setClassify] = useState({
    name: inquiryItem.subCatName,
    index: inquiryItem.catIdx,
    mainName: inquiryItem.mainCatName,
    mainIndex: -1,
  });
  // 관련 지점
  const [branch, setBranch] = useState({
    name: inquiryItem.branchOfficeName,
    cMain: false,
    facilityCode: inquiryItem.facilityCode,
  });
  // 첨부파일
  const [attachments, setAttachments] = useState([...inquiryItem.attachments]);
  // BottomSheet visible 설정.
  const [visibleBS, setVisibleBS] = useState({
    visible: false,
    format: InquiryAction.Registration,
  });

  // event handler /////////////////////////////////////////////////////////////////////////////////
  const onPressRegister = () => {
    if (title?.length < 1) {
      displayToast('제목을 입력하세요');
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
  };

  const onPressBack = () => {
    if (title.length > 0 || content.length > 0) {
      const newSheetStatus = produce(visibleBS, draft => {
        draft.visible = true;
        draft.format = InquiryAction.CancelInquiry;
      });
      setVisibleBS(newSheetStatus);
    } else {
      navigation.pop();
    }
  };

  const onBSConfirm = async () => {
    switch (visibleBS.format) {
      case InquiryAction.Registration:
        const staffId = await userData.getStaffId();

        const uploadFiles = attachments.map(file => ({
          name: file.name,
          uri: Platform.OS === 'android' ? file.path : file.path.replace('file://', ''),
          type: file.type,
        }));

        const uploadFilesWOS3 = uploadFiles.filter(file => !file.uri.startsWith('https://'));
        const deleteFiles = inquiryItem.attachments.filter(
          file => uploadFiles.findIndex(attach => attach.uri === file.path) === -1,
        );
        console.log('original:', uploadFiles);
        console.log('uploadFiles:', uploadFilesWOS3);
        console.log('deleteFiles: ', deleteFiles);

        const formData = new FormData();
        uploadFilesWOS3.map(item => formData.append('image', item));
        formData.append('index', inquiryItem.idx);
        formData.append('title', title);
        formData.append('content', content);
        formData.append('category', classify.index);
        formData.append('facilityCode', branch.facilityCode);
        formData.append('staffId', staffId);

        await apiInquiryUpdate(
          formData,
          onSuccessUpdate(navigation, 'tb_Qna', inquiryItem.idx, deleteFiles),
        );

        break;
      case InquiryAction.CancelInquiry:
        navigation.goBack();
        break;
      case InquiryAction.Error:
        break;
    }

    const newSheetStatus = produce(visibleBS, draft => {
      draft.visible = false;
    });
    setVisibleBS(newSheetStatus);
  };

  const onSuccessUpdate = (nav, tableName, index, deleteFiles) => async data => {
    if (deleteFiles.length > 0) {
      await apiDeleteFiles(tableName, index, deleteFiles);
    }
    nav.navigate('BO_Detail', {index: inquiryItem.idx, refresh: true});
  };

  const onBSContinue = () => {
    const newSheetStatus = produce(visibleBS, draft => {
      draft.visible = false;
    });
    setVisibleBS(newSheetStatus);
  };

  const onClassify = async () => {
    console.log('onClassify');
    await apiInquiryQnaCategory(onSuccessQnaCategory(navigation));
  };

  const onSuccessQnaCategory = nav => data =>
    navigation.navigate('BO_Inquiry_Classify', {
      returnRouteName: 'BO_Detail_Modify',
      qnaCategory: data,
    });

  const onPressBranch = data => {
    setBranch(data);
  };

  return (
    <SafeAreaView edges={['bottom']} style={[styles.fullscreen]} mode="margin">
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
            classify.mainName !== undefined
              ? classify.mainName + ' > ' + classify.name
              : classify.name
          }
          style={{color: globalStyles.color.text}}
          hasMarginBottom
          onPress={onClassify}
        />
        <SelectionList
          hasMarginBottom
          data={branchList}
          setSelected={onPressBranch}
          defaultSelection={branch.name}
        />
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
          value={content}
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
  },
  container: {
    flex: 1,
    padding: 12,
    paddingBottom: 12,
  },
});

// Helper
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

export default BO_DetailModify;
