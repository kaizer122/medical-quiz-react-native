import { Dimensions } from 'react-native';
import { scale } from './functions';

const window = Dimensions.get('window');

export default {
  height: window.height,
  width: window.width,
  smallIcon: scale(15),
  mediumIcon: scale(25),
  largeIcon: scale(30),
  xsmallMargin: scale(5),
  smallMargin: scale(10),
  tinyMargin: scale(5),
  mediumMargin: scale(15),
  baseMargin: scale(20),
  doubleMediumMargin: scale(30),
  doubleBaseMargin: scale(40),
  bigMargin: scale(50),
  largeMrgin: scale(100),
  smallRadius: scale(10),
  xSmallRadius: scale(5),
  navBarHeight: scale(40),
  menuItemHeight: scale(100),
  tabbarHeight: scale(54),
};
