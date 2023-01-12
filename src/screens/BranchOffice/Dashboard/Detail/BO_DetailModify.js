import React, {useEffect, useState} from 'react';
import {Platform, ScrollView, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomInput from '../../../../components/common/CustomInput';
import HeaderButton from '../../../../components/common/HeaderButton';
import SelectionButton from '../../../../components/common/SelectionButton';
import SelectionList from '../../../../components/common/SelectionList';
import userData from '../../../../services/storage/DeviceStorage';
import globalStyles from '../../../../styles/globalStyles';
import InquiryBottomBar from '../../../../components/BranchOffice/Dashboard/InquiryBottomBar';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import CustomToast from '../../../../components/common/CustomToast';
import HeaderBackButton from '../../../../components/common/HeaderBackButton';
import produce from 'immer';
import BottomSheet, {BottomSheetType} from '../../../../components/common/bottomsheet/BottomSheet';
import apiInquiryCategory from '../../../../services/api/inquiry/category';
import apiInquiryUpdate from '../../../../services/api/inquiry/update';
import Attachments from '../../../../components/BranchOffice/Dashboard/Attachments';
import apiInquiryDeleteFiles from '../../../../services/api/inquiry/deleteFiles';
import useBottomSheet from '../../../../hooks/useBottomSheet';

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

  // BottomSheet
  const [registerBSConfig, showRegisterBS, hideRegisterBS] = useBottomSheet(
    BottomSheetType.Registration,
  );
  const [cancelBSConfig, showCancelBS, hideCancelBS] = useBottomSheet(BottomSheetType.Cancel);

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
    showRegisterBS();
  };

  const onPressBack = () => {
    if (title.length > 0 || content.length > 0) {
      showCancelBS();
    } else {
      navigation.pop();
    }
  };

  const onBSConfirmRegister = async () => {
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

    const formData = new FormData();
    uploadFilesWOS3.map(item => formData.append('image', item));
    formData.append('index', inquiryItem.idx);
    formData.append('title', title);
    formData.append('content', content);
    formData.append('category', classify.index);
    formData.append('facilityCode', branch.facilityCode);
    formData.append('staffId', staffId);
    formData.append('assignedStaffId', inquiryItem.assignedStaffId);

    await apiInquiryUpdate(
      formData,
      onSuccessUpdate(navigation, 'tb_Qna', inquiryItem.idx, deleteFiles),
    );
    hideRegisterBS();
  };

  const onBSConfirmCancel = () => {
    navigation.goBack();
    hideCancelBS();
  };

  const onSuccessUpdate = (nav, tableName, index, deleteFiles) => async data => {
    if (deleteFiles.length > 0) {
      await apiInquiryDeleteFiles(tableName, index, deleteFiles);
    }
    nav.navigate('BO_Detail', {index: inquiryItem.idx, refresh: true});
  };

  const onBSContinueRegister = () => {
    hideRegisterBS();
  };

  const onBSContinueCancel = () => {
    hideCancelBS();
  };

  const onClassify = async () => {
    console.log('onClassify');
    await apiInquiryCategory(onSuccessQnaCategory(navigation));
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
        sheetStatus={registerBSConfig}
        onOk={onBSConfirmRegister}
        onCancel={onBSContinueRegister}
      />
      <BottomSheet
        sheetStatus={cancelBSConfig}
        onOk={onBSConfirmCancel}
        onCancel={onBSContinueCancel}
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
