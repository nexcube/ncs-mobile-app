import React from 'react';
import {StyleSheet, Switch, Text, View} from 'react-native';
import globalStyles from '../../styles/globalStyles';

function CustomSwitch({text, value, onValueChange}) {
  return (
    <View style={[styles.container]}>
      <Text style={[styles.text, value && {color: globalStyles.color.blue}]}>{text}</Text>
      <Switch
        trackColor={{false: globalStyles.color.gray, true: globalStyles.color.blue}}
        thumbColor={globalStyles.color.white}
        ios_backgroundColor={globalStyles.color.gray}
        onValueChange={onValueChange}
        value={value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontFamily: globalStyles.font.bold,
    fontSize: 15,
    color: globalStyles.color.gray,
    marginRight: 10,
  },
});
export default CustomSwitch;
