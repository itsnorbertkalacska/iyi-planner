import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import InstagramLogin from 'react-native-instagram-login';

import * as Data from '../../interface/user/data';

const InstaLogin = () => {
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<{ id: number; username: string } | null>(
    null
  );
  const instagramRef = useRef<any>(null);

  useEffect(() => {
    Data.get()
      .then((user) => setToken(user.token))
      .catch((result) => setError(result.error));
  }, []);

  useEffect(() => {
    Data.getProfile()
      .then((result) => setUser(result))
      .catch((err) => {
        setUser(null);
      });
  }, [token]);

  const login = (data: { user_id: number; access_token: string }) => {
    console.log('data', data);
    setError(null);
    Data.login({ id: data.user_id, token: data.access_token })
      .then(() => setToken(data.access_token))
      .catch((result) => setError(result.error));
  };

  const onClear = () => {
    setToken(null);
    setError(null);
    setUser(null);
    Data.logout()
      .then((r) => setError(null))
      .catch((result) => setError(result.error));
  };

  const handleLoginFailure = (data: any) => {
    console.log('handleLoginFailure', data);
    setError('Error while trying to login. Please try again.');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {user && <Text>Welcome, {user.username}</Text>}

      {!token ? (
        <TouchableOpacity
          style={styles.btn}
          onPress={() => instagramRef.current?.show()}
        >
          <Text style={{ color: 'white', textAlign: 'center' }}>Login now</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[styles.btn, { marginTop: 10, backgroundColor: 'green' }]}
          onPress={onClear}
        >
          <Text style={{ color: 'white', textAlign: 'center' }}>Logout</Text>
        </TouchableOpacity>
      )}

      {error && (
        <View>
          <Text style={{ margin: 10 }}>{error}</Text>
        </View>
      )}

      <InstagramLogin
        ref={instagramRef}
        appId="419046235942681"
        appSecret="672e13155f2dd733e0470bc55a334f8c"
        redirectUrl="https://itsnorbertkalacska.github.io/iyi-planner/"
        scopes={['user_profile', 'user_media']}
        onLoginSuccess={login}
        onLoginFailure={handleLoginFailure}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    borderRadius: 5,
    backgroundColor: 'orange',
    height: 30,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default InstaLogin;
