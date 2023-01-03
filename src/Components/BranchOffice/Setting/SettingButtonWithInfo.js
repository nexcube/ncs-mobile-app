import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Divider, Paragraph, Title} from 'react-native-paper';
import globalStyles from '../../../styles/globalStyles';
import Icon from 'react-native-vector-icons/Feather';
import {getVersion} from 'react-native-device-info';

function SettingButtonWithInfo({onPress, title, info, icon}) {
  return (
    <Card style={[styles.container]} onPress={onPress}>
      <Card.Title
        style={[styles.card]}
        title={title}
        titleStyle={styles.title}
        titleVariant="labelLarge"
        left={props => <Icon name={icon} {...props} size={24} color={globalStyles.color.gray} />}
        right={props => (
          <Icon name="chevron-right" {...props} size={24} color={globalStyles.color.gray} />
        )}
      />

      <Divider style={[styles.separator]} />
      <Card.Content>
        <View style={[styles.content]}>
          <Icon name="heart" size={24} color={globalStyles.color.gray} />
          <View style={[styles.info]}>
            <Title style={[styles.title]}>앱 버전</Title>
            <Paragraph style={[styles.subTitle]}>{getVersion()}</Paragraph>
          </View>
        </View>
      </Card.Content>
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
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  separator: {
    marginLeft: '20%',
  },
  info: {
    paddingTop: 12,
    paddingHorizontal: '10%',
  },
});

export default SettingButtonWithInfo;
