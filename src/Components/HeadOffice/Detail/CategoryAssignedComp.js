import {useEffect, useState} from 'react/cjs/react.development';
import React from 'react';
import AssignedStaffComp from './AssignedStaffComp';
import apiCategoryAssignedInfo from '../../../services/api/assigned/categoryAssignedInfo';
import {StyleSheet, Text, View} from 'react-native';
import globalStyles from '../../../styles/globalStyles';

function CategoryAssignedComp({catIdx, title, isChange}) {
  const [catInfo, setCatInfo] = useState({});

  useEffect(() => {
    apiCategoryAssignedInfo(catIdx, onSuccess);
  }, [catIdx]);

  const onSuccess = data => {
    console.log('``````````````````````````````');
    console.log(JSON.stringify(data, null, '\t'));
    setCatInfo(data);
  };

  return (
    <View>
      <View style={[styles.catInfo]}>
        <Text style={[styles.keyword]}>키워드 분류 정보</Text>
        <Text style={[styles.catName]}>{catInfo.name}</Text>
      </View>
      <AssignedStaffComp staffId={catInfo.staffId} title={title} isChange={isChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  catInfo: {
    alignItems: 'center',
  },
  keyword: {
    fontFamily: globalStyles.font.bold,
    fontSize: 15,
    fontWeight: '900',
    color: globalStyles.color.grayDark,
    marginBottom: 4,
  },
  catName: {
    fontFamily: globalStyles.font.bold,
    fontSize: 22,
    fontWeight: '900',
    color: globalStyles.color.text,
    marginBottom: 24,
  },
});

export default CategoryAssignedComp;
