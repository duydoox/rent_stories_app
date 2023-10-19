import { StyleSheet } from 'react-native';
import { CommonParams } from '../../../@types/theme';

export default function <C>({
  Colors,
  // Gutters,
  Layout,
  MetricsSizes,
}: CommonParams<C>) {
  const base = {
    ...Layout.center,
    height: MetricsSizes.large * 2,
    width: MetricsSizes.large * 2,
  };
  const rounded = {
    ...base,
    borderRadius: MetricsSizes.small,
  };
  const circle = {
    ...base,
    borderRadius: 1000,
  };

  return StyleSheet.create({
    base,
    rounded,
    circle,
    outlineCircle: {
      ...circle,
      borderWidth: 2,
      borderColor: Colors.primary,
    },
  });
}
