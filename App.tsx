import React,{ useRef, useEffect} from 'react';
import { StyleSheet, Text, View,Image,Keyboard} from 'react-native';
import Logo from './src/components/shared/Logo';
import Animated, {useCode, cond, eq, set, interpolate, SpringUtils,call,timing,Easing} from 'react-native-reanimated';
import {withTimingTransition, onGestureEvent,withSpringTransition, delay} from 'react-native-redash';
import {SCREEN_HEIGHT,LOGIN_VIEW_HEIGHT} from './src/utils/constant';
import { TextInput,TapGestureHandler,State } from 'react-native-gesture-handler';
import OverlayBg from './src/components/Login/OverlayBg'
import HeaderBackArrow from './src/components/Login/HeaderBackArrow'
import AnimatedPlaceHolder from './src/components/Login/AnimatedPlaceholder'
import ForwardArrow from './src/components/Login/ForwardArrow';

export default function App() {

  let scale = useRef(new Animated.Value(0));
  let scaleAnimation = withTimingTransition(scale.current);
  let textInputRef = useRef(null)

  const keyboardHeight = new Animated.Value(0)

  useEffect(()=>{
      Keyboard.addListener('keyboardDidShow', keyboardDidShow)
      Keyboard.addListener('keyboardDidHide', keyboardDidHide)

      return function cleanUp() {
        Keyboard.removeAllListeners('keyboardDidHide');
        Keyboard.removeAllListeners('keyboardDidShow');
      }
  })

  const innerLoginY = interpolate(scaleAnimation, {
       inputRange: [0, 1],
       outputRange:[LOGIN_VIEW_HEIGHT, 0]
    });

  const gestureState = useRef(new Animated.Value(State.UNDETERMINED));
  const gestureHandler = onGestureEvent({state:gestureState.current});

  const backArroGestureState = useRef(new Animated.Value(State.UNDETERMINED));
  const backArroGestureHandler = onGestureEvent({state:
    backArroGestureState.current
  });

  const isOpen = useRef(new Animated.Value(0));
  const isOpenAnimation = withSpringTransition(isOpen.current, {
    ...SpringUtils.makeDefaultConfig(),
    overshootClamping: true,
    damping: new Animated.Value(20),
  })

  const outerLoginY = interpolate(isOpenAnimation, {
    inputRange: [0,1],
    outputRange: [SCREEN_HEIGHT-LOGIN_VIEW_HEIGHT, LOGIN_VIEW_HEIGHT/2],
  })

  const headingOpacity  = interpolate(isOpenAnimation, {
    inputRange: [0,1],
    outputRange:[1,0]
  })

  const focusTextInput = () => {
      textInputRef.current.focus();
  }

  const blurTextInput = () => {
    textInputRef.current.blur()
  }

  const keyboardDidShow = e => {
    let toValue = - e.endCoordinates.height

    Animated.timing(keyboardHeight, {
      toValue,
      duration: 250,
      easing:Easing.linear,
      useNativeDriver: true 
    }).start()
  }

  const keyboardDidHide = e => {
    Animated.timing(keyboardHeight, {
      toValue: 0,
      duration: 250,
      easing:Easing.linear,
      useNativeDriver: true 
    }).start()
  }

  useCode(
    () => 
    cond(eq(gestureState.current, State.END), [
        cond(eq(isOpen.current, 0), [set(isOpen.current, 1)]),
        cond(eq(isOpen.current, 1),delay(call([],focusTextInput), 750))
    ]), 
    [gestureState.current],
  );

  useCode(() => cond(eq(scale.current, 0), set(scale.current, 1)), []);

  useCode(() => cond(eq(backArroGestureState.current, State.END), [
    set(gestureState.current,State.UNDETERMINED),
    call([], blurTextInput),
    delay(set(isOpen.current, 0), 250)
  ]), [backArroGestureState.current]);

  return (
    <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Logo scale={scaleAnimation}/>
        </View>

        <HeaderBackArrow isOpenAnimation={isOpenAnimation} gestureHandler={{...backArroGestureHandler}} />

        <Animated.View
          style={{
            backgroundColor:'#0084FF',
            ...StyleSheet.absoluteFill,
            transform:[{translateY: outerLoginY}]
          }}
        >
          <OverlayBg isOpenAnimation={isOpenAnimation} />

          <ForwardArrow keyboardHeight={keyboardHeight} />

          <Animated.View>
           <Animated.View
             style={{
               height:LOGIN_VIEW_HEIGHT,
               backgroundColor: '#0084ff',
               transform:[{translateY:innerLoginY}]
             }}
           >
            <Animated.View style={{...styles.heading,opacity: headingOpacity}}>
              <Text style={{fontSize:20,color: '#fff'}}
              > Get start with Code Pro</Text>
            </Animated.View>

            <TapGestureHandler {...gestureHandler}>
              <Animated.View>
               <Animated.View
                 pointerEvents='none'
                 style={{...styles.textInputContainer}}>

                 <AnimatedPlaceHolder isOpenAnimation={isOpenAnimation} />
                 <Image
                   source={require('./src/assets/Angola_flag.jpg')}
                   style={{...styles.Image}}
                 />
                 <Text style={{...styles.prefix}}>+244</Text>
                 <TextInput
                    ref={textInputRef}
                    keyboardType= 'number-pad'
                    style={{...styles.textInput}}
                    placeholder="Introduza o número de telefone"
                />
              </Animated.View>
             </Animated.View>
            </TapGestureHandler>
          </Animated.View>
        </Animated.View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    flex:1,
    alignItems: 'center',
    justifyContent:'center'
  },
  heading: {
    alignItems:'flex-start',
    marginTop: 50,
    marginHorizontal: 25
  },
  Image: {
    height:24,
    width: 24,
    borderRadius:6,
    resizeMode: 'contain',
    margin:0
  },
  prefix: {
    fontSize: 16,
    paddingHorizontal: 10,
    color: '#fff'
  },
  textInput: {
    fontSize: 16,
    flex:1,
  },
  textInputContainer: {
    flexDirection:'row',
    margin: 25
  }
});
