import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from './CustomDrawerContent';
import useDrawerRoute from './drawerRoutes';
import { useTheme } from '@/hooks';

const Drawer = createDrawerNavigator();

function MyDrawer() {
  const drawerRoute = useDrawerRoute();
  const { Colors } = useTheme();

  return (
    <Drawer.Navigator
      initialRouteName="Feed"
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: Colors.transparent,
        },
        overlayColor: Colors.black_30,
        drawerPosition: 'right',
      }}
      // eslint-disable-next-line react/no-unstable-nested-components
      drawerContent={props => <CustomDrawerContent {...props} />}
    >
      {drawerRoute.map((route, index) => (
        <Drawer.Screen
          key={index}
          name={route.route}
          component={route.component}
          options={
            {
              item: route,
            } as any
          }
        />
      ))}
    </Drawer.Navigator>
  );
}

export default MyDrawer;
