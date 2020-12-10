import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

import * as T from '../../interface/post/type';

interface Props {
  item: T.Post;
  selected?: boolean;
}

const { width } = Dimensions.get('window');
const childrenWidth = width / 3 - 1;

const Item = ({ item, selected }: Props) => {
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
        <View style={[styles.content]} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
    aspectRatio: 1,
    backgroundColor: '#efefef',
    justifyContent: 'space-around',
    width: childrenWidth,
  },
  hiddenItem: {
    backgroundColor: '#fff',
  },
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

export default Item;
