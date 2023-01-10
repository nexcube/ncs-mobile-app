import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

import SearchTextInput from '../../../../components/BranchOffice/Dashboard/SearchTextInput';
import CustomSwitch from '../../../../components/common/CustomSwitch';

import useCustomSwitch from '../../../../hooks/useCustomSwitch';
import globalStyles from '../../../../styles/globalStyles';
import {List} from 'react-native-paper';
import {useEffect} from 'react/cjs/react.development';
import apiAssignedDepartList from '../../../../services/api/assigned/departList';
import DepartGroup from '../../../../components/HeadOffice/Detail/DepartGroup';

function HO_DetailAssignedSearch({navigation, route}) {
  const {isOn: isIncludeRetire, onToggle} = useCustomSwitch('isIncludeRetire');
  const [departs, setDeparts] = useState([]);
  const [staffCount, setStaffCount] = useState(0);
  const [searchString, setSearchString] = useState('');

  useEffect(() => {
    apiAssignedDepartList(onSuccessDepartList);
  }, []);

  useEffect(() => {
    setStaffCount(0);
  }, [isIncludeRetire]);

  const onSuccessDepartList = data => {
    console.log(JSON.stringify(data, null, '\t'));
    const result = data.filter(item => item.idx !== item.parentIdx);
    // .map(parent => ({...parent, children: data.filter(v => v.parentIdx === parent.idx)}));

    console.log(JSON.stringify(result, null, '\t'));
    setDeparts(result);
  };

  const onChangeText = text => {
    console.log(text);
    setSearchString(text);
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
      <ScrollView>
        <List.AccordionGroup expandedId={departs[0]?.idx}>
          {departs.map(depart => (
            <DepartGroup
              idx={depart.idx}
              name={depart.name}
              isIncludeRetire={isIncludeRetire}
              setStaffCount={setStaffCount}
              searchString={searchString}
            />
          ))}
        </List.AccordionGroup>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
  },
  searchContainer: {
    backgroundColor: globalStyles.color.purple,
    paddingHorizontal: 12,
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
