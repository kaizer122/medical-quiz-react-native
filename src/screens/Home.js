import React from 'react';
import { StyleSheet, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useTheme } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import doctorQuiz from '../../config/quizs/doctorQuiz.json';
import symtopQuiz from '../../config/quizs/symptomsQuiz.json';
import thirdQuiz from '../../config/quizs/thirdQuiz.json';
import ActionCard from '../components/home/ActionCard';
import QuizzCard, { CARD_HEIGHT, CARD_WIDTH } from '../components/home/QuizzCard';
import { metrics, scale } from '../helpers';

const { width } = metrics;
const quizzs = [
  {
    ...symtopQuiz,
    picture: require('../assets/neuro.jpg'),
  },
  {
    ...doctorQuiz,
    picture: require('../assets/doctor.jpg'),
  },
  {
    ...thirdQuiz,
    picture: require('../assets/pain.jpg'),
  },
];
const homeCards = [
  {
    id: 'homeCard1',
    index: 0,
    title: 'Suivi',
    icon: 'calendar',
    path: null,
  },
  {
    id: 'homeCard2',
    index: 1,
    title: 'Paramétres',
    icon: 'settings',
    path: 'Settings',
  },
  {
    id: 'homeCard3',
    index: 2,
    title: 'Ressources',
    icon: 'folder',
    path: null,
  },
  {
    id: 'homeCard4',
    index: 3,
    title: 'Faire un don',
    icon: 'dollar',
    faIcon: true,
    path: null,
  },
];

export default () => {
  const { colors } = useTheme();
  const _renderItem = ({ item, index }, parallaxProps) => {
    return (
      <QuizzCard
        key={item.id}
        {...{ quizz: item }}
        parallaxProps={parallaxProps}
      />
    );
  };
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.homeCardsContainer}>
        {homeCards.map(homeCard => (
          <ActionCard key={homeCard.id} {...homeCard} />
        ))}
      </View>

      <View style={styles.quizzCardsContainer}>
        <Animatable.View
          animation="fadeInUp"
          delay={(homeCards.length + 1) * 100}>
          <Carousel
            data={quizzs}
            renderItem={_renderItem}
            sliderWidth={width}
            itemHeight={CARD_HEIGHT}
            itemWidth={CARD_WIDTH}
            firstItem={1}
            hasParallaxImages={true}
          />
        </Animatable.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  homeCardsContainer: {
    flex: 6,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: scale(20),
  },
  quizzCardsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
