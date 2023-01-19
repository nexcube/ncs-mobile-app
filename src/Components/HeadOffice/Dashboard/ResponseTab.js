import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import apiInquiryCountInquiry from '../../../services/api/inquiry/countInquiry';
import UserContext from '../../../services/context/UserContext';
import globalStyles from '../../../styles/globalStyles';

const ResponseTab = ({tabIndex, setTabIndex, isIncludeDone}) => {
  const [User] = useContext(UserContext);
  const [count, setCount] = useState({assignedMe: 0, relatedMe: 0, allInquiry: 0});

  const onPressMine = () => {
    if (User.assignedCatIdxs.length > 0) {
      setTabIndex(0);
    }
  };

  const onPressRelateToMe = () => {
    if (User.relatedCatIdxs.length > 0) {
      setTabIndex(1);
    }
  };

  const onPressAll = () => {
    setTabIndex(2);
  };

  useEffect(() => {
    apiInquiryCountInquiry(
      User.staffId,
      User.assignedCatIdxs,
      User.relatedCatIdxs,
      isIncludeDone,
      onSuccess,
      onFail,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isIncludeDone]);

  const onSuccess = data => {
    // console.log(JSON.stringify(data, null, '\t'));
    setCount(data[0]);
  };

  const onFail = () => {};

  return (
    <View style={styles.btnGroup}>
      <TouchableOpacity onPress={onPressMine}>
        <Text style={[styles.btnText, tabIndex === 0 ? styles.btnSelected : null]}>
          {`나에게 배정됨 ${count.assignedMe}`}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressRelateToMe}>
        <Text style={[styles.btnText, tabIndex === 1 ? styles.btnSelected : null]}>
          {`나와 연관됨 ${count.relatedMe}`}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressAll}>
        <Text style={[styles.btnText, tabIndex === 2 ? styles.btnSelected : null]}>
          {`전체 ${count.allInquiry}`}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  btnGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  btnText: {
    textAlign: 'center',
    paddingVertical: 8,
    fontFamily: globalStyles.font.bold,
    fontSize: 17,
    color: globalStyles.color.grayDark,
  },

  btnSelected: {
    color: globalStyles.color.white,
  },
});

export default ResponseTab;
