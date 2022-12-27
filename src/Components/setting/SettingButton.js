import React from 'react';
import {StyleSheet} from 'react-native';
import {Card} from 'react-native-paper';
import globalStyles from '../../styles/global';
import Icon from 'react-native-vector-icons/Feather';

function SettingButton({onPress, title, subTitle, icon}) {
  return (
    <Card style={[styles.container]} onPress={onPress}>
      <Card.Title
        style={[styles.card]}
        title={title}
        titleStyle={styles.title}
        titleVariant="labelLarge"
        subtitle={subTitle}
        subtitleStyle={styles.subTitle}
        left={props => <Icon name={icon} {...props} size={24} color={globalStyles.color.gray} />}
        right={props => (
          <Icon name="chevron-right" {...props} size={24} color={globalStyles.color.gray} />
        )}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: globalStyles.color.white,
    marginBottom: 24,
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

export default SettingButton;
