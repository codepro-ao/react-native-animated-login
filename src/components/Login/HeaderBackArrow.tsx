import React from 'react'
import { TapGestureHandler } from 'react-native-gesture-handler';
import Animated, {interpolate} from 'react-native-reanimated'
import {Ionicons} from '@expo/vector-icons'
const HeaderBackArrow = ({isOpenAnimation,gestureHandler}) => {

  const opacity = interpolate(isOpenAnimation, {
    inputRange: [0,0.7,1],
    outputRange: [0,0, 1],
  })

  return (
    <TapGestureHandler {...gestureHandler}>
      <Animated.View 
        style={{
          position:'absolute',
          height:60,
          width:60,
          top:60,
          left:25,
          opacity,
          zIndex:100
        }}
      >
        <Ionicons name='md-arrow-back' size={24} color='#fff' />
      </Animated.View>
    </TapGestureHandler>
  )
}

export default HeaderBackArrow
