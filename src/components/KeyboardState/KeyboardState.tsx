import { FunctionComponent, useState, useEffect } from 'react';
import { Keyboard, Platform, LayoutRectangle, KeyboardEvent } from 'react-native';

export interface KeyboardStateShape {
  containerHeight: number;
  contentHeight: number;
  keyboardHeight: number;
  keyboardVisible: boolean;
  keyboardWillShow: boolean;
  keyboardWillHide: boolean;
  keyboardAnimationDuration: number;
}

export interface KeyboardStateProps {
  layout: LayoutRectangle;
  content: (shape: KeyboardStateShape) => any;
}

const INITIAL_ANIMATION_DURATION = 250;

export const KeyboardState: FunctionComponent<KeyboardStateProps> = ({
  layout,
  content,
}) => {
  const [contentHeight, setContentHeight] = useState(layout.height);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardWillShow, setKeyboardWillShow] = useState(false);
  const [keyboardWillHide, setKeyboardWillHide] = useState(false);
  const [keyboardAnimationDuration, setKeyboardAnimationDuration] = useState(INITIAL_ANIMATION_DURATION);

  const measure = (event: KeyboardEvent) => {
    const {
      duration,
      endCoordinates: {
        height,
        screenY,
      },
    } = event;

    setContentHeight(screenY - layout.y);
    setKeyboardHeight(height);
    setKeyboardAnimationDuration(duration || INITIAL_ANIMATION_DURATION);
  };

  const handleKeyboardWillShow = (event: KeyboardEvent) => {
    setKeyboardWillShow(true);
    measure(event);
  };

  const handleKeyboardWillHide = (event: KeyboardEvent) => {
    setKeyboardWillHide(true);
    measure(event);
  };

  const handleKeyboardDidShow = (event: KeyboardEvent) => {
    setKeyboardWillShow(false);
    setKeyboardVisible(true);
    measure(event);
  };

  const handleKeyboardDidHide = () => {
    setKeyboardWillHide(false);
    setKeyboardVisible(false);
  };

  useEffect(() => {
    const subscriptions = Platform.OS === 'ios'
      ? [
        Keyboard.addListener('keyboardWillShow', handleKeyboardWillShow),
        Keyboard.addListener('keyboardWillHide', handleKeyboardWillHide),
        Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow),
        Keyboard.addListener('keyboardDidHide', handleKeyboardDidHide),
      ]
      : [
        Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow),
        Keyboard.addListener('keyboardDidHide', handleKeyboardDidHide),
      ];

    return () => {
      subscriptions.forEach((subscription) => subscription.remove());
    };
  }, []);


  return content({
    containerHeight: layout.height,
    contentHeight,
    keyboardHeight,
    keyboardVisible,
    keyboardWillShow,
    keyboardWillHide,
    keyboardAnimationDuration,
  });
};
