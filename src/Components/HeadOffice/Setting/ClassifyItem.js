import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Card, Divider} from 'react-native-paper';
import globalStyles from '../../../styles/globalStyles';
import {VerticalSpace12, VerticalSpace24} from '../../common/VerticalSpace';

function ClassifyItem({
  title,
  staffName,
  staffTeam,
  staffPosition,
  watcherCount,
  inquiryCount,
  onSelect,
}) {
  const subtitleText = `담당: ${staffTeam} ${staffName} ${staffPosition}`;

  const subtitle = (
    <View style={[styles.container]}>
      <View style={[styles.assignedContainer]}>
        <Text style={[styles.subtitle]}>{subtitleText}</Text>
      </View>

      <View style={[styles.watcherContainer]}>
        <View style={[styles.leftContainer]}>
          <Text style={[styles.subtitle]}>참관인: </Text>
          <Text style={[styles.subtitle]}>{watcherCount ?? 0}</Text>
        </View>
        <View style={[styles.centerContainer]} />
        <View style={[styles.rightContainer]}>
          <Text style={[styles.subtitle]}>문의: </Text>
          <Text style={[styles.subtitle]}>{inquiryCount ?? 0}</Text>
        </View>
      </View>
    </View>
  );
  return (
    <TouchableOpacity onPress={onSelect}>
      <Divider horizontalInset={true} />
      <Card.Title
        title={title}
        titleStyle={styles.title}
        subtitle={subtitle}
        titleNumberOfLines={2}
        subtitleNumberOfLines={2}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  assignedContainer: {flex: 6},
  watcherContainer: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  leftContainer: {flex: 1, flexDirection: 'row', justifyContent: 'space-between'},
  centerContainer: {flex: 1},
  rightContainer: {flex: 1, flexDirection: 'row', justifyContent: 'space-between'},

  title: {
    fontFamily: globalStyles.font.regular,
    fontSize: 17,
    fontWeight: '700',
    color: globalStyles.color.text,
    lineHeight: 60,
  },
  subtitle: {
    fontFamily: globalStyles.font.regular,
    fontSize: 13,
    fontWeight: '600',
    color: globalStyles.color.grayDark,
    lineHeight: 40,
  },
});

export default ClassifyItem;
