import React, {useMemo, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import ChoiceButton from '../../../components/common/ChoiceButton';
import SearchTextInput from '../../../components/BranchOffice/Inquiry/SearchTextInput';
import ClassifyList from '../../../components/BranchOffice/InquiryClassify/ClassifyList';
import globalStyles from '../../../styles/globalStyles';

function BO_InquiryClassify({navigation, route}) {
  const qnaCategoryData = route?.params?.qnaCategory;
  const returnRouteName = route.params?.returnRouteName;

  const [mainCategory, setMainCategory] = useState({});

  const [searchString, setSearchString] = useState('');

  const mainCategoryList = useMemo(
    () => qnaCategoryData.filter(item => item.it_ParentQnaCatIdx === -1),
    [qnaCategoryData],
  );

  const secondaryCategoryList = (choiceIndex, search) =>
    choiceIndex !== -1
      ? qnaCategoryData.filter(value => value.it_ParentQnaCatIdx === choiceIndex)
      : qnaCategoryData.filter(value => value.st_QnaCatName.includes(search));

  const isNotSelected = mainCategory.index === -1 && searchString === '';

  const onPressMainCategory = item => {
    setSearchString(prev => '');
    setMainCategory({index: item.it_QnaCatIdx, name: item.st_QnaCatName});
  };

  const onChangeSearch = text => {
    setMainCategory({});
    setSearchString(text);
  };

  const onPressSecondaryCategory = (index, name) => {
    navigation.navigate({
      name: returnRouteName,
      screen: returnRouteName,
      params: {
        selection: {index, name: name, mainIndex: mainCategory.index, mainName: mainCategory.name},
      },
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
                selection={mainCategory.index}
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
            list={secondaryCategoryList(mainCategory.index, searchString)}
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
