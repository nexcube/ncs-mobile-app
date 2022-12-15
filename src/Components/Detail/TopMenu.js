import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Button, Platform, Pressable, StyleSheet, Text} from 'react-native';
import {Divider, Menu} from 'react-native-paper';
import {Icon} from 'react-native-vector-icons/Feather';
import globalStyles from '../../styles/global';

function TopMenu({}) {
  const navigation = useNavigation();

  const openMenu = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onModify = () => {
    setVisible(false);
    navigation.navigate('BO_Detail_Modify');
  };

  const onDelete = () => {
    console.log('Delete!!!');
    setVisible(false);
  };

  const [visible, setVisible] = useState(false);

  return (
    <Menu
      visible={visible}
      onDismiss={onClose}
      anchor={<Button onPress={openMenu} title="..." color="#fff" />}
      anchorPosition="bottom"
      contentStyle={[styles.menu]}>
      <Menu.Item titleStyle={[styles.text]} onPress={onModify} title="수정하기" />
      <Divider horizontalInset={true} style={[styles.separator]} />
      <Menu.Item titleStyle={[styles.text]} onPress={onDelete} title="삭제하기" />
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
