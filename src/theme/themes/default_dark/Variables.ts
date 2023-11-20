import { ThemeNavigationColors } from '../../../../@types/theme';

export const Colors = {
  primary: '#7454a5',
  textGray800: '#E0E0E0',
  textGray400: '#ABABAB',
  textGray200: '#969696',
  inputBackground: '#3a3a3a',
  circleButtonBackground: '#252732',
  background: '#1B1A23',
  black_30: 'rgba(255, 255, 255, 0.2)',
  white: '#252732',
};

export const NavigationColors: Partial<ThemeNavigationColors> = {
  primary: Colors.primary,
  background: '#1B1A23',
  card: '#1B1A23',
};

export default {
  Colors,
  NavigationColors,
};
