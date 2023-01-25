import React, {useCallback, useEffect, useState} from 'react';
import {
  SafeAreaView,
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
import apiCategoryUpdateKeyword from '../../../services/api/category/updateKeyword';
import globalStyles from '../../../styles/globalStyles';
import apiCategoryAssignedInfo from '../../../services/api/assigned/categoryAssignedInfo';
import {useFocusEffect} from '@react-navigation/native';

function HO_SettingClassifyDetail({navigation, route}) {
  const categoryIndex = route.params.categoryIndex;
  const [categoryInfo, setCategoryInfo] = useState({});
  const [refresh, setRefresh] = useState(false);

  // 라우터 파라미터로 UI 갱싱
  const isRefresh = route.params?.refresh;
  console.log('isRefresh: ', isRefresh);

  const newAssigned = route.params?.newAssigned;
  useEffect(() => {
    setRefresh(prev => !prev);
  }, [isRefresh, newAssigned]);

  //////////////////////////////
  console.log(route.params);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={onPressSave}>
          <Text style={[styles.save]}>저장</Text>
        </TouchableOpacity>
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryInfo]);

  // useEffect(() => {
  //   console.log('useEffect => watchReceiver: ', watchReceiver);
  // }, [watchReceiver]);

  useFocusEffect(
    useCallback(() => {
      apiCategoryAssignedInfo(categoryIndex, onSuccess);
    }, [categoryIndex]),
  );
  //
  const onSuccess = data => {
    // console.log(JSON.stringify(data, null, 't'));
    setCategoryInfo(data);
  };

  // function containsWhitespace(str) {
  //   const isHaveSpace = /\s/.test(str);
  //   // console.log(str, isHaveSpace);
  //   return isHaveSpace;
  // }

  const onPressSave = () => {
    // if (categoryInfo?.keyword.split(',').every(word => !containsWhitespace(word))) {
    apiCategoryUpdateKeyword(categoryIndex, categoryInfo?.keyword).then(data => {});
    // } else {
    //   Alert.alert('주의', '검색 키워드 단어에 공백이 있습니다.', [
    //     {text: 'OK', onPress: () => null},
    //   ]);
    // }
  };

  const onChangeSearchKeyword = e => {
    console.log(e);
    setCategoryInfo({...categoryInfo, keyword: e});
    // setKeyword(e);
  };

  const onChangeAssigned = () => {
    // navigation.navigate('HO_Setting_Classifier_Change', {assigned: categoryInfo.staffId});

    navigation.navigate('HO_Detail_Assigned_Search', {
      customData: {
        type: 'categoryUpdateStaff',
        returnRouter: 'HO_Setting_Classify_Detail',
        data: {
          categoryIndex: categoryIndex,
        },
      },
    });
  };

  const onChangeWatch = () => {
    console.log('onChangeWatch');
    navigation.navigate('HO_Detail_Assigned_Search', {
      customData: {
        type: 'registerCategoryWatch',
        returnRouter: 'HO_Setting_Classify_Detail',
        data: {
          categoryIndex: categoryIndex,
        },
      },
    });
  };

  return (
    <SafeAreaView style={[styles.fullscreen]}>
      <VerticalSpace24 />
      <View style={[styles.titleContainer]}>
        <Text style={[styles.titleName]}>분류 키워드</Text>
        <Text style={[styles.titleKeyword]}>{categoryInfo?.name}</Text>
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
            value={categoryInfo?.keyword}
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
      <ScrollView style={[styles.assignedStaff]}>
        <View style={[styles.separator]} />
        <AssignedStaffComp
          staffId={categoryInfo?.staffId}
          title="분류 담당자"
          isChange={true}
          onChange={onChangeAssigned}
        />
        <View style={[styles.watchList]}>
          <AssignedWatchComp
            catIdx={categoryIndex}
            refresh={refresh}
            isChange={true}
            onChange={onChangeWatch}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fullscreen: {flex: 1},
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
