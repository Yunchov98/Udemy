import { useCallback, useState } from 'react';

import QUESTIONS from '../questions';
import quizCompleteImg from '../assets/quiz-complete.png';
import Question from './Question';

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);

    const activeQuestionIndex = userAnswers.length;

    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    const handleSelectAnswer = useCallback(function handleSelectAnswer(
        selectedAnswer
    ) {
        setUserAnswers((state) => [...state, selectedAnswer]);
    },
    []);

    const handleSkipAnswer = useCallback(
        () => handleSelectAnswer(null),
        [handleSelectAnswer]
    );

    if (quizIsComplete) {
        return (
            <div id="summary">
                <h2></h2>
                <img src={quizCompleteImg} alt="Quiz complete image" />
                <h2>Quiz Completed</h2>
            </div>
        );
    }

    return (
        <div id="quiz">
            <Question
                key={activeQuestionIndex}
                index={activeQuestionIndex}
                onSelectAnswer={handleSelectAnswer}
                onSkip={handleSkipAnswer}
            />
        </div>
    );
}
