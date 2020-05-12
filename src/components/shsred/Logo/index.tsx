import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Animated  from 'react-native-reanimated'

const Logo: React.FC = () => {

  return (
    <Animated.View>
    <Image style={styles.imageLogo} source={require('../../../assets/logo.png')} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#312e38',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#fff',
  },
  imageLogo: {
    width: 50,
    height: 50
  }
});

export default Logo;
