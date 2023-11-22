import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { store, persistor } from './store';
import ApplicationNavigator from './navigators/Application';
import './translations';
import {
  DatePickerProvider,
  ImageViewerProvider,
  LoadingGlobalProvider,
} from './hooks';
import { MenuProvider } from 'react-native-popup-menu';
import { LogBox } from 'react-native';
import Toast from 'react-native-toast-message';
import { PopupProvider } from './hooks/usePopup';

LogBox.ignoreAllLogs();

const App = () => (
  <Provider store={store}>
    {/**
     * PersistGate delays the rendering of the app's UI until the persisted state has been retrieved
     * and saved to redux.
     * The `loading` prop can be `null` or any react instance to show during loading (e.g. a splash screen),
     * for example `loading={<SplashScreen />}`.
     * @see https://github.com/rt2zz/redux-persist/blob/master/docs/PersistGate.md
     */}
    <PersistGate loading={null} persistor={persistor}>
      <LoadingGlobalProvider>
        <PopupProvider>
          <MenuProvider>
            <DatePickerProvider>
              <ImageViewerProvider>
                <ApplicationNavigator />
              </ImageViewerProvider>
            </DatePickerProvider>
          </MenuProvider>
        </PopupProvider>
      </LoadingGlobalProvider>
      <Toast />
    </PersistGate>
  </Provider>
);

export default App;
