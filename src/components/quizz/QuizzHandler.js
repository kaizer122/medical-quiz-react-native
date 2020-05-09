import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { metrics, scale } from '../../helpers';
import Pending from './Pending';
import Question from './Question';
import Report from './Report';
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: metrics.width,
    elevation: 4,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  textContainer: { padding: 20 },
  title: {
    fontSize: 32,
    lineHeight: 36,
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    lineHeight: 18,
    overflow: 'hidden',
  },
  button: {
    elevation: 6,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  buttonContent: {
    width: metrics.width,
    height: scale(60),
  },
  buttonText: {
    fontSize: 24,
  },
});

const states = {
  PENDING: 'PENDING',
  ONGOING: 'ONGOING',
  ENDED: 'ENDED',
};

export default quizz => {
  const [quizzState, setQuizzState] = useState(states.PENDING);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const maxScore = calculateMaxScore(quizz.questions);

  useEffect(() => {
    const newScore = answers.reduce((sum, ans) => sum + ans.score, 0);
    setScore(newScore);
  }, [answers]);

  switch (quizzState) {
    case states.PENDING:
      return <Pending setQuizzState={setQuizzState} {...quizz} />;
    case states.ONGOING:
      return (
        <Question
          setQuizzState={setQuizzState}
          questions={quizz.questions}
          score={score}
          answers={answers}
          setAnswers={setAnswers}
        />
      );
    case states.ENDED:
      return <Report score={score} maxScore={maxScore} />;
    default:
      return null;
  }
};

const calculateMaxScore = questions => {
  return questions
    .map(question => question.choices[question.choices.length - 1])
    .reduce((sum, ans) => sum + ans.score, 0);
};
