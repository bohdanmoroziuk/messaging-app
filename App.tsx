import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

import styles from './App.styles';

export default function App() {
  const renderMessageList = () => (
    <View style={styles.messageList}></View>
  );

  const renderInputMethodEditor = () => (
    <View style={styles.inputMethodEditor}></View>
  );

  const renderToolbar = () => (
    <View style={styles.toolbar}></View>
  );

  return (
    <View style={styles.container}>
      {renderMessageList()}
      {renderToolbar()}
      {renderInputMethodEditor()}
    </View>
  );
}
