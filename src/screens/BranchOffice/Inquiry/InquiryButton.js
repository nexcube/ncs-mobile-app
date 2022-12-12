import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useCallback, useMemo} from 'react';
import {Platform, Pressable, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import userData from '../../../services/DeviceStorage';
import globalStyles from '../../../styles/global';

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

  const onInquiry = useCallback(async () => {
    const staffId = await userData.getStaffId();
    const jwt = await userData.getJWT();
    const token = `${jwt}`;
    axios
      .get('/inquiry/branchOfficeList', {
        headers: {authorization: token},
        params: {id: staffId},
      })
      .then(res => {
        const params = res.data.map(item => item);

        navigation.navigate(routeName, {branchOfficeList: params});
      })
      .catch(error => console.error(error));
  }, [navigation, routeName]);

  return (
    <>
      <View style={[styles.wrapper, {bottom}]}>
        <Pressable
          android_ripple={{
            color: globalStyles.color.white,
          }}
          style={styles.circle}
          onPress={async () => await onInquiry()}>
          <Icon name="plus" color={globalStyles.color.white} size={24} />
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    zIndex: 5,
    borderRadius: 28,
    height: 56,
    width: 56,
    position: 'absolute',
    left: '90%',
    transform: [
      {
        translateX: Platform.select({ios: -29, android: -20}),
      },
      {
        translateY: Platform.select({ios: 45, android: 17}),
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
