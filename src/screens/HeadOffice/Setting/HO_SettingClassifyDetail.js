import React, {useEffect, useState} from 'react';
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {VerticalSpace24} from '../../../components/common/VerticalSpace';
import AssignedStaffComp from '../../../components/HeadOffice/Detail/AssignedStaffComp';
import AssignedWatchComp from '../../../components/HeadOffice/Detail/AssignedWatchComp';
import CategoryAssignedComp from '../../../components/HeadOffice/Detail/CategoryAssignedComp';
import apiCategoryUpdateKeyword from '../../../services/api/category/updateKeyword';
import globalStyles from '../../../styles/globalStyles';

function HO_SettingClassifyDetail({navigation, route}) {
  const detail = route.params.item;
  const [searchKeyword, setSearchKeyword] = useState(detail.qnaKeyword);

  function containsWhitespace(str) {
    const isHaveSpace = /\s/.test(str);
    // console.log(str, isHaveSpace);
    return isHaveSpace;
  }

  const onPressSave = () => {
    if (searchKeyword.split(',').every(word => !containsWhitespace(word))) {
      console.log(searchKeyword);
      console.log('없넹');

      apiCategoryUpdateKeyword(detail.idx, searchKeyword).then(data => {
        console.log(data);
      });
    } else {
      Alert.alert('주의', '검색 키워드 단어에 공백이 있습니다.', [
        {text: 'OK', onPress: () => null},
      ]);
    }
  };
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={onPressSave}>
          <Text style={[styles.save]}>저장</Text>
        </TouchableOpacity>
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchKeyword]);

  const onChangeSearchKeyword = e => {
    setSearchKeyword(e);
  };

  const [refresh, setRefresh] = useState(false);

  const onChangeAssigned = () => {
    navigation.navigate('HO_Setting_Classifier_Change', {assigned: detail});
  };

  const onChangeWatch = () => {
    console.log('onChangeWatch');
  };

  return (
    <View style={[styles.fullscreen]}>
      <VerticalSpace24 />
      <View style={[styles.titleContainer]}>
        <Text style={[styles.titleName]}>분류 키워드</Text>
        <Text style={[styles.titleKeyword]}>{detail.qnaCatName}</Text>
      </View>
      <VerticalSpace24 />
      <View style={[styles.searchKeywordContainer]}>
        <Text style={[styles.searchKeywordName]}>검색 키워드</Text>
        <View style={[styles.textInputContainer]}>
          <TextInput
            multiline
            returnKeyType="done"
            rows={4}
            style={[styles.searchKeywordTextInput]}
            value={searchKeyword}
            onChangeText={onChangeSearchKeyword}
          />
        </View>
        <Text style={[styles.searchKeywordDescription]}>
          분류 검색시 상기 키워드들도 검색대상이 됩니다. 분류명과 연관된 단어들을 추가입력하세요.
          (쉼표로 구분)
        </Text>
      </View>
      <VerticalSpace24 />
      <VerticalSpace24 />
      <ScrollView style={[styles.assignedStaff]} alwaysBounceVertical={false}>
        <View style={[styles.separator]} />
        <AssignedStaffComp
          staffId={detail.staffId}
          title="분류 담당자"
          isChange={true}
          onChange={onChangeAssigned}
        />
        <View style={[styles.watchList]}>
          <AssignedWatchComp
            catIdx={detail.idx}
            refresh={refresh}
            isChange={true}
            onChange={onChangeWatch}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  fullscreen: {},
  save: {
    fontFamily: globalStyles.font.regular,
    fontSize: 15,
    fontWeight: '500',
    color: globalStyles.color.white,
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleName: {
    fontFamily: globalStyles.font.regular,
    fontWeight: '900',
    fontSize: 15,
    color: globalStyles.color.grayDark,
    paddingBottom: 6,
  },
  titleKeyword: {
    fontFamily: globalStyles.font.regular,
    fontWeight: '900',
    fontSize: 22,
    color: globalStyles.color.text,
  },
  searchKeywordContainer: {
    paddingHorizontal: 12,
  },
  searchKeywordName: {
    fontFamily: globalStyles.font.regular,
    fontWeight: '900',
    fontSize: 15,
    color: globalStyles.color.grayDark,
    paddingHorizontal: 6,
  },
  searchKeywordTextInput: {
    backgroundColor: globalStyles.color.white,
    fontFamily: globalStyles.font.regular,
    fontWeight: '400',
    fontSize: 15,
    flex: 1,
    borderRadius: 6,
    padding: 6,
  },
  searchKeywordDescription: {
    fontFamily: globalStyles.font.regular,
    fontWeight: '600',
    fontSize: 13,
    color: globalStyles.color.gray,
    paddingHorizontal: 6,
  },
  textInputContainer: {
    paddingVertical: 12,
    height: 100,
    borderRadius: 10,
    // backgroundColor: globalStyles.color.white,
  },
  assignedStaff: {
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  watchList: {
    paddingVertical: 24,
  },
});

export default HO_SettingClassifyDetail;
