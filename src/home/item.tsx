import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';

interface Props {
  onPress: (event: GestureResponderEvent) => void;
  title: string;
  selected?: boolean;
}

const { width, height } = Dimensions.get('window');

const Item = ({ onPress, title, selected }: Props): JSX.Element => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.item, selected ? styles.selected : undefined]}
    >
      <View style={styles.content}>
        <Text>{title}</Text>
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
});

export default Item;
