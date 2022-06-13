import { useState, useEffect } from 'react';
import NetInfo, { NetInfoChangeHandler } from '@react-native-community/netinfo';

export const useNetInfo = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  const handleNetInfoChange: NetInfoChangeHandler = (state) => {
    setIsConnected(state.isConnected);
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(handleNetInfoChange);

    return unsubscribe;
  }, []);

  useEffect(() => {
    NetInfo.fetch().then(handleNetInfoChange);
  }, []);

  return { isConnected };
};
