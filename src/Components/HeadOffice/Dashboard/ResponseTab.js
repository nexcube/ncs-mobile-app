import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useContext, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import apiInquiryCountInquiry from '../../../services/api/inquiry/countInquiry';
import UserContext from '../../../services/context/UserContext';
import globalStyles from '../../../styles/globalStyles';

const ResponseTab = () => {
  const [selection, setSelection] = useState(1);
  const [User] = useContext(UserContext);
  const [count, setCount] = useState({assignedMe: 0, relatedMe: 0, allInquiry: 0});

  const onPressMine = () => {
    setSelection(1);
  };

  const onPressRelateToMe = () => {
    setSelection(2);
  };

  const onPressAll = () => {
    setSelection(3);
  };

  useFocusEffect(
    useCallback(() => {
      apiInquiryCountInquiry(
        User.staffId,
        User.assignedCatIdx,
        User.relatedCatIdxs,
        onSuccess,
        onFail,
      );
    }, [User.assignedCatIdx, User.relatedCatIdxs, User.staffId]),
  );

  const onSuccess = data => {
    console.log(JSON.stringify(data, null, '\t'));
    setCount(data[0]);
  };

  const onFail = () => {};

  return (
    <View style={styles.btnGroup}>
      <TouchableOpacity onPress={onPressMine}>
        <Text style={[styles.btnText, selection === 1 ? styles.btnSelected : null]}>
          {`나에게 배정됨 ${count.assignedMe}`}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressRelateToMe}>
        <Text style={[styles.btnText, selection === 2 ? styles.btnSelected : null]}>
          {`나와 연관됨 ${count.relatedMe}`}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressAll}>
        <Text style={[styles.btnText, selection === 3 ? styles.btnSelected : null]}>
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
