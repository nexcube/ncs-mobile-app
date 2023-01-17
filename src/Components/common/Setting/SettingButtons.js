import React from 'react';
import {StyleSheet, TouchableHighlight, TouchableOpacity, View} from 'react-native';
import {Card, Divider} from 'react-native-paper';
import globalStyles from '../../../styles/globalStyles';
import Icon from 'react-native-vector-icons/Feather';
import {VerticalSpace12, VerticalSpace24} from '../VerticalSpace';

function SettingButtons({settings}) {
  const items = settings.map((item, index) => (
    <TouchableOpacity key={index} onPress={item.onPress}>
      {item.subtitleNumberOfLines > 1 && <VerticalSpace12 />}
      <Card.Title
        key={index}
        style={[styles.card]}
        title={item.title}
        titleStyle={styles.title}
        titleVariant="labelLarge"
        subtitle={item.subTitle}
        subtitleStyle={styles.subTitle}
        subtitleNumberOfLines={item.subtitleNumberOfLines ?? 1}
        left={props => (
          <Icon name={item.icon} {...props} size={24} color={globalStyles.color.gray} />
        )}
        right={props => (
          <Icon name="chevron-right" {...props} size={24} color={globalStyles.color.gray} />
        )}
      />
      {item.subtitleNumberOfLines > 1 && <VerticalSpace12 />}
      {index < settings.length - 1 && <Divider horizontalInset />}
    </TouchableOpacity>
  ));
  return <Card style={[styles.container]}>{items}</Card>;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: globalStyles.color.white,
  },
  card: {
    paddingRight: 12,
  },
  title: {
    fontFamily: globalStyles.font.bold,
    fontSize: 17,
    color: globalStyles.color.text,
  },
  subTitle: {
    fontFamily: globalStyles.font.bold,
    fontSize: 13,
    color: globalStyles.color.gray,
  },
});

export default SettingButtons;
