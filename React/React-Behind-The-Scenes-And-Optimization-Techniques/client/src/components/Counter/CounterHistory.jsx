import { useState } from 'react';
import PropTypes from 'prop-types';

import { log } from '../../log.js';

HistoryItem.propTypes = {
    count: PropTypes.string,
};

CounterHistory.propTypes = {
    history: PropTypes.array,
};

function HistoryItem({ count }) {
    log('<HistoryItem /> rendered', 3);

    const [selected, setSelected] = useState(false);

    function handleClick() {
        setSelected((prevSelected) => !prevSelected);
    }

    return (
        <li onClick={handleClick} className={selected ? 'selected' : undefined}>
            {count}
        </li>
    );
}

export default function CounterHistory({ history }) {
    log('<CounterHistory /> rendered', 2);

    return (
        <ol>
            {history.map((count, index) => (
                <HistoryItem key={index} count={count} />
            ))}
        </ol>
    );
}
