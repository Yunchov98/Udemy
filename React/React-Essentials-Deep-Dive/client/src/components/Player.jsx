import { useState } from 'react';

export default function Player({ name, symbol }) {
    const [playerName, setPlayerName] = useState(name);
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => setIsEditing((state) => !state);

    const handleChange = (e) => {
        setPlayerName(e.target.value);
    };

    return (
        <li>
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
