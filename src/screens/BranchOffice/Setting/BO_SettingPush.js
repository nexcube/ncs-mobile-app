import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Card, Divider, RadioButton} from 'react-native-paper';
import globalStyles from '../../../styles/global';

function BO_SettingPush({navigation, route}) {
  const [checked, setChecked] = useState('first');
  return (
    <View style={[styles.fullscreen]}>
      <Card style={[styles.card]}>
        <TouchableOpacity style={[styles.radioButtonFirst]} onPress={() => setChecked('first')}>
          <Text style={[styles.text]}>소리와 진동</Text>
          <RadioButton
            value="first"
            status={checked === 'first' ? 'checked' : 'unchecked'}
            uncheckedColor={globalStyles.color.gray}
            color="blue"
          />
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity style={[styles.radioButton]} onPress={() => setChecked('second')}>
          <Text style={[styles.text]}>소리</Text>
          <RadioButton
            value="second"
            status={checked === 'second' ? 'checked' : 'unchecked'}
            uncheckedColor={globalStyles.color.gray}
            color="blue"
          />
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity style={[styles.radioButton]} onPress={() => setChecked('third')}>
          <Text style={[styles.text]}>진동</Text>
          <RadioButton
            value="third"
            status={checked === 'third' ? 'checked' : 'unchecked'}
            uncheckedColor={globalStyles.color.gray}
            color="blue"
          />
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity style={[styles.radioButtonLast]} onPress={() => setChecked('fourth')}>
          <Text style={[styles.text]}>무음</Text>
          <RadioButton
            value="fourth"
            status={checked === 'fourth' ? 'checked' : 'unchecked'}
            uncheckedColor={globalStyles.color.gray}
            color="blue"
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

export default BO_SettingPush;
