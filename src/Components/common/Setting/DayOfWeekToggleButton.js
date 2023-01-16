import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import globalStyles from '../../../styles/globalStyles';

function DayOfWeekToggleButton({title, checked, setChecked}) {
  return (
    <View style={[styles.dayOfWeek]}>
      <TouchableOpacity
        style={[checked ? styles.checked : [styles.unchecked, globalStyles.elevated]]}
        onPress={() => setChecked(prev => !prev)}>
        <Text style={[styles.text]}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  checked: {
    borderWidth: 1,
    borderColor: globalStyles.color.blue,
    backgroundColor: '#EADDFF',
    paddingHorizontal: 13.43,
    paddingVertical: 12,
    borderRadius: 10,
  },
  unchecked: {
    borderWidth: 1,
    borderColor: globalStyles.color.white,
    backgroundColor: globalStyles.color.white,
    paddingHorizontal: 13.43,
    paddingVertical: 12,
    borderRadius: 10,
  },

  text: {
    fontFamily: globalStyles.font.regular,
    fontSize: 17,
    fontWeight: '700',
    color: globalStyles.color.blue,
  },
});

export default DayOfWeekToggleButton;
