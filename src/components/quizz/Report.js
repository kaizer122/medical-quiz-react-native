import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { View as AnimatableView } from 'react-native-animatable';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Caption, Surface, Text, Title, useTheme } from 'react-native-paper';
import { useNavigation } from 'react-navigation-hooks';
import { metrics, scale } from '../../helpers';

export default ({ score, maxScore }) => {
  const { colors } = useTheme();
  const [animation, setAnimation] = useState('fadeInUp');
  const { goBack } = useNavigation();
  return (
    <>
      <AnimatableView animation={animation} delay={150}>
        <Surface style={styles.container}>
          <View style={styles.textContainer}>
            <Title style={styles.title}>Vous avez accumulé</Title>
            <Title style={[styles.title, { color: colors.primary }]}>
              {score}
              <Caption style={{ lineHeight: scale(36) }}>
                {'/' + maxScore}
              </Caption>
              <Title style={styles.title}>{' ' + 'Points'}</Title>
            </Title>
          </View>
        </Surface>
      </AnimatableView>
      <AnimatableView animation={animation} delay={150}>
        <View
          style={[styles.buttonContainer, { backgroundColor: colors.primary }]}>
          <TouchableOpacity onPress={goBack}>
            <Text style={styles.buttonText}> Fermer </Text>
          </TouchableOpacity>
        </View>
      </AnimatableView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: metrics.width,
    height: metrics.height,
    elevation: 4,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
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
