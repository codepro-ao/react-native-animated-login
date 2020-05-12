import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Animated  from 'react-native-reanimated'

const Logo = ({scale}) => {

  return (
    <Animated.View style={{...styles.logo, transform:[{scale:scale}]}}>
    <Image style={styles.imageLogo} source={require('../../assets/logo.png')} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width:120,
    height:120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  imageLogo: {
    width: 100,
    height: 100
  }
});

export default Logo;
