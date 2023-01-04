import React from 'react';
import {Animated, ImageBackground, StyleSheet, Text, View} from 'react-native';
import {getStatusBarHeight} from 'react-native-safearea-height';
import globalStyles from '../../../styles/globalStyles';

import Icon from 'react-native-vector-icons/Feather';
import ResponseTab from './ResponseTab';

const Header_Max_Height = 130;
const Header_Min_Height = 0;

function ResponseStatus({animHeaderValue, onPressInfo}) {
  const animateHeaderHeight = animHeaderValue.interpolate({
    inputRange: [0, Header_Max_Height - Header_Min_Height],
    outputRange: [Header_Max_Height, Header_Min_Height],
    extrapolate: 'clamp',
  });

  const Element = ({count, text}) => (
    <View style={[styles.row]}>
      <Text style={[styles.rowChangeText]}>{count}</Text>
      <Text style={[styles.rowText]}>{text}</Text>
    </View>
  );

  return (
    <View>
      <ImageBackground
        resizeMode="cover"
        source={require('../../../../assets/images/dashboard-top.png')}>
        <View style={[styles.statusBar]} />
        <Animated.View style={[styles.header, {height: animateHeaderHeight}]}>
          <View style={[styles.container]}>
            <Text style={styles.headerText}>평균 응답 시간</Text>
            <View style={[styles.row]}>
              <Element count={1} text="시간 " />
              <Element count={12} text="분 " />
              <Element count={33} text="초 " />
              <Icon name="info" size={15} onPress={() => console.log('adsfasdf')} />
            </View>
          </View>
        </Animated.View>
        <ResponseTab />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  headerText: {
    fontFamily: globalStyles.font.title,
    color: globalStyles.color.grayLight,
    fontSize: 15,
    textAlign: 'center',
  },
  statusBar: {
    height: getStatusBarHeight(false),
  },
  header: {
    justifyContent: 'flex-end',
    left: 0,
    right: 0,
    paddingTop: 10,
    paddingHorizontal: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline',
  },

  rowText: {
    fontFamily: globalStyles.font.title,
    color: globalStyles.color.gray,
    fontSize: 15,
    fontWeight: '900',
  },
  rowChangeText: {
    fontFamily: globalStyles.font.title,
    color: globalStyles.color.white,
    fontSize: 32,
    fontWeight: '900',
  },
  tabArea: {
    paddingHorizontal: 12,
    backgroundColor: globalStyles.color.purple,
  },
});
export default ResponseStatus;
