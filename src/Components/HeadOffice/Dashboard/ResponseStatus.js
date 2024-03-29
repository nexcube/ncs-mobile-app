import React, {useEffect, useState} from 'react';
import {Animated, ImageBackground, StyleSheet, Text, View} from 'react-native';
import {getStatusBarHeight} from 'react-native-safearea-height';
import globalStyles from '../../../styles/globalStyles';

import Icon from 'react-native-vector-icons/Feather';
import ResponseTab from './ResponseTab';
import apiCommonAverageResponseTime from '../../../services/api/common/averageResponseTime';
import {getTime} from '../../../Utils/timeDiff';

const Header_Max_Height = 130;
const Header_Min_Height = 0;

function ResponseStatus({animHeaderValue, onPressInfo, tabIndex, setTabIndex, isIncludeDone}) {
  const animateHeaderHeight = animHeaderValue.interpolate({
    inputRange: [0, Header_Max_Height - Header_Min_Height],
    outputRange: [Header_Max_Height, Header_Min_Height],
    extrapolate: 'clamp',
  });
  const [time, setTime] = useState({});
  useEffect(() => {
    apiCommonAverageResponseTime(onSuccess);
  }, []);

  const onSuccess = data => {
    // console.log(JSON.stringify(data, null, '\t'));
    const now = new Date();
    const localTime = now.getTime() - now.getTimezoneOffset() * 60 * 1000;
    const hasReplyResponseTime = data.hasReply.reduce((sum, cur, index) => {
      sum = sum + (new Date(cur.firstAnswerDate) - new Date(cur.dt_QnaMake));

      return sum;
    }, 0);

    const totalHasReplySecTime = hasReplyResponseTime / 1000;

    const noReplyResponseTime = data.noReply.reduce((sum, cur, index) => {
      sum = sum + (localTime - new Date(cur.dt_QnaMake));
      return sum;
    }, 0);
    const totalNoReplaySecTime = noReplyResponseTime / 1000;

    let total =
      (totalHasReplySecTime + totalNoReplaySecTime) / (data.hasReply.length + data.noReply.length);

    if (Number.isNaN(total)) {
      total = 0;
    }
    setTime(getTime(total));
  };

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
              {time.hour === '00' && time.min === '00' && time.sec === 0 ? (
                <>
                  <Element count="--" text="시간 " />
                  <Element count="--" text="분 " />
                  <Element count="--" text="초 " />
                </>
              ) : (
                <>
                  <Element count={time.hour} text="시간 " />
                  <Element count={time.min} text="분 " />
                  <Element count={time.sec} text="초 " />
                </>
              )}
              <Icon name="info" size={15} color={globalStyles.color.gray} onPress={onPressInfo} />
            </View>
          </View>
        </Animated.View>
        <ResponseTab tabIndex={tabIndex} setTabIndex={setTabIndex} isIncludeDone={isIncludeDone} />
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
