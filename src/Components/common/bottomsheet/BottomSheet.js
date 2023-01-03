import React, {useCallback, useEffect, useState} from 'react';
import {Animated, Dimensions, Modal, StyleSheet, Text, View} from 'react-native';
import CustomButton from '../CustomButton';
import globalStyles from '../../../styles/globalStyles';
import RegistrationSheet from './RegistrationSheet';
import BackSheet from './BackSheet';

export const InquiryAction = {
  Registration: 'Registration',
  CancelInquiry: 'CancelInquiry',
};

const BottomSheet = ({sheetStatus, onOk, onCancel, children}) => {
  const panY = new Animated.Value(Dimensions.get('screen').height);
  const top = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });

  const resetPositionAnim = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: false,
  });
  const closeAnim = Animated.timing(panY, {
    toValue: Dimensions.get('screen').height,
    duration: 500,
    useNativeDriver: false,
  });

  useEffect(() => {
    if (sheetStatus.visible) {
      resetPositionAnim.start();
    }
  }, [resetPositionAnim, sheetStatus.visible]);

  const onPositive = () => {
    closeAnim.start();
    onOk();
  };

  const onNegative = () => {
    closeAnim.start();
    onCancel();
  };
  return (
    <Modal animated animationType="fade" visible={sheetStatus.visible} transparent>
      <View style={styles.overlay}>
        <Animated.View style={[styles.container, {top}]}>
          {children}
          {sheetStatus.format === InquiryAction.Registration ? (
            <RegistrationSheet onOk={onPositive} onCancel={onNegative} />
          ) : sheetStatus.format === InquiryAction.CancelInquiry ? (
            <BackSheet onOk={onPositive} onCancel={onNegative} />
          ) : (
            <RegistrationSheet onOk={onPositive} onCancel={onNegative} />
          )}
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: 'white',
    paddingTop: 12,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
});

export default BottomSheet;
