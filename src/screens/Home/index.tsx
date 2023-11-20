import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { useTheme } from '../../hooks';
import { Header } from '../../components';
import { ApplicationScreenProps } from '../../../@types/navigation';
import useDrawerRoute from '@/navigators/Drawer/drawerRoutes';
import { useAppSelector } from '@/store';
import { useTimKiemTruyenQuery } from '@/services/modules/truyen';

const Home = ({ navigation }: ApplicationScreenProps) => {
  const { Layout, Fonts, Gutters, Common } = useTheme();

  const routeDrawer = useDrawerRoute();

  const { nhanVien } = useAppSelector(state => state.auth);

  const { data: truyens } = useTimKiemTruyenQuery({
    keyword: '',
  });

  console.log(truyens, 'truyens');

  const showRoutes = routeDrawer?.filter(
    v =>
      v.route !== 'Home' &&
      (nhanVien?.viTri === 'NV' ? v.route !== 'Statistic' : true),
  );

  return (
    <View style={[Layout.fill]}>
      <Header title="Trang chủ" isMenu />
      <View style={[Layout.center, Layout.fill]}>
        <View style={[Layout.wrapper, Layout.row]}>
          {showRoutes?.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                Layout.center,
                Gutters.largeVPadding,
                Common.shadow,
                Common.backgroundWhite,
                Common.radiusRegular,
                Gutters.regularVMargin,
                Gutters.smallHMargin,
                { width: '44.9%' },
              ]}
              onPress={() => navigation.navigate(item.route)}
            >
              <Image
                source={item.icon}
                style={[Common.commonSize, Gutters.regularBMargin]}
                resizeMode="contain"
              />
              <Text style={[Fonts.textSmall, Fonts.textBold500]}>
                {item.lable}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

export default Home;
