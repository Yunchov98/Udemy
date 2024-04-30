import { useState } from 'react';
import PropTypes from 'prop-types';

import QUESTIONS from '../questions';

import Answers from './Answers';
import QuestionTimer from './QuestionTimer';

Question.propTypes = {
    index: PropTypes.number,
    onSelectAnswer: PropTypes.func,
    onSkip: PropTypes.func,
};

export default function Question({ index, onSelectAnswer, onSkip }) {
    const [answer, setAnswer] = useState({
        selectedAnswer: '',
        isCorrect: null,
    });

    let timer = 60000;

    if (answer.selectedAnswer) {
        timer = 1000;
    }

    if (answer.isCorrect !== null) {
        timer = 2000;
    }

    const handleSelectAnswer = (answer) => {
        setAnswer({
            selectedAnswer: answer,
            isCorrect: null,
        });

        setTimeout(() => {
            setAnswer({
                selectedAnswer: answer,
                isCorrect: QUESTIONS[index].answers[0] === answer,
            });

            setTimeout(() => {
                onSelectAnswer(answer);
            }, 2000);
        }, 1000);
    };

    let answerState = '';

    if (answer.selectedAnswer && answer.isCorrect !== null) {
        answerState = answer.isCorrect ? 'correct' : 'wrong';
    } else if (answer.selectedAnswer) {
        answerState = 'answered';
    }

    return (
        <div id="question">
            <QuestionTimer
                key={timer}
                onTimeout={answer.selectedAnswer === '' ? onSkip : null}
                timeout={timer}
                mode={answerState}
            />
            <h2>{QUESTIONS[index].text}</h2>
            <Answers
                answers={QUESTIONS[index].answers}
                answerState={answerState}
                onSelect={handleSelectAnswer}
                selectedAnswer={answer.selectedAnswer}
            />
        </div>
    );
}
