import React, {useContext, useEffect, useState} from 'react';
import {Platform, ScrollView, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BottomSheet, {BottomSheetType} from '../../../../components/common/bottomsheet/BottomSheet';
import CustomInput from '../../../../components/common/CustomInput';
import CustomToast, {Toast} from '../../../../components/common/CustomToast';
import HeaderBackButton from '../../../../components/common/HeaderBackButton';
import HeaderButton from '../../../../components/common/HeaderButton';
import Attachments from '../../../../components/BranchOffice/Dashboard/Attachments';
import InquiryBottomBar from '../../../../components/BranchOffice/Dashboard/InquiryBottomBar';
import globalStyles from '../../../../styles/globalStyles';
import apiCommentUpdate from '../../../../services/api/comment/update';
import apiInquiryDeleteFiles from '../../../../services/api/inquiry/deleteFiles';
import useBottomSheet from '../../../../hooks/useBottomSheet';
import SelectionList from '../../../../components/common/SelectionList';
import {QnaStatus} from '../../../../services/config';
import UserContext from '../../../../services/context/UserContext';
import apiInquiryUpdateStatus from '../../../../services/api/inquiry/updateStatus';

function BO_DetailModifyComment({navigation, route}) {
  const originalComment = route.params.data;
  const commentIndex = originalComment.idx;
  const qnaIndex = route.params.qnaIndex;
  const [content, setContent] = useState(originalComment.content);
  const [attachments, setAttachments] = useState(originalComment.attachments);
  const [qnaStatus, setQnaStatus] = useState(route.params.status);
  const [registerBSConfig, showRegisterBS, hideRegisterBS] = useBottomSheet(
    BottomSheetType.Registration,
  );
  const [cancelBSConfig, showCancelBS, hideCancelBS] = useBottomSheet(BottomSheetType.Cancel);
  const [User, , isHO] = useContext(UserContext);

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

    showRegisterBS();
  };
  const onBack = () => {
    if (content.length > 0) {
      showCancelBS();
    } else {
      navigation.pop();
    }
  };

  const onBSConfirmRegister = async () => {
    hideRegisterBS();

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
    uploadFilesWOS3.map(item => formData.append('image', item));
    formData.append('index', commentIndex);
    formData.append('content', content);

    await apiCommentUpdate(
      formData,
      onSuccessRegister(navigation, 'tb_QnaReply', originalComment.idx, deleteFiles),
    );
  };

  const onBSConfirmCancel = async () => {
    hideCancelBS();
    navigation.goBack();
  };

  const onSuccessRegister = (nav, tableName, idx, deleteFiles) => async data => {
    if (deleteFiles.length > 0) {
      await apiInquiryDeleteFiles(tableName, idx, deleteFiles);
    }
    if (qnaStatus !== route.params.status) {
      apiInquiryUpdateStatus(qnaIndex, qnaStatus.value).then(res => {
        console.log('문의의 진행 상태가 변경되었습니다.');
      });
    }
    nav.goBack();
  };

  return (
    <SafeAreaView edges={['bottom']} style={[styles.fullscreen]}>
      <ScrollView style={[styles.container]}>
        {isHO && (
          <SelectionList
            placeholder="상태 변경"
            hasMarginBottom
            data={[QnaStatus.NEW, QnaStatus.INPROGRESS, QnaStatus.DONE]}
            setSelected={setQnaStatus}
            defaultSelection={qnaStatus.name}
          />
        )}
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
        onCancel={hideRegisterBS}
      />
      <BottomSheet sheetStatus={cancelBSConfig} onOk={onBSConfirmCancel} onCancel={hideCancelBS} />
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
