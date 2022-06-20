import { fireEvent, render } from '@testing-library/react-native';

import { MessageList } from './MessageList';
import { createTextMessage, createImageMessage, createLocationMessage } from '../../utils/messages';
import { Message } from '../../types';

describe('MessageList', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockMessages: Message[] = [
    createImageMessage('https://unsplash.it/300/300'),
    createTextMessage('Hello'),
    createTextMessage('World'),
    createLocationMessage({
      latitude: 37.78825,
      longitude: -122.4324,
    }),
  ];

  const mockOnPressMessage = jest.fn();

  it('renders successfully when the message list is empty', () => {
    const { toJSON } = render(
      <MessageList
        messages={[]}
        onPressMessage={mockOnPressMessage}
      />
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it('renders successfully when the message list contains items', () => {
    const { toJSON } = render(
      <MessageList
        messages={mockMessages}
        onPressMessage={mockOnPressMessage}
      />
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it('calls the onPressMessage handler when a list item is pressed', () => {
    const { getByText } = render(
      <MessageList
        messages={mockMessages}
        onPressMessage={mockOnPressMessage}
      />
    );

    const message = getByText('Hello');

    expect(message).toBeDefined();

    fireEvent.press(message);

    expect(mockOnPressMessage).toHaveBeenCalled();
  });
});
