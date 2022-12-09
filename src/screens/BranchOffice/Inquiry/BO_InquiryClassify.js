import React, {useEffect, useState} from 'react';
import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {getStatusBarHeight} from 'react-native-safearea-height';
import ChoiceButton from '../../../components/common/ChoiceButton';
import CustomButton from '../../../components/common/CustomButton';
import SearchTextInput from '../../../components/Inquiry/SearchTextInput';
import ClassifyList from '../../../components/InquiryClassify/ClassifyList';
import globalStyles from '../../../styles/global';

function BO_InquiryClassify({navigation, route}) {
  const [selectionChoice, setSelectionChoice] = useState(-1);

  const onPressChoice = index => {
    setSelectionChoice(index);
  };

  const onPressItem = (index, name) => {
    navigation.navigate({
      name: 'BO_Inquiry',
      screen: 'BO_Inquiry',
      params: {selectionChoice: selectionChoice, selectionItem: index, name: name},
      merge: true,
    });
  };

  return (
    <View style={[styles.fullscreen]}>
      <View style={[styles.statusBar]}>
        <SearchTextInput
          hasMarginBottom
          keyboardType="default"
          returnKeyType="search"
          autoCapitalize="none"
          placeholder="제목, 내용, 댓글, 담당자로 검색"
        />
        <View style={[styles.wrapper]}>
          {buttons.map((item, index) => {
            return <ChoiceButton key={index} title={item} onPress={() => onPressChoice(index)} />;
          })}
        </View>
      </View>
      <View style={[styles.listWrapper, selectionChoice === -1 && styles.noSelection]}>
        {selectionChoice === -1 ? (
          <View>
            <Text>위에서 종류를 먼저 선택하시거나 검색하세요.</Text>
            <Image style={[styles.image]} source={require('../../../../assets/images/Find.png')} />
          </View>
        ) : (
          <ClassifyList list={list} onPress={onPressItem} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
  },
  statusBar: {
    padding: 12,
    backgroundColor: globalStyles.color.purple,
  },
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  listWrapper: {
    paddingHorizontal: 12,
    backgroundColor: globalStyles.color.white,
  },
  noSelection: {
    backgroundColor: globalStyles.color.background,
    alignItems: 'center',
    paddingVertical: 50,
  },
  image: {
    marginTop: 50,
  },
});

export default BO_InquiryClassify;

const buttons = ['로열티', '교육', '개별지도', '인사/노무', '지점 오픈', 'NEMS'];
const list = [
  '루트코스',
  '사례 연구',
  '재입사',
  '직무전환',
  '학점관리',
  '루트코스',
  '사례 연구',
  '재입사',
  '직무전환',
  '학점관리',
  '루트코스',
  '사례 연구',
  '재입사',
  '직무전환',
  '학점관리',
  '루트코스',
  '사례 연구',
  '재입사',
  '직무전환',
  '학점관리',
];
