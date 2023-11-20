import { ActivityIndicator, Image, Text, TextInput, View } from 'react-native';
import React, { memo, useState } from 'react';
import { useTheme } from '@/hooks';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

const Search = memo<{
  placeholder?: string;
  items?: string[];
  onSearch?: (value?: string) => void;
  onSelect?: () => void;
  showMenu?: boolean;
}>(
  ({
    placeholder = 'Tìm kiếm truyện',
    items,
    onSearch,
    onSelect,
    showMenu = true,
  }) => {
    const { Colors, Layout, Images, Common, Gutters, Fonts, MetricsSizes } =
      useTheme();
    const [value, setValue] = useState('');

    return (
      <View
        style={[
          Layout.rowHCenter,
          Common.backgroundWhite,
          Gutters.smallHPadding,
          Gutters.smallVMargin,
        ]}
      >
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
          value={value}
          onChangeText={setValue}
        />

        <Menu opened={showMenu}>
          <MenuTrigger
            style={[
              Common.backgroundPrimary,
              Gutters.tinyVPadding,
              Gutters.smallHPadding,
              Common.radiusTiny,
            ]}
            onPress={() => onSearch?.(value)}
            // disabled={!showMenu}
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
            {items?.map((v, i) => (
              <MenuOption onSelect={onSelect} key={i}>
                <Text style={[Fonts.textSmall]}>{v}</Text>
              </MenuOption>
            ))}
            {!items && <ActivityIndicator color={Colors.primary} />}
          </MenuOptions>
        </Menu>
      </View>
    );
  },
);

export default React.memo(Search);
