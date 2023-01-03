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
import apiCommentUpdate from '../../../../services/api/comment/update';
import apiInquiryDeleteFiles from '../../../../services/api/inquiry/deleteFiles';

function BO_DetailModifyComment({navigation, route}) {
  // console.log('BO_DetailModifyComment : ', route.params.data);
  const originalComment = route.params.data;
  const index = originalComment.idx;
  const [content, setContent] = useState(originalComment.content);
  const [attachments, setAttachments] = useState(originalComment.attachments);
  const [visibleBS, setVisibleBS] = useState({
    visible: false,
    format: InquiryAction.Registration,
  });

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderButton title="등록" onPress={() => onUpdate()} />,
      headerBackVisible: false,
      headerLeft: () => <HeaderBackButton onPress={() => onBack()} />,
    });
  });

  const onUpdate = () => {
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
        const uploadFiles = attachments.map(file => ({
          name: file.name,
          uri: Platform.OS === 'android' ? file.path : file.path.replace('file://', ''),
          type: file.type,
        }));

        const uploadFilesWOS3 = uploadFiles.filter(file => !file.uri.startsWith('https://'));
        const deleteFiles = originalComment.attachments.filter(
          file => uploadFiles.findIndex(attach => attach.uri === file.path) === -1,
        );

        const formData = new FormData();
        // formData.append('images', uploadFiles);
        uploadFilesWOS3.map(item => formData.append('image', item));
        formData.append('index', index);
        formData.append('content', content);

        await apiCommentUpdate(
          formData,
          onSuccessRegister(navigation, 'tb_QnaReply', originalComment.idx, deleteFiles),
        );

        break;
      case InquiryAction.CancelInquiry:
        navigation.goBack();
        break;
      case InquiryAction.Error:
        break;
    }
  };

  const onSuccessRegister = (nav, tableName, idx, deleteFiles) => async data => {
    if (deleteFiles.length > 0) {
      await apiInquiryDeleteFiles(tableName, idx, deleteFiles);
    }
    nav.goBack();
  };
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

export default BO_DetailModifyComment;
