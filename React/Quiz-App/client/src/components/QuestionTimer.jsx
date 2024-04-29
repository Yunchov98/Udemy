import { useEffect, useState } from 'react';

export default function QuestionTimer({ timeout, onTimeout }) {
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

    return <progress value={remainingTime} max={timeout} />;
}
