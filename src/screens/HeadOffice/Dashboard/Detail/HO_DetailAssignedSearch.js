import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

import SearchTextInput from '../../../../components/BranchOffice/Dashboard/SearchTextInput';
import CustomSwitch from '../../../../components/common/CustomSwitch';

import useCustomSwitch from '../../../../hooks/useCustomSwitch';
import globalStyles from '../../../../styles/globalStyles';
import {ActivityIndicator, List} from 'react-native-paper';
import {useEffect} from 'react';
import apiAssignedDepartList from '../../../../services/api/assigned/departList';
import DepartGroup from '../../../../components/HeadOffice/Detail/DepartGroup';

function HO_DetailAssignedSearch({navigation, route}) {
  const customData = route.params?.customData;
  const {isOn: isIncludeRetire, onToggle: setIsIncludeRetire} = useCustomSwitch('isIncludeRetire');

  const [departs, setDeparts] = useState([]);
  const [staffCount, setStaffCount] = useState(0);
  const [searchString, setSearchString] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiAssignedDepartList(isIncludeRetire, onSuccessDepartList);
  }, [isIncludeRetire]);

  useEffect(() => {
    setStaffCount(0);
  }, [isIncludeRetire]);

  const onSuccessDepartList = data => {
    const result = data.filter(item => item.idx !== item.parentIdx);
    setIsLoading(false);
    // console.log(JSON.stringify(data, null, '\t'));
    setDeparts(result);
  };

  const onChangeText = text => {
    console.log(text);
    setSearchString(text);
  };

  const onToggle = () => {
    setIsLoading(true);
    setIsIncludeRetire(prev => !prev);
  };

  return (
    <View style={[styles.fullscreen]}>
      <View style={styles.searchContainer}>
        <SearchTextInput
          // onSubmitEditing={onSearchSubmit}
          hasMarginBottom
          keyboardType="default"
          returnKeyType="search"
          autoCapitalize="none"
          placeholder="구성원 이름을 입력하세요"
          value={searchString}
          onChangeText={onChangeText}
        />
        <View style={[styles.headerBottom]}>
          <Text style={[styles.count]}>총 {staffCount}명</Text>
          <CustomSwitch text="퇴사자 포함" value={isIncludeRetire} onValueChange={onToggle} />
        </View>
      </View>
      {isLoading ? (
        <View style={[styles.loading]}>
          <ActivityIndicator size="large" color={globalStyles.color.purple} />
        </View>
      ) : (
        <ScrollView>
          <List.AccordionGroup>
            {departs.map(depart => (
              <DepartGroup
                key={depart.idx}
                idx={depart.idx}
                name={depart.name}
                staffs={depart.staffs.map(v => v.info)}
                isIncludeRetire={isIncludeRetire}
                setStaffCount={setStaffCount}
                searchString={searchString}
                customData={customData}
              />
            ))}
          </List.AccordionGroup>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {alignItems: 'center', justifyContent: 'center', flex: 1},

  fullscreen: {
    flex: 1,
  },
  searchContainer: {
    backgroundColor: globalStyles.color.purple,
    paddingHorizontal: 12,
    height: 96,
  },
  headerBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 12,
    paddingHorizontal: 4,
  },
  count: {
    fontFamily: globalStyles.font.regular,
    fontSize: 15,
    fontWeight: '500',
    color: globalStyles.color.gray,
  },
});

export default HO_DetailAssignedSearch;
