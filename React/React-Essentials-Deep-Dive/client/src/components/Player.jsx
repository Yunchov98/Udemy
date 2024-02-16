import { useState } from 'react';

export default function Player({ name, symbol, isActive, onChangeName }) {
    const [playerName, setPlayerName] = useState(name);
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing((state) => !state);

        if (isEditing) {
            onChangeName(symbol, playerName);
        }
    };

    const handleChange = (e) => {
        setPlayerName(e.target.value);
    };

    return (
        <li className={isActive ? 'active' : ''}>
            <span className="player">
                {!isEditing && (
                    <span className="player-name">{playerName}</span>
                )}
                {isEditing && (
                    <input
                        type="text"
                        required
                        value={playerName}
                        onChange={handleChange}
                    />
                )}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>
                {isEditing ? 'Save' : 'Edit'}
            </button>
        </li>
    );
}
