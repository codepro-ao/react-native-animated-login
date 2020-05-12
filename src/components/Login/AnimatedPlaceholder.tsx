import React from 'react'
import Animated, {interpolate} from 'react-native-reanimated'
const HeaderBackArrow = ({isOpenAnimation}) => {

  const translateX = interpolate(isOpenAnimation, {
    inputRange: [0,1],
    outputRange: [80, 0],
  })

  const translateY = interpolate(isOpenAnimation, {
    inputRange: [0,0.5,1],
    outputRange: [0,0,-60],
  })

  const opacity = interpolate(translateX, {
    inputRange: [-60,1],
    outputRange: [60,0],
  })

  return (
    <Animated.Text 
      style={{
        position:'absolute',
        fontSize:24,
        opacity,
        color: '#FFF',
        transform: [
          {
            translateY,
            translateX
          }
        ]
      }}
    >
      Introduza o número de telefone
    </Animated.Text>
  )
}

export default HeaderBackArrow