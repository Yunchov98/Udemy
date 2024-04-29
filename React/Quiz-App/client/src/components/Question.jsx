import { useState } from 'react';

import QUESTIONS from '../questions';

import Answers from './Answers';
import QuestionTimer from './QuestionTimer';

export default function Question({ index, onSelectAnswer, onSkip }) {
    const [answer, setAnswer] = useState({
        selectedAnswer: '',
        isCorrect: null,
    });

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
    }

    return (
        <div id="question">
            <QuestionTimer onTimeout={onSkip} timeout={60000} />
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
