import AsyncStorage from '@react-native-async-storage/async-storage';

import * as T from './type';

const MAX_POSTS = 18;

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
