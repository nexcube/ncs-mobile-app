import React, {useState} from 'react';
import {Button, StyleSheet} from 'react-native';
import {Divider, Menu} from 'react-native-paper';

import globalStyles from '../../styles/global';

function TopMenu({onModify, onDelete}) {
  const [visible, setVisible] = useState(false);

  const openMenu = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onPressModify = async () => {
    setVisible(false);
    onModify();
  };

  const onPressDelete = () => {
    setVisible(false);
    onDelete();
  };

  return (
    <Menu
      visible={visible}
      onDismiss={onClose}
      anchor={<Button onPress={openMenu} title="..." color="#fff" />}
      anchorPosition="bottom"
      contentStyle={[styles.menu]}>
      <Menu.Item titleStyle={[styles.text]} onPress={onPressModify} title="수정하기" />
      <Divider horizontalInset={true} style={[styles.separator]} />
      <Menu.Item titleStyle={[styles.text]} onPress={onPressDelete} title="삭제하기" />
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
});

export default TopMenu;
