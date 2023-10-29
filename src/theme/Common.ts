/**
 * This file defines the base application styles.
 *
 * Use it to define generic component styles (e.g. the default text styles, default button styles...).
 */
import { StyleSheet } from 'react-native';
import buttonStyles from './components/Buttons';
import imageStyles from './components/Images';
import inputStyle from './components/TextInputs';
import { CommonParams } from '../../@types/theme';

export default function <C>({ Colors, ...args }: CommonParams<C>) {
  return {
    button: buttonStyles({ Colors, ...args }),
    imageStyles: imageStyles({ Colors, ...args }),
    input: inputStyle({ Colors, ...args }),
    ...StyleSheet.create({
      //background
      backgroundPrimary: {
        backgroundColor: Colors.primary,
      },
      backgroundReset: {
        backgroundColor: Colors.transparent,
      },
      backgroundWhite: {
        backgroundColor: Colors.white,
      },
      backgroundOpaque: {
        backgroundColor: Colors.black_30,
      },
      backgroundCommon: {
        backgroundColor: Colors.background,
      },
      //input
      textInput: {
        backgroundColor: Colors.inputBackground,
        color: Colors.textGray400,
        height: 45,
        borderRadius: 10,
        paddingStart: 20,
      },
      //shadow
      shadow: {
        shadowColor: '#000',
        backgroundColor: '#fff',
        shadowOffset: {
          width: 0,
          height: args.MetricsSizes.tiny * 0.7,
        },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
      },
      //border radius
      radiusTiny: {
        borderRadius: args.MetricsSizes.tiny,
      },
      radiusSmall: {
        borderRadius: args.MetricsSizes.small,
      },
      radiusRegular: {
        borderRadius: args.MetricsSizes.regular,
      },
      //size
      tinySize: {
        height: args.MetricsSizes.tiny,
        width: args.MetricsSizes.tiny,
      },
      smallSize: {
        height: args.MetricsSizes.small,
        width: args.MetricsSizes.small,
      },
      regularSize: {
        height: args.MetricsSizes.regular,
        width: args.MetricsSizes.regular,
      },
      largeSize: {
        height: args.MetricsSizes.large,
        width: args.MetricsSizes.large,
      },
      commonSize: {
        height: args.MetricsSizes.large * 1.5,
        width: args.MetricsSizes.large * 1.5,
      },
      //
      seperate: {
        height: 1,
        ...args.Layout.fullWidth,
        backgroundColor: Colors.textGray400,
        marginVertical: args.MetricsSizes.tiny,
      },
      roundBottom: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.textGray200,
      },
    }),
  };
}
