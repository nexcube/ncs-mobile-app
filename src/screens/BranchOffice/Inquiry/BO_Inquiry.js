import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import CustomInput from '../../../components/common/CustomInput';
import HeaderButton from '../../../components/common/HeaderButton';
import SelectionList from '../../../components/common/SelectionList';
import Attachments from '../../../components/Inquiry/Attachments';
import {SafeAreaView} from 'react-native-safe-area-context';
import InquiryBottomBar from '../../../components/Inquiry/InquiryBottomBar';
import BottomSheet, {InquiryAction} from '../../../components/common/bottomsheet/BottomSheet';
import HeaderBackButton from '../../../components/common/HeaderBackButton';
import CustomToast from '../../../components/common/CustomToast';
import globalStyles from '../../../styles/global';
import SelectionButton from '../../../components/common/SelectionButton';
import {
  onBack,
  onBSConfirm,
  onBSContinue,
  onRegistration,
  onInquiryClassify,
} from './BO_Inquiry.handler';

const initialBranch = {name: '', cMain: false, facilityCode: ''};
const initialClassify = {name: ' 분류선택', index: -1, mainName: '', mainIndex: -1};

function BO_Inquiry({navigation, route}) {
  // 라우터 파라미터
  const branchOfficeList = route.params?.branchOfficeList;

  // 헤더 버튼 추가.
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButton
          title="등록"
          onPress={() =>
            onRegistration({
              title,
              classify,
              initialClassify,
              branch: branch,
              contents: content,
              visibleBS,
              setVisibleBS,
              InquiryAction,
            })
          }
        />
      ),
      headerBackVisible: false,
      headerLeft: () => (
        <HeaderBackButton
          onPress={() =>
            onBack({
              navigation,
              title,
              content,
              InquiryAction,
              visibleBS,
              setVisibleBS,
            })
          }
        />
      ),
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

  useEffect(() => {
    console.log('start ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`');
    attachments.map(item => console.log(item));
    console.log('end   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`');
  }, [attachments]);

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
          onPress={() => onInquiryClassify({navigation})}
        />

        <SelectionList hasMarginBottom data={branchOfficeList} setSelected={setBranch} />
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
        onOk={() =>
          onBSConfirm({
            visibleBS,
            setVisibleBS,
            InquiryAction,
            title,
            classSelection: classify,
            branchSelection: branch,
            contents: content,
            navigation,
          })
        }
        onCancel={() => onBSContinue({visibleBS, setVisibleBS})}
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
  photo: {
    // backgroundColor: 'white',
    borderRadius: 64,
    width: 128,
    height: 128,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default BO_Inquiry;
