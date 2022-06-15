import { FunctionComponent, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

import ToolbarButton from 'src/components/ToolbarButton';

import styles from './Toolbar.styles';

export interface ToolbarProps {
  isFocused: boolean;
  onChangeFocus: () => void;
  onSubmit: (text: string) => void;
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
  const [text, setText] = useState('');

  const handleChangeText = (text: string) => {
    setText(text);
  };

  const handleSubmitEditing = () => {
    if (!text) return;

    onSubmit(text);
    setText('');
  };

  return (
    <View style={styles.toolbar}>
      <ToolbarButton title="📷" onPress={onPressCamera} />
      <ToolbarButton title="🗺️" onPress={onPressLocation} />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Type something..."
          blurOnSubmit={false}
          value={text}
          onChangeText={handleChangeText}
          onSubmitEditing={handleSubmitEditing}
        />
      </View>
    </View>
  );
};
