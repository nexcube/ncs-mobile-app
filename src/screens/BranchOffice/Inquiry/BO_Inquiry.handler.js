import axios from 'axios';
import produce from 'immer';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
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
  classSelection,
  branchSelection,
  contents,
  navigation,
}) {
  const newSheetStatus = produce(visibleBS, draft => {
    draft.visible = false;
  });
  setVisibleBS(newSheetStatus);

  switch (visibleBS.format) {
    case InquiryAction.Registration:
      console.log(title);
      console.log(classSelection);
      console.log(branchSelection);
      console.log(contents);

      const jwt = await userData.getJWT();
      const token = `${jwt}`;
      const staffId = await userData.getStaffId();
      console.log(staffId);

      axios
        .post(
          '/inquiry/register',
          JSON.stringify({
            title: title,
            content: contents,
            categoryIndex: classSelection.index,
            facilityCode: branchSelection.facilityCode,
            staffId: staffId,
            status: 'NEW',
          }),
          {
            headers: {
              'Content-Type': 'application/json',
              authorization: token,
            },
          },
        )
        .then(res => {
          console.log(res.data);
          navigation.pop();
        })
        .catch(error => console.error(error));

      break;
    case InquiryAction.CancelInquiry:
      navigation.goBack();
      break;
    case InquiryAction.Error:
      break;
  }
}

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
  classSelection,
  defaultClassString,
  branchSelection,
  contents,
  visibleBS,
  setVisibleBS,
  InquiryAction,
}) {
  if (title.length < 1) {
    displayToast('제목을 입력하세요');
    return;
  }
  if (classSelection === defaultClassString) {
    displayToast('분류선택을 지정해 주세요');
    return;
  }
  if (branchSelection.branchName === '') {
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
  const jwt = await userData.getJWT();
  const token = `${jwt}`;
  axios
    .get('/inquiry/qnaCategory', {
      headers: {authorization: token},
    })
    .then(res => {
      navigation.navigate('BO_Inquiry_Classify', {qnaCategory: res.data});
    })
    .catch(error => console.error(error));
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
