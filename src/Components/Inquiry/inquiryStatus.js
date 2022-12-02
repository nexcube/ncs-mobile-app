import React from 'react';
import {Animated, Image, ImageBackground, StyleSheet, View} from 'react-native';
import {getStatusBarHeight} from 'react-native-safearea-height';
import BorderedInput from '../BorderedInput';
import InquiryHeader from './InquiryHeader';

const Header_Max_Height = 200;
const Header_Min_Height = 70;

function InquiryStatus({animHeaderValue}) {
  const animateHeaderHeight = animHeaderValue.interpolate({
    inputRange: [0, Header_Max_Height - Header_Min_Height],
    outputRange: [Header_Max_Height, Header_Min_Height],
    extrapolate: 'clamp',
  });

  return (
    <View>
      <View style={[styles.statusBar]} />
      <Image
        source={require('../../../assets/images/EDUPLEX-Logo-back.png')}
        style={[styles.logoBack]}
      />
      <Animated.View style={[styles.header, {height: animateHeaderHeight}]}>
        <InquiryHeader />

        <BorderedInput
          hasMarginBottom
          keyboardType="default"
          returnKeyType="next"
          autoCapitalize="none"
          placeholder="제목, 내용, 댓글, 담당자로 검색"
          // value={id}
          // onChangeText={setEmail}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  statusBar: {
    height: getStatusBarHeight(false),
    backgroundColor: '#332D41',
  },
  header: {
    justifyContent: 'flex-end',
    left: 0,
    right: 0,
    paddingTop: 10,
    paddingHorizontal: 12,
    backgroundColor: '#332D41',
  },
  logoBack: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 150,
    height: 150,
    resizeMode: 'cover',
    zIndex: 5,
  },
});

export default InquiryStatus;
