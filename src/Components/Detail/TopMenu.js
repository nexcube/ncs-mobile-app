import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useState} from 'react';
import {Button, StyleSheet} from 'react-native';
import {Divider, Menu} from 'react-native-paper';
import userData from '../../services/DeviceStorage';

import globalStyles from '../../styles/global';

function TopMenu({inquiryItem}) {
  const navigation = useNavigation();

  const openMenu = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onModify = async () => {
    setVisible(false);
    const staffId = await userData.getStaffId();
    const jwt = await userData.getJWT();
    const token = `${jwt}`;
    axios
      .get('/inquiry/branchOfficeList', {
        headers: {authorization: token},
        params: {id: staffId},
      })
      .then(res => {
        const result = res.data.map(value => value);
        // console.log(inquiryItem);
        const params = {inquiryItem: inquiryItem, branchOfficeList: result};

        navigation.navigate('BO_Detail_Modify', params);
      })
      .catch(error => console.error(error));
  };

  const onDelete = () => {
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
