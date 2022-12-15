import axios from 'axios';
import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useEffect} from 'react/cjs/react.development';
import CustomInput from '../../../../components/common/CustomInput';
import HeaderButton from '../../../../components/common/HeaderButton';
import SelectionButton from '../../../../components/common/SelectionButton';
import SelectionList from '../../../../components/common/SelectionList';
import userData from '../../../../services/DeviceStorage';
import globalStyles from '../../../../styles/global';
import InquiryBottomBar from '../../../../components/Inquiry/InquiryBottomBar';

function BO_DetailModify({navigation, route}) {
  const inquiryItem = route.params.inquiryItem;
  const branchOfficeList = route.params.branchOfficeList;

  //분류선택 페이지에서 온 파라미터 처리
  useEffect(() => {
    if (route.params?.selection) {
      //{"index": 9, "mainIndex": 8, "mainName": "가맹관리", "name": "재계약가맹문의"}
      setClassify(route.params.selection);
    }
  }, [route.params]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderButton title="등록" onPress={() => console.log('등록')} />,
      // headerBackVisible: false,
      // headerLeft: () => (
      //   <HeaderBackButton
      //     onPress={() =>
      //       onBack({
      //         navigation,
      //         title,
      //         content,
      //         InquiryAction,
      //         visibleBS,
      //         setVisibleBS,
      //       })
      //     }
      //   />
      // ),
    });
  });

  console.log(JSON.stringify(inquiryItem, null, '\t'));

  const [title, setTitle] = useState(inquiryItem.title);
  const [content, setContent] = useState(inquiryItem.content);
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

  const onClassify = async () => {
    const jwt = await userData.getJWT();
    const token = `${jwt}`;
    axios
      .get('/inquiry/qnaCategory', {
        headers: {authorization: token},
      })
      .then(res => {
        navigation.navigate('BO_Inquiry_Classify', {
          returnRouteName: 'BO_Detail_Modify',
          qnaCategory: res.data,
        });
      })
      .catch(error => console.error(error));
  };

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
          data={branchOfficeList}
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
      </ScrollView>
      <InquiryBottomBar
      // images={images}
      // setImages={setImages}
      // files={files}
      // setFiles={setFiles}
      // cameras={cameras}
      // setCameras={setCameras}
      // attachments={attachments}
      // setAttachments={setAttachments}
      />
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

export default BO_DetailModify;
