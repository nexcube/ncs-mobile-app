import axios from 'axios';
import produce from 'immer';
import RNFS, {DocumentDirectoryPath, TemporaryDirectoryPath} from 'react-native-fs';
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
      console.log(title);
      console.log(classify);
      console.log(branch);
      console.log(content);

      const jwt = await userData.getJWT();
      const token = `${jwt}`;
      const staffId = await userData.getStaffId();

      console.log(attachments);
      const uploadFiles = attachments.map(file => ({
        name: file.path.split('/').pop().split('.')[0],
        filename: file.path.split('/').pop(),
        filepath: TemporaryDirectoryPath + '/' + file.path.split('/').pop(),
        filetype: file.type,
      }));
      console.log(JSON.stringify(uploadFiles, null, '\t'));
      console.log(axios.defaults.baseURL);
      RNFS.uploadFiles({
        toUrl: `${axios.defaults.baseURL}/inquiry/register`,
        files: uploadFiles,
        method: 'POST',
        headers: {
          Accept: 'application/json',
          authorization: token,
        },
        fields: {
          title: title,
          content: content,
          categoryIndex: classify.index,
          facilityCode: branch.facilityCode,
          staffId: staffId,
          status: 'NEW',
        },
        begin: uploadBegin,
        progress: uploadProgress,
      })
        .promise.then(response => {
          if (response.statusCode === 200) {
            console.log('FILES UPLOADED!');
          } else {
            console.log('SERVER ERROR');
          }
        })
        .catch(error => {
          if (error.description === 'cancelled') {
            console.log('Canceled');
          }
          console.error(error);
        });

      // axios
      //   .post(
      //     '/inquiry/register',
      //     JSON.stringify({
      //       title: title,
      //       content: content,
      //       categoryIndex: classify.index,
      //       facilityCode: branch.facilityCode,
      //       staffId: staffId,
      //       status: 'NEW',
      //     }),
      //     {
      //       headers: {
      //         'Content-Type': 'application/json',
      //         authorization: token,
      //       },
      //     },
      //   )
      //   .then(res => {
      //     console.log(res.data);
      //     navigation.pop();
      //   })
      //   .catch(error => console.error(error));

      break;
    case InquiryAction.CancelInquiry:
      navigation.goBack();
      break;
    case InquiryAction.Error:
      break;
  }
}

const uploadBegin = response => {
  const jobId = response.jobId;
  console.log('UPLOAD HAS BEGUN! JobId: ' + jobId);
};

const uploadProgress = response => {
  const percentage = Math.floor(response.totalBytesSent / response.totalBytesExpectedToSend) * 100;
  console.log('UPLOAD IS ' + percentage + '% DONE!');
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
  console.log(branch);
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
  const jwt = await userData.getJWT();
  const token = `${jwt}`;
  axios
    .get('/inquiry/qnaCategory', {
      headers: {authorization: token},
    })
    .then(res => {
      navigation.navigate('BO_Inquiry_Classify', {
        returnRouteName: 'BO_Inquiry',
        qnaCategory: res.data,
      });
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
