import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import * as T from './src/interface/post/type';
// import * as Data from './src/interface/post/data';
import Item from './src/app/home/item';
import { Loader } from './src/common';

const MAX_POSTS = 18;

export default function App() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [posts, setPosts] = useState<T.Post[]>([]);

  // useEffect(() => {
  //   Data.list().then((result) => {
  //     setPosts(result)
  //   });
  // }, []);

  useEffect(() => {
    const placeholders: T.Post[] = [];

    for (let i = 1; i <= MAX_POSTS; i++) {
      placeholders.push({
        id: i,
      });
    }

    setPosts(placeholders);
  }, []);

  const handleSelection = (itemId: number) => {
    if (itemId === selectedId) {
      setSelectedId(null);
    } else {
      setSelectedId(itemId);
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

    setPosts(
      posts.map((item) => {
        if (item.id !== selectedId) {
          return item;
        }

        return {
          ...item,
          image: {
            localUri: pickerResult.uri,
          },
        };
      })
    );
    setSelectedId(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Insta Planner</Text>
      </View>
      {posts.length ? (
        <FlatList
          data={posts}
          keyExtractor={(item) => `item${item.id}`}
          renderItem={({ item }) => (
            <Item
              key={`item${item.id}`}
              onPress={() => handleSelection(item.id)}
              title={`Title #${item.id}`}
              selected={selectedId === item.id}
              image={item.image?.localUri}
            />
          )}
          numColumns={3}
        />
      ) : (
        <Loader.Page />
      )}

      {selectedId && (
        <View style={styles.floatingMenu}>
          <TouchableOpacity
            style={styles.floatingButton}
            onPress={openImagePicker}
          >
            <Text style={{ color: 'white' }}>Upload Photo</Text>
          </TouchableOpacity>
        </View>
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
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },
  title: {
    fontSize: 22,
  },
  floatingMenu: {
    position: 'absolute',
    bottom: 75,
    right: 25,
  },
  floatingButton: {
    backgroundColor: 'blue',
    borderRadius: 10,
    padding: 12,
  },
});
