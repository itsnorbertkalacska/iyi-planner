import * as ProfileService from '../user/profile';

const url = 'https://graph.instagram.com';

export const get = async (path: string) => {
  const token = await ProfileService.getToken();

  if (token) {
    try {
      const urlToFetch = url + path + '&access_token=' + token;
      console.log(urlToFetch);
      const result = await fetch(urlToFetch);
      return result.json();
    } catch (error) {
      return Promise.reject(error);
    }
  } else {
    return Promise.reject({ error: 'Not authorized' });
  }
};
