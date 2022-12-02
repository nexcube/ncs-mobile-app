import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

export default function InquiryHeader() {
  return (
    <View style={[styles.container]}>
      <Text style={styles.headerText}>문의현황</Text>
      <View style={[styles.row]}>
        <View style={[styles.row]}>
          <Text style={[styles.rowText]}>신규</Text>
          <Text style={[styles.rowChangeText]}> 1</Text>
        </View>
        <View style={[styles.verticalLine]} />
        <View style={[styles.row]}>
          <Text style={[styles.rowText]}>진행중 </Text>
          <Text style={[styles.rowChangeText]}> 2</Text>
        </View>
        <View style={[styles.verticalLine]} />
        <View style={[styles.row]}>
          <Text style={[styles.rowText]}>완료 </Text>
          <Text style={[styles.rowChangeText]}> 12</Text>
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
    color: '#CCCCCC',
    fontSize: 15,
    fontWeight: '900',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline',
  },

  rowText: {
    color: '#999999',
    fontSize: 15,
    fontWeight: '900',
  },
  rowChangeText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '900',
  },
  verticalLine: {
    height: 32,
    width: 1,
    backgroundColor: '#909090',
    margin: 8,
  },
});
