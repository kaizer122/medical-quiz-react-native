import moment from 'moment';
import 'moment/locale/fr';
import React, { useEffect, useState } from 'react';
import { AsyncStorage } from 'react-native';
import { MONITORING_KEY } from '../../helpers/constants';
import Pending from './Pending';
import Question from './Question';
import Report from './Report';
moment.locale('fr');

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
    const newScore = answers.reduce((sum, ans) => sum + ans.answer.score, 0);
    setScore(newScore);
  }, [answers]);
  useEffect(() => {
    if (quizzState === states.ENDED) {
      const updateStorage = async () => {
        try {
          const result = await AsyncStorage.getItem(MONITORING_KEY);
          const newValue = {
            score,
            maxScore,
            date: moment(),
            answers,
          };
          if (result) {
            const currentValue = JSON.parse(result);
            if (currentValue[quizz.id]) {
              currentValue[quizz.id].unshift(newValue);
            } else {
              currentValue[quizz.id] = [newValue];
            }
            await AsyncStorage.setItem(
              MONITORING_KEY,
              JSON.stringify(currentValue),
            );
          } else {
            const store = { [quizz.id]: [newValue] };
            await AsyncStorage.setItem(MONITORING_KEY, JSON.stringify(store));
          }
        } catch (e) {}
      };
      updateStorage();
    }
  }, [answers, maxScore, quizz.id, quizzState, score]);

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
      const reportData = {
        score,
        maxScore,
        date: moment(),
        answers,
      };
      return (
        <Report
          item={reportData}
          score={score}
          maxScore={maxScore}
          noScore={quizz.noScore}
        />
      );
    default:
      return null;
  }
};

const calculateMaxScore = questions => {
  return questions
    .map(question => question.choices[question.choices.length - 1])
    .reduce((sum, ans) => sum + ans.score, 0);
};
