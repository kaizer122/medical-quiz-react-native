import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { View as AnimatableView } from 'react-native-animatable';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Surface, Text, Title, useTheme } from 'react-native-paper';
import { metrics, scale } from '../../helpers';

const animateHeight = {
  0: {
    bottom: 0,
  },
  1: {
    bottom: metrics.height - scale(320),
  },
};

export default ({ title, instructions, setQuizzState }) => {
  const { colors } = useTheme();
  const [animation, setAnimation] = useState('fadeInUp');
  const [animatingOut, setAnimatingOut] = useState(false);
  const onAnimationEnd = () => (animatingOut ? setQuizzState('ONGOING') : null);
  return (
    <View style={styles.flex}>
      <AnimatableView
        animation={animation}
        onAnimationEnd={onAnimationEnd}
        delay={animatingOut ? null : 150}>
        <Surface
          style={
            animatingOut ? styles.containerAnimating : styles.containerStart
          }>
          <View style={styles.textContainer}>
            <AnimatableView animation={animatingOut ? 'fadeOut' : null}>
              <Title style={styles.title}>{title}</Title>
              <Text style={styles.text}>{instructions}</Text>
            </AnimatableView>
          </View>
        </Surface>
      </AnimatableView>
      <AnimatableView
        animation={animatingOut ? 'fadeOutDown' : 'fadeInUp'}
        delay={animatingOut ? null : 150}>
        <View
          style={[styles.buttonContainer, { backgroundColor: colors.primary }]}>
          <TouchableOpacity
            onPress={() => {
              setAnimatingOut(true);
              setAnimation(animateHeight);
            }}>
            <Text style={styles.buttonText}> Commencer </Text>
          </TouchableOpacity>
        </View>
      </AnimatableView>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  containerAnimating: {
    position: 'absolute',
    bottom: scale(320) - metrics.height,
    left: 0,
    width: metrics.width,
    height: metrics.height + scale(20),
    elevation: 4,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  containerStart: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: metrics.width,
    height: scale(320),
    elevation: 4,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  textContainer: { padding: scale(24) },
  title: {
    fontSize: scale(32),
    lineHeight: scale(36),
    marginBottom: 16,
  },
  text: {
    fontSize: scale(16),
    lineHeight: scale(18),
    overflow: 'hidden',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    elevation: 6,
    width: metrics.width,
    height: scale(56),
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: scale(24),
    color: '#FFF',
    textAlign: 'center',
  },
});
