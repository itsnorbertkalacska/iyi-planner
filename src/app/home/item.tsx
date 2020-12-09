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
  disabled?: boolean;
  image?: string;
  selected?: boolean;
}

const { width } = Dimensions.get('window');
const childrenWidth = width / 3 - 1;

const Item = ({
  onPress,
  title,
  disabled,
  image,
  selected,
}: Props): JSX.Element => {
  if (disabled) {
    return <View style={{ width: width / 3, height: width / 3 }}></View>;
  }

  return (
    <View style={styles.item}>
      {/* <TouchableOpacity onPress={onPress} style={styles.item}> */}
      {image ? (
        <Image
          style={[styles.image, selected ? styles.selectedImage : undefined]}
          source={{ uri: image }}
        />
      ) : (
        <View style={[styles.content, selected ? styles.selected : undefined]}>
          <Text>{title}</Text>
        </View>
      )}
      {/* </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    aspectRatio: 1,
    backgroundColor: '#efefef',
    borderWidth: 1,
    borderColor: '#ffffff',
    height: childrenWidth,
    width: childrenWidth,
  },
  content: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
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
});

export default Item;
