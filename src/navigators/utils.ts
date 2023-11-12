import {
  CommonActions,
  createNavigationContainerRef,
} from '@react-navigation/native';
import { ApplicationStackParamList } from 'types/navigation';

export const navigationRef =
  createNavigationContainerRef<ApplicationStackParamList>();

export function goBack() {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
}

export function resetNavigate(
  routes: { name: keyof ApplicationStackParamList; params?: any }[],
  index?: number,
) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: index ?? 1,
        routes,
      }),
    );
  }
}
