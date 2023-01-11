import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Divider, Menu} from 'react-native-paper';

import globalStyles from '../../../styles/globalStyles';

function TopMenuFromHO({
  sharedInfo,
  onChangeAssigned,
  onSharedInfo,
  color = globalStyles.color.text,
  backgroundColor = globalStyles.color.white,
}) {
  const [visible, setVisible] = useState(false);

  const openMenu = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onPressModify = async () => {
    setVisible(false);
    onChangeAssigned();
  };

  const onPressDelete = () => {
    setVisible(false);
    onSharedInfo(sharedInfo === 0 ? 1 : 0);
  };

  const titleSharedInfo = '공유정보' + (sharedInfo === 0 ? '로 등록하기' : '에서 해제하기');

  return (
    <Menu
      visible={visible}
      onDismiss={onClose}
      anchor={
        <TouchableOpacity
          onPress={openMenu}
          title="..."
          style={[styles.button, backgroundColor && {backgroundColor: backgroundColor}]}>
          <Text style={[color && {color: color}]}>...</Text>
        </TouchableOpacity>
      }
      anchorPosition="bottom"
      contentStyle={[styles.menu]}>
      <Menu.Item titleStyle={[styles.text]} onPress={onPressModify} title="처리 담당자 변경하기" />
      <Divider horizontalInset={true} style={[styles.separator]} />
      <Menu.Item titleStyle={[styles.text]} onPress={onPressDelete} title={titleSharedInfo} />
    </Menu>
  );
}

const styles = StyleSheet.create({
  menu: {
    backgroundColor: globalStyles.color.white,
  },
  text: {
    color: globalStyles.color.text,
    fontFamily: globalStyles.font.regular,
    fontSize: 14,
  },
  separator: {
    backgroundColor: globalStyles.color.grayLight,
  },
  button: {
    padding: 10,
  },
});

export default TopMenuFromHO;
