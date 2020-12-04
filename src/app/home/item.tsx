import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  GestureResponderEvent,
  Image,
} from 'react-native';

interface Props {
  onPress: (event: GestureResponderEvent) => void;
  title: string;
  image?: string;
  selected?: boolean;
}

const { width } = Dimensions.get('window');

const Item = ({ onPress, title, image, selected }: Props): JSX.Element => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.item, selected ? styles.selected : undefined]}
    >
      <View style={styles.content}>
        {image ? (
          <Image style={styles.image} source={{ uri: image }} />
        ) : (
          <Text>{title}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#efefef',
    borderWidth: 1,
    borderColor: '#ffffff',
    height: width / 3,
    width: width / 3,
  },
  content: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  selected: {
    backgroundColor: '#cccccc',
  },
  image: {
    borderWidth: 1,
    borderColor: '#ffffff',
    height: width / 3,
    resizeMode: 'cover',
    width: width / 3,
  },
});

export default Item;
