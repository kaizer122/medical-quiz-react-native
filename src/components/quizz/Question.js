import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { View as AnimatableView } from 'react-native-animatable';
import { Caption, Colors, Surface, Text, Title, useTheme } from 'react-native-paper';
import { Bar } from 'react-native-progress';
import { metrics, scale } from '../../helpers';
import Answer from './Answer';

const styles = StyleSheet.create({
  answersContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scale(20),
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
    height: scale(160),
  },
  title: {
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
  buttonStyle: { width: metrics.width / 2 - 1 },
  buttonsDivider: {
    width: 1,
    height: scale(30),
    backgroundColor: Colors.grey400,
  },
  buttonText: {
    fontSize: scale(24),
    textAlign: 'center',
  },
  headerContainer: {
    paddingTop: scale(40),
    marginLeft: scale(24),
  },
  headerText: {
    paddingTop: scale(10),
    fontSize: scale(24),
    lineHeight: scale(-5),
    paddingBottom: scale(5),
  },
});

export default ({ questions, setQuizzState, answers, setAnswers }) => {
  const { dark, colors } = useTheme();
  const [question, setQuestion] = useState(questions[0]);
  const [progress, setProgress] = useState(
    (question.index - 1) / questions.length,
  );
  const [loading, setLoading] = useState(false);
  const [animation, setAnimation] = useState('fadeIn');
  useEffect(() => {
    setProgress(question.index / questions.length);
    setLoading(false);
  }, [question.index, questions.length]);

  const selectAnswer = selected => () => {
    if (!loading) {
      setLoading(true);
      handleNextPress(selected);
    }
  };

  const bgColor = dark ? '#3F3F3F' : Colors.grey400;
  const { choices, question: title, questionExplained } = question;

  const handleNextPress = async selected => {
    const storedAnswer = {
      answer: choices[selected],
      question: {
        questionExplained: question.questionExplained,
        title: question.question,
      },
    };
    if (question.index !== questions.length) {
      const updatedAnswers = JSON.parse(JSON.stringify(answers));
      updatedAnswers.push(storedAnswer);
      setAnswers(updatedAnswers);
      setQuestion(questions[question.index]);
    } else {
      const updatedAnswers = JSON.parse(JSON.stringify(answers));
      updatedAnswers.push(storedAnswer);
      setAnswers(updatedAnswers);
      setAnimation('fadeOut');
    }
  };
  const onAnimationEnd = () => {
    if (animation !== 'fadeIn') {
      setQuizzState('ENDED');
    }
  };
  const fontSize = getFontSize(title);
  return (
    <Surface style={styles.container}>
      <View style={styles.headerContainer}>
        <AnimatableView animation={animation}>
          <Title
            style={[
              styles.headerText,
              dark ? null : { color: colors.textAccent2 },
            ]}>
            {'Question ' + question.index}
            <Caption>{'/' + questions.length}</Caption>
          </Title>
        </AnimatableView>
        <AnimatableView animation={animation === 'fadeOut' ? animation : null}>
          <Bar
            height={4}
            borderWidth={0}
            progress={progress}
            width={metrics.width - scale(48)}
            color={dark ? colors.text : colors.primary}
          />
        </AnimatableView>
      </View>
      <AnimatableView animation={animation}>
        <View style={styles.questionsContainer}>
          <Title
            adjustsFontSizeToFit={true}
            minimumFontScale={0.5}
            style={[styles.title, { color: colors.textAccent, fontSize }]}>
            {title}
          </Title>
          <Text style={styles.text}>{questionExplained}</Text>
        </View>
      </AnimatableView>
      <View style={styles.answersContainer}>
        {choices.map((answer, index) => (
          <Answer
            bgColor={bgColor}
            label={answer.label}
            animation={animation === 'fadeIn' ? 'fadeInUp' : 'fadeOutUp'}
            index={index}
            selectAnswer={selectAnswer}
            isLast={index + 1 === choices.length}
            onAnimationEnd={onAnimationEnd}
          />
        ))}
      </View>
    </Surface>
  );
};

const getFontSize = title => {
  const fSize = Math.floor(
    Math.sqrt(((metrics.width - scale(24)) * scale(80)) / title.length),
  );
  return fSize > scale(32) ? scale(32) : fSize;
};
