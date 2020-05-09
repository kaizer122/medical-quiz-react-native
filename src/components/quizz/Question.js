import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { View as AnimatableView } from 'react-native-animatable';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Caption, Colors, Surface, Text, Title, useTheme } from 'react-native-paper';
import { Bar } from 'react-native-progress';
import { metrics, scale } from '../../helpers';
import Answer from './Answer';

const styles = StyleSheet.create({
  answersContainer: {
    marginBottom: scale(56),
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  answersSubContainer: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: metrics.width,
    height: metrics.height,
    elevation: 4,
  },
  questionsContainer: {
    paddingHorizontal: scale(24),
    paddingBottom: scale(10),
  },
  title: {
    fontSize: scale(32),
    lineHeight: scale(32),
    marginTop: scale(20),
    marginBottom: scale(10),
  },
  text: {
    fontSize: scale(16),
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 0,
    width: metrics.width,
    height: scale(56),
    elevation: 6,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(15),
  },
  buttonStyle: { width: metrics.width / 2 - 5 },
  buttonsDivider: {
    elevation: 6,
    zIndex: 5,
    width: 1,
    height: scale(30),
    backgroundColor: Colors.grey400,
  },
  buttonText: {
    fontSize: scale(24),
    textAlign: 'center',
  },
  headerContainer: {
    height: scale(90),
    paddingTop: scale(40),
    marginLeft: scale(24),
  },
  headerText: {
    paddingTop: scale(10),
    fontSize: scale(24),
    paddingBottom: scale(5),
  },
});

export default ({ questions, setQuizzState, answers, setAnswers }) => {
  const { dark, colors } = useTheme();
  const [question, setQuestion] = useState(questions[0]);
  const [progress, setProgress] = useState(
    (question.index - 1) / questions.length,
  );
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [animation, setAnimation] = useState('fadeIn');
  useEffect(() => {
    setProgress(question.index / questions.length);
    setSelectedAnswer(null);
  }, [question.index, questions.length]);

  const bgColor = dark ? '#3F3F3F' : Colors.grey400;
  const { choices, question: title, questionExplained } = question;

  const handlePreviousPress = () => {
    if (question.index - 2 >= 0) {
      const updatedAnswers = JSON.parse(JSON.stringify(answers));
      updatedAnswers.pop();
      setAnswers(updatedAnswers);
      setQuestion(questions[question.index - 2]);
    }
  };

  const handleNextPress = () => {
    if (question.index !== questions.length) {
      //   setAnswers(answers.push(choices[selectedAnswer]));
      const updatedAnswers = JSON.parse(JSON.stringify(answers));
      updatedAnswers.push(choices[selectedAnswer]);
      setAnswers(updatedAnswers);
      setQuestion(questions[question.index]);
    } else {
      const updatedAnswers = JSON.parse(JSON.stringify(answers));
      updatedAnswers.push(choices[selectedAnswer]);
      setAnswers(updatedAnswers);
      setAnimation('fadeOut');
    }
  };
  const onAnimationEnd = () => {
    if (animation !== 'fadeIn') {
      setQuizzState('ENDED');
    }
  };
  return (
    <Surface style={styles.container}>
      <View style={styles.headerContainer}>
        <AnimatableView animation={animation}>
          <Text
            style={[
              styles.headerText,
              dark ? null : { color: colors.textAccent2 },
            ]}>
            {'Question ' + question.index}
            <Caption> {'/' + questions.length}</Caption>
          </Text>
        </AnimatableView>
        <Bar
          height={4}
          borderWidth={0}
          progress={progress}
          width={metrics.width - scale(48)}
          color={dark ? colors.text : colors.primary}
        />
      </View>
      <AnimatableView animation={animation}>
        <View style={styles.questionsContainer}>
          <Title style={[styles.title, { color: colors.textAccent }]}>
            {title}
          </Title>
          <Text style={styles.text}>{questionExplained}</Text>
        </View>
      </AnimatableView>
      <View style={styles.answersContainer}>
        <View style={styles.answersSubContainer}>
          {choices.map((answer, index) => (
            <Answer
              bgColor={bgColor}
              label={answer.label}
              animation={animation === 'fadeIn' ? 'fadeInUp' : 'fadeOutUp'}
              index={index}
              setSelectedAnswer={setSelectedAnswer}
              isSelected={index === selectedAnswer}
              isLast={index + 1 === choices.length}
              onAnimationEnd={onAnimationEnd}
            />
          ))}
        </View>
      </View>
      <AnimatableView animation={animation}>
        <Surface style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={handlePreviousPress}>
            <Text style={styles.buttonText}>Precedent</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonsDivider}>
            <Text />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            disabled={selectedAnswer === null}
            onPress={handleNextPress}>
            <Text
              style={[
                styles.buttonText,
                {
                  color: selectedAnswer !== null ? colors.primary : colors.text,
                },
              ]}>
              {question.index !== questions.length ? 'Suivant' : 'Terminer'}
            </Text>
          </TouchableOpacity>
        </Surface>
      </AnimatableView>
    </Surface>
  );
};
