import React from 'react';
import { StyleSheet } from 'react-native';
import { View as AnimatableView } from 'react-native-animatable';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text, useTheme } from 'react-native-paper';
import { metrics, scale } from '../../helpers';

const styles = StyleSheet.create({
  answer: {
    borderRadius: 10,
    marginVertical: scale(10),
    width: metrics.width - scale(44),
    paddingVertical: scale(16),
    paddingHorizontal: scale(24),
  },
  textStyle: {
    textAlign: 'center',
    fontSize: scale(18),
    color: '#FFF',
  },
});

export default ({
  bgColor,
  label,
  index,
  animation,
  setSelectedAnswer,
  isSelected,
  isLast,
  onAnimationEnd,
}) => {
  const { colors } = useTheme();
  const onPress = () => setSelectedAnswer(index);
  const onAnimEnd = () => (isLast ? onAnimationEnd() : null);
  return (
    <AnimatableView
      animation={animation}
      onAnimationEnd={onAnimEnd}
      delay={index * 100}>
      <TouchableOpacity
        style={[
          styles.answer,
          isSelected
            ? { backgroundColor: colors.primary }
            : { backgroundColor: bgColor },
        ]}
        onPress={onPress}>
        <Text style={styles.textStyle}>{label}</Text>
      </TouchableOpacity>
    </AnimatableView>
  );
};
