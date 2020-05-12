import React from 'react'
import { TapGestureHandler } from 'react-native-gesture-handler';
import Animated, {interpolate} from 'react-native-reanimated'
import {Ionicons} from '@expo/vector-icons'
import { LOGIN_VIEW_HEIGHT } from '../../utils/constant';

  const ForwardArrow = ({keyboardHeight}) => {

  const opacity = interpolate(keyboardHeight, {
    inputRange: [0,keyboardHeight],
    outputRange: [0, 1],
  })
  

  return (
      <Animated.View 
        style={{
          position:'absolute',
          height:60,
          width:60,
          right:10,
          bottom:   LOGIN_VIEW_HEIGHT/2,
          opacity,
          zIndex:1000,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 30,
          transform: [
           { translateY: keyboardHeight}
          ]
        }}
      >
        <Ionicons name='md-arrow-forward' size={24} color='#0084ff' />
      </Animated.View>
  )
}

export default ForwardArrow
