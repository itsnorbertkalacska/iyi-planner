import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, SafeAreaView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as T from './src/interface/post/type';
import { FloatingMenu, Item } from './src/app/home';
import { Loader } from './src/common';

const MAX_POSTS = 18;

export default function App() {
  const [selectedPost, setSelectedPost] = useState<T.Post | null>(null);
  const [posts, setPosts] = useState<T.Post[]>([]);
  const [slide, setSlide] = useState<number>(0);

  const getPlaceholders = (): T.Post[] => {
    const placeholders: T.Post[] = [];

    for (let i = 1; i <= MAX_POSTS; i++) {
      placeholders.push({
        id: i,
      });
    }

    return placeholders;
  };

  const getPostsFromStore = async () => {
    try {
      const posts = await AsyncStorage.getItem('posts');
      return posts !== null ? JSON.parse(posts) : null;
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    getPostsFromStore().then((postsFromStore) => {
      if (postsFromStore !== null) {
        setPosts(postsFromStore);
      } else {
        setPosts(getPlaceholders());
      }
    });
  }, [setPosts, getPostsFromStore, getPlaceholders]);

  const handleSelection = (item: T.Post) => {
    if (item.id === selectedPost?.id) {
      setSelectedPost(null);
    } else {
      setSelectedPost(item);
    }
  };

  const openImagePicker = async () => {
    const permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (!permissionResult.granted) {
      alert('Permission to access camera roll is required!');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled) {
      return;
    }

    const newPosts = posts.map((item) => {
      if (item.id !== selectedPost?.id) {
        return item;
      }

      return {
        ...item,
        image: {
          localUri: pickerResult.uri,
        },
      };
    });

    try {
      await AsyncStorage.setItem('posts', JSON.stringify(newPosts));
    } catch (err) {}

    setPosts(newPosts);
    setSelectedPost(null);
  };

  const removePhoto = async () => {
    const newPosts = posts.map((item) => {
      if (item.id !== selectedPost?.id) {
        return item;
      }

      return {
        ...item,
        image: undefined,
      };
    });

    try {
      await AsyncStorage.setItem('posts', JSON.stringify(newPosts));
    } catch (err) {}

    setPosts(newPosts);
    setSelectedPost(null);
  };

  const slidePhotos = () => {
    if (slide >= 2) {
      setSlide(0);
    } else {
      setSlide(slide + 1);
    }
  };

  const getSlideItems = (): T.Post[] => {
    const placeholders: T.Post[] = [];
    for (let i = 0; i < slide; i++) {
      placeholders.push({
        id: -1 * (i - 1),
        disabled: true,
      });
    }
    return placeholders;
  };

  return (
    <SafeAreaView style={styles.container}>
      {posts.length ? (
        <FlatList
          data={[...getSlideItems(), ...posts]}
          keyExtractor={(item) => `item${item.id}`}
          renderItem={({ item }) => (
            <Item
              key={`item${item.id}`}
              onPress={() => handleSelection(item)}
              title={`Title #${item.id}`}
              selected={selectedPost?.id === item.id}
              disabled={item.disabled}
              image={item.image?.localUri}
            />
          )}
          numColumns={3}
        />
      ) : (
        <Loader.Page />
      )}

      {selectedPost && (
        <FloatingMenu
          onRemovePhoto={removePhoto}
          onSlide={slidePhotos}
          onUploadPhoto={openImagePicker}
          hasImage={selectedPost.image ? true : false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
});
