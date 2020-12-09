import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import * as T from '../../interface/post/type';

interface Props {
  onRemovePhoto: () => void;
  onSlide: () => void;
  onUploadPhoto: () => void;
  selectedPost: T.Post | null;
}

const FloatingMenu = ({
  onRemovePhoto,
  onSlide,
  onUploadPhoto,
  selectedPost,
}: Props): JSX.Element => {
  return (
    <View style={styles.floatingMenu}>
      <TouchableOpacity
        style={[styles.floatingButton, { marginLeft: 0 }]}
        onPress={onSlide}
        activeOpacity={0.9}
      >
        <Text style={styles.floatingButtonText}>Shift Grid</Text>
      </TouchableOpacity>

      {selectedPost && (
        <>
          {selectedPost?.image ? (
            <TouchableOpacity
              style={styles.floatingButton}
              onPress={onRemovePhoto}
              activeOpacity={0.9}
            >
              <Text style={styles.floatingButtonText}>Remove Photo</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.floatingButton}
              onPress={onUploadPhoto}
              activeOpacity={0.9}
            >
              <Text style={styles.floatingButtonText}>Upload Photo</Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  floatingMenu: {
    alignSelf: 'center',
    bottom: 20,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    position: 'absolute',
    // right: 25,
    zIndex: 1,
  },
  floatingButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#efefef',
    marginLeft: 20,
    paddingBottom: 12,
    paddingLeft: 17,
    paddingRight: 17,
    paddingTop: 12,
  },
  floatingButtonText: {
    color: '#000000',
  },
});

export default FloatingMenu;
