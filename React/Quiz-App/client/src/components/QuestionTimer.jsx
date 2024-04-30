import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

QuestionTimer.propTypes = {
    timeout: PropTypes.number,
    onTimeout: PropTypes.func,
    mode: PropTypes.string,
};

export default function QuestionTimer({ timeout, onTimeout, mode }) {
    const [remainingTime, setRemainingTime] = useState(timeout);

    useEffect(() => {
        console.log('Setting timeout');
        const timer = setTimeout(onTimeout, timeout);

        return () => {
            clearTimeout(timer);
        };
    }, [onTimeout, timeout]);

    useEffect(() => {
        console.log('Setting interval');

        const interval = setInterval(() => {
            setRemainingTime((state) => state - 100);
        }, 100);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <progress
            id="question-time"
            className={mode}
            value={remainingTime}
            max={timeout}
        />
    );
}
