import React, {useMemo, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import ChoiceButton from '../../../components/common/ChoiceButton';
import SearchTextInput from '../../../components/Inquiry/SearchTextInput';
import ClassifyList from '../../../components/InquiryClassify/ClassifyList';
import globalStyles from '../../../styles/global';

function BO_InquiryClassify({navigation, route}) {
  const qnaCategoryData = route?.params?.qnaCategory;
  const [mainCategoryIndex, setMainCategoryIndex] = useState(-1);
  const [searchString, setSearchString] = useState('');

  const mainCategoryList = useMemo(
    () => qnaCategoryData.filter(item => item.it_ParentQnaCatIdx === -1),
    [qnaCategoryData],
  );

  const secondaryCategoryList = (choiceIndex, search) =>
    choiceIndex !== -1
      ? qnaCategoryData.filter(value => value.it_ParentQnaCatIdx === choiceIndex)
      : qnaCategoryData.filter(value => value.st_QnaCatName.includes(search));

  const isNotSelected = mainCategoryIndex === -1 && searchString === '';

  const onPressMainCategory = item => {
    setSearchString(prev => '');
    setMainCategoryIndex(item.it_QnaCatIdx);
  };

  const onChangeSearch = text => {
    setMainCategoryIndex(-1);
    setSearchString(text);
  };

  const onPressSecondaryCategory = (index, name) => {
    navigation.navigate({
      name: 'BO_Inquiry',
      screen: 'BO_Inquiry',
      params: {selection: {index, name: name}},
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
          value={searchString}
          onChangeText={onChangeSearch}
        />
        <View style={[styles.wrapper]}>
          {mainCategoryList.map((item, index) => {
            return (
              <ChoiceButton
                key={index}
                index={item.it_QnaCatIdx}
                title={item.st_QnaCatName}
                selection={mainCategoryIndex}
                onPress={() => onPressMainCategory(item)}
              />
            );
          })}
        </View>
      </View>
      <View style={[styles.listWrapper, isNotSelected && styles.noSelection]}>
        {isNotSelected ? (
          <View>
            <Text>위에서 종류를 먼저 선택하시거나 검색하세요.</Text>
            <Image style={[styles.image]} source={require('../../../../assets/images/Find.png')} />
          </View>
        ) : (
          <ClassifyList
            list={secondaryCategoryList(mainCategoryIndex, searchString)}
            onPress={onPressSecondaryCategory}
          />
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
