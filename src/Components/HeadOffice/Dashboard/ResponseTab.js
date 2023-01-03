import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import globalStyles from '../../../styles/globalStyles';

const ResponseTab = ({mineCount = 0, relateToMeCount = 0, allCount = 0}) => {
  const [selection, setSelection] = useState(1);

  const onPressMine = () => {
    setSelection(1);
  };

  const onPressRelateToMe = () => {
    setSelection(2);
  };

  const onPressAll = () => {
    setSelection(3);
  };

  return (
    <View style={styles.btnGroup}>
      <TouchableOpacity onPress={onPressMine}>
        <Text style={[styles.btnText, selection === 1 ? styles.btnSelected : null]}>
          {`나에게 배정됨 ${mineCount}`}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressRelateToMe}>
        <Text style={[styles.btnText, selection === 2 ? styles.btnSelected : null]}>
          {`나와 연관됨 ${relateToMeCount}`}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressAll}>
        <Text style={[styles.btnText, selection === 3 ? styles.btnSelected : null]}>
          {`전체 ${allCount}`}
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

module.exports = ResponseTab;
