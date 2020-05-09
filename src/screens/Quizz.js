import React from 'react';
import { Dimensions, Image, StyleSheet } from 'react-native';
import { View as AnimatableView } from 'react-native-animatable';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { useTheme } from 'react-native-paper';
import Animated, {
  and,
  block,
  call,
  cond,
  eq,
  Extrapolate,
  interpolate,
  set,
  useCode,
} from 'react-native-reanimated';
import {
  onGestureEvent,
  snapPoint,
  timing,
  useValues,
} from 'react-native-redash';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from 'react-navigation-hooks';
import { SharedElement } from 'react-navigation-shared-element';
import { useMemoOne } from 'use-memo-one';
import QuizzHandler from '../components/quizz/QuizzHandler';
import { scale } from '../helpers';
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width,
    height: height,
  },
  thumbnailOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    elevation: 10,
    zIndex: 10,
    paddingVertical: scale(5),
    paddingLeft: scale(5),
  },
});

const Quizz = () => {
  const { goBack, getParam } = useNavigation();
  const { colors } = useTheme();
  const quizz = getParam('quizz');
  const [
    translationX,
    translationY,
    velocityY,
    velocityX,
    translateX,
    translateY,
    snapBack,
    state,
  ] = useValues([0, 0, 0, 0, 0, 0, 0, State.UNDETERMINED]);
  const snapTo = snapPoint(translationY, velocityY, [0, height]);
  const verticalSnapTo = snapPoint(translationX, velocityX, [0, width]);

  const scale = interpolate(translateY, {
    inputRange: [0, height / 2],
    outputRange: [1, 0.75],
    extrapolate: Extrapolate.CLAMP,
  });
  const gestureHandler = useMemoOne(
    () =>
      onGestureEvent({
        translationX,
        translationY,
        velocityY,
        velocityX,
        state,
      }),
    [state, translationX, translationY, velocityY],
  );
  useCode(
    () =>
      block([
        cond(
          and(eq(state, State.END), eq(snapTo, height), eq(snapBack, 0)),
          set(snapBack, 1),
        ),
        cond(
          and(eq(state, State.END), eq(verticalSnapTo, width), eq(snapBack, 0)),
          set(snapBack, 1),
        ),
        cond(
          snapBack,
          call([], () => goBack()),
          cond(
            eq(state, State.END),
            [
              set(
                translateX,
                timing({ from: translationX, to: 0, duration: 250 }),
              ),
              set(
                translateY,
                timing({ from: translationY, to: 0, duration: 250 }),
              ),
            ],
            [set(translateX, translationX), set(translateY, translationY)],
          ),
        ),
      ]),
    [],
  );
  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
          transform: [{ translateX }, { translateY }, { scale }],
        },
      ]}>
      <PanGestureHandler {...gestureHandler}>
        <Animated.View>
          <SharedElement id={quizz.id}>
            <Image
              style={styles.image}
              resizeMode="cover"
              source={quizz.picture}
            />
          </SharedElement>
        </Animated.View>
      </PanGestureHandler>
      <AnimatableView
        animation="fadeIn"
        delay={100}
        style={styles.thumbnailOverlay}>
        <Icon.Button
          name="x"
          color={colors.text}
          backgroundColor="transparent"
          underlayColor="transparent"
          onPress={() => goBack()}
        />
      </AnimatableView>
      <QuizzHandler {...quizz} />
    </Animated.View>
  );
};

Quizz.sharedElements = navigation => {
  const quizz = navigation.getParam('quizz');
  return [quizz.id];
};
export default Quizz;
