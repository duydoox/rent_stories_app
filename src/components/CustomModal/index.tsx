import React, { memo } from 'react';
import { useTheme } from '@/hooks';
import Modal from 'react-native-modal';

const CustomModal = memo<{
  visivle: boolean;
  children: React.ReactNode;
  onBackButtonPress?: () => void;
}>(({ visivle, children, onBackButtonPress }) => {
  const { Layout, MetricsSizes } = useTheme();

  return (
    <Modal
      isVisible={visivle}
      onBackButtonPress={onBackButtonPress}
      animationOutTiming={5}
      animationInTiming={50}
      animationIn={'slideInDown'}
      panResponderThreshold={1}
      animationOut={'slideInUp'}
      deviceWidth={MetricsSizes.fullWidth}
      deviceHeight={MetricsSizes.fullHeight}
      style={[Layout.center]}
    >
      {children}
    </Modal>
  );
});

export default React.memo(CustomModal);
