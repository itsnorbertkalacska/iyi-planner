import AsyncStorage from '@react-native-async-storage/async-storage';

import * as InstagramService from '../instagram/data';
import * as ProfileService from './profile';
import * as T from './type';

export const get = (): Promise<T.User> => {
  return ProfileService.get();
};

export const login = async (user: T.User): Promise<boolean> => {
  try {
    await AsyncStorage.setItem('user', JSON.stringify(user));
    return true;
  } catch (e) {
    // error
    return Promise.reject({ error: 'Error while trying to login.' });
  }
};

export const logout = async (): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem('user');
    return true;
  } catch (e) {
    // error
    return Promise.reject({ error: 'Error while trying to logout.' });
  }
};

export const getProfile = async (): Promise<any> => {
  const result = await InstagramService.get('/me?fields=username');
  console.log('getProfile', result);
  return result;
};
