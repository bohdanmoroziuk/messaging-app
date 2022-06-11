import { FunctionComponent } from 'react';
import { FlatList, Image, Text, View, TouchableOpacity } from 'react-native';
import MapView, { Marker as MapViewMarker } from 'react-native-maps';

import { Message } from 'src/types';

import styles from './MessageList.styles';

export interface MessageListProps {
  messages: Message[];
  onPressMessage: (message: Message) => void;
}

const keyExtractor = (message: Message) => message.id.toString();

export const MessageList: FunctionComponent<MessageListProps> = ({
  messages,
  onPressMessage,
}) => {
  const renderMessageBody = (message: Message) => {
    switch (message.type) {
      case 'text':
        return (
          <View style={styles.messageBubble}>
            <Text style={styles.text}>
              {message.text}
            </Text>
          </View>
        );
      case 'image':
        return (
          <Image
            style={styles.image}
            source={{ uri: message.uri }}
          />
        );
      case 'location':
        return (
          <MapView
            style={styles.map}
            initialRegion={{
              ...message.location,
              latitudeDelta: 0.08,
              longitudeDelta: 0.04,
            }}
          >
            <MapViewMarker coordinate={message.location} />
          </MapView>
        );
      default:
        return null;
    }
  };

  const renderMessageItem = ({ item }: { item: Message }) => {
    const handlePress = () => {
      onPressMessage(item);
    };

    return (
      <View
        key={item.id}
        style={styles.messageRow}
      >
        <TouchableOpacity onPress={handlePress}>
          {renderMessageBody(item)}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <FlatList
      style={styles.container}
      inverted
      data={messages}
      renderItem={renderMessageItem}
      keyExtractor={keyExtractor}
      keyboardShouldPersistTaps="handled"
    />
  );
};
