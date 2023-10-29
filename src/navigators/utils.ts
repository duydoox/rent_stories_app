import { createNavigationContainerRef } from '@react-navigation/native';
import { ApplicationStackParamList } from 'types/navigation';

export const navigationRef =
  createNavigationContainerRef<ApplicationStackParamList>();

export function goBack() {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
}
