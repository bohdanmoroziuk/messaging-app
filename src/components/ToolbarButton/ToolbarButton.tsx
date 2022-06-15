import { FunctionComponent } from 'react';
import { TouchableOpacity, Text } from 'react-native';

import styles from './ToolbarButton.styles'

export interface ToolbarButtonProps {
  title: string;
  onPress: () => void;
}

export const ToolbarButton: FunctionComponent<ToolbarButtonProps> = ({
  title,
  onPress,
}) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={styles.button}>
      {title}
    </Text>
  </TouchableOpacity>
);
