/* eslint-disable react/require-default-props */
/* eslint-disable react/react-in-jsx-scope */
import { Text, View } from 'react-native';
import usePopup from './usePopup';
import useTheme from './useTheme';

export const CustomAlert = (props: {
  title: string;
  content: string;
  action?: {
    text: string;
    type?: 'cancel';
    onPress?: () => void;
  }[];
  onCancel?: () => void;
}) => {
  const { Common, Fonts, Gutters, Layout } = useTheme();
  return (
    <View
      style={[
        Common.backgroundWhite,
        Gutters.largeHPadding,
        Gutters.regularVPadding,
        Common.radiusRegular,
      ]}
    >
      <Text style={[Fonts.textRegular, Fonts.textBold500]}>{props?.title}</Text>
      <Text style={[Fonts.textSmall]}>{props?.content}</Text>
      <View style={[Layout.selfEnd, Layout.row, Gutters.largeTMargin]}>
        {(
          props?.action ?? [
            {
              text: 'OK',
              type: 'cancel',
            },
          ]
        )?.map(a => (
          <Text
            style={[
              Fonts.textRegular,
              Fonts.textBold500,
              Gutters.regularLPadding,
            ]}
            onPress={() => {
              if (a.type === 'cancel') {
                props.onCancel?.();
              } else {
                props.onCancel?.();
                a?.onPress?.();
              }
            }}
          >
            {a.text}
          </Text>
        ))}
      </View>
    </View>
  );
};

const useAlert = () => {
  const popup = usePopup();

  return (
    title: string,
    content: string,
    action?: {
      text: string;
      type?: 'cancel';
      onPress?: () => void;
    }[],
  ) => {
    popup?.visible?.(
      <CustomAlert
        title={title}
        content={content}
        action={action}
        onCancel={popup?.hiden}
      />,
    );
  };
};

export default useAlert;
