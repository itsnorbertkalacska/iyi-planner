import AsyncStorage from '@react-native-async-storage/async-storage';

import * as T from './type';

export const get = async (): Promise<T.User> => {
  try {
    const user = await AsyncStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    } else {
      return Promise.reject({ error: 'No user found.' });
    }
  } catch (e) {
    return Promise.reject({ error: 'Error while trying to retrieve user' });
  }
};

export const getToken = async (): Promise<string | null> => {
  try {
    const user = await get();
    return user.token;
  } catch (error) {
    return null;
  }
};
