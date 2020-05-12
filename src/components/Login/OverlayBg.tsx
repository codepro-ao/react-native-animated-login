import React from 'react'
import {View,Text,StyleSheet} from 'react-native'
import Animated, {interpolate} from 'react-native-reanimated'
import {LOGIN_VIEW_HEIGHT,SCREEN_HEIGHT} from '../../utils/constant';
import {interpolateColor} from 'react-native-redash'

const OverlayBg = ({isOpenAnimation}) => {

  const translateY = interpolate(isOpenAnimation, {
    inputRange: [0,1],
    outputRange: [SCREEN_HEIGHT-LOGIN_VIEW_HEIGHT, -LOGIN_VIEW_HEIGHT],
  })

  const backgroundColor = interpolateColor(isOpenAnimation, {
    inputRange: [0,0.5,1],
    outputRange: ['#fff', '#0084ff', '#0084ff']
  })

  return (
    <Animated.View 
      style={{
        height:LOGIN_VIEW_HEIGHT,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor,
        //backgroundColor:'grey',
        position:'absolute',
        top:0,
        left:0,
        right:0,
        transform: [{ translateY}]
      }}
    >
    </Animated.View>
  )
}

export default OverlayBg