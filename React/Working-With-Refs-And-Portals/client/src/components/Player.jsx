import { useRef, useState } from 'react';

export default function Player() {
    const [playerName, setPlayerName] = useState();
    
    const playerNameInputRef = useRef();

    const handleClick = () => {
        setPlayerName(() => setPlayerName(playerNameInputRef.current.value));
    };

    return (
        <section id="player">
            <h2>Welcome {playerName ?? 'unknown entity'}</h2>
            <p>
                <input type="text" ref={playerNameInputRef} />
                <button onClick={handleClick}>Set Name</button>
            </p>
        </section>
    );
}
