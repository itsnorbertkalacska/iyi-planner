import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { AutoDragSortableView } from 'react-native-drag-sort';
import * as ImagePicker from 'expo-image-picker';

import * as T from './src/interface/post/type';
import * as Data from './src/interface/post/data';
import { Loader } from './src/common';
import { FloatingMenu } from './src/app/home';

interface D {
  txt: string | number;
  isHidden?: boolean;
}

const AUTO_TEST_DATA: D[] = [
  { txt: 1 },
  { txt: 2 },
  { txt: 3 },
  { txt: 4 },
  { txt: 5 },
  { txt: 6 },
  { txt: 7 },
  { txt: 8 },
  { txt: 9 },
  { txt: 10 },
  { txt: 11 },
  { txt: 12 },
  { txt: 13 },
  { txt: 14 },
  { txt: 15 },
];

const { width } = Dimensions.get('window');

const parentWidth = width;
const childrenWidth = width / 3 - 1;
const childrenHeight = childrenWidth;

const MAX_SHIFTS = 3;

const AutomaticSlidingThreePage = () => {
  const [posts, setPosts] = useState<T.Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<T.Post | null>(null);
  const [shifts, setShifts] = useState(0);

  useEffect(() => {
    Data.list().then((postsFromStore) => {
      setPosts(postsFromStore);
    });
  }, [setPosts]);

  const handleSelection = (item: T.Post) => {
    if (item.id === selectedPost?.id) {
      setSelectedPost(null);
    } else {
      setSelectedPost(item);
    }
  };

  const renderItem = (item: T.Post, selected?: boolean) => {
    if (item.disabled) {
      return <View style={[styles.item, styles.hiddenItem]} />;
    }

    return (
      <View style={[styles.item, selected ? styles.selected : undefined]}>
        {item.image ? (
          <Image
            style={[styles.image, selected ? styles.selectedImage : undefined]}
            source={{ uri: item.image.localUri }}
          />
        ) : (
          <View style={[styles.content]}>
            <Text>Title {item.id}</Text>
          </View>
        )}
      </View>
    );
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

    Data.store(newPosts);
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

    Data.store(newPosts);
    setPosts(newPosts);
    setSelectedPost(null);
  };

  const shiftGrid = () => {
    if (shifts >= MAX_SHIFTS) {
      setShifts(0);
    } else {
      setShifts(shifts + 1);
    }
  };

  const getShiftItems = (): T.Post[] => {
    const placeholders: T.Post[] = [];
    for (let i = 0; i < shifts; i++) {
      placeholders.push({
        id: -1 * (i + 1),
        disabled: true,
      });
    }
    return placeholders;
  };

  const rearrangePosts = (newPosts: T.Post[]) => {
    Data.store(newPosts);
    setPosts(newPosts);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      {posts.length ? (
        <>
          <TouchableOpacity
            onPress={shiftGrid}
            style={styles.shiftGridButtonContainer}
            activeOpacity={0.9}
          >
            <Text>Grid Shift</Text>
          </TouchableOpacity>

          <AutoDragSortableView
            dataSource={[...getShiftItems(), ...posts]}
            parentWidth={parentWidth}
            childrenWidth={childrenWidth}
            marginChildrenBottom={0.5}
            marginChildrenRight={0.5}
            marginChildrenLeft={0.5}
            marginChildrenTop={0.5}
            childrenHeight={childrenHeight}
            onDataChange={rearrangePosts}
            keyExtractor={(item) => `item${item.id}`}
            renderItem={(item: T.Post) =>
              renderItem(item, item.id === selectedPost?.id)
            }
            onClickItem={(data: T.Post[], item: T.Post) =>
              handleSelection(item)
            }
          />
        </>
      ) : (
        <Loader.Page />
      )}

      {selectedPost && (
        <FloatingMenu
          onRemovePhoto={removePhoto}
          onSlide={shiftGrid}
          onUploadPhoto={openImagePicker}
          hasImage={selectedPost.image ? true : false}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    position: 'relative',
  },
  item: {
    alignItems: 'center',
    aspectRatio: 1,
    // backgroundColor: '#f39c12',
    backgroundColor: '#efefef',
    justifyContent: 'space-around',
    width: childrenWidth,
  },
  hiddenItem: {
    backgroundColor: '#fff',
  },
  item_text_swipe: {
    backgroundColor: '#fff',
    width: 80,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item_text: {
    color: '#444',
    fontSize: 20,
    fontWeight: 'bold',
  },
  shiftGridButtonContainer: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#efefef',
    bottom: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    position: 'absolute',
    zIndex: 1,
  },
  // later move to item
  selected: {
    backgroundColor: '#fcfcfc',
    borderColor: '#fcfcfc',
    borderWidth: 3,
  },
  image: {
    borderWidth: 1,
    borderColor: '#ffffff',
    height: width / 3,
    resizeMode: 'cover',
    width: width / 3,
  },
  selectedImage: {
    opacity: 0.5,
  },
  content: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

export default AutomaticSlidingThreePage;
