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

const initialBranchSelection = {branchName: '', cMain: false, facilityCode: ''};
const initialClass = {name: ' 분류선택', index: -1};

function BO_Inquiry({navigation, route}) {
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
              classSelection: classify,
              defaultClassString: initialClass,
              branchSelection: branch,
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

  //파라미터 처리
  useEffect(() => {
    if (route.params?.selection) {
      setClassify(route.params.selection);
    }
  }, [route.params]);

  // 제목
  const [title, setTitle] = useState('');
  // 분류선택
  const [classify, setClassify] = useState(initialClass);
  // 관련 지점
  const [branch, setBranch] = useState(initialBranchSelection);
  // 내용
  const [content, setContent] = useState('');

  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [cameras, setCameras] = useState([]);

  // BottomSheet visible 설정.
  const [visibleBS, setVisibleBS] = useState({
    visible: false,
    format: InquiryAction.Registration,
  });

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
          title={classify.name}
          style={classify.name !== initialClass.name ? {color: globalStyles.color.text} : {}}
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
        <Attachments
          images={images}
          setImages={setImages}
          files={files}
          setFiles={setFiles}
          cameras={cameras}
          setCameras={setCameras}
        />
      </ScrollView>

      <InquiryBottomBar
        images={images}
        setImages={setImages}
        files={files}
        setFiles={setFiles}
        cameras={cameras}
        setCameras={setCameras}
      />
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
