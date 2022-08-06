import { FunctionComponent, useState } from 'react';
import { View, Platform, LayoutChangeEvent, LayoutRectangle } from 'react-native';
import Constants from 'expo-constants';

import styles from 'src/components/MeasureLayout/MeasureLayout.styles';

export interface MeasureLayoutProps {
  content: (layout: LayoutRectangle) => any;
}

export const MeasureLayout: FunctionComponent<MeasureLayoutProps> = ({ content }) => {
  const [layout, setLayout] = useState<LayoutRectangle | null>(null);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { layout } = event.nativeEvent;

    setLayout({
      ...layout,
      y: layout.y + (Platform.OS === 'android' ? Constants.statusBarHeight : 0),
    });

  };

  if (layout) return content(layout);

  return (
    <View
      style={styles.container}
      onLayout={handleLayout}
    />
  );
};
