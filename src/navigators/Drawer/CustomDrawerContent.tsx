import React, { useReducer, useRef } from 'react';
import {
  DrawerContentComponentProps,
  useDrawerProgress,
} from '@react-navigation/drawer';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import { Image, Switch, Text, TouchableOpacity, View } from 'react-native';
import { PropsDrawerRoute } from './drawerRoutes';
import { useTheme } from '@/hooks';
import { ThemeState, changeTheme } from '@/store/theme';
import { useDispatch } from 'react-redux';
import i18next from 'i18next';
import { Radio } from '@/components';
import { useAppSelector } from '@/store';
import { changelanguage } from '@/store/setting';
import { resetNavigate } from '../utils';
import { setToken } from '@/store/auth';

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const progress = useDrawerProgress();
  const { descriptors, navigation, state } = props;
  const {
    Colors,
    Layout,
    Gutters,
    Fonts,
    Images,
    Common,
    darkMode: isDark,
  } = useTheme();

  const scrollRef = useRef<Animated.ScrollView>(null);
  const dispatch = useDispatch();
  const { language } = useAppSelector(_state => _state.setting);
  const { nhanVien } = useAppSelector(s => s.auth);

  const routes =
    nhanVien?.viTri === 'QL'
      ? state.routes
      : state.routes.filter(r => r.name !== 'Statistic');

  const animatedStyles = useAnimatedStyle(() => {
    const scale = interpolate(progress.value, [0, 1], [0.6, 1]);

    return {
      transform: [{ scale: scale }],
    };
  });

  const [show, toggleShow] = useReducer(s => !s, false);

  const fun = () => {
    if (show) {
      scrollRef.current?.scrollTo({ y: 0, x: 0, animated: true });
    } else {
      scrollRef.current?.scrollToEnd();
    }
    toggleShow();
  };

  const scaleAnimated = useDerivedValue(() =>
    show ? withTiming(1) : withTiming(0),
  );

  const menuStyle = useAnimatedStyle(() => {
    const scaleY = interpolate(scaleAnimated.value, [0, 1], [0, 1]);
    return {
      transform: [{ scaleY }],
    };
  });

  const onChangeTheme = ({ theme, darkMode }: Partial<ThemeState>) => {
    dispatch(changeTheme({ theme, darkMode }));
  };

  const onChangeLanguage = (lang: 'fr' | 'en') => {
    i18next.changeLanguage(lang);
    dispatch(changelanguage({ language: lang }));
  };

  const logout = () => {
    dispatch(
      setToken({
        accessToken: null,
      }),
    );
    resetNavigate([{ name: 'Login' }]);
  };

  return (
    // <Animated.View style={{ transform: [{ translateX: 1 }] }}>
    //   <DrawerItemList {...props} />;
    // </Animated.View>
    <Animated.View
      style={[Gutters.largeTPadding, Gutters.smallHMargin, Layout.fill]}
    >
      <View
        style={[
          Gutters.regularVPadding,
          Gutters.smallHPadding,
          Gutters.smallBMargin,
          Layout.rowHCenter,
          Common.radiusSmall,
          Common.backgroundCommon,
        ]}
      >
        <View
          style={[
            Common.imageStyles.rounded,
            Common.backgroundPrimary,
            Gutters.smallRMargin,
            Common.commonSize,
            Gutters.tinyVPadding,
            Gutters.tinyHPadding,
          ]}
        >
          <Image
            source={Images.logo}
            style={[Layout.fullSize]}
            resizeMode="contain"
          />
        </View>
        <Text style={[Fonts.textBold, Fonts.textSmall, Fonts.textNight]}>
          Hello there!
        </Text>
      </View>
      <Animated.ScrollView
        {...props}
        style={[animatedStyles]}
        showsVerticalScrollIndicator={false}
        ref={scrollRef}
      >
        <View
          style={[
            Gutters.regularVPadding,
            Gutters.smallHPadding,
            Gutters.smallBMargin,
            Common.radiusSmall,
            Common.backgroundCommon,
          ]}
        >
          {routes.map((route, index) => {
            const isFocus = state.index === index;
            const { options } = descriptors[route.key];
            const onPress = () => {
              const event = navigation.emit({
                type: 'drawerItemPress',
                target: route.key,
                canPreventDefault: true,
              });
              if (!isFocus && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };
            const color = isFocus ? Colors.white : Colors.textGray800;
            const drawerItem: PropsDrawerRoute = (options as any).item;
            return (
              <TouchableOpacity
                key={route.key}
                style={[
                  Layout.rowHCenter,
                  Gutters.tinyVPadding,
                  Gutters.tinyVMargin,
                  Gutters.smallHPadding,
                  Common.radiusSmall,
                  isFocus ? Common.backgroundPrimary : Common.backgroundReset,
                ]}
                onPress={onPress}
              >
                <Image
                  source={drawerItem.icon}
                  style={[Common.largeSize, Gutters.smallRMargin]}
                  resizeMode="contain"
                />
                <Text
                  style={[
                    Fonts.textSmall,
                    { color: color },
                    isFocus && Fonts.textBold500,
                  ]}
                >
                  {drawerItem.lable}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View
          style={[
            Gutters.smallVPadding,
            Gutters.smallHPadding,
            Gutters.smallBMargin,
            Common.radiusSmall,
            Common.backgroundCommon,
          ]}
        >
          <Text style={[Fonts.textBold500, Fonts.textSmall]}>Cài đặt</Text>
          <View style={[Common.seperate]} />
          <View style={[Gutters.tinyTPadding]}>
            <View style={[Layout.rowHCenter]}>
              <Image
                source={Images.icons.dark_mode}
                resizeMode="contain"
                style={[
                  Common.imageStyles.rounded,
                  Common.largeSize,
                  Gutters.smallRMargin,
                ]}
              />
              <Text style={[Fonts.textSmall, Fonts.textNight]}>
                Chế độ ban đêm
              </Text>
            </View>
            <View style={[Gutters.largeLMargin, Gutters.smallLPadding]}>
              <View style={[Layout.rowHCenter, Layout.justifyContentBetween]}>
                <Text style={[Fonts.textSmall, Fonts.textBold500]}>
                  - {isDark ? 'Tối' : 'Sáng'}
                </Text>
                <Switch
                  value={isDark}
                  onChange={() => onChangeTheme({ darkMode: !isDark })}
                />
              </View>
            </View>
          </View>
          <View style={[Gutters.tinyVPadding]}>
            <View style={[Layout.rowHCenter]}>
              <Image
                source={Images.icons.translation}
                resizeMode="contain"
                style={[
                  Common.imageStyles.rounded,
                  Common.largeSize,
                  Gutters.smallRMargin,
                ]}
              />
              <Text style={[Fonts.textSmall, Fonts.textNight]}>Ngôn ngữ</Text>
            </View>
            <View style={[Gutters.largeLMargin, Gutters.smallLPadding]}>
              <View style={[Layout.rowHCenter, Gutters.tinyVMargin]}>
                <Radio
                  isChecked={language === 'fr'}
                  onPress={() => onChangeLanguage('fr')}
                />
                <Text style={[Fonts.textSmall, Gutters.smallLMargin]}>
                  Việt Nam
                </Text>
              </View>
              <View style={[Layout.rowHCenter, Gutters.tinyTMargin]}>
                <Radio
                  isChecked={language === 'en'}
                  onPress={() => onChangeLanguage('en')}
                />
                <Text style={[Fonts.textSmall, Gutters.smallLMargin]}>
                  English
                </Text>
              </View>
            </View>
          </View>
        </View>

        <Animated.View
          style={[
            Gutters.smallVPadding,
            Gutters.smallHPadding,
            Common.radiusSmall,
            Common.backgroundPrimary,
            menuStyle,
          ]}
        >
          <View>
            <Text style={[Fonts.textSmall, Fonts.textBold500]}>
              {nhanVien?.tenNhanVien ?? 'Tên nhân viên'}
            </Text>
            <Text style={[Fonts.textSmall]}>
              {nhanVien?.soDienThoai ?? '096932787'}
            </Text>
          </View>
          <View style={[Common.seperate]} />
          <TouchableOpacity style={[Layout.rowHCenter, Gutters.tinyVPadding]}>
            <Image
              source={Images.icons.edit}
              resizeMode="contain"
              style={[Common.largeSize, Gutters.smallRMargin]}
            />
            <Text style={[Fonts.textSmall, Fonts.textBold500]}>
              Thông tin cá nhân
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[Layout.rowHCenter, Gutters.tinyVPadding]}>
            <Image
              source={Images.icons.padlock}
              resizeMode="contain"
              style={[Common.largeSize, Gutters.smallRMargin]}
            />
            <Text style={[Fonts.textSmall, Fonts.textBold500]}>
              Đổi mật khẩu
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[Layout.rowHCenter, Gutters.tinyVPadding]}
            onPress={logout}
          >
            <Image
              source={Images.icons.logout}
              resizeMode="contain"
              style={[Common.largeSize, Gutters.smallRMargin]}
            />
            <Text style={[Fonts.textSmall, Fonts.textBold500]}>Đăng xuất</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.ScrollView>
      <TouchableOpacity
        style={[
          Gutters.smallVMargin,
          Gutters.smallHPadding,
          Gutters.regularVPadding,
          Layout.rowHCenter,
          Common.radiusSmall,
          Common.backgroundCommon,
        ]}
        activeOpacity={0.9}
        onPress={fun}
      >
        <Image
          source={Images.avatar.female_1}
          style={[Common.imageStyles.outlineCircle, Gutters.smallRMargin]}
          resizeMode="contain"
        />
        <View>
          <Text style={[Fonts.textBold500, Fonts.textRegular]}>
            {nhanVien?.tenNhanVien ?? 'Tên nhân viên'}
          </Text>
          <Text style={[Fonts.textTiny, Fonts.textPrimary]}>
            {nhanVien?.viTri === 'QL' ? 'Quản lý' : 'Nhân viên'}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default CustomDrawerContent;
