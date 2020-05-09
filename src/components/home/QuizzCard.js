import React, { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Caption, Text, Title, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationEvents } from 'react-navigation';
import { useNavigation } from 'react-navigation-hooks';
import { SharedElement } from 'react-navigation-shared-element';
import { metrics, scale } from '../../helpers';
const { width, height } = metrics;
export const CARD_WIDTH = width - scale(80);
export const CARD_HEIGHT = (height * 10) / 16 - scale(40);

export default ({ quizz }) => {
  const [opacity, setOpacity] = useState(1);
  const { navigate } = useNavigation();
  const { colors } = useTheme();
  return (
    <View key={quizz.id} style={styles.quizz}>
      <TouchableWithoutFeedback
        onPress={() => {
          setOpacity(0);
          navigate('Quizz', { quizz });
        }}>
        <View>
          <SharedElement id={quizz.id}>
            <Image
              style={[styles.image, { opacity }]}
              resizeMode="cover"
              source={quizz.picture}
            />
          </SharedElement>
          {opacity === 1 && (
            <>
              <View style={styles.overlay} />
              <View style={[StyleSheet.absoluteFill, { flex: 1, opacity }]}>
                <View style={styles.textPadding}>
                  <Title
                    style={[
                      styles.title,
                      { color: colors.textOnSurfaceTitle },
                    ]}>
                    {quizz.title}
                  </Title>
                  <Caption style={{ color: colors.textOnSurfaceSubtitle }}>
                    {quizz.subtitle}
                  </Caption>
                </View>
                <View style={styles.bottomContainer}>
                  <Text style={{ color: colors.accent }}>
                    {quizz.questions.length + ' questions'}
                  </Text>
                  <Text style={{ color: colors.accent }}>
                    {quizz.time + ' minutes'}{' '}
                    <Icon name="clock-o" color={colors.accent} />
                  </Text>
                </View>
              </View>
            </>
          )}
        </View>
      </TouchableWithoutFeedback>
      <NavigationEvents
        onWillFocus={() => (opacity === 0 ? setOpacity(0.7) : null)}
        onDidFocus={() => (opacity !== 1 ? setOpacity(1) : null)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  quizz: {
    flex: 1,
    elevation: 10,
  },
  image: {
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    borderRadius: 10,
  },
  title: {
    paddingTop: scale(10),
    fontSize: 34,
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0.2,
    backgroundColor: 'black',
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    borderRadius: 10,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    paddingHorizontal: scale(10),
    paddingBottom: scale(5),
    flexDirection: 'row',
    width: CARD_WIDTH,
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  textPadding: { padding: scale(20) },
});
