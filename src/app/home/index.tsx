import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, SafeAreaView } from 'react-native';
import { AutoDragSortableView } from 'react-native-drag-sort';
import * as ImagePicker from 'expo-image-picker';

import * as T from '../../interface/post/type';
import * as Data from '../../interface/post/data';
import { Loader } from '../../common';
import FloatingMenu from './floating-menu';
import Item from './item';

const { width } = Dimensions.get('window');

const parentWidth = width;
const childrenWidth = width / 3 - 1;
const childrenHeight = childrenWidth;

const MAX_SHIFTS = 3;

interface Props {
  navigation: any;
}

const Home = ({ navigation }: Props) => {
  const [posts, setPosts] = useState<T.Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<T.Post | null>(null);
  const [shifts, setShifts] = useState(0);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      Data.list().then((postsFromStore) => setPosts(postsFromStore));

      Data.listFromInstagram()
        .then((result) => {
          const newPosts: T.Post[] = result.data.map((r: any) => ({
            id: Number(r.id),
            caption: r.caption,
            image: {
              localUri: r.media_url,
            },
            isFromInstagram: true,
          }));

          setPosts((data) => [...data, ...newPosts]);
        })
        .catch((err) => {
          console.log(err);
        });
    });

    // just for the sake of testing
    Data.clear();

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, []);

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

  const goToDetails = () => {
    if (selectedPost) {
      navigation.navigate('Detail', { image: selectedPost.image?.localUri });
    }
  };

  const goToInstaLogin = () => {
    navigation.navigate('InstaLogin');
  };

  return (
    <SafeAreaView style={styles.container}>
      {posts.length ? (
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
          renderItem={(item: T.Post) => (
            <Item item={item} selected={item.id === selectedPost?.id} />
          )}
          onClickItem={(data: T.Post[], item: T.Post) => handleSelection(item)}
        />
      ) : (
        <Loader.Page />
      )}

      <FloatingMenu
        onRemovePhoto={removePhoto}
        onSlide={shiftGrid}
        onUploadPhoto={openImagePicker}
        selectedPost={selectedPost}
        onGoToDetails={goToDetails}
        loginWithYourInsta={goToInstaLogin}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
});

export default Home;
