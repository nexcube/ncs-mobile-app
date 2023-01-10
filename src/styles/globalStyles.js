import {StyleSheet} from 'react-native';

const globalStyles = StyleSheet.create({
  color: {
    text: '#333333',
    grayDark: '#666666',
    gray: '#999999',
    grayLight: '#cccccc',
    blue: '#0067CC',
    purple: '#332D41',
    white: '#ffffff',
    red: '#B3261E',
    background: '#F5F5F5',
    separator: '#EEEEEE',
  },

  font: {
    title: 'Happiness-Sans-Title',
    regular: 'Happiness-Sans-Regular',
    bold: 'Happiness-Sans-Bold',
  },

  spinnerTextStyle: {
    color: '#FFF',
    fontFamily: 'Happiness-Sans-Bold',
    fontSize: 15,
  },

  elevated: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
  },

  backButtonPadding: {
    paddingRight: 24,
    paddingVertical: 10,
  },
  row: {
    flexDirection: 'row',
  },
});

export default globalStyles;
