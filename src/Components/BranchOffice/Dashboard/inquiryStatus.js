import React from 'react';
import {Animated, ImageBackground, StyleSheet, View} from 'react-native';
import {getStatusBarHeight} from 'react-native-safearea-height';
import InquiryHeader from './InquiryHeader';

const Header_Max_Height = 130;
const Header_Min_Height = 0;

function InquiryStatus({animHeaderValue}) {
  const animateHeaderHeight = animHeaderValue.interpolate({
    inputRange: [0, Header_Max_Height - Header_Min_Height],
    outputRange: [Header_Max_Height, Header_Min_Height],
    extrapolate: 'clamp',
  });

  return (
    <View>
      <ImageBackground
        resizeMode="cover"
        source={require('../../../../assets/images/dashboard-top.png')}>
        <View style={[styles.statusBar]} />
        <Animated.View style={[styles.header, {height: animateHeaderHeight}]}>
          <InquiryHeader />
        </Animated.View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
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
