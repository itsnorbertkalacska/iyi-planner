import AsyncStorage from '@react-native-async-storage/async-storage';

import * as InstagramService from '../instagram/data';
import * as T from './type';

const MAX_POSTS = 12;

export const list = async (): Promise<T.Post[]> => {
  try {
    const posts = await AsyncStorage.getItem('posts');
    return posts !== null ? JSON.parse(posts) : getPlaceholders();
  } catch (e) {
    // error reading value
    return getPlaceholders();
  }
};

const getPlaceholders = (): T.Post[] => {
  const placeholders: T.Post[] = [];

  for (let i = 1; i <= MAX_POSTS; i++) {
    placeholders.push({
      id: i,
    });
  }

  return placeholders;
};

export const store = async (newPosts: T.Post[]) => {
  try {
    await AsyncStorage.setItem('posts', JSON.stringify(newPosts));
  } catch (err) {}
};

export const listFromInstagram = async (): Promise<any> => {
  const result = await InstagramService.get(
    '/me/media?fields=id,caption,media_type,media_url'
  );
  return result;
};
