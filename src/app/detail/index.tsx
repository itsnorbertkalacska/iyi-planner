import React from 'react';
import { View, Image, Dimensions, StyleSheet } from 'react-native';

interface Props {
  navigation: any;
  route: any;
}

const { width, height } = Dimensions.get('window');

const Profile = ({ navigation, route }: Props): JSX.Element => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: route.params.image }}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    height: height,
    width: width,
  },
});

export default Profile;
