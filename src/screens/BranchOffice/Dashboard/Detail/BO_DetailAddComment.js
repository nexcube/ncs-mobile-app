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
import userData from '../../../../services/storage/DeviceStorage';
import apiCommentRegister from '../../../../services/api/comment/register';
import useBottomSheet from '../../../../hooks/useBottomSheet';
import SelectionList from '../../../../components/common/SelectionList';
import {QnaStatus} from '../../../../services/config';
import UserContext from '../../../../services/context/UserContext';
import apiInquiryUpdateStatus from '../../../../services/api/inquiry/updateStatus';

function BO_DetailAddComment({navigation, route}) {
  const index = route.params.index;
  // console.log(route.params.status);
  const [qnaStatus, setQnaStatus] = useState(route.params.status);
  const [content, setContent] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [registerBSConfig, showRegisterBS, hideRegisterBS] = useBottomSheet(
    BottomSheetType.Registration,
  );
  const [cancelBSConfig, showCancelBS, hideCancelBS] = useBottomSheet(BottomSheetType.Cancel);
  const [User, , isHO] = useContext(UserContext);

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

    const staffId = await userData.getStaffId();

    const uploadFiles = attachments.map(file => ({
      name: file.name,
      uri: Platform.OS === 'android' ? file.path : file.path.replace('file://', ''),
      type: file.type,
    }));

    // console.log(JSON.stringify(uploadFiles, null, '\t'));

    const formData = new FormData();
    uploadFiles.map(item => formData.append('image', item));
    formData.append('index', index);
    formData.append('content', content);
    formData.append('staffId', staffId);

    // console.log(JSON.stringify(formData, null, '\t'));
    await apiCommentRegister(formData, onSuccessRegister(navigation));
  };
  const onBSConfirmCancel = () => navigation.goBack();

  const onSuccessRegister = nav => () => {
    if (qnaStatus !== route.params.status) {
      apiInquiryUpdateStatus(index, qnaStatus.value).then(data => {
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

export default BO_DetailAddComment;
