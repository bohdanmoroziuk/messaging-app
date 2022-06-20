import { createTextMessage, createImageMessage, createLocationMessage } from './messages';

describe('messages', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createTextMessage', () => {
    it('creates a text message', () => {
      expect(createTextMessage('Hello')).toEqual({
        id: 1,
        type: 'text',
        text: 'Hello',
      });
    });

    it('creates an image message', () => {
      expect(createImageMessage('https://unsplash.it/300/300')).toEqual({
        id: 2,
        type: 'image',
        uri: 'https://unsplash.it/300/300',
      });
    });

    it('creates a location message', () => {
      expect(createLocationMessage({ latitude: 37.78825, longitude: -122.4324 })).toEqual({
        id: 3,
        type: 'location',
        location: {
          latitude: 37.78825,
          longitude: -122.4324,
        },
      });
    });
  });
})