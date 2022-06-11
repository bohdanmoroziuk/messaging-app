export interface Location {
  latitude: number;
  longitude: number;
}

export interface TextMessage {
  id: number;
  type: 'text';
  text: string;
}

export interface ImageMessage {
  id: number;
  type: 'image';
  uri: string;
}

export interface LocationMessage {
  id: number;
  type: 'location';
  location: Location;
}

export type Message =
 | TextMessage
 | ImageMessage
 | LocationMessage;
