import { FunctionComponent } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

import ToolbarButton from 'src/components/ToolbarButton';

import styles from './Toolbar.styles';

export interface ToolbarProps {
  isFocused: boolean;
  onChangeFocus: () => void;
  onSubmit: () => void;
  onPressCamera: () => void;
  onPressLocation: () => void;
}

export const Toolbar: FunctionComponent<ToolbarProps> = ({
  isFocused,
  onChangeFocus,
  onSubmit,
  onPressCamera,
  onPressLocation,
}) => {
  return (
    <View style={styles.toolbar}>
      <ToolbarButton title="📷" onPress={onPressCamera} />
      <ToolbarButton title="🗺️" onPress={onPressLocation} />
    </View>
  );
};
