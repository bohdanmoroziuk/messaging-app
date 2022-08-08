import { FunctionComponent, useEffect } from 'react';
import { LayoutAnimation, Platform, UIManager, View } from 'react-native';
import { isIphoneX } from 'react-native-iphone-x-helper';

import useBackHandler from 'src/hooks/useBackHandler';

export type InputMethod = 'none' | 'keyboard' | 'custom';

export interface MessagingContainerProps {
  containerHeight: number;
  contentHeight: number;
  keyboardHeight: number;
  keyboardVisible: boolean;
  keyboardWillShow: boolean;
  keyboardWillHide: boolean;
  keyboardAnimationDuration: number;
  inputMethod: InputMethod;
  onChangeInputMethod: (inputMethod: InputMethod) => void;
  renderInputMethodEditor: () => any;
}

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export const MessagingContainer: FunctionComponent<MessagingContainerProps> = ({
  children,
  ...props
}) => {
  useEffect(() => {
    if (props.keyboardVisible) {
      props.onChangeInputMethod('keyboard');
    } else if (props.inputMethod !== 'custom') {
      props.onChangeInputMethod('none');
    }

    const animation = LayoutAnimation.create(
      props.keyboardAnimationDuration,
      Platform.OS === 'android'
        ? LayoutAnimation.Types.easeInEaseOut
        : LayoutAnimation.Types.keyboard,
      LayoutAnimation.Properties.opacity,
    );

    LayoutAnimation.configureNext(animation);
  }, [props]);

  useBackHandler(() => {
    if (props.inputMethod === 'custom') {
      props.onChangeInputMethod('none');
      return true;
    }

    return false;
  });

  const keyboardIsHidden = props.inputMethod === 'none' && !props.keyboardWillShow;

  const keyboardIsHiding = props.inputMethod === 'keyboard' && props.keyboardWillHide;

  const containerStyle = {
    height: props.keyboardWillShow || props.inputMethod === 'keyboard'
      ? props.contentHeight
      : props.containerHeight,
  };

  const shouldShowCustomInput = props.inputMethod === 'custom' && !props.keyboardWillShow;

  const inputStyle = {
    height: shouldShowCustomInput
      ? props.keyboardHeight || 250
      : 0,
    marginTop: isIphoneX() && (keyboardIsHidden || keyboardIsHiding)
      ? 24
      : 0,
  };

  return (
    <View style={containerStyle}>
      {children}
      <View style={inputStyle}>
        {props.renderInputMethodEditor()}
      </View>
    </View>
  );
};
