import * as T from './type';
import * as MockData from './mock-data';

export const list = (): Promise<T.Post[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(MockData.posts);
    }, 2000);
  });
};
