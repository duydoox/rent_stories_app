import { TouchableOpacity, View } from 'react-native';
import React, { memo } from 'react';
import { useTheme } from '@/hooks';

const Radio = memo<{
  isChecked?: boolean;
  onPress?: () => void;
}>(({ isChecked = false, onPress }) => {
  const { Colors, MetricsSizes, Layout } = useTheme();

  return (
    <TouchableOpacity
      style={[
        {
          borderColor: isChecked ? Colors.primary : Colors.textGray400,
          borderWidth: MetricsSizes.tiny / MetricsSizes.tiny,
          width: MetricsSizes.tiny * 4,
          height: MetricsSizes.tiny * 4,
          borderRadius: MetricsSizes.tiny * 2,
          padding: MetricsSizes.tiny * 0.7,
        },
      ]}
      onPress={onPress}
    >
      {isChecked && (
        <View
          style={[
            Layout.fullSize,
            {
              borderRadius: MetricsSizes.tiny * 2,
              backgroundColor: isChecked ? Colors.primary : Colors.textGray400,
            },
          ]}
        />
      )}
    </TouchableOpacity>
  );
});

export default React.memo(Radio);
