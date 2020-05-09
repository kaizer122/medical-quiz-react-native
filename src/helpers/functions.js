import { Dimensions } from 'react-native';

const baselineHeight = 709.33;
const baselineWidth = 360;

const window = Dimensions.get('window');

const screenHeight = window.height;
const screenWidth = window.width;

const scaleSize =
  (screenHeight + screenWidth) / 2 / ((baselineHeight + baselineWidth) / 2);

export const scale = value => Math.floor(scaleSize * value);
