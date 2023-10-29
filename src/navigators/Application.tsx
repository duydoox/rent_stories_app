import React, { useEffect } from 'react';
import { StatusBar, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { AddBook, Bill, Startup } from '../screens';
import { useTheme } from '../hooks';
import { useFlipper } from '@react-navigation/devtools';
import { ApplicationStackParamList } from '../../@types/navigation';
import { MyDrawer } from './Drawer';
import { useAppSelector } from '@/store';
import i18next from 'i18next';
import { navigationRef } from './utils';

const Stack = createStackNavigator<ApplicationStackParamList>();

// @refresh reset
const ApplicationNavigator = () => {
  const { Layout, darkMode, NavigationTheme } = useTheme();
  const { colors } = NavigationTheme;

  // const navigationRef = useNavigationContainerRef();

  useFlipper(navigationRef);

  //set language
  const { language } = useAppSelector(state => state.setting);
  useEffect(() => {
    if (language) {
      i18next.changeLanguage(language);
    }
  }, []);

  return (
    <View style={[Layout.fill, { backgroundColor: colors.card }]}>
      <NavigationContainer theme={NavigationTheme} ref={navigationRef}>
        <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Startup" component={Startup} />
          <Stack.Screen name="AddBook" component={AddBook} />
          <Stack.Screen name="Bill" component={Bill} />
          <Stack.Screen name="Main" component={MyDrawer} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default ApplicationNavigator;
