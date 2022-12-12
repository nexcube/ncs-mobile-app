import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useEffect} from 'react';
import BO_Dashboard from './Dashboard/BO_Dashboard';
import BO_Setting from './Setting/BO_Setting';
import Icon from 'react-native-vector-icons/Feather';
import globalStyles from '../../styles/global';
import userData from '../../services/DeviceStorage';
import axios from 'axios';

const Tab = createBottomTabNavigator();

function BO_MainTab() {
  useEffect(() => {
    getInquiryList();
  }, []);

  const getInquiryList = async () => {
    const jwt = await userData.getJWT();
    const token = `${jwt}`;

    axios
      .get('/inquiry/list', {
        headers: {authorization: token},
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(error => console.log(error));
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveBackgroundColor: globalStyles.color.white,
        tabBarInactiveBackgroundColor: globalStyles.color.white,
        tabBarActiveTintColor: '#0054A7',
        tabBarInactiveTintColor: 'color: #999999;',
      }}>
      <Tab.Screen
        name="BO_Dashboard"
        component={BO_Dashboard}
        options={{
          title: '대시보드',
          headerShown: false,
          tabBarIcon: ({color, size}) => <Icon name="home" size={24} color={color} />,
        }}
      />

      <Tab.Screen
        name="BO_Setting"
        component={BO_Setting}
        options={{
          title: '환경설정',
          headerShown: false,
          tabBarIcon: ({color, size}) => <Icon name="settings" size={24} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default BO_MainTab;
