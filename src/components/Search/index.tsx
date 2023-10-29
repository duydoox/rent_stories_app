import { Image, Text, TextInput, View } from 'react-native';
import React, { memo } from 'react';
import { useTheme } from '@/hooks';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

const Search = memo<{ placeholder?: string; opened?: boolean }>(
  ({ placeholder = 'Tìm kiếm truyện', opened }) => {
    const { Colors, Layout, Images, Common, Gutters, Fonts, MetricsSizes } =
      useTheme();

    return (
      <View style={[Layout.rowHCenter]}>
        <View
          style={[
            Common.largeSize,
            Gutters.tinyRMargin,
            Gutters.tinyVPadding,
            Gutters.tinyHPadding,
          ]}
        >
          <Image
            source={Images.icons.search}
            resizeMode="contain"
            style={[Layout.fullSize, { tintColor: Colors.textGray400 }]}
          />
        </View>
        <TextInput
          placeholder={placeholder}
          style={[Fonts.textSmall, Layout.fill]}
          placeholderTextColor={Colors.textGray200}
        />

        <Menu>
          <MenuTrigger
            style={[
              Common.backgroundPrimary,
              Gutters.tinyVPadding,
              Gutters.smallHPadding,
              Common.radiusTiny,
            ]}
          >
            <Text style={[Fonts.textNight]}>Tìm kiếm</Text>
          </MenuTrigger>
          <MenuOptions
            optionsContainerStyle={[
              Gutters.tinyVPadding,
              Gutters.smallHPadding,
              {
                marginTop: MetricsSizes.large * 1.5,
                width: MetricsSizes.fullWidth - MetricsSizes.small * 2,
              },
            ]}
          >
            <MenuOption onSelect={() => {}}>
              <Text>Tấm cám</Text>
            </MenuOption>
            <MenuOption onSelect={() => {}}>
              <Text>Truyện kể bé nghe</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>
    );
  },
);

export default React.memo(Search);
