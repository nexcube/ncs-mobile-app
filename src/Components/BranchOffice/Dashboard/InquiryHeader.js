import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import apiInquiryStatus from '../../../services/api/inquiry/status';
import globalStyles from '../../../styles/globalStyles';

export default function InquiryHeader() {
  const [inquiryStatus, setInquiryStatus] = useState({NEW: 0, INPROGRESS: 0, DONE: 0});

  useFocusEffect(
    useCallback(() => {
      apiInquiryStatus(onSuccess);
    }, []),
  );

  const onSuccess = data => {
    setInquiryStatus({NEW: data.NEW, INPROGRESS: data.INPROGRESS, DONE: data.DONE});
  };

  return (
    <View style={[styles.container]}>
      <Text style={styles.headerText}>문의현황</Text>
      <View style={[styles.row]}>
        <View style={[styles.row]}>
          <Text style={[styles.rowText]}>신규</Text>
          <Text style={[styles.rowChangeText]}> {inquiryStatus.NEW}</Text>
        </View>
        <View style={[styles.verticalLine]} />
        <View style={[styles.row]}>
          <Text style={[styles.rowText]}>진행중 </Text>
          <Text style={[styles.rowChangeText]}> {inquiryStatus.INPROGRESS}</Text>
        </View>
        <View style={[styles.verticalLine]} />
        <View style={[styles.row]}>
          <Text style={[styles.rowText]}>완료 </Text>
          <Text style={[styles.rowChangeText]}> {inquiryStatus.DONE}</Text>
        </View>
      </View>
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
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline',
  },

  rowText: {
    fontFamily: globalStyles.font.title,
    color: '#999999',
    fontSize: 15,
    fontWeight: '900',
  },
  rowChangeText: {
    fontFamily: globalStyles.font.title,
    color: globalStyles.color.white,
    fontSize: 32,
    fontWeight: '900',
  },
  verticalLine: {
    height: 32,
    width: 1,
    backgroundColor: '#909090',
    margin: 12,
  },
});
