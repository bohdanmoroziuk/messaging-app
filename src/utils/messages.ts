import { Message, Location } from 'src/types';

let messageId = 0;

export const getNextId = () => {
  messageId += 1;
  return messageId;
};

export const createTextMessage = (text: string): Message => ({
  id: getNextId(),
  type: 'text',
  text,
});

export const createImageMessage = (uri: string): Message => ({
  id: getNextId(),
  type: 'image',
  uri,
});

export const createLocationMessage = (location: Location): Message => ({
  id: getNextId(),
  type: 'location',
  location,
});
