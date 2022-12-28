import produce from 'immer';
import {Platform} from 'react-native';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import apiInquiryQnaCategory from '../../../services/api/inquiryQnaCategory';
import apiInquiryRegister from '../../../services/api/inquiryRegister';
import userData from '../../../services/DeviceStorage';

// 앱바 백 버튼 처리
function onBack({navigation, title, content, InquiryAction, visibleBS, setVisibleBS}) {
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

// 바텀시트 ok 클릭시
async function onBSConfirm({
  visibleBS,
  setVisibleBS,
  InquiryAction,
  title,
  classify,
  branch,
  content,
  navigation,
  attachments,
}) {
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

      apiInquiryRegister(formData, onSuccessRegister(navigation));

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
function onBSContinue({visibleBS, setVisibleBS}) {
  const newSheetStatus = produce(visibleBS, draft => {
    draft.visible = false;
  });
  setVisibleBS(newSheetStatus);
}

// 등록 버튼 처리
function onRegistration({
  title,
  classify,
  initialClassify,
  branch,
  contents,
  visibleBS,
  setVisibleBS,
  InquiryAction,
}) {
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
  if (contents.length < 1) {
    displayToast('내용을 입력해 주세요');
    return;
  }

  const newBSConfig = produce(visibleBS, draft => {
    draft.visible = true;
    draft.format = InquiryAction.Registration;
  });
  setVisibleBS(newBSConfig);
}

// 분류선택 버튼 클릭시
const onInquiryClassify = async ({navigation}) => {
  await apiInquiryQnaCategory(onSuccessQnaCategory(navigation));
};

const onSuccessQnaCategory = nav => data => {
  nav.navigate('BO_Inquiry_Classify', {
    returnRouteName: 'BO_Inquiry',
    qnaCategory: data,
  });
};

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

export {onBack, onBSConfirm, onBSContinue, onRegistration, onInquiryClassify};
