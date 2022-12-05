import React from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {getStatusBarHeight} from 'react-native-safearea-height';
import InquiryHeader from './InquiryHeader';
import LogoBack from '../../../assets/images/EDUPLEX-Logo-back.svg';
import SearchTextInput from './SearchTextInput';
import globalStyles from '../../styles/global';

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
      <LogoBack style={[styles.logoBack]} />
      <Animated.View style={[styles.header, {height: animateHeaderHeight}]}>
        <InquiryHeader newCount={1} proceedingCount={2} completedCount={12} />

        <SearchTextInput
          hasMarginBottom
          keyboardType="default"
          returnKeyType="search"
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
    backgroundColor: globalStyles.color.purple,
  },
  header: {
    justifyContent: 'flex-end',
    left: 0,
    right: 0,
    paddingTop: 10,
    paddingHorizontal: 12,
    backgroundColor: globalStyles.color.purple,
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
