import { StyleSheet } from 'react-native';
import { CommonParams } from '../../../@types/theme';

export default function <C>({
  Colors,
  Gutters,
  MetricsSizes,
}: CommonParams<C>) {
  const common = {
    ...Gutters.smallVPadding,
    ...Gutters.smallHPadding,
    backgroundColor: Colors.inputBackground,
    borderRadius: MetricsSizes.tiny,
  };

  return StyleSheet.create({
    common,
    outlineRounded: {
      ...common,
      borderWidth: 1,
      borderColor: Colors.textGray200,
    },
    text: {
      color: Colors.textGray400,
    },
  });
}
