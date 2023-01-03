import {useNavigation} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {Platform, Pressable, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import apiInquiryBranch from '../../../services/api/inquiry/branch';
import globalStyles from '../../../styles/globalStyles';

const TABBAR_HEIGHT = 49;

function InquiryButton({routeName}) {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const bottom = useMemo(() => {
    return Platform.select({
      android: TABBAR_HEIGHT / 2,
      ios: TABBAR_HEIGHT / 2 + insets.bottom - 4,
    });
  }, [insets.bottom]);

  const onInquiry = async () => {
    apiInquiryBranch().then(data => {
      navigation.navigate(routeName, {branchList: data});
    });
  };

  return (
    <View style={[styles.wrapper, {bottom}]}>
      <Pressable
        android_ripple={{
          color: globalStyles.color.white,
        }}
        style={styles.circle}
        onPress={onInquiry}>
        <Icon name="plus" color={globalStyles.color.white} size={24} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    zIndex: 115,
    borderRadius: 28,
    height: 56,
    width: 56,
    position: 'absolute',
    left: '90%',
    transform: [
      {
        translateX: Platform.select({ios: -28, android: -28}),
      },
      {
        translateY: Platform.select({ios: -200, android: -200}),
      },
    ],
    ...Platform.select({
      ios: {
        shadowColor: '#4d4d4d',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
        overflow: 'hidden',
      },
    }),
  },
  circle: {
    backgroundColor: '#0067CC',
    borderRadius: 28,
    height: 56,
    width: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default InquiryButton;
