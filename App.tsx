import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Alert } from 'react-native';

import Status from 'src/components/Status';
import MessageList from 'src/components/MessageList';

import {
  createTextMessage,
  createImageMessage,
  createLocationMessage,
} from 'src/utils/messages';

import styles from './App.styles';
import { Message } from 'src/types';

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

  return (
    <View style={styles.container}>
      <Status />
      {renderMessageList()}
      {renderToolbar()}
      {renderInputMethodEditor()}
    </View>
  );
}
