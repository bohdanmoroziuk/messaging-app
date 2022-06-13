import { useState } from 'react';
import {
  View,
  Alert,
  Image,
  TouchableHighlight,
} from 'react-native';

import Status from 'src/components/Status';
import MessageList from 'src/components/MessageList';

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
    <View style={styles.inputMethodEditor}></View>
  );

  const renderToolbar = () => (
    <View style={styles.toolbar}></View>
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
      {renderMessageList()}
      {renderToolbar()}
      {renderInputMethodEditor()}
      {renderFullscreenImage()}
    </View>
  );
}
