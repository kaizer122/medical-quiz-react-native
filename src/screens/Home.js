import React from 'react';
import { StyleSheet, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useTheme } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import doctorQuestions from '../../config/questions/doctorQuizz.json';
import symtopQuestions from '../../config/questions/symptomsQuizz.json';
import ActionCard from '../components/home/ActionCard';
import QuizzCard, { CARD_HEIGHT, CARD_WIDTH } from '../components/home/QuizzCard';
import { metrics, scale } from '../helpers';
const { width } = metrics;
const quizzs = [
  {
    id: 'quizz1',
    title: 'Renseigner mes symptômes',
    subtitle:
      'Répondez a une série de questions et nous générerons un rapport pour vous.',
    picture: require('../assets/neuro.jpg'),
    instructions:
      "Avec cette application, vous allez pouvoir garder trace de l'évolution des symptômes de votre Parkinson. Vous pourrez identifier les changements et améliorer la qualité de l'échange avec vos thérapeutes. N'hésitez pas à revenir ici à intervalles réguliers.",
    time: 8,
    questions: symtopQuestions,
  },
  {
    id: 'quizz2',
    title: 'Questions pour mon médecin',
    subtitle:
      'Répondez a une série de questions et nous générerons un rapport pour vous.',
    picture: require('../assets/doctor.jpg'),
    instructions:
      "Avec cette application, vous allez pouvoir garder trace de l'évolution des symptômes de votre Parkinson. Vous pourrez identifier les changements et améliorer la qualité de l'échange avec vos thérapeutes. N'hésitez pas à revenir ici à intervalles réguliers.",
    time: 12,
    questions: doctorQuestions,
  },
  {
    id: 'quizz3',
    title: 'Autre chose',
    subtitle: 'Entire Flat · 1 Bed',
    picture: require('../assets/pain.jpg'),
    instructions: '',
    time: 15,
    questions: doctorQuestions,
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
    marginTop: scale(20),
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
