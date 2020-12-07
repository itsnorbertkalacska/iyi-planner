import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

interface Props {
  onRemovePhoto: () => void;
  onSlide: () => void;
  onUploadPhoto: () => void;
  hasImage?: boolean;
}

const FloatingMenu = ({
  onRemovePhoto,
  onSlide,
  onUploadPhoto,
  hasImage,
}: Props): JSX.Element => {
  return (
    <View style={styles.floatingMenu}>
      <TouchableOpacity style={styles.floatingButton} onPress={onSlide}>
        <Text style={styles.floatingButtonText}>Slide Photos</Text>
      </TouchableOpacity>

      {hasImage ? (
        <TouchableOpacity style={styles.floatingButton} onPress={onRemovePhoto}>
          <Text style={styles.floatingButtonText}>Remove Photo</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.floatingButton} onPress={onUploadPhoto}>
          <Text style={styles.floatingButtonText}>Upload Photo</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  floatingMenu: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    position: 'absolute',
    bottom: 50,
    right: 25,
  },
  floatingButton: {
    backgroundColor: 'blue',
    borderRadius: 10,
    marginRight: 10,
    padding: 12,
  },
  floatingButtonText: {
    color: '#ffffff',
  },
});

export default FloatingMenu;
