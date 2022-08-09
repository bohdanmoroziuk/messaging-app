import { useState } from 'react';
import {
  View,
  Alert,
  Image,
  TouchableHighlight,
} from 'react-native';

import Status from 'src/components/Status';
import Toolbar from 'src/components/Toolbar';
import MessageList from 'src/components/MessageList';
import ImageGrid from 'src/components/ImageGrid';
import KeyboardState from 'src/components/KeyboardState';
import MeasureLayout from 'src/components/MeasureLayout';
import MessagingContainer, { InputMethod } from 'src/components/MessagingContainer';

import useBackHandler from 'src/hooks/useBackHandler';

import {
  createTextMessage,
  createImageMessage,
  createLocationMessage,
} from 'src/utils/messages';

import { ImageMessage, Message } from 'src/types';

import styles from './App.styles';

export default function App() {
  const [messages, setMessages] = useState([
    createImageMessage('https://unsplash.it/300/300'),
    createTextMessage('Hello'),
    createTextMessage('World'),
    createLocationMessage({
      latitude: 37.78825,
      longitude: -122.4324,
    }),
  ]);

  const [fullscreenImageId, setFullscreenImageId] = useState<number | null>(null);

  const [isInputFocused, setIsInputFocused] = useState(false);

  const [inputMethod, setInputMethod] = useState<InputMethod>('none');

  const handleChangeFocus = (isFocused: boolean) => {
    setIsInputFocused(isFocused);
  };
  
  const handlePressCamera = () => {
    setIsInputFocused(false);
    setInputMethod('custom');
  };

  const handlePressLocation = () => {

  };

  const handlePressImage = (uri: string) => {
    setMessages((prevMessages) => [
      createImageMessage(uri),
      ...prevMessages,
    ]);
  };

  const handleSubmit = (text: string) => {
    setMessages((prevMessages) => [
      createTextMessage(text),
      ...prevMessages,
    ]);
  };

  const dismissFullscreenImage = () => {
    setFullscreenImageId(null);
  };

  const renderFullscreenImage = () => {
    if (!fullscreenImageId) return null;

    const image = messages.find((message) => message.id === fullscreenImageId);

    if (!image) return null;

    const { uri } = image as ImageMessage;

    return (
      <TouchableHighlight
        style={styles.fullscreenOverlay}
        onPress={dismissFullscreenImage}
      >
        <Image
          style={styles.fullscreenImage}
          source={{ uri }}
        />
      </TouchableHighlight>
    );
  };

  const handlePressMessage = (message: Message) => {
    switch (message.type) {
      case 'text':
        Alert.alert(
          'Delete message?',
          'Are you sure you want to permanently delete this message?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Delete',
              style: 'destructive',
              onPress: () => {
                setMessages((messages) => messages.filter((item) => item.id !== message.id));
              },
            },
          ],
        );
        break;
      case 'image':
        setIsInputFocused(false);
        setFullscreenImageId(message.id);
        break;
      default: 
        break;
    }
  };

  const renderMessageList = () => (
    <View style={styles.messageList}>
      <MessageList
        messages={messages}
        onPressMessage={handlePressMessage}
      />
    </View>
  );

  const renderInputMethodEditor = () => (
    <View style={styles.inputMethodEditor}>
      <ImageGrid onPressImage={handlePressImage} />
    </View>
  );

  const renderToolbar = () => (
    <View style={styles.toolbar}>
      <Toolbar
        isFocused={isInputFocused}
        onChangeFocus={handleChangeFocus}
        onSubmit={handleSubmit}
        onPressCamera={handlePressCamera}
        onPressLocation={handlePressLocation}
      />
    </View>
  );

  const handleBackPress = () => {
    if (fullscreenImageId) {
      dismissFullscreenImage();
      return true;
    }

    return false;
  };

  useBackHandler(handleBackPress);

  return (
    <View style={styles.container}>
      <Status />
      <MeasureLayout
        content={(layout) => (
          <KeyboardState
            layout={layout}
            content={(info) => (
              <MessagingContainer
                {...info}
                inputMethod={inputMethod}
                onChangeInputMethod={setInputMethod}
                renderInputMethodEditor={renderInputMethodEditor}
              />
            )}
          >
            {renderMessageList()}
            {renderToolbar()}
          </KeyboardState>
        )}
      />
      {renderFullscreenImage()}
    </View>
  );
}
