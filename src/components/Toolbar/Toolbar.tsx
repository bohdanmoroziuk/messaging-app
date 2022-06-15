import { FunctionComponent, useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

import ToolbarButton from 'src/components/ToolbarButton';

import styles from './Toolbar.styles';

export interface ToolbarProps {
  isFocused: boolean;
  onChangeFocus: (isFocused: boolean) => void;
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

  const inputRef = useRef<TextInput>(null);

  const handleChangeText = (text: string) => {
    setText(text);
  };

  const handleSubmitEditing = () => {
    if (!text) return;

    onSubmit(text);
    setText('');
  };

  const handleFocus = () => {
    onChangeFocus(true);
  };

  const handleBlur = () => {
    onChangeFocus(false);
  };

  useEffect(() => {
    if (isFocused) {
      inputRef.current?.focus();
    } else {
      inputRef.current?.blur();
    }
  }, [isFocused]);

  return (
    <View style={styles.toolbar}>
      <ToolbarButton title="📷" onPress={onPressCamera} />
      <ToolbarButton title="🗺️" onPress={onPressLocation} />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          ref={inputRef}
          underlineColorAndroid="transparent"
          placeholder="Type something..."
          blurOnSubmit={false}
          value={text}
          onChangeText={handleChangeText}
          onSubmitEditing={handleSubmitEditing}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </View>
    </View>
  );
};
