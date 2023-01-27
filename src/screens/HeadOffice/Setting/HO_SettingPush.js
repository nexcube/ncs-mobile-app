import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Card, Divider, RadioButton} from 'react-native-paper';
import {check} from 'react-native-permissions';
import {pushTypeName} from '../../../services/config';
import userData from '../../../services/storage/DeviceStorage';
import globalStyles from '../../../styles/globalStyles';

function HO_SettingPush({navigation, route}) {
  const [checked, setChecked] = useState('first');

  userData
    .getItem(pushTypeName)
    .then(data => setChecked(data === null || data === undefined ? 'first' : data));

  const onPress = select => {
    setChecked(select);
    userData.setItem(pushTypeName, select);
  };

  return (
    <View style={[styles.fullscreen]}>
      <Card style={[styles.card]}>
        <TouchableOpacity style={[styles.radioButtonFirst]} onPress={() => onPress('first')}>
          <Text style={[styles.text]}>소리와 진동</Text>
          <RadioButton
            value="first"
            status={checked === 'first' ? 'checked' : 'unchecked'}
            uncheckedColor={globalStyles.color.gray}
            color="blue"
            onPress={() => onPress('first')}
          />
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity style={[styles.radioButton]} onPress={() => onPress('second')}>
          <Text style={[styles.text]}>소리</Text>
          <RadioButton
            value="second"
            status={checked === 'second' ? 'checked' : 'unchecked'}
            uncheckedColor={globalStyles.color.gray}
            color="blue"
            onPress={() => onPress('second')}
          />
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity style={[styles.radioButton]} onPress={() => onPress('third')}>
          <Text style={[styles.text]}>진동</Text>
          <RadioButton
            value="third"
            status={checked === 'third' ? 'checked' : 'unchecked'}
            uncheckedColor={globalStyles.color.gray}
            color="blue"
            onPress={() => onPress('third')}
          />
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity style={[styles.radioButtonLast]} onPress={() => onPress('fourth')}>
          <Text style={[styles.text]}>무음</Text>
          <RadioButton
            value="fourth"
            status={checked === 'fourth' ? 'checked' : 'unchecked'}
            uncheckedColor={globalStyles.color.gray}
            color="blue"
            onPress={() => onPress('fourth')}
          />
        </TouchableOpacity>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 24,
  },
  card: {
    backgroundColor: globalStyles.color.white,
    padding: 12,
  },
  radioButtonFirst: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 12,
    paddingHorizontal: 12,
  },
  radioButtonLast: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    paddingHorizontal: 12,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  text: {
    fontFamily: globalStyles.font.bold,
    fontSize: 17,
    color: globalStyles.color.text,
  },
});

export default HO_SettingPush;
