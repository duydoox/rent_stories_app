/**
 * This file contains the application's variables.
 *
 * Define color, sizes, etc. here instead of duplicating them throughout the components.
 * That allows to change them more easily later on.
 */

import { ThemeNavigationColors } from '../../@types/theme';
import { Dimensions } from 'react-native';

/**
 * Colors
 */
export const Colors = {
  transparent: 'rgba(0,0,0,0)',
  inputBackground: '#FFFFFF',
  white: '#ffffff',
  background: '#ffffff',
  //Typography
  textGray800: '#000000',
  black_30: 'rgba(0, 0, 0, 0.3)',
  white_40: 'rgba(255, 255, 255, 0.4)',
  textGray400: '#4D4D4D',
  textGray200: '#A1A1A1',
  primary: '#00CC99',
  blue: '#0066CC',
  red: '#FF5555',
  orange: '#EEA500',
  success: '#28a745',
  error: '#dc3545',
  //ComponentColors
  circleButtonBackground: '#E1E1EF',
  circleButtonColor: '#44427D',
};

export const NavigationColors: Partial<ThemeNavigationColors> = {
  primary: Colors.primary,
  background: '#EFEFEF',
  card: '#EFEFEF',
};

/**
 * FontSize
 */
export const FontSize = {
  tiny: 14,
  small: 16,
  regular: 20,
  large: 40,
};

/**
 * Metrics Sizes
 */
const tiny = 5;
const small = tiny * 2; // 20
const regular = tiny * 3; // 30
const large = regular * 2; // 60
const fullHeight = Dimensions.get('screen').height;
const fullWidth = Dimensions.get('screen').width;
export const MetricsSizes = {
  tiny,
  small,
  regular,
  large,
  fullHeight,
  fullWidth,
};

export default {
  Colors,
  NavigationColors,
  FontSize,
  MetricsSizes,
};
