import { Image, Text, TouchableOpacity, View } from 'react-native';
import React, { memo } from 'react';
import { useTheme } from '@/hooks';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { goBack } from '@/navigators/utils';

const Header = memo<{
  title: string;
  isMenu?: boolean;
}>(({ title, isMenu = false }) => {
  const { Colors, Layout, Images, Common, Gutters, Fonts, MetricsSizes } =
    useTheme();
  const inset = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <View
      style={[
        { paddingTop: inset.top + MetricsSizes.tiny },
        [
          Layout.rowHCenter,
          Layout.justifyContentBetween,
          Gutters.tinyVPadding,
          Gutters.smallHPadding,
          Common.backgroundPrimary,
        ],
      ]}
    >
      {!isMenu ? (
        <TouchableOpacity onPress={goBack}>
          <Image
            source={Images.icons.back}
            resizeMode="contain"
            style={[Common.largeSize, { tintColor: Colors.textGray800 }]}
          />
        </TouchableOpacity>
      ) : (
        <View style={[Common.largeSize]} />
      )}
      <Text style={[Fonts.textRegular, Fonts.textBold500]}>{title}</Text>
      {isMenu ? (
        <TouchableOpacity
          onPress={() => {
            navigation?.dispatch(DrawerActions.openDrawer());
          }}
        >
          <Image
            source={Images.icons.menu}
            resizeMode="contain"
            style={[Common.largeSize, { tintColor: Colors.textGray800 }]}
          />
        </TouchableOpacity>
      ) : (
        <View style={[Common.largeSize]} />
      )}
    </View>
  );
});

export default React.memo(Header);
