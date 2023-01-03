import React, {useEffect, useState} from 'react';
import {Platform, ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import BottomSheet, {InquiryAction} from '../../../../components/common/bottomsheet/BottomSheet';
import CustomInput from '../../../../components/common/CustomInput';
import CustomToast, {Toast} from '../../../../components/common/CustomToast';
import HeaderBackButton from '../../../../components/common/HeaderBackButton';
import HeaderButton from '../../../../components/common/HeaderButton';
import Attachments from '../../../../components/BranchOffice/Inquiry/Attachments';
import InquiryBottomBar from '../../../../components/BranchOffice/Inquiry/InquiryBottomBar';
import globalStyles from '../../../../styles/globalStyles';
import produce from 'immer';
import userData from '../../../../services/storage/DeviceStorage';
import apiCommentRegister from '../../../../services/api/comment/register';

function BO_DetailAddComment({navigation, route}) {
  const index = route.params.index;
  const [content, setContent] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [visibleBS, setVisibleBS] = useState({
    visible: false,
    format: InquiryAction.Registration,
  });

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderButton title="등록" onPress={() => onRegistration()} />,
      headerBackVisible: false,
      headerLeft: () => <HeaderBackButton onPress={() => onBack()} />,
    });
  });

  const onRegistration = () => {
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
  const onBack = () => {
    if (content.length > 0) {
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
        formData.append('index', index);
        formData.append('content', content);
        formData.append('staffId', staffId);

        // console.log(JSON.stringify(formData, null, '\t'));
        await apiCommentRegister(formData, onSuccessRegister(navigation));

        break;
      case InquiryAction.CancelInquiry:
        navigation.goBack();
        break;
      case InquiryAction.Error:
        break;
    }
  };

  const onSuccessRegister = nav => () => nav.goBack();
  const onBSContinue = () => {
    const newSheetStatus = produce(visibleBS, draft => {
      draft.visible = false;
    });
    setVisibleBS(newSheetStatus);
  };

  return (
    <SafeAreaView edges={['bottom']} style={[styles.fullscreen]}>
      <ScrollView style={[styles.container]}>
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
});

export default BO_DetailAddComment;
