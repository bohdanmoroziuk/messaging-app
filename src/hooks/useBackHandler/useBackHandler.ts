import { useEffect } from 'react';
import { BackHandler } from 'react-native';

type BackPressHandler = () => boolean;

export const useBackHandler = (handler: BackPressHandler) => {
  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', handler);

    return () => {
      subscription.remove();
    };
  }, []);
};
