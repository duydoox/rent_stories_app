import React, { useEffect } from 'react';
import { StatusBar, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import {
  AddBook,
  AddCustomer,
  Bill,
  BookSelect,
  Login,
  Startup,
} from '../screens';
import { useTheme } from '../hooks';
import { useFlipper } from '@react-navigation/devtools';
import { ApplicationStackParamList } from '../../@types/navigation';
import { MyDrawer } from './Drawer';
import { useAppSelector } from '@/store';
import i18next from 'i18next';
import { navigationRef } from './utils';
import ReturnBookDetail from '@/screens/ReturnBookDetail';

const Stack = createStackNavigator<ApplicationStackParamList>();

// @refresh reset
const ApplicationNavigator = () => {
  const { Layout, darkMode, NavigationTheme } = useTheme();
  const { colors } = NavigationTheme;

  // const navigationRef = useNavigationContainerRef();

  useFlipper(navigationRef);

  const { accessToken } = useAppSelector(state => state.auth);

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
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName={accessToken ? 'Main' : 'Login'}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Startup" component={Startup} />
          <Stack.Screen name="AddBook" component={AddBook} />
          <Stack.Screen name="Bill" component={Bill} />
          <Stack.Screen name="BookSelect" component={BookSelect} />
          <Stack.Screen name="AddCustomer" component={AddCustomer} />
          <Stack.Screen name="ReturnBookDetail" component={ReturnBookDetail} />
          <Stack.Screen name="Main" component={MyDrawer} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default ApplicationNavigator;
