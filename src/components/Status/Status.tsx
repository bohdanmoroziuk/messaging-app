import { FunctionComponent } from 'react';
import { StatusBar, Text, View, Platform } from 'react-native';
import useNetInfo from 'src/hooks/useNetInfo';

import styles from './Status.styles';

export interface StatusProps {}

export const Status: FunctionComponent<StatusProps> = () => {
  const { isConnected } = useNetInfo();

  const backgroundColor = isConnected ? 'white' : 'red';

  const statusBar = (
    <StatusBar
      backgroundColor={backgroundColor}
      barStyle={isConnected ? 'dark-content' : 'light-content'}
      animated={false}
    />
  );

  const messageContainer = (
    <View
      style={styles.messageContainer}
      pointerEvents="none"
    >
      {statusBar}
      {!isConnected && (
        <View style={styles.bubble}>
          <Text style={styles.text}>
            Not network connection
          </Text>
        </View>
      )}
    </View>
  );

  if (Platform.OS === 'ios') {
    return (
      <View style={[styles.status, { backgroundColor }]}>
        {messageContainer}
      </View>
    );
  }

  return messageContainer;
};
